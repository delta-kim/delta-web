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
    decimals = 8
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
    { coinCode }: { coinCode?: string }
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
      limit
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
        }
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
    <div class="gap-4 w-full md:w-[50vw] my-10 px-2">
      <div class="bg-white w-full rounded-lg pb-10">
        <h1 class="border-b border-slate-400 px-4 py-3">Transaction</h1>
        <div class="text-[14px] text-slate-500">
          <div
            class="flex justify-between items-center border-b border-slate-400 text-md font-[400] py-2 px-4 flex-wrap"
          >
            <p class="flex-2 font-bold text-black">ID</p>
            <p>{tnx?.id}</p>
          </div>
          <div
            class="flex justify-between items-center border-b border-slate-400 text-md font-[400] py-2 px-4 flex-wrap"
          >
            <p class="flex-2 font-bold text-black">TxID</p>
            <p>{tnx?.txId != "" ? _clipString(tnx?.txId) : "N/A"}</p>
          </div>
          <div
            class="flex justify-between lg:items-center border-b border-slate-400 text-md font-[400] py-2 px-4"
          >
            <p class="flex-2 font-bold text-black">Coin Code</p>
            <p>{getLedger(coin_code)?.code}</p>
          </div>
          <div
            class="flex justify-between items-center border-b border-slate-400 text-md font-[400] py-2 px-4"
          >
            <p class="flex-2 font-bold text-black">Method</p>
            <p>{_formatKind(tnx.kind)}</p>
          </div>
          <div
            class="flex justify-between items-center border-b border-slate-400 text-md font-[400] py-2 px-4"
          >
            <p class="flex-2 font-bold text-black">Timestamp</p>
            <p>{_formatTimestamp(tnx.timestamp)}</p>
          </div>
          <div
            class="flex justify-between items-center border-b border-slate-400 text-md font-[400] py-2 px-4"
          >
            <p class="flex-2 font-bold text-black">From</p>
            <p>
              <TabAnchor
                href={`../account/${tnx.from}?coin_code=${getLedger(coin_code)?.code}`}
                class="text-blue-600">{_clipString(tnx.from)}</TabAnchor
              >
            </p>
          </div>
          <div
            class="flex justify-between items-center border-b border-slate-400 text-md font-[400] py-2 px-4"
          >
            <p class="flex-2 font-bold text-black">To</p>
            <p>
              <TabAnchor
                href={`../account/${tnx.to}?coin_code=${getLedger(coin_code)?.code}`}
                class="text-blue-600">{_clipString(tnx.to)}</TabAnchor
              >
            </p>
          </div>
          <div
            class="flex justify-between items-center border-b border-slate-400 text-md font-[400] py-2 px-4"
          >
            <p class="flex-2 font-bold text-black">Amount</p>
            <p>
              {_formatCryptoAmount(
                tnx.amount,
                Number(getLedger(coin_code)?.decimals ?? 8)
              )}{getLedger(coin_code)?.code}
            </p>
          </div>
          <div
            class="flex justify-between items-center border-b border-slate-400 text-md font-[400] py-2 px-4"
          >
            <p class="flex-2 font-bold text-black">Fee</p>
            <p>
              {_formatCryptoAmount(
                tnx.fee,
                Number(getLedger(coin_code)?.decimals ?? 8)
              )}{getLedger(coin_code)?.code}
            </p>
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
