<script lang="ts">
    import { t, locale } from "svelte-i18n";
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import { createActor as createDelta } from "../../../../declarations/delta/index";
    import { createActor as createLedgers } from "../../../../declarations/Ledgers/index";
    import { createActor as createMCWallet } from "../../../../declarations/MultiChainWallet/index";
    import { ic_host } from "../../../../lib/store";
    import type { LedgerInitArgs } from "../../../../declarations/MultiChainWallet/MultiChainWallet.did";
    import type { Transaction } from "../../../../declarations/Ledgers/Ledgers.did";

    export let data;
    export let lang = data.lang;

    let query = "";
    let loading = false;
    let results: {
        ledger: LedgerInitArgs;
        type: "tx" | "account";
        id: string;
        details?: any;
    }[] = [];
    let searched = false;

    locale.subscribe((_lang) => {
        lang = _lang || "en";
    });

    // Utilities
    function _clipString(str: string): string {
        if (!str || str.length <= 12) return str;
        return `${str.slice(0, 6)}...${str.slice(str.length - 6)}`;
    }

    async function search(q: string) {
        if (!q) return;
        loading = true;
        results = [];
        searched = true;

        const host = $ic_host ?? "https://icp0.io";
        const mainCanisterId = "ojpsk-siaaa-aaaam-adtea-cai";
        const mcwCanisterId = "o3jft-6yaaa-aaaam-adtha-cai";

        try {
            const delta = await createDelta(mainCanisterId, {
                agentOptions: { host },
            });
            const mcWallet = await createMCWallet(mcwCanisterId, {
                agentOptions: { host },
            });

            let ledgerArgsList = await mcWallet.listLedgerInitArgs();

            // Parallelize search across ledgers
            const promises = ledgerArgsList.map(async (ledger) => {
                try {
                    let thisLedgerCanisterId = await delta.getCanisterId({
                        Ledgers: ledger.code,
                    });

                    const Ledger = await createLedgers(thisLedgerCanisterId, {
                        agentOptions: { host },
                    });

                    // Check for Transaction
                    try {
                        const tnx = await Ledger.listTransaction(
                            [{ TxId: q }],
                            BigInt(0),
                            BigInt(1),
                        );
                        if (tnx.length > 0) {
                            results = [
                                ...results,
                                {
                                    ledger,
                                    type: "tx",
                                    id: tnx[0].txId,
                                    details: tnx[0],
                                },
                            ];
                        }
                    } catch (e) {
                        // Ignore error (likely not a TxId format or not found)
                    }

                    // Check for Account (Balance)
                    try {
                        const balance = await Ledger.balance_of(q);
                        // If it doesn't trap, it's a valid address
                        results = [
                            ...results,
                            {
                                ledger,
                                type: "account",
                                id: q,
                                details: balance,
                            },
                        ];
                    } catch (e) {
                        // Ignore error (likely not an address format)
                    }
                } catch (e) {
                    console.error(`Error searching ledger ${ledger.code}:`, e);
                }
            });

            await Promise.all(promises);
        } catch (error) {
            console.error("Search error:", error);
        } finally {
            loading = false;
        }
    }

    $: {
        const q = $page.url.searchParams.get("q");
        if (q && q !== query) {
            query = q;
            search(query);
        }
    }
</script>

<svelte:head>
    <title>{$t("title_prefix")} - Search</title>
</svelte:head>

<div class="container mx-auto min-h-screen pb-10 px-4">
    <div class="max-w-4xl mx-auto mt-10">
        <h1 class="text-3xl font-bold text-slate-800 mb-6">Search Results</h1>

        <!-- Search Bar -->
        <form
            class="w-full flex justify-between bg-white border border-slate-200 rounded-full p-1 mb-10 shadow-sm"
            on:submit|preventDefault={() => {
                const url = new URL(window.location.href);
                url.searchParams.set("q", query);
                window.location.href = url.toString();
            }}
        >
            <input
                class="w-full rounded-full border-none bg-transparent px-6 py-2 focus:ring-0 text-slate-800 placeholder-slate-400"
                placeholder="Search by Address / Hash"
                bind:value={query}
            />
            <button
                class="bg-black px-8 rounded-full text-white font-medium hover:bg-slate-800 transition-colors"
            >
                Search
            </button>
        </form>

        {#if loading}
            <div class="flex justify-center py-20">
                <div
                    class="animate-spin rounded-full h-10 w-10 border-b-2 border-slate-800"
                ></div>
            </div>
        {:else if searched}
            {#if results.length > 0}
                <div class="space-y-6">
                    {#each results as result}
                        <div
                            class="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-shadow"
                        >
                            <div class="flex items-start justify-between">
                                <div class="flex items-center gap-4">
                                    <figure
                                        class="flex-none text-xl bg-slate-50 rounded-xl w-12 h-12 flex items-center justify-center border border-slate-100"
                                    >
                                        {#if result.ledger.symbol != ""}
                                            {@html result.ledger.symbol}
                                        {:else}
                                            {@html result.ledger.code}
                                        {/if}
                                    </figure>
                                    <div>
                                        <h3
                                            class="text-lg font-bold text-slate-800"
                                        >
                                            {result.ledger.name}
                                        </h3>
                                        <span
                                            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800"
                                        >
                                            {result.type === "tx"
                                                ? "Transaction"
                                                : "Account"}
                                        </span>
                                    </div>
                                </div>
                                <a
                                    href={result.type === "tx"
                                        ? `../ledger/tx/${result.id}?coin_code=${result.ledger.code}`
                                        : `../ledger/account/${result.id}?coin_code=${result.ledger.code}`}
                                    class="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center gap-1"
                                >
                                    View Details
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
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </a>
                            </div>
                            <div class="mt-4 pl-16">
                                <p
                                    class="text-sm text-slate-500 font-mono break-all"
                                >
                                    {result.id}
                                </p>
                            </div>
                        </div>
                    {/each}
                </div>
            {:else}
                <div
                    class="text-center py-20 bg-slate-50 rounded-3xl border border-slate-100"
                >
                    <p class="text-slate-500 text-lg">
                        No results found for "{query}"
                    </p>
                </div>
            {/if}
        {/if}
    </div>
</div>
