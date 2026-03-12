<script lang="ts">
  import type { PageData } from "./$types";
  import type { FilterArgs } from "../../../declarations/Ledgers/Ledgers.did";
  import type { Transaction } from "../../../declarations/Ledgers/Ledgers.did";
  import type { LedgerInitArgs } from "../../../declarations/delta/delta.did";
  import { onMount } from "svelte";
  import { createActor as createDelta } from "../../../declarations/delta/index";
  import { createActor as createLedgers } from "../../../declarations/Ledgers/index";
  import { createActor as createMCWallet } from "../../../declarations/MultiChainWallet/index";
  import { ic_host } from "../../../lib/store";
  import { t, locale } from "svelte-i18n";
  import { TabAnchor } from "@skeletonlabs/skeleton";
  import SEO from "../../../components/SEO.svelte";

  let transactions: Transaction[] = [];
  let ledgers: LedgerInitArgs[] = [];
  let loading = true;
  const COIN_CODE = "BNB";

  // Pagination
  let currentPage = 1;
  let itemsPerPage = 10;
  $: totalPages = Math.ceil(transactions.length / itemsPerPage);
  $: paginatedTransactions = transactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  function nextPage() {
    if (currentPage < totalPages) currentPage++;
  }

  function prevPage() {
    if (currentPage > 1) currentPage--;
  }

  export let data: PageData;

  export let lang = data.lang;

  // Utility functions
  function _clipString(str: string): string {
    if (!str || str.length <= 12) return str;
    return `${str.slice(0, 6)}...${str.slice(str.length - 6)}`;
  }

  function _formatCryptoAmount(
    value: bigint | number | string,
    decimals = 8,
  ): string {
    let bigValue: bigint;
    if (typeof value === "bigint") bigValue = value;
    else if (typeof value === "number") bigValue = BigInt(value);
    else bigValue = BigInt(value);

    const divisor = 10n ** BigInt(decimals);
    const whole = bigValue / divisor;
    const fraction = (bigValue % divisor).toString().padStart(decimals, "0");

    // Remove trailing zeros in fraction for cleaner display
    const fractionClean = fraction.replace(/0+$/, "");
    return fractionClean
      ? `${whole.toString()}.${fractionClean}`
      : whole.toString();
  }

  function _formatTimestamp(ts: bigint | number | string): string {
    // Convert to number (seconds), then to milliseconds
    const num = typeof ts === "bigint" ? Number(ts) : Number(ts);
    if (!num) return "";
    const date = new Date(num * 1000);
    return date.toLocaleString(); // or use toLocaleDateString() for just the date
  }

  function _formatKind(kind: Record<string, unknown>): string {
    if (!kind || typeof kind !== "object") return "";
    const [key, value] = Object.entries(kind)[0] ?? [];
    if (value === null) return key;
    if (typeof value === "string") return `${key}: ${value}`;
    return `${key}: ${JSON.stringify(value)}`;
  }

  // IC functions
  async function _fetchLedgerTransactions(
    filter: [FilterArgs] | undefined,
    skipId: any,
    limit: number,
    { coinCode }: { coinCode?: string },
  ) {
    const host = $ic_host ?? "https://icp0.io";
    const mainCanisterId = "ojpsk-siaaa-aaaam-adtea-cai";
    const mcwCanisterId = "o3jft-6yaaa-aaaam-adtha-cai";

    const delta = await createDelta(mainCanisterId, {
      agentOptions: { host },
    });

    const mcWallet = await createMCWallet(mcwCanisterId, {
      agentOptions: { host },
    });

    let ledgerArgsList = await mcWallet.listLedgerInitArgs();

    let ledgerArgs = ledgerArgsList.at(1);

    if (!ledgerArgs) {
      throw new Error("No ledger arguments found.");
    }
    let thisLedgerCanisterId = await delta.getCanisterId({
      Ledgers: coinCode ?? ledgerArgs.code,
    });

    const Ledger = await createLedgers(thisLedgerCanisterId, {
      agentOptions: { host },
    });
    // return Ledger.listTransaction(coinCode, filter, skipId, limit);
    const transactions = await Ledger.listTransaction(
      filter || [],
      skipId,
      limit,
    );

    return { transactions, ledgerArgsList };
  }

  const getLedger = (coin_code?: string): LedgerInitArgs | undefined => {
    return ledgers.find((l) => l.code == coin_code) || ledgers.at(1);
  };
  locale.subscribe((_lang) => {
    lang = _lang || "en";
  });

  onMount(async () => {
    loading = true;
    try {
      // Example usage: filter by From address
      const { transactions: tnx, ledgerArgsList } =
        await _fetchLedgerTransactions(undefined, Number.MAX_SAFE_INTEGER, 10, {
          coinCode: undefined,
        });
      ledgers = ledgerArgsList;
      transactions = tnx;
    } catch (error) {
      console.error("Error fetching ledger data:", error);
      // Set empty arrays as fallback
      ledgers = [];
      transactions = [];
    }
    loading = false;
  });
