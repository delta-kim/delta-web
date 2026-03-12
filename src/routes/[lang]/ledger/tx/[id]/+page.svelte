<script lang="ts">
  import type { PageData } from "../../$types";
  import type { Transaction } from "../../../../../declarations/Ledgers/Ledgers.did";
  import type { LedgerInitArgs } from "../../../../../declarations/MultiChainWallet/MultiChainWallet.did";
  import { t, locale } from "svelte-i18n";
  import { TabAnchor } from "@skeletonlabs/skeleton";
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
  <div
    class="min-h-screen flex items-center justify-center bg-[#f8fafc] dark:bg-slate-900"
  >
    <div
      class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"
    ></div>
  </div>
{:else if tnx == undefined}
  <div
    class="min-h-screen flex items-center justify-center bg-[#f8fafc] dark:bg-slate-900"
  >
    <p class="text-slate-500 dark:text-slate-400">
      {$t("error_transaction_not_found")}
    </p>
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
      class="container mx-auto px-6 pt-20 relative z-10 max-w-7xl flex flex-col items-center"
    >
      <div class="gap-4 w-full md:w-[60vw] my-10 px-2">
        <div
          class="bg-white dark:bg-slate-800 w-full rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6"
        >
          <h2
            class="text-xl font-bold text-slate-800 dark:text-white mb-6 pb-4 border-b border-slate-100 dark:border-slate-700"
          >
            {$t("transaction_details")}
          </h2>

          <div class="space-y-6">
            <!-- Main Info -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p
                  class="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1"
                >
                  {$t("transaction_id")}
                </p>
                <div class="flex items-center gap-2">
                  <p
                    class="text-slate-800 dark:text-slate-200 font-mono text-sm break-all"
                  >
                    {tnx?.txId || "N/A"}
                  </p>
                  {#if tnx?.txId}
                    <button
                      type="button"
                      class="p-1 text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
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
                <p
                  class="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1"
                >
                  {$t("internal_id")}
                </p>
                <p class="text-slate-800 dark:text-slate-200 font-mono text-sm">
                  {tnx?.id}
                </p>
              </div>
            </div>

            <!-- Amounts -->
            <div
              class="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4 border border-slate-100 dark:border-slate-700/50 grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div>
                <p
                  class="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1"
                >
                  {$t("amount")}
                </p>
                <p class="text-xl font-bold text-slate-800 dark:text-white">
                  {_formatCryptoAmount(
                    tnx.amount,
                    Number(getLedger(coin_code)?.decimals ?? 8),
                  )}
                  <span
                    class="text-sm font-medium text-slate-500 dark:text-slate-400 ml-1"
                    >{getLedger(coin_code)?.code}</span
                  >
                </p>
              </div>
              <div>
                <p
                  class="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1"
                >
                  {$t("fee")}
                </p>
                <p class="text-xl font-bold text-slate-800 dark:text-white">
                  {_formatCryptoAmount(
                    tnx.fee,
                    Number(getLedger(coin_code)?.decimals ?? 8),
                  )}
                  <span
                    class="text-sm font-medium text-slate-500 dark:text-slate-400 ml-1"
                    >{getLedger(coin_code)?.code}</span
                  >
                </p>
              </div>
            </div>

            <!-- Details -->
            <div class="grid grid-cols-1 gap-4">
              <div
                class="flex flex-col sm:flex-row sm:justify-between py-3 border-b border-slate-50 dark:border-slate-700/50"
              >
                <span
                  class="text-sm font-medium text-slate-500 dark:text-slate-400"
                  >{$t("method")}</span
                >
                <span
                  class="text-sm font-medium text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded inline-block w-fit mt-1 sm:mt-0"
                >
                  {_formatKind(tnx.kind)}
                </span>
              </div>

              <div
                class="flex flex-col sm:flex-row sm:justify-between py-3 border-b border-slate-50 dark:border-slate-700/50"
              >
                <span
                  class="text-sm font-medium text-slate-500 dark:text-slate-400"
                  >{$t("timestamp")}</span
                >
                <span
                  class="text-sm text-slate-800 dark:text-slate-200 mt-1 sm:mt-0"
                  >{_formatTimestamp(tnx.timestamp)}</span
                >
              </div>

              <div
                class="flex flex-col sm:flex-row sm:justify-between py-3 border-b border-slate-50 dark:border-slate-700/50"
              >
                <span
                  class="text-sm font-medium text-slate-500 dark:text-slate-400"
                  >{$t("from")}</span
                >
                <a
                  href={`../account/${tnx.from}?coin_code=${getLedger(coin_code)?.code}`}
                  class="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 break-all mt-1 sm:mt-0"
                >
                  {tnx.from}
                </a>
              </div>

              <div
                class="flex flex-col sm:flex-row sm:justify-between py-3 border-b border-slate-50 dark:border-slate-700/50"
              >
                <span
                  class="text-sm font-medium text-slate-500 dark:text-slate-400"
                  >{$t("to")}</span
                >
                <a
                  href={`../account/${tnx.to}?coin_code=${getLedger(coin_code)?.code}`}
                  class="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 break-all mt-1 sm:mt-0"
                >
                  {tnx.to}
                </a>
              </div>
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
</style>
