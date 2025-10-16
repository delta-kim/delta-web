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

  export let data: PageData;

  export let lang = data.lang;

  // Utility functions
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
    { coinCode }: { coinCode?: string }
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
      limit
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
                <b>Name:</b>
                {@html app.name}
              </p>
              <p class="text-sm font-[500]">
                <b>Code:</b>
                {@html app.code}
              </p>
              <p class="text-sm font-[500]">
                <b>Symbol:</b>
                {#if app.symbol != ""}
                  {@html app.symbol}
                {:else}
                  N/A{/if}
              </p>
              <p class="text-sm font-[500]">
                <b>Decimal:</b>
                {@html app.decimals}
              </p>
              <p class="text-sm font-[500]">
                <b>Website:</b>
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
                    <td> <p>{_formatKind(tnx.kind)}</p> </td>
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
                    <td>
                      {#if tnx?.txId != ""}
                        <TabAnchor
                          href={`./ledger/tx/${tnx.txId}?coin_code=${getLedger()?.code}`}
                          class="text-blue-600"
                          >{_clipString(tnx?.txId)}</TabAnchor
                        >
                      {:else}
                        <p>N/A</p>
                      {/if}
                    </td>
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
