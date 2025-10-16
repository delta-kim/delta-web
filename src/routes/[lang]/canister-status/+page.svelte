<script lang="ts">
  // filepath: /Users/user/Documents/workspace/project/delta-web/src/routes/[lang]/canister-status/+page.svelte
  import { afterNavigate } from "$app/navigation";
  import { onMount } from "svelte";
  import { t } from "svelte-i18n";
  import { ic_host } from "../../../lib/store";

  interface CanisterInfo {
    name: string;
    id: string;
    status?: CanisterStatus;
    loading?: boolean;
    error?: string;
  }

  interface CanisterStatus {
    memory_size: string;
    freezing_threshold: string;
    memory_allocation: string;
    stable_memory_size: string;
    snapshots_size: string;
    wasm_memory_size: string;
    global_memory_size: string;
    cyclesBalance: string;
    timestamp: string;
    interface?: string;
  }

  let canisterIdMap: CanisterInfo[] = [];
  let loading = true;

  afterNavigate(() => {
    window.scrollTo(0, 0);
  });

  async function fetchCanisterStatus(
    canisterId: string
  ): Promise<CanisterStatus | null> {
    try {
      const response = await fetch(
        `/api/delta_canister_status?id=${canisterId}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = (await response.json()) as any;
      console.log("Raw API response:", data);

      // Convert the array format to our expected object format
      // The response is an array of [key, value] pairs
      const statusObj: CanisterStatus = {
        memory_size: data[0]?.[1]?.toString() || "0",
        freezing_threshold: data[1]?.[1]?.toString() || "0",
        memory_allocation: data[2]?.[1]?.toString() || "0",
        stable_memory_size: data[3]?.[1]?.toString() || "0",
        snapshots_size: data[4]?.[1]?.toString() || "0",
        wasm_memory_size: data[5]?.[1]?.toString() || "0",
        global_memory_size: data[6]?.[1]?.toString() || "0",
        cyclesBalance: data[7]?.[1]?.toString() || "0",
        timestamp: new Date(Number(data[8]?.[1]) * 1000).toISOString(),
        interface: `https://dashboard.internetcomputer.org/canister/${canisterId}`,
      };

      console.log("Parsed status object:", statusObj);
      return statusObj;
    } catch (error) {
      console.error(`Error fetching status for canister ${canisterId}:`, error);
      return null;
    }
  }

  function formatBytes(bytes: number): string {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KiB", "MiB", "GiB", "TiB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }

  function formatCycles(cycles: string): string {
    const num = parseFloat(cycles);
    if (num >= 1e12) {
      return (num / 1e12).toFixed(6) + " Trillion";
    } else if (num >= 1e9) {
      return (num / 1e9).toFixed(2) + " Billion";
    } else if (num >= 1e6) {
      return (num / 1e6).toFixed(2) + " Million";
    }
    return cycles;
  }

  onMount(async () => {
    loading = true;
    try {
      // Dynamic import to prevent SSR execution
      const { createActor } = await import("../../../declarations/delta/index");
      // Create an actor for the Delta canister (management canister for app data)
      // Note: this is the Delta contract canister id provided by the product spec
      const deltaCanisterId = "ojpsk-siaaa-aaaam-adtea-cai";
      const host = $ic_host ?? "https://icp0.io";
      const actor = await createActor(deltaCanisterId, {
        agentOptions: { host },
      });

      const idMap = await actor.getCanisterIdMap();
      console.log(idMap);
      if (idMap) {
        canisterIdMap = [];

        // Process each item in the response
        idMap.forEach((item: any) => {
          const name = item[0]; // First element is the name
          const canisterData = item[1]; // Second element contains the canister ID(s)

          if (canisterData.one) {
            // Single canister
            canisterIdMap.push({
              name: name,
              id: canisterData.one,
              loading: true, // Set to loading initially
              error: undefined,
            });
          } else if (canisterData.list && Array.isArray(canisterData.list)) {
            // Multiple canisters
            canisterData.list.forEach((canisterId: string, index: number) => {
              canisterIdMap.push({
                name: `${name} ${index + 1}`,
                id: canisterId,
                loading: true, // Set to loading initially
                error: undefined,
              });
            });
          }
        });

        // Fetch all canister statuses in parallel
        console.log("Fetching statuses for all canisters...");
        const statusPromises = canisterIdMap.map(async (canister) => {
          try {
            const status = await fetchCanisterStatus(canister.id);
            canister.status = status || undefined;
            canister.loading = false;
            if (!status) {
              canister.error = "Failed to fetch canister status";
            }
          } catch (error) {
            console.error(`Error fetching status for ${canister.id}:`, error);
            canister.error = "Failed to fetch canister status";
            canister.loading = false;
          }
        });

        // Wait for all status fetches to complete
        await Promise.all(statusPromises);
        console.log("All canister statuses fetched:", canisterIdMap);
      }
    } catch (e) {
      console.error("Error fetching canister ID map:", e);
    }
    loading = false;
  });
</script>

<svelte:head>
  <title>{$t("title_prefix")} - Canister Status</title>
</svelte:head>

