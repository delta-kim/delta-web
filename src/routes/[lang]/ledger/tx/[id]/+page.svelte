<script lang="ts">
  import { t, locale } from "svelte-i18n";
  import { TabAnchor } from "@skeletonlabs/skeleton";
  import type { PageData } from "../../$types";
  import type { Transaction } from "../../../../../declarations/Ledgers/Ledgers.did";
  import type { LedgerInitArgs } from "../../../../../declarations/MultiChainWallet/MultiChainWallet.did";
  import { onMount } from "svelte";
  import { createActor as createDelta } from "../../../../../declarations/delta/index";
  import { createActor as createLedgers } from "../../../../../declarations/Ledgers/index";
  import { createActor as createMCWallet } from "../../../../../declarations/MultiChainWallet/index";
  import { ic_host } from "../../../../../lib/store";

  let tnx: Transaction | undefined;
  let ledgers: LedgerInitArgs[] = [];
  let loading = true;

  export let data: PageData;

  export let lang = data.lang;

  const getLedger = (coin_code?: string): LedgerInitArgs | undefined => {
    return ledgers.find((l) => l.code == coin_code) || ledgers.at(1);
  };

  import { page } from "$app/stores";
  import { get } from "svelte/store";

  // Get the transaction id from the route params
  let id: string = get(page).params.id;

  // Get the coin_code from the search params (query string)
  let coin_code: string | undefined =
    get(page).url.searchParams.get("coin_code") ?? undefined;
  locale.subscribe((_lang) => {
    console.log("locale.subscribe", _lang);
    lang = _lang || "en";
  });

  // Utilities
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

  async function _fetchLedgerTransactions(
    filter: any,
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
    const { transactions: $tnx, ledgerArgsList } =
      await _fetchLedgerTransactions(
        [{ TxId: id }],
        Number.MAX_SAFE_INTEGER,
        100,
        {
          coinCode: coin_code,
        },
      );
    ledgers = ledgerArgsList;
    tnx = $tnx.length > 0 ? $tnx[0] : undefined;
    loading = false;
  });
</script>

<svelte:head>
  <title>{$t("title_prefix")} - {$t("explore")}</title>
</svelte:head>{#if loading}
  <p class="text-center">Loading...</p>
{:else if tnx == undefined}
  <p>Transaction no found</p>
{:else}
  <div
    class="container mx-auto h-full flex flex-col justify-center items-center pb-10"
  >
    <div class="gap-4 w-full md:w-[60vw] my-10 px-2">
      <div
        class="bg-white w-full rounded-2xl shadow-sm border border-slate-100 p-6"
      >
        <h2
          class="text-xl font-bold text-slate-800 mb-6 pb-4 border-b border-slate-100"
        >
          Transaction Details
        </h2>

        <div class="space-y-6">
          <!-- Main Info -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p class="text-sm font-medium text-slate-500 mb-1">
                Transaction ID
              </p>
              <div class="flex items-center gap-2">
                <p class="text-slate-800 font-mono text-sm break-all">
                  {tnx?.txId || "N/A"}
                </p>
                {#if tnx?.txId}
                  <button
                    type="button"
                    class="p-1 text-slate-400 hover:text-blue-600 transition-colors"
                    title="Copy TxID"
                    on:click={() => {
                      navigator.clipboard.writeText(tnx?.txId || "");
                      alert("TxID copied");
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </button>
                {/if}
              </div>
            </div>
            <div>
              <p class="text-sm font-medium text-slate-500 mb-1">Internal ID</p>
              <p class="text-slate-800 font-mono text-sm">{tnx?.id}</p>
            </div>
          </div>

          <!-- Amounts -->
          <div
            class="bg-slate-50 rounded-xl p-4 border border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div>
              <p class="text-sm font-medium text-slate-500 mb-1">Amount</p>
              <p class="text-xl font-bold text-slate-800">
                {_formatCryptoAmount(
                  tnx.amount,
                  Number(getLedger(coin_code)?.decimals ?? 8),
                )}
                <span class="text-sm font-medium text-slate-500 ml-1"
                  >{getLedger(coin_code)?.code}</span
                >
              </p>
            </div>
            <div>
              <p class="text-sm font-medium text-slate-500 mb-1">Fee</p>
              <p class="text-xl font-bold text-slate-800">
                {_formatCryptoAmount(
                  tnx.fee,
                  Number(getLedger(coin_code)?.decimals ?? 8),
                )}
                <span class="text-sm font-medium text-slate-500 ml-1"
                  >{getLedger(coin_code)?.code}</span
                >
              </p>
            </div>
          </div>

          <!-- Details -->
          <div class="grid grid-cols-1 gap-4">
            <div
              class="flex flex-col sm:flex-row sm:justify-between py-3 border-b border-slate-50"
            >
              <span class="text-sm font-medium text-slate-500">Method</span>
              <span
                class="text-sm font-medium text-slate-800 bg-slate-100 px-2 py-1 rounded inline-block w-fit mt-1 sm:mt-0"
              >
                {_formatKind(tnx.kind)}
              </span>
            </div>

            <div
              class="flex flex-col sm:flex-row sm:justify-between py-3 border-b border-slate-50"
            >
              <span class="text-sm font-medium text-slate-500">Timestamp</span>
              <span class="text-sm text-slate-800 mt-1 sm:mt-0"
                >{_formatTimestamp(tnx.timestamp)}</span
              >
            </div>

            <div
              class="flex flex-col sm:flex-row sm:justify-between py-3 border-b border-slate-50"
            >
              <span class="text-sm font-medium text-slate-500">From</span>
              <a
                href={`../account/${tnx.from}?coin_code=${getLedger(coin_code)?.code}`}
                class="text-sm font-medium text-blue-600 hover:text-blue-800 break-all mt-1 sm:mt-0"
              >
                {tnx.from}
              </a>
            </div>

            <div
              class="flex flex-col sm:flex-row sm:justify-between py-3 border-b border-slate-50"
            >
              <span class="text-sm font-medium text-slate-500">To</span>
              <a
                href={`../account/${tnx.to}?coin_code=${getLedger(coin_code)?.code}`}
                class="text-sm font-medium text-blue-600 hover:text-blue-800 break-all mt-1 sm:mt-0"
              >
                {tnx.to}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}

<style lang="postcss">
  figure {
    @apply flex relative flex-col;
  }
</style>
