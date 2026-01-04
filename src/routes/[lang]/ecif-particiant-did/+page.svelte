<script lang="ts">
  import { onMount } from "svelte";
  import { Actor, HttpAgent } from "@dfinity/agent";
  import { IDL } from "@dfinity/candid";
  import { createActor as createDelta } from "../../../declarations/delta/index";
  import { ic_host } from "../../../lib/store";
  import { t } from "svelte-i18n";
  import type { PageData } from "./$types";

  export let data: PageData;

  let loading = true;
  let participant: any = null;
  let totalParticipants = 0;
  let error: string | null = null;

  // Define ICPfunds IDL
  const icpfundsIDL = ({ IDL }: any) => {
    const Transaction = IDL.Record({
      soldDTCTqty: IDL.Nat,
      DTCTqty: IDL.Nat,
      addressId: IDL.Text,
      timestamp: IDL.Nat,
      index: IDL.Nat,
      ICPqty: IDL.Nat,
    });
    return IDL.Service({
      get_transactions: IDL.Func(
        [IDL.Nat, IDL.Nat],
        [IDL.Vec(Transaction)],
        ["query"],
      ),
      stateInfo: IDL.Func(
        [IDL.Nat],
        [IDL.Nat, IDL.Nat, IDL.Nat, IDL.Nat],
        ["query"],
      ),
    });
  };

  async function createICPfundsActor(canisterId: string) {
    const host = $ic_host ?? "https://icp0.io";
    const agent = new HttpAgent({ host });
    // Fetch root key for local development
    if (host.includes("localhost") || host.includes("127.0.0.1")) {
      await agent.fetchRootKey().catch(null);
    }
    return Actor.createActor(icpfundsIDL, { agent, canisterId });
  }

  async function fetchRandomParticipant() {
    loading = true;
    error = null;
    try {
      const host = $ic_host ?? "https://icp0.io";
      const mainCanisterId = "ojpsk-siaaa-aaaam-adtea-cai";
      const deltaActor = await createDelta(mainCanisterId, {
        agentOptions: { host },
      });

      // Get ICPfunds canister ID from delta
      const canisterMap = await deltaActor.getCanisterIdMap();
      const icpFundsEntry = canisterMap.find(
        ([name]: [string, any]) => name === "ICPfunds",
      );
      let icpFundsId = icpFundsEntry
        ? icpFundsEntry[1].one || icpFundsEntry[1].list[0]
        : null;

      if (!icpFundsId) {
        icpFundsId = await deltaActor.getCanisterId({ ICPfunds: null });
      }

      console.log("Using ICPfunds Canister ID:", icpFundsId);
      const icpFundsActor = await createICPfundsActor(icpFundsId);

      // Get population from delta basic info
      const basicInfo = await deltaActor.basicInfo();
      const population = basicInfo.population;

      // stateInfo returns 4 Nats: [fundedICPAmount, soldDTCTqty, participationTimes, exchangeRate]
      const stateInfo: any = await icpFundsActor.stateInfo(population);
      console.log("State Info:", stateInfo);
      totalParticipants = Number(stateInfo[2]);

      if (totalParticipants > 0) {
        const randomIndex = Math.floor(Math.random() * totalParticipants);
        console.log("totalParticipants:", totalParticipants);
        console.log("Random Index:", randomIndex);
        // get_transactions returns vec TransactionRecord
        const transactions: any = await icpFundsActor.get_transactions(
          randomIndex,
          0,
        );

        if (transactions && transactions.length > 0) {
          const row = transactions[0];
          participant = {
            index: row.index.toString(),
            addressId: row.addressId,
            icpQty: row.ICPqty.toString(),
            dtctQty: row.DTCTqty.toString(),
            exchangeRate: (Number(row.DTCTqty) / Number(row.ICPqty)).toFixed(2),
            timestamp: new Date(Number(row.timestamp) * 1000).toLocaleString(),
          };
        }
      }
    } catch (e: any) {
      console.error("Error fetching participant:", e);
      error = e.message || "Failed to fetch participant data";
    } finally {
      loading = false;
    }
  }

  function clipAddress(addr: string) {
    if (!addr) return "";
    return `${addr.slice(0, 6)}...${addr.slice(-6)}`;
  }

  onMount(() => {
    fetchRandomParticipant();
  });
</script>

<svelte:head>
  <title>{$t("title_prefix")} - CrowdFunding Spotlight</title>
</svelte:head>

