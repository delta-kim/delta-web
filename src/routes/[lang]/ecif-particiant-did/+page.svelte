<script lang="ts">
  import type { PageData } from "./$types";
  import { onMount } from "svelte";
  import { Actor, HttpAgent } from "@dfinity/agent";
  import { IDL } from "@dfinity/candid";
  import { createActor as createDelta } from "../../../declarations/delta/index";
  import { ic_host } from "../../../lib/store";
  import { t } from "svelte-i18n";

  export let data: PageData;

  let loading = true;
  let error: string | null = null;

  // Define ICPfunds IDL
  const icpfundsIDL = ({ IDL }: any) => {
    const ECIFDistLog = IDL.Record({
      did: IDL.Text,
      DTCTqty: IDL.Nat,
      timestamp: IDL.Nat,
      index: IDL.Nat,
      reason: IDL.Text,
    });
    return IDL.Service({
      get_transactions: IDL.Func(
        [IDL.Nat, IDL.Nat],
        [
          IDL.Vec(
            IDL.Record({
              soldDTCTqty: IDL.Nat,
              DTCTqty: IDL.Nat,
              addressId: IDL.Text,
              timestamp: IDL.Nat,
              index: IDL.Nat,
              ICPqty: IDL.Nat,
            }),
          ),
        ],
        ["query"],
      ),
      getECIFDistLogs: IDL.Func(
        [IDL.Nat, IDL.Nat],
        [IDL.Vec(ECIFDistLog)],
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

  let participants: any[] = [];
  let selectedParticipant: any = null;

  async function fetchParticipantsBatch() {
    loading = true;
    error = null;
    try {
      const host = $ic_host ?? "https://icp0.io";
      const mainCanisterId = "ojpsk-siaaa-aaaam-adtea-cai";
      const deltaActor = await createDelta(mainCanisterId, {
        agentOptions: { host },
      });

      const canisterMap = await deltaActor.getCanisterIdMap();
      const icpFundsEntry = canisterMap.find(
        ([name]: [string, any]) => name === "ICPfunds",
      );
      let icpFundsId = icpFundsEntry
        ? (icpFundsEntry[1] as any).one || (icpFundsEntry[1] as any).list[0]
        : null;

      if (!icpFundsId) {
        icpFundsId = await deltaActor.getCanisterId({ ICPfunds: null });
      }

      const icpFundsActor = await createICPfundsActor(icpFundsId);

      // Fetch last 10 logs
      const start = 100;
      const count = 10;
      const logs: any = await icpFundsActor.getECIFDistLogs(start, count);
      if (logs && logs.length > 0) {
        participants = logs
          .map((log: any) => ({
            index: log.index.toString(),
            addressId: log.did,
            dtctQty: log.DTCTqty.toString(),
            reason: log.reason,
            timestamp: new Date(Number(log.timestamp) * 1000).toLocaleString(),
          }))
          .reverse();
        selectedParticipant =
          participants[Math.floor(Math.random() * participants.length)];
      }
    } catch (e: any) {
      console.error("Error fetching participants:", e);
      error = e.message || "Failed to fetch participant data";
    } finally {
      loading = false;
    }
  }

  function selectParticipant(p: any) {
    selectedParticipant = p;
  }

  onMount(() => {
    fetchParticipantsBatch();
  });
</script>

<svelte:head>
  <title>{$t("title_prefix")} - CrowdFunding Spotlight</title>
</svelte:head>

<div
  class="min-h-screen bg-[#f8fafc] dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans selection:bg-primary/30 relative overflow-hidden transition-colors duration-300"
>
  <!-- Background Glow -->
  <div class="absolute inset-0 z-0 pointer-events-none">
    <div
      class="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"
    ></div>
    <div
      class="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-secondary/5 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"
    ></div>
  </div>

  <div
    class="container mx-auto px-6 py-20 lg:py-32 flex flex-col items-center justify-center min-h-[85vh] relative z-10"
  >
    <header class="text-center mb-16 max-w-3xl animate-fade-in">
      <h1
        class="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 drop-shadow-sm transition-colors duration-300"
      >
        ECIF Spotlight
      </h1>
      <p
        class="text-lg md:text-xl text-slate-600 dark:text-slate-300 font-light leading-relaxed transition-colors duration-300"
      >
        If you don't have a DID, pick one from below. These DIDs correspond to
        the users who've been rewarded from the ECIF Fund for their exemplary
        contributions to the Delta Ecosystem.
      </p>
    </header>

    {#if loading}
      <div
        class="flex flex-col items-center space-y-6 py-20 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm p-12 rounded-3xl border border-slate-100 dark:border-slate-700/50 shadow-sm w-full max-w-md transition-colors duration-300"
      >
        <div
          class="w-16 h-16 border-4 border-slate-100 dark:border-slate-700/50 border-t-primary rounded-full animate-spin transition-colors duration-300"
        ></div>
        <p
          class="text-slate-500 dark:text-slate-400 font-medium animate-pulse transition-colors duration-300"
        >
          Retrieving ecosystem pioneers...
        </p>
      </div>
      <div
        class="text-center py-16 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-12 rounded-3xl border border-red-100 shadow-sm w-full max-w-md transition-colors duration-300"
      >
        <div
          class="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <p class="text-red-500 text-lg font-medium mb-6">{error}</p>
        <button
          on:click={fetchParticipantsBatch}
          class="px-8 py-3 bg-primary text-white font-bold rounded-full hover:shadow-lg hover:-translate-y-1 transition-all"
        >
          Try Again
        </button>
      </div>
    {:else if selectedParticipant}
      <div class="w-full max-w-3xl perspective-1000">
        <div
          class="relative group bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-[2.5rem] p-8 md:p-12 shadow-xl hover:shadow-2xl transition-all duration-500 animate-float hover:-translate-y-2"
        >
          <div class="relative space-y-10">
            <!-- Header -->
            <div
              class="flex items-center justify-between pb-6 border-b border-slate-100 dark:border-slate-700 transition-colors duration-300"
            >
              <div class="flex items-center gap-3">
                <div
                  class="h-3 w-3 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"
                ></div>
                <span
                  class="text-primary font-bold tracking-widest uppercase text-sm"
                >
                  Log #{selectedParticipant.index}
                </span>
              </div>
              <span
                class="text-slate-400 dark:text-slate-500 text-sm font-medium font-mono bg-slate-50 dark:bg-slate-700/50 px-3 py-1 rounded-full transition-colors duration-300"
              >
                {selectedParticipant.timestamp}
              </span>
            </div>

            <!-- DID Display -->
            <div class="space-y-3">
              <p
                class="text-xs uppercase tracking-widest font-bold text-slate-400 pl-1"
              >
                Participant DID
              </p>
              <div
                class="flex items-center gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-200 group/addr transition-colors relative overflow-hidden"
              >
                <p
                  class="text-lg md:text-xl font-mono text-slate-800 truncate w-full font-semibold"
                  title={selectedParticipant.addressId}
                >
                  {selectedParticipant.addressId}
                </p>
                <button
                  on:click={() =>
                    navigator.clipboard.writeText(
                      selectedParticipant.addressId,
                    )}
                  class="p-3 bg-white hover:bg-primary hover:text-white rounded-xl shadow-sm border border-slate-200 transition-all text-slate-500 flex-shrink-0 group/btn"
                  title="Copy DID"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 group-active/btn:scale-90 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Stats Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div
                class="bg-gradient-to-br from-green-50 to-emerald-50/50 p-6 rounded-3xl border border-green-100/50 group/stat hover:shadow-md transition-all"
              >
                <span
                  class="text-green-700 text-xs font-black uppercase tracking-widest block mb-3"
                  >DTCT Distributed</span
                >
                <div class="flex items-end gap-2 text-green-800">
                  <span class="text-4xl font-black tracking-tight"
                    >{selectedParticipant.dtctQty}</span
                  >
                  <span class="font-bold mb-1 opacity-70">DTCT</span>
                </div>
              </div>

              <div
                class="bg-gradient-to-br from-blue-50 to-indigo-50/50 p-6 rounded-3xl border border-blue-100/50 group/stat hover:shadow-md transition-all"
              >
                <span
                  class="text-blue-700 text-xs font-black uppercase tracking-widest block mb-3"
                  >Distribution Reason</span
                >
                <div class="flex items-center min-h-[44px]">
                  <span class="text-lg font-bold text-blue-900 leading-snug"
                    >{selectedParticipant.reason}</span
                  >
                </div>
              </div>
            </div>

            <!-- Refresh Button -->
            <div
              class="flex items-center justify-center pt-8 border-t border-slate-100"
            >
              <button
                on:click={fetchParticipantsBatch}
                class="group/refresh flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-full font-bold shadow-lg hover:shadow-xl hover:bg-primary hover:-translate-y-1 transition-all duration-300"
              >
                <span>Discover Another Log</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 group-hover/refresh:rotate-180 transition-transform duration-700"
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
      <div
        class="text-center py-20 bg-white/50 backdrop-blur-sm p-12 rounded-3xl border border-slate-100 shadow-sm w-full max-w-md"
      >
        <p class="text-slate-500 text-xl font-medium animate-pulse">
          Searching for the pioneers...
        </p>
      </div>
    {/if}
  </div>
</div>

<style>
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
  .animate-fade-in {
    animation: fadeIn 1s ease-out;
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
