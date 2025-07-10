<script lang="ts">
  import { t, locale } from "svelte-i18n";
  import { TabAnchor } from "@skeletonlabs/skeleton";
  import type { PageData } from "../../$types";
  import type { Transaction } from "../../../../../declarations/Ledgers/Ledgers.did";
  import type { LedgerInitArgs } from "../../../../../declarations/MultiChainWallet/MultiChainWallet.did";
  import { onMount } from "svelte";
  import {
    _clipString,
    _fetchLedgerTransactions,
    _formatCryptoAmount,
    _formatTimestamp,
  } from "../../+page";

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
            <p>{_clipString(tnx?.txId)}</p>
          </div>
          <div
            class="flex justify-between lg:items-center border-b border-slate-400 text-md font-[400] py-2 px-4"
          >
            <p class="flex-2 font-bold text-black">Coin Code</p>
            <p>{getLedger()?.code}</p>
          </div>
          <div
            class="flex justify-between items-center border-b border-slate-400 text-md font-[400] py-2 px-4"
          >
            <p class="flex-2 font-bold text-black">Method</p>
            <p>{JSON.stringify(tnx.kind)}</p>
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
                href={`../account/${tnx.from}?coin_code=${getLedger()?.code}`}
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
                href={`../account/${tnx.to}?coin_code=${getLedger()?.code}`}
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
                Number(getLedger()?.decimals ?? 8)
              )}{getLedger()?.code}
            </p>
          </div>
          <div
            class="flex justify-between items-center border-b border-slate-400 text-md font-[400] py-2 px-4"
          >
            <p class="flex-2 font-bold text-black">Fee</p>
            <p>
              {_formatCryptoAmount(
                tnx.fee,
                Number(getLedger()?.decimals ?? 8)
              )}{getLedger()?.code}
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
