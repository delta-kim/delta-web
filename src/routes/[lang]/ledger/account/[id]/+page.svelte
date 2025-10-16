<script lang="ts">
  import { t, locale } from "svelte-i18n";
  import type { PageData } from "./$types";
  import type { Transaction } from "../../../../../declarations/Ledgers/Ledgers.did";
  import type { LedgerInitArgs } from "../../../../../declarations/MultiChainWallet/MultiChainWallet.did";
  import { onDestroy, onMount } from "svelte";
  import { createActor as createDelta } from "../../../../../declarations/delta/index";
  import { createActor as createLedgers } from "../../../../../declarations/Ledgers/index";
  import { createActor as createMCWallet } from "../../../../../declarations/MultiChainWallet/index";
  import { ic_host } from "../../../../../lib/store";
  import { get } from "svelte/store";
  import { page } from "$app/stores";
  import { TabAnchor } from "@skeletonlabs/skeleton";

  let transactions: Transaction[] = [];
  let ledgers: LedgerInitArgs[] = [];
  let loading = true;
  let coin: string;
  let addressBalance = 0;

  export let data: PageData;

  export let lang = data.lang;
  // Get the transaction id from the route params
  let id: string = get(page).params.id;

  // Get the coin_code from the search params (query string)
  let coin_code: string | undefined =
    get(page).url.searchParams.get("coin_code") ?? undefined;

  const getLedger = (coin_code?: string): LedgerInitArgs | undefined => {
    return ledgers.find((l) => l.code == coin_code) || ledgers.at(1);
  };

  locale.subscribe((_lang) => {
    console.log("locale.subscribe", _lang);
    lang = _lang || "en";
  });
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

  async function _balance_of(address: string, coinCode: string) {
    const host = $ic_host ?? "https://icp0.io";
    const mainCanisterId = "ojpsk-siaaa-aaaam-adtea-cai";
    const delta = await createDelta(mainCanisterId, { agentOptions: { host } });
    let thisLedgerCanisterId = await delta.getCanisterId({ Ledgers: coinCode });
    const Ledger = await createLedgers(thisLedgerCanisterId, {
      agentOptions: { host },
    });
    const balance = await Ledger.balance_of(address);
    return balance;
  }

  async function getBalance() {
    const balance = await _balance_of(id, coin_code ?? coin);
    addressBalance = Number(balance);
  }

  // Subscribe to $page store to track changes to params and query
  const unsubscribe = page.subscribe(($page) => {
    id = $page.params.id;
    coin_code = $page.url.searchParams.get("coin_code") ?? undefined;
  });

  onDestroy(unsubscribe);

  $: if (id) {
    loadData();
  }
  async function loadData() {
    loading = true;
    addressBalance = 0;
    const { transactions: tnx, ledgerArgsList } =
      await _fetchLedgerTransactions(
        [{ All: id }],
        Number.MAX_SAFE_INTEGER,
        100,
        {
          coinCode: coin_code,
        }
      );
    const balance = await _balance_of(id, coin_code ?? coin);
    addressBalance = Number(balance);
    ledgers = ledgerArgsList;
    transactions = tnx;
    loading = false;

    getBalance();
  }
</script>

<svelte:head>
  <title>{$t("title_prefix")} - {$t("explore")}</title>
</svelte:head>
<div
  class="container mx-auto h-full flex flex-col justify-center items-center pb-10"
>
  <div class="gap-4 w-full md:w-[50vw] my-10 px-2">
    <div class="bg-white w-full rounded-lg pb-10">
      <h1 class="border-b border-slate-400 px-4 py-3">Account</h1>
      <div class="text-[14px] text-slate-500">
        <div
          class="flex justify-between border-b border-slate-400 text-md font-[400] py-2 px-4 gap-4"
        >
          <p class="flex-2 font-bold text-black">Address</p>
          <p class="break-all max-w-full">
            {id}
            <button
              type="button"
              class="ml-1 bg-green-700 py-0 p-1 text-white rounded-md cursor-pointer"
              on:click={() => {
                navigator.clipboard.writeText(id);
                alert("Address copied");
              }}>Copy</button
            >
          </p>
        </div>
        <div
          class="flex justify-between items-center border-b border-slate-400 text-md font-[400] py-2 px-4"
        >
          <p class="flex-2 font-bold text-black">Balance</p>
          <p>
            {_formatCryptoAmount(
              addressBalance,
              Number(getLedger(coin_code)?.decimals ?? 8)
            )}{coin_code}
          </p>
        </div>
      </div>
    </div>
  </div>
  {#if loading}
    <p>Loading...</p>
  {:else}
    <div class="gap-4 w-full lg:w-[70vw] px-2">
      <div class="bg-white w-full rounded-lg pb-10">
        <div class="flex border-b border-slate-400 px-4 py-3 justify-between">
          <h1>Transactions</h1>
          <select
            bind:value={coin}
            on:change={async (e) => {
              loading = true;
              getBalance();
              coin = coin;
              coin_code = coin;
              const { transactions: tnx, ledgerArgsList } =
                await _fetchLedgerTransactions(
                  [{ All: id }],
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
                  <th> TxID </th>
                </tr>
              </thead>
              <tbody>
                {#each transactions as tnx}
                  <tr>
                    <td>
                      <p>{tnx?.id}</p>
                    </td>
                    <td
                      ><TabAnchor
                        href={`./${tnx.from}?coin_code=${getLedger(coin_code)?.code}`}
                        class="text-blue-600">{_clipString(tnx.from)}</TabAnchor
                      ></td
                    >
                    <td
                      ><TabAnchor
                        href={`./${tnx.to}?coin_code=${getLedger(coin_code)?.code}`}
                        class="text-blue-600">{_clipString(tnx.to)}</TabAnchor
                      ></td
                    >
                    <td> <p>{_formatKind(tnx.kind)}</p> </td>
                    <td>
                      <p>
                        {_formatCryptoAmount(
                          tnx.amount,
                          Number(getLedger(coin_code)?.decimals ?? 8)
                        )}{getLedger(coin_code)?.code}
                      </p>
                    </td>
                    <td>
                      <p>
                        {_formatCryptoAmount(
                          tnx.fee,
                          Number(getLedger(coin_code)?.decimals ?? 8)
                        )}{getLedger(coin_code)?.code}
                      </p>
                    </td>
                    <td> <p>{_formatTimestamp(tnx.timestamp)}</p> </td>
                    <td
                      >{#if tnx?.txId != ""}
                        <TabAnchor
                          href={`../tx/${tnx.txId}?coin_code=${getLedger(coin_code)?.code}`}
                          class="text-blue-600 text-left"
                          >{_clipString(tnx?.txId)}</TabAnchor
                        >{:else}<p>N//A</p>{/if}
                    </td>
                  </tr>{/each}
              </tbody>
            </table>
          </div>
        {:else}
          <p>No transactions found</p>{/if}
      </div>
    </div>
  {/if}
</div>

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