</script>

<SEO
  title="{$t('title_prefix')} - {$t('explore')}"
  description="Explore the Delta Kim transparent ledger and transaction history on the Internet Computer."
  lang={data.lang}
/>

{#if loading}
  <div
    class="min-h-screen flex items-center justify-center bg-[#f8fafc] dark:bg-slate-900"
  >
    <div
      class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"
    ></div>
  </div>
{:else}
  <div
    class="min-h-screen bg-[#f8fafc] dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-sans selection:bg-primary/30 relative pb-32 transition-colors duration-300"
  >
    <!-- Background Glow -->
    <div class="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <div
        class="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"
      ></div>
      <div
        class="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-secondary/5 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"
      ></div>
    </div>

    <div
      class="container mx-auto px-6 py-20 relative z-10 max-w-7xl flex flex-col items-center"
    >
      <header class="text-center mb-12 animate-fade-in w-full">
        <h1
          class="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 drop-shadow-sm transition-colors duration-300"
        >
          {$t("ledger_title")}
        </h1>
        <div
          class="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full opacity-80 mb-8"
        ></div>

        <form
          class="w-full max-w-2xl mx-auto flex bg-white dark:bg-slate-800 rounded-full p-2 mt-5 shadow-lg border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-all duration-300"
          on:submit|preventDefault={(e) => {
            // @ts-ignore
            const val = e.target[0].value;
            if (val) {
              window.location.href = `./ledger/search?q=${val}`;
            }
          }}
        >
          <input
            class="flex-grow rounded-full border-none bg-transparent px-6 py-3 text-slate-700 dark:text-slate-200 focus:ring-0 focus:outline-none placeholder-slate-400 dark:placeholder-slate-500 transition-colors duration-300"
            placeholder={$t("search_placeholder")}
          />
          <button
            class="bg-slate-900 hover:bg-primary px-8 py-3 rounded-full text-white font-bold transition-colors shadow-md"
            >{$t("search_button")}</button
          >
        </form>
      </header>

      <div
        class="w-full my-5 lg:my-10 animate-fade-in"
        style="animation-delay: 0.2s; animation-fill-mode: both;"
      >
        <div class="flex justify-between items-center px-2 mb-6">
          <h2
            class="text-2xl font-bold text-slate-800 dark:text-white transition-colors duration-300"
          >
            {$t("ledgers")}
          </h2>
          <span
            class="bg-primary/5 text-primary border border-primary/20 px-3 py-1 rounded-full text-sm font-bold"
          >
            {$t("total")}: {ledgers.length}
          </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-2">
          {#each ledgers as app}
            <div
              class="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-5 hover:shadow-md transition-all duration-200"
            >
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-4">
                  <figure
                    class="flex-none text-xl bg-slate-50 dark:bg-slate-700/50 rounded-xl w-12 h-12 flex items-center justify-center border border-slate-100 dark:border-slate-700/50 transition-colors duration-300"
                  >
                    {#if app.symbol != ""}
                      {@html app.symbol}
                    {:else}
                      {@html app.code}
                    {/if}
                  </figure>
                  <div>
                    <h3
                      class="font-bold text-slate-800 dark:text-slate-100 mb-0.5 leading-tight transition-colors duration-300"
                    >
                      {@html app.name}
                    </h3>
                    <div class="flex items-center gap-2">
                      <span
                        class="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider transition-colors duration-300"
                      >
                        {@html app.code}
                      </span>
                      <span
                        class="text-slate-400 dark:text-slate-500 text-xs transition-colors duration-300"
                      >
                        Dec: {@html app.decimals}
                      </span>
                    </div>
                  </div>
                </div>

                <a
                  href={app.web}
                  target="_blank"
                  class="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:text-blue-400 dark:hover:bg-slate-700 rounded-full transition-all"
                  title="Visit Website"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            </div>
          {/each}
        </div>
      </div>
      <!-- <div
      class="grid md:grid-cols-2 gap-4 w-full lg:w-[80vw] my-5 lg:my-10 px-2"
    > -->
      <div class="w-full lg:w-[80vw] my-5 px-2">
        <!-- <div class="bg-white w-full rounded-lg">
        <h1 class="border-b border-slate-400 px-4 py-3">Fueling</h1>
        <div class="text-[12px] lg:text-[14px] text-slate-500">
          {#each transactions as app}
            <div
              class="border-t border-slate-400 p-5 flex justify-between items-center flex-wrap gap-y-3"
            >
              <div class="flex items-center">
                <figure
                  class="mr-2 flex-none text-md bg-slate-200 rounded-full w-10 h-10 flex items-center justify-center"
                >
                  ⛽︎
                </figure>
                <div>
                  <p
                    class="text-md font-[400] -mb-[5px] flex items-center gap-2"
                  >
                    Fuel <TabAnchor
                      href="./ledger/fuel/123456"
                      class="text-blue-600">#123456</TabAnchor
                    >
                  </p>
                  <p>2 secs ago</p>
                </div>
              </div>

              <div>
                <p class="flex items-center gap-2">
                  Miner <TabAnchor
                    href="./ledger/account/123456"
                    class="text-blue-600">Delta Coin</TabAnchor
                  >
                </p>
                <p class="flex items-center gap-2">
                  Fuel <TabAnchor
                    href="./ledger/tx/123456"
                    class="text-blue-600">1000 tnxs</TabAnchor
                  > in 2secs
                </p>
              </div>

              <div class="border border-slate-400 rounded-lg px-3 py-[1px]">
                <p>0 ICP</p>
              </div>
            </div>
          {/each}
          <p class="border-t text-center py-2">
            <TabAnchor href="./ledger/fuel" class="text-blue-600"
              >View All Fueling</TabAnchor
            >
          </p>
        </div>
      </div> -->
        <div
          class="bg-white dark:bg-slate-800 w-full rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6"
        >
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-bold text-slate-800 dark:text-white">
              {$t("transactions")}
            </h2>
            <a
              href="./ledger/tx"
              class="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
            >
              {$t("view_all_transactions")}
            </a>
          </div>

          {#if transactions.length > 0}
            <div class="w-full overflow-x-auto">
              <table class="w-full text-left border-collapse">
                <thead>
                  <tr class="border-b border-slate-100 dark:border-slate-700">
                    <th
                      class="py-3 px-4 text-sm font-semibold text-slate-500 dark:text-slate-400"
                      >{$t("id")}</th
                    >
                    <th
                      class="py-3 px-4 text-sm font-semibold text-slate-500 dark:text-slate-400"
                      >{$t("from")}</th
                    >
                    <th
                      class="py-3 px-4 text-sm font-semibold text-slate-500 dark:text-slate-400"
                      >{$t("to")}</th
                    >
                    <th
                      class="py-3 px-4 text-sm font-semibold text-slate-500 dark:text-slate-400"
                      >{$t("method")}</th
                    >
                    <th
                      class="py-3 px-4 text-sm font-semibold text-slate-500 dark:text-slate-400"
                      >{$t("amount")}</th
                    >
                    <th
                      class="py-3 px-4 text-sm font-semibold text-slate-500 dark:text-slate-400"
                      >{$t("fee")}</th
                    >
                    <th
                      class="py-3 px-4 text-sm font-semibold text-slate-500 dark:text-slate-400"
                      >{$t("time")}</th
                    >
                    <th
                      class="py-3 px-4 text-sm font-semibold text-slate-500 dark:text-slate-400"
                      >{$t("txid")}</th
                    >
                  </tr>
                </thead>
                <tbody>
                  {#each paginatedTransactions as tnx}
                    <tr
                      class="border-b border-slate-50 dark:border-slate-700/50 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                    >
                      <td
                        class="py-3 px-4 text-sm text-slate-600 dark:text-slate-300"
                        >{tnx?.id}</td
                      >
                      <td class="py-3 px-4 text-sm">
                        <a
                          href={`./ledger/account/${tnx.from}?coin_code=${getLedger()?.code}`}
                          class="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          {_clipString(tnx.from)}
                        </a>
                      </td>
                      <td class="py-3 px-4 text-sm">
                        <a
                          href={`./ledger/account/${tnx.to}?coin_code=${getLedger()?.code}`}
                          class="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          {_clipString(tnx.to)}
                        </a>
                      </td>
                      <td class="py-3 px-4 text-sm">
                        <span
                          class="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-1 rounded text-xs font-medium"
                        >
                          {_formatKind(tnx.kind)}
                        </span>
                      </td>
                      <td
                        class="py-3 px-4 text-sm font-medium text-slate-700 dark:text-slate-200"
                      >
                        {_formatCryptoAmount(
                          tnx.amount,
                          Number(getLedger()?.decimals ?? 8),
                        )}
                        <span
                          class="text-xs text-slate-500 dark:text-slate-400 ml-1"
                          >{getLedger()?.code}</span
                        >
                      </td>
                      <td
                        class="py-3 px-4 text-sm text-slate-500 dark:text-slate-400"
                      >
                        {_formatCryptoAmount(
                          tnx.fee,
                          Number(getLedger()?.decimals ?? 8),
                        )}
                        <span class="text-xs ml-1 dark:text-slate-500"
                          >{getLedger()?.code}</span
                        >
                      </td>
                      <td
                        class="py-3 px-4 text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap"
                      >
                        {_formatTimestamp(tnx.timestamp)}
                      </td>
                      <td class="py-3 px-4 text-sm">
                        {#if tnx?.txId != ""}
                          <a
                            href={`./ledger/tx/${tnx.txId}?coin_code=${getLedger()?.code}`}
                            class="text-blue-600 hover:text-blue-800 font-medium"
                          >
                            {_clipString(tnx?.txId)}
                          </a>
                        {:else}
                          <span class="text-slate-400">N/A</span>
                        {/if}
                      </td>
                    </tr>
                  {/each}
                </tbody>
              </table>
            </div>

            <!-- Pagination Controls -->
            <div
              class="flex justify-between items-center mt-6 pt-4 border-t border-slate-100 dark:border-slate-700"
            >
              <span class="text-sm text-slate-500">
                {$t("showing")}
                {(currentPage - 1) * itemsPerPage + 1}
                {$t("to_word")}
                {Math.min(currentPage * itemsPerPage, transactions.length)}
                {$t("of")}
                {transactions.length}
                {$t("entries")}
              </span>
              <div class="flex space-x-2">
                <button
                  class="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded-md text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  on:click={prevPage}
                  disabled={currentPage === 1}
                >
                  {$t("previous")}
                </button>
                <button
                  class="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded-md text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  on:click={nextPage}
                  disabled={currentPage === totalPages}
                >
                  {$t("next")}
                </button>
              </div>
            </div>
          {:else}
            <div class="text-center py-10 text-slate-500">
              <p>{$t("no_transactions_found")}</p>
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  @keyframes blob {
    0% {
      transform: translate(0px, 0px) scale(1);
    }
    33% {
      transform: translate(30px, -50px) scale(1.1);
    }
    66% {
      transform: translate(-20px, 20px) scale(0.9);
    }
    100% {
      transform: translate(0px, 0px) scale(1);
    }
  }
  .animate-blob {
    animation: blob 7s infinite;
  }
  .animation-delay-2000 {
    animation-delay: 2s;
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .animate-fade-in {
    animation: fadeIn 0.8s ease-out;
  }

  figure {
    display: flex;
    position: relative;
    flex-direction: column;
  }
  th,
  td {
    padding: 0.5rem 1rem;
    text-align: left;
  }
  tr {
    border-bottom: 1px solid #f1f5f9;
  }
  :global(.dark) tr {
    border-bottom-color: rgba(51, 65, 85, 0.5); /* slate-700/50 */
  }
</style>