<div class="min-h-screen text-white font-sans selection:bg-blue-500/30">
  <div
    class="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[80vh]"
  >
    <header class="text-center mb-12 space-y-4 animate-fade-in">
      <h1
        class="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400"
      >
        CrowdFunding Spotlight
      </h1>
      <p class="text-black text-lg md:text-xl max-w-2xl mx-auto font-medium">
        Acknowledging the incredible work and dedication of our CrowdFunding
        participants. Together, we're building the decentralized future.
      </p>
    </header>

    {#if loading}
      <div class="flex flex-col items-center space-y-4 py-20">
        <div
          class="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"
        ></div>
        <p class="text-blue-400 font-medium animate-pulse">
          Rolling the DID dice...
        </p>
      </div>
    {:else if error}
      <div
        class="bg-red-500/10 border border-red-500/20 p-6 rounded-2xl text-center max-w-md animate-shake"
      >
        <p class="text-red-400 font-semibold mb-4">{error}</p>
        <button
          on:click={fetchRandomParticipant}
          class="px-6 py-2 bg-red-500 hover:bg-red-600 rounded-full transition-colors font-bold"
        >
          Try Again
        </button>
      </div>
    {:else if participant}
      <div class="w-full max-w-2xl perspective-1000">
        <div
          class="relative group bg-black border border-white/10 rounded-[2.5rem] p-8 md:p-14 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] transition-all duration-700 hover:scale-[1.02] hover:border-white/20 animate-float"
        >
          <!-- Premium Glow Effect -->
          <div
            class="absolute -top-12 -left-12 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full group-hover:bg-blue-500/20 transition-all duration-1000"
          ></div>
          <div
            class="absolute -bottom-12 -right-12 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full group-hover:bg-emerald-500/20 transition-all duration-1000"
          ></div>

          <!-- Decorative Gradient Border -->
          <div
            class="absolute inset-0 rounded-[2.5rem] p-[1px] bg-gradient-to-br from-white/20 via-white/5 to-white/20 pointer-events-none"
          >
            <div class="absolute inset-0 bg-black/10 rounded-[2.5rem]"></div>
          </div>

          <div class="relative space-y-10">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div
                  class="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"
                ></div>
                <span
                  class="text-blue-400 text-sm font-bold tracking-[0.2em] uppercase"
                >
                  Participant #{participant.index}
                </span>
              </div>
              <span class="text-slate-500 text-sm font-medium font-mono">
                {participant.timestamp}
              </span>
            </div>

            <div class="space-y-4">
              <label
                class="text-xs uppercase tracking-[0.15em] font-black text-white"
                >DID</label
              >
              <div
                class="flex items-center gap-4 bg-black/5 p-4 rounded-2xl border border-white/5 group/addr hover:bg-black/10 transition-colors font-black"
              >
                <p
                  class="text-xl md:text-2xl font-mono text-emerald-400 truncate w-full"
                  title={participant.addressId}
                >
                  {participant.addressId}
                </p>
                <button
                  on:click={() =>
                    navigator.clipboard.writeText(participant.addressId)}
                  class="p-2 hover:bg-blue-500/20 rounded-xl transition-all text-slate-400 hover:text-blue-400 active:scale-90"
                  title="Copy DID"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
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
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-10">
              <div
                class="bg-gradient-to-br from-white/[0.08] to-transparent p-6 rounded-3xl border border-white/10 hover:border-blue-500/30 transition-colors group/stat"
              >
                <span
                  class="font-black text-white text-xs font-bold uppercase tracking-widest block mb-2"
                  >ICP Contributed</span
                >
                <div class="flex items-end gap-2">
                  <span
                    class="text-3xl font-black text-white group-hover/stat:text-blue-400 transition-colors"
                    >{participant.icpQty}</span
                  >
                  <span class="text-slate-400 font-bold mb-1">ICP</span>
                </div>
              </div>
              <div
                class="bg-gradient-to-br from-white/[0.08] to-transparent p-6 rounded-3xl border border-white/10 hover:border-emerald-500/30 transition-colors group/stat"
              >
                <span
                  class="font-black text-white text-xs font-bold uppercase tracking-widest block mb-2"
                  >DTCT Received</span
                >
                <div class="flex items-end gap-2">
                  <span
                    class="text-3xl font-black text-white group-hover/stat:text-emerald-400 transition-colors"
                    >{participant.dtctQty}</span
                  >
                  <span class="text-slate-400 font-bold mb-1">DTCT</span>
                </div>
              </div>
            </div>

            <div class="flex items-center justify-center pt-10">
              <button
                on:click={fetchRandomParticipant}
                class="group/btn relative px-10 py-5 bg-white text-slate-900 rounded-[2rem] font-black text-lg shadow-[0_20px_40px_-12px_rgba(255,255,255,0.2)] hover:shadow-[0_24px_48px_-12px_rgba(59,130,246,0.3)] hover:bg-blue-500 hover:text-white active:scale-95 transition-all duration-500 flex items-center gap-3 overflow-hidden"
              >
                <!-- Button Inner Glow -->
                <div
                  class="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-white/20 to-blue-400/0 -translate-x-full group-hover/btn:animate-shimmer"
                ></div>

                <span class="relative">Spotlight Another</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 group-hover/btn:rotate-180 transition-transform duration-700 relative"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2.5"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    {:else}
      <div class="text-center py-20">
        <p class="text-slate-500 text-xl font-medium">
          Searching for the pioneers...
        </p>
      </div>
    {/if}

    <footer
      class="mt-20 text-center opacity-40 hover:opacity-100 transition-opacity"
    >
      <p class="text-sm font-mono text-black font-black tracking-tighter">
        TOTAL UNIQUE PARTICIPANTS FOUND: {totalParticipants}
      </p>
    </footer>
  </div>
</div>

<style lang="postcss">
  :global(body) {
    overflow-x: hidden;
  }

  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes shake {
    0%,
    100% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(-5px);
    }
    75% {
      transform: translateX(5px);
    }
  }

  .animate-fade-in {
    animation: fade-in 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  .animate-shake {
    animation: shake 0.5s ease-in-out;
  }

  @keyframes float {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  .animate-float {
    animation: float 6s ease-in-out infinite;
  }

  @keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }

  .animate-shimmer {
    animation: shimmer 1.5s infinite;
  }

  .perspective-1000 {
    perspective: 1000px;
  }
</style>
