<script lang="ts">
  import { t, locale } from "svelte-i18n";
  import type { PageData } from "./$types";
  import { onMount } from "svelte";
  import { createActor as createDelta } from "../../../../declarations/delta/index";
  import { createActor as createLedgers } from "../../../../declarations/Ledgers/index";
  import { createActor as createMCWallet } from "../../../../declarations/MultiChainWallet/index";
  import { ic_host } from "../../../../lib/store";

  import { TabAnchor } from "@skeletonlabs/skeleton";
  import type {
    FilterArgs,
    Transaction,
  } from "../../../../declarations/Ledgers/Ledgers.did";
  import type { LedgerInitArgs } from "../../../../declarations/MultiChainWallet/MultiChainWallet.did";

  let transactions: Transaction[] = [];
  let ledgers: LedgerInitArgs[] = [];
  let loading = true;
  let coin: string | undefined = undefined;

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

  const getLedger = (coin_code?: string): LedgerInitArgs | undefined => {
    return ledgers.find((l) => l.code == coin_code) || ledgers.at(1);
  };

  locale.subscribe((_lang) => {
    console.log("locale.subscribe", _lang);
    lang = _lang || "en";
  });

  // Utilities (duplicated to avoid server imports)
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
    const fractionClean = fraction.replace(/0+$/, "");
    return fractionClean
      ? `${whole.toString()}.${fractionClean}`
      : whole.toString();
  }

  function _formatTimestamp(ts: bigint | number | string): string {
    const num = typeof ts === "bigint" ? Number(ts) : Number(ts);
    if (!num) return "";
    const date = new Date(num * 1000);
    return date.toLocaleString();
  }

  function _formatKind(kind: Record<string, unknown>): string {
    if (!kind || typeof kind !== "object") return "";
    const [key, value] = Object.entries(kind)[0] ?? [];
    if (value === null) return key;
    if (typeof value === "string") return `${key}: ${value}`;
    return `${key}: ${JSON.stringify(value)}`;
  }

  // Client-side IC fetch
  async function _fetchLedgerTransactions(
    filter: [FilterArgs] | undefined,
    skipId: any,
    limit: number,
    { coinCode }: { coinCode?: string },
  ) {
    const host = $ic_host ?? "https://icp0.io";
    const mainCanisterId = "ojpsk-siaaa-aaaam-adtea-cai";
    const mcwCanisterId = "o3jft-6yaaa-aaaam-adtha-cai";

    const delta = await createDelta(mainCanisterId, { agentOptions: { host } });
    const mcWallet = await createMCWallet(mcwCanisterId, {
      agentOptions: { host },
    });

    let ledgerArgsList = await mcWallet.listLedgerInitArgs();
    let ledgerArgs = ledgerArgsList.at(1);
    if (!ledgerArgs) throw new Error("No ledger arguments found.");

    let thisLedgerCanisterId = await delta.getCanisterId({
      Ledgers: coinCode ?? ledgerArgs.code,
    });

    const Ledger = await createLedgers(thisLedgerCanisterId, {
      agentOptions: { host },
    });
    const transactions = await Ledger.listTransaction(
      filter || [],
      skipId,
      limit,
    );
    return { transactions, ledgerArgsList };
  }

  onMount(async () => {
    loading = true;
    // Example usage: filter by From address
    const { transactions: tnx, ledgerArgsList } =
      await _fetchLedgerTransactions(undefined, Number.MAX_SAFE_INTEGER, 100, {
        coinCode: undefined,
      });
    ledgers = ledgerArgsList;
    transactions = tnx;
    loading = false;
  });

  const onChangeCoin = async (coin: string | undefined) => {
    return await _fetchLedgerTransactions(
      undefined,
      Number.MAX_SAFE_INTEGER,
      100,
      {
        coinCode: coin,
      },
    );
  };
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
    <div class="gap-4 w-full lg:w-[70vw] my-10 px-2">
      <div
        class="bg-white w-full rounded-2xl shadow-sm border border-slate-100 p-6"
      >
        <div
          class="flex flex-col md:flex-row justify-between items-center mb-6 gap-4"
        >
          <h2 class="text-xl font-bold text-slate-800">Transactions</h2>
          <select
            bind:value={coin}
            on:change={async (e) => {
              loading = true;
              const { transactions: tnx, ledgerArgsList } =
                await onChangeCoin(coin);
              ledgers = ledgerArgsList;
              transactions = tnx;
              loading = false;
              coin = coin;
              currentPage = 1; // Reset to first page on filter change
            }}
            class="form-select block w-full md:w-auto px-3 py-2 text-base border-slate-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option>Filter by ledger</option>
            {#each ledgers as app}
              <option value={app.code}>{app.name}({app.code})</option>
            {/each}
          </select>
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
                        href={`./account/${tnx.from}?coin_code=${getLedger(coin)?.code}`}
                        class="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        {_clipString(tnx.from)}
                      </a>
                    </td>
                    <td class="py-3 px-4 text-sm">
                      <a
                        href={`./account/${tnx.to}?coin_code=${getLedger(coin)?.code}`}
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
                        Number(getLedger(coin)?.decimals ?? 8),
                      )}
                      <span class="text-xs text-slate-500 ml-1"
                        >{getLedger(coin)?.code}</span
                      >
                    </td>
                    <td class="py-3 px-4 text-sm text-slate-500">
                      {_formatCryptoAmount(
                        tnx.fee,
                        Number(getLedger(coin)?.decimals ?? 8),
                      )}
                      <span class="text-xs ml-1">{getLedger(coin)?.code}</span>
                    </td>
                    <td
                      class="py-3 px-4 text-sm text-slate-500 whitespace-nowrap"
                    >
                      {_formatTimestamp(tnx.timestamp)}
                    </td>
                    <td class="py-3 px-4 text-sm">
                      {#if tnx?.txId != ""}
                        <a
                          href={`./tx/${tnx.txId}?coin_code=${getLedger(coin)?.code}`}
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