<div class="min-h-screen">
  <div class="container mx-auto px-4 py-8">
    <!-- Header Section -->
    <div class="mb-12 text-center">
      <h1 class="text-3xl font-bold mb-4">A keyless digital money system!</h1>
      <p class="text-lg mb-6">
        Delta is 100% based on the ICP blockchain and is secured by ECDSA
        threshold signature technology.
      </p>
    </div>

    <!-- Canister Status Section -->
    {#if loading}
      <div class="flex items-center justify-center py-12">
        <div class="text-lg">Loading canister information...</div>
      </div>
    {:else if canisterIdMap.length === 0}
      <div class="flex items-center justify-center py-12">
        <div class="text-lg">No canister information available.</div>
      </div>
    {:else}
      <!-- class="space-y-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {#each canisterIdMap as canister (canister.id)}
          <div class="rounded-lg border border-gray-700 overflow-hidden">
            <!-- Canister Header -->
            <div class="w-full p-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <img
                    src="/img/container.png"
                    class="w-10 h-10"
                    alt="Container"
                  />
                  <div>
                    <h3 class="text-xl font-semibold mb-1">
                      {canister.name}
                    </h3>
                    <p class="text-sm break-all">
                      {canister.id}
                    </p>
                  </div>
                </div>
                <div>
                  {#if canister.loading}
                    <i class="fa-solid fa-spinner fa-spin text-gray-400"></i>
                  {:else if canister.error}
                    <i class="fa-solid fa-exclamation-triangle text-red-500"
                    ></i>
                  {:else if canister.status}
                    <i class="fa-solid fa-check-circle text-green-500"></i>
                  {/if}
                </div>
              </div>
            </div>

            <!-- Canister Details (always shown) -->
            <div
              id="canister-details-{canister.id}"
              class="border-t border-gray-700"
            >
              {#if canister.loading}
                <div class="p-4 text-center">
                  <i class="fa-solid fa-spinner fa-spin mr-2"></i>
                  Loading canister status...
                </div>
              {:else if canister.error}
                <div class="p-4 text-center text-red-400">
                  <i class="fa-solid fa-exclamation-triangle mr-2"></i>
                  {canister.error}
                </div>
              {:else if canister.status}
                <div class="p-4 space-y-3">
                  <!-- Memory Size -->
                  <div
                    class="flex items-center justify-between py-2 border-b border-gray-700"
                  >
                    <span class="font-medium">memory_size</span>
                    <span class="text-orange-600"
                      >{formatBytes(
                        parseInt(canister.status.memory_size)
                      )}</span
                    >
                  </div>

                  <!-- Freezing Threshold -->
                  <div
                    class="flex items-center justify-between py-2 border-b border-gray-700"
                  >
                    <span class="font-medium">freezing_threshold</span>
                    <span class="text-orange-600"
                      >{canister.status.freezing_threshold}</span
                    >
                  </div>

                  <!-- Memory Allocation -->
                  <div
                    class="flex items-center justify-between py-2 border-b border-gray-700"
                  >
                    <span class="font-medium">memory_allocation</span>
                    <span class="text-orange-600"
                      >{canister.status.memory_allocation}</span
                    >
                  </div>

                  <!-- Stable Memory Size -->
                  <div
                    class="flex items-center justify-between py-2 border-b border-gray-700"
                  >
                    <span class="font-medium">stable_memory_size</span>
                    <span class="text-orange-600"
                      >{formatBytes(
                        parseInt(canister.status.stable_memory_size)
                      )}</span
                    >
                  </div>

                  <!-- Snapshots Size -->
                  <div
                    class="flex items-center justify-between py-2 border-b border-gray-700"
                  >
                    <span class="font-medium">snapshots_size</span>
                    <span class="text-orange-600"
                      >{canister.status.snapshots_size}</span
                    >
                  </div>

                  <!-- WASM Memory Size -->
                  <div
                    class="flex items-center justify-between py-2 border-b border-gray-700"
                  >
                    <span class="font-medium">wasm_memory_size</span>
                    <span class="text-orange-600"
                      >{formatBytes(
                        parseInt(canister.status.wasm_memory_size)
                      )}</span
                    >
                  </div>

                  <!-- Global Memory Size -->
                  <div
                    class="flex items-center justify-between py-2 border-b border-gray-700"
                  >
                    <span class="font-medium">global_memory_size</span>
                    <span>{canister.status.global_memory_size}</span>
                  </div>

                  <!-- Cycles Balance -->
                  <div
                    class="flex items-center justify-between py-2 border-b border-gray-700"
                  >
                    <span class="font-medium">cyclesBalance</span>
                    <span>{formatCycles(canister.status.cyclesBalance)}</span>
                  </div>

                  <!-- Timestamp -->
                  <div
                    class="flex items-center justify-between py-2 border-b border-gray-700"
                  >
                    <span class="font-medium">timestamp</span>
                    <span>{canister.status.timestamp}</span>
                  </div>

                  <!-- Interface -->
                  {#if canister.status.interface}
                    <div class="flex items-center justify-between py-2">
                      <span class="font-medium">Interface:</span>
                      <a
                        href={canister.status.interface}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="text-blue-400 hover:text-blue-300 underline break-all"
                      >
                        {canister.status.interface.length > 30
                          ? canister.status.interface.substring(0, 30) + "..."
                          : canister.status.interface}
                      </a>
                    </div>
                  {/if}
                </div>
              {/if}
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>
