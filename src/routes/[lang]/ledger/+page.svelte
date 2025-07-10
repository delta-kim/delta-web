<script lang="ts">
  import { onMount } from "svelte";
  import {
    _clipString,
    _fetchLedgerTransactions,
    _formatCryptoAmount,
    _formatTimestamp,
  } from "./+page";
  import { t, locale } from "svelte-i18n";
  import type { PageData } from "./$types";
  import { TabAnchor } from "@skeletonlabs/skeleton";
  import type { Transaction } from "../../../declarations/Ledgers/Ledgers.did";
  import type { LedgerInitArgs } from "../../../declarations/delta/delta.did";

  let transactions: Transaction[] = [];
  let ledgers: LedgerInitArgs[] = [];
  let loading = true;
  const COIN_CODE = "BNB";

  export let data: PageData;

  export let lang = data.lang;

  const getLedger = (coin_code?: string): LedgerInitArgs | undefined => {
    return ledgers.find((l) => l.code == coin_code) || ledgers.at(1);
  };
  locale.subscribe((_lang) => {
    console.log("locale.subscribe", _lang);
    lang = _lang || "en";
  });

  onMount(async () => {
    loading = true;
    // Example usage: filter by From address
    const { transactions: tnx, ledgerArgsList } =
      await _fetchLedgerTransactions([], Number.MAX_SAFE_INTEGER, 10, {
        coinCode: undefined,
      });
    ledgers = ledgerArgsList;
    transactions = tnx;
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
      >
        <input
          class="w-[90%] rounded-full border-none bg-transparent px-4"
          placeholder="Search by Address / Hash"
        />
        <button class="bg-black px-5 rounded-full text-white">Search</button>
      </form>
    </div>
    <div
      class="bg-white shadow-xl rounded-md lg:rounded-3xl flex flex-wrap justify-center my-5 lg:my-10 w-full lg:w-[80vw]"
    >
      <div class="flex justify-between px-4 py-3 w-full">
        <h1>Ledgers</h1>
        <p>
          Total: {ledgers.length}
        </p>
      </div>
      {#each ledgers as app}
        <div
          class="border border-slate-400 p-2 lg:p-5 rounded-md lg:rounded-3xl w-full lg:w-[33%]"
        >
          <div class="flex">
            <figure
              class="mr-2 flex-none text-md bg-slate-200 rounded-lg w-10 h-10 flex items-center justify-center"
            >
              {#if app.symbol != ""}
                {@html app.symbol}
              {:else}
                {@html app.code}{/if}
            </figure>
            <div>
              <p class="text-sm font-[500]">
                <b>Ledger Name:</b>
                {@html app.name}
              </p>
              <p class="text-sm font-[500]">
                <b>Ledger Code:</b>
                {@html app.code}
              </p>
              <p class="text-sm font-[500]">
                <b>Ledger Symbol:</b>
                {#if app.symbol != ""}
                  {@html app.symbol}
                {:else}
                  N/A{/if}
              </p>
              <p class="text-sm font-[500]">
                <b>Ledger Decimal:</b>
                {@html app.decimals}
              </p>
              <p class="text-sm font-[500]">
                <b>Ledger Website:</b>
                <a href={app.web} target="_blank">
                  {@html app.web}
                </a>
              </p>
            </div>
          </div>
        </div>
      {/each}
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
      <div class="bg-white w-full rounded-lg">
        <div class="flex justify-between border-b border-slate-400 px-4 py-3">
          <h1>Transactions</h1>
          <p>
            <TabAnchor href="./ledger/tx" class="text-blue-600"
              >View All Transaction</TabAnchor
            >
          </p>
        </div>
       {#if transactions.length > 0}
          <div class="w-full overflow-scroll">
            <table class="w-full">
              <thead>
                <tr>
                  <th> ID </th>
                  <th> From </th>
                  <th> To </th>
                  <th> Chain </th>
                  <th> Amount </th>
                  <th> Fee </th>
                  <th> Timestamp </th>
                </tr>
              </thead>
              <tbody>
                {#each transactions as tnx}
                  <tr>
                    <td>
                      <TabAnchor
                        href={`./ledger/tx/${tnx.txId}?coin_code=${getLedger()?.code}`}
                        class="text-blue-600">{_clipString(tnx.txId)}</TabAnchor
                      >
                    </td>
                    <td
                      ><TabAnchor
                        href={`./ledger/account/${tnx.from}?coin_code=${getLedger()?.code}`}
                        class="text-blue-600">{_clipString(tnx.from)}</TabAnchor
                      ></td
                    >
                    <td
                      ><TabAnchor
                        href={`./ledger/account/${tnx.to}?coin_code=${getLedger()?.code}`}
                        class="text-blue-600">{_clipString(tnx.to)}</TabAnchor
                      ></td
                    >
                    <td> <p>{JSON.stringify(tnx.kind)}</p> </td>
                    <td>
                      <p>
                        {_formatCryptoAmount(
                          tnx.amount,
                          Number(getLedger()?.decimals ?? 8)
                        )}{getLedger()?.code}
                      </p>
                    </td>
                    <td>
                      <p>
                        {_formatCryptoAmount(
                          tnx.fee,
                          Number(getLedger()?.decimals ?? 8)
                        )}{getLedger()?.code}
                      </p>
                    </td>
                    <td> <p>{_formatTimestamp(tnx.timestamp)}</p> </td>
                  </tr>{/each}
              </tbody>
            </table>
          </div>
        {:else}
          <p>No transactions found</p>{/if}
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
