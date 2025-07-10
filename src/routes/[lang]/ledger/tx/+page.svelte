<script lang="ts">
  import { t, locale } from "svelte-i18n";
  import type { PageData } from "./$types";
  import { onMount } from "svelte";
  import {
    _clipString,
    _fetchLedgerTransactions,
    _formatCryptoAmount,
    _formatTimestamp,
  } from "../+page";

  import { TabAnchor } from "@skeletonlabs/skeleton";
  import type { Transaction } from "../../../../declarations/Ledgers/Ledgers.did";
  import type { LedgerInitArgs } from "../../../../declarations/MultiChainWallet/MultiChainWallet.did";

  let transactions: Transaction[] = [];
  let ledgers: LedgerInitArgs[] = [];
  let loading = true;
  let coin = "BNB";

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
      await _fetchLedgerTransactions([], Number.MAX_SAFE_INTEGER, 100, {
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
    <div class="gap-4 w-full lg:w-[70vw] my-10 px-2">
      <div class="bg-white w-full rounded-lg pb-10">
        <div class="flex border-b border-slate-400 px-4 py-3 justify-between">
          <h1>Transactions</h1>
          <select
            bind:value={coin}
            on:change={async (e) => {
              loading = true;
              const { transactions: tnx, ledgerArgsList } =
                await _fetchLedgerTransactions(
                  [],
                  Number.MAX_SAFE_INTEGER,
                  100,
                  {
                    coinCode: coin,
                  }
                );
              ledgers = ledgerArgsList;
              transactions = tnx;
              loading = false;
            }}
          >
            <option value="BNB">Filter by ledger</option>
            {#each ledgers as app}
              <option value={app.code}>{app.name}({app.code})</option>
            {/each}
          </select>
        </div>
        {#if transactions.length > 0}
          <div class="w-full overflow-scroll">
            <table class="w-full">
              <thead>
                <tr>
                  <th> ID </th>
                  <th> From </th>
                  <th> To </th>
                  <th> Method</th>
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
                        href={`./tx/${tnx.txId}?coin_code=${getLedger()?.code}`}
                        class="text-blue-600">{_clipString(tnx.txId)}</TabAnchor
                      >
                    </td>
                    <td
                      ><TabAnchor
                        href={`./account/${tnx.from}?coin_code=${getLedger()?.code}`}
                        class="text-blue-600">{_clipString(tnx.from)}</TabAnchor
                      ></td
                    >
                    <td
                      ><TabAnchor
                        href={`./account/${tnx.to}?coin_code=${getLedger()?.code}`}
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
