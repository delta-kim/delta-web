<script lang="ts">
  import { onMount } from "svelte";
  import { createActor as createDelta } from "../../../declarations/delta/index";
  import { createActor as createLedgers } from "../../../declarations/Ledgers/index";
  import { createActor as createMCWallet } from "../../../declarations/MultiChainWallet/index";
  import { ic_host } from "../../../lib/store";
  import type { FilterArgs } from "../../../declarations/Ledgers/Ledgers.did";
  import { t, locale } from "svelte-i18n";
  import type { PageData } from "./$types";
  import { TabAnchor } from "@skeletonlabs/skeleton";
  import type { Transaction } from "../../../declarations/Ledgers/Ledgers.did";
  import type { LedgerInitArgs } from "../../../declarations/delta/delta.did";

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
    console.log("locale.subscribe", _lang);
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

<svelte:head>
  <title>{$t("title_prefix")} - {$t("explore")}</title>
</svelte:head>
{#if loading}
  <p class="text-center">Loading...</p>
{:else}
  <div
    class="container mx-auto h-full flex flex-col justify-center items-center pb-10"
  >
    <div class="py-5">
      <h2 class="h2 leading-normal text-center" style="opacity: 0.8;">
        Delta Kim's Ledger
      </h2>
      <form
        class="w-[90vw] md:w-[55vw] mx-auto flex justify-between bg-slate-200 rounded-full p-1 mt-5"
        on:submit|preventDefault={(e) => {
          // @ts-ignore
          const val = e.target[0].value;
          if (val) {
            window.location.href = `./ledger/search?q=${val}`;
          }
        }}
      >
        <input
          class="w-[90%] rounded-full border-none bg-transparent px-4"
          placeholder="Search by Address / Hash"
        />
        <button class="bg-black px-5 rounded-full text-white">Search</button>
      </form>
    </div>
    <div class="w-full lg:w-[80vw] my-5 lg:my-10">
      <div class="flex justify-between items-center px-2 mb-6">
        <h1 class="text-2xl font-bold text-slate-800">Ledgers</h1>
        <span
          class="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-sm font-medium"
        >
          Total: {ledgers.length}
        </span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-2">
        {#each ledgers as app}
          <div
            class="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-all duration-200 flex flex-col h-full"
          >
            <div class="flex items-start justify-between mb-4">
              <figure
                class="flex-none text-xl bg-slate-50 rounded-xl w-14 h-14 flex items-center justify-center border border-slate-100"
              >
                {#if app.symbol != ""}
                  {@html app.symbol}
                {:else}
                  {@html app.code}
                {/if}
              </figure>
              <span
                class="bg-blue-50 text-blue-600 px-2 py-1 rounded-md text-xs font-bold uppercase tracking-wider"
              >
                {@html app.code}
              </span>
            </div>

            <div class="mb-4 flex-grow">
              <h3 class="text-lg font-bold text-slate-800 mb-1">
                {@html app.name}
              </h3>
              <div class="flex items-center text-slate-500 text-sm space-x-4">
                <span class="flex items-center" title="Symbol">
                  <span class="font-medium mr-1">Sym:</span>
                  {#if app.symbol != ""}
                    {@html app.symbol}
                  {:else}
                    N/A
                  {/if}
                </span>
                <span class="flex items-center" title="Decimals">
                  <span class="font-medium mr-1">Dec:</span>
                  {@html app.decimals}
                </span>
              </div>
            </div>

            <div class="mt-auto pt-4 border-t border-slate-50">
              <a
                href={app.web}
                target="_blank"
                class="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center transition-colors"
              >
                Visit Website
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 ml-1"
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
        class="bg-white w-full rounded-2xl shadow-sm border border-slate-100 p-6"
      >
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-bold text-slate-800">Transactions</h2>
          <a
            href="./ledger/tx"
            class="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
          >
            View All Transactions &rarr;
          </a>
        </div>

        {#if transactions.length > 0}
          <div class="w-full overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="border-b border-slate-100">
                  <th class="py-3 px-4 text-sm font-semibold text-slate-500"
                    >ID</th
                  >
                  <th class="py-3 px-4 text-sm font-semibold text-slate-500"
                    >From</th
                  >
                  <th class="py-3 px-4 text-sm font-semibold text-slate-500"
                    >To</th
                  >
                  <th class="py-3 px-4 text-sm font-semibold text-slate-500"
                    >Method</th
                  >
                  <th class="py-3 px-4 text-sm font-semibold text-slate-500"
                    >Amount</th
                  >
                  <th class="py-3 px-4 text-sm font-semibold text-slate-500"
                    >Fee</th
                  >
                  <th class="py-3 px-4 text-sm font-semibold text-slate-500"
                    >Time</th
                  >
                  <th class="py-3 px-4 text-sm font-semibold text-slate-500"
                    >TxID</th
                  >
                </tr>
              </thead>
              <tbody>
                {#each paginatedTransactions as tnx}
                  <tr
                    class="border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors"
                  >
                    <td class="py-3 px-4 text-sm text-slate-600">{tnx?.id}</td>
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
                        class="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-medium"
                      >
                        {_formatKind(tnx.kind)}
                      </span>
                    </td>
                    <td class="py-3 px-4 text-sm font-medium text-slate-700">
                      {_formatCryptoAmount(
                        tnx.amount,
                        Number(getLedger()?.decimals ?? 8),
                      )}
                      <span class="text-xs text-slate-500 ml-1"
                        >{getLedger()?.code}</span
                      >
                    </td>
                    <td class="py-3 px-4 text-sm text-slate-500">
                      {_formatCryptoAmount(
                        tnx.fee,
                        Number(getLedger()?.decimals ?? 8),
                      )}
                      <span class="text-xs ml-1">{getLedger()?.code}</span>
                    </td>
                    <td
                      class="py-3 px-4 text-sm text-slate-500 whitespace-nowrap"
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
            class="flex justify-between items-center mt-6 pt-4 border-t border-slate-100"
          >
            <span class="text-sm text-slate-500">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(
                currentPage * itemsPerPage,
                transactions.length,
              )} of {transactions.length} entries
            </span>
            <div class="flex space-x-2">
              <button
                class="px-3 py-1 border border-slate-200 rounded-md text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                on:click={prevPage}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <button
                class="px-3 py-1 border border-slate-200 rounded-md text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                on:click={nextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        {:else}
          <div class="text-center py-10 text-slate-500">
            <p>No transactions found</p>
          </div>
        {/if}
      </div>
    </div>
  </div>
{/if}

<style lang="postcss">
  figure {
    @apply flex relative flex-col;
  }
  th,
  td {
    @apply py-2 px-4 text-left;
  }

  tr {
    @apply border-b border-slate-200;
  }
</style>
