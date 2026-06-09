<script lang="ts">
  import { t, locale } from "svelte-i18n";
  import { onMount } from "svelte";
  import { createActor as createStatsActor } from "../../../declarations/stats/index";
  import { createActor as createDeltaActor } from "../../../declarations/delta/index";
  import { ic_host } from "../../../lib/store";
  import SEO from "../../../components/SEO.svelte";

  export let data;
  let lang = data.lang;
  locale.subscribe((_lang) => {
    lang = _lang || "en";
  });

  // Canister communication state
  let statsCanisterId = "";
  let statsActor: any = null;
  let loading = true;
  let errorMsg = "";

  // Team member lists
  let members: any[] = [];
  let groups: string[] = ["All"];
  let selectedGroup = "All";

  // Expanded bio details & helper
  let expandedMembers: Record<string, boolean> = {};

  function toggleExpand(id: string) {
    expandedMembers[id] = !expandedMembers[id];
    expandedMembers = expandedMembers;
  }

  function isValidPhoto(photo: string): boolean {
    if (!photo) return false;
    const norm = photo.trim();
    return (
      norm.startsWith("http://") ||
      norm.startsWith("https://") ||
      norm.startsWith("data:image/")
    );
  }

  // Initialize Stats canister actor
  async function initStatsActor() {
    try {
      const mainCanisterId = "ojpsk-siaaa-aaaam-adtea-cai";
      const host = $ic_host ?? "https://icp0.io";
      const deltaActor = await createDeltaActor(mainCanisterId, {
        agentOptions: { host },
      });
      statsCanisterId = await deltaActor.getCanisterId({ stats: null });
      console.log("Stats Canister ID resolved:", statsCanisterId);

      statsActor = await createStatsActor(statsCanisterId, {
        agentOptions: { host },
      });
    } catch (e) {
      console.error("Error initializing stats actor:", e);
      errorMsg =
        "Failed to connect to the stats canister. Please verify your connection.";
    }
  }

  // Unified canister function call helper
  async function callStats(method: string, ...args: any[]) {
    // 1. Try to invoke via window.ic.Stats.exec if running in-app
    if (
      typeof window !== "undefined" &&
      (window as any).ic &&
      (window as any).ic.Stats &&
      typeof (window as any).ic.Stats.exec === "function"
    ) {
      console.log(`Invoking window.ic.Stats.exec("${method}", ...)`);
      return await (window as any).ic.Stats.exec(method, ...args);
    }

    // 2. Fallback to standard actor
    if (!statsActor) {
      await initStatsActor();
    }
    if (statsActor && typeof statsActor[method] === "function") {
      console.log(`Invoking fallback statsActor["${method}"](...)`);
      return await statsActor[method](...args);
    }
    throw new Error("Stats canister interface is unavailable.");
  }

  // Load members and categories
  async function fetchMembers() {
    loading = true;
    errorMsg = "";
    try {
      // Fetch member list
      const list = await callStats("listCoreMember");
      console.log("Fetched core members:", list);
      if (list) {
        members = list.map((m: any) => ({
          id: m.id,
          name: m.name,
          title: m.title,
          detail: m.detail,
          group: Array.isArray(m.group) ? m.group : [],
          photo: m.photo || "",
          pages: Array.isArray(m.pages) ? m.pages : [],
        }));
      }

      // Extract unique groups
      const extractedGroups = new Set<string>();
      members.forEach((m) => {
        m.group.forEach((g: string) => {
          if (g.trim()) extractedGroups.add(g.trim());
        });
      });
      groups = ["All", ...Array.from(extractedGroups)];
    } catch (e: any) {
      console.error("Error loading team members:", e);
      errorMsg = e.message || "Failed to load core team members.";
    } finally {
      loading = false;
    }
  }

  // Social Icon Matcher
  function getSocialIcon(label: string) {
    const norm = label.toLowerCase().trim();
    if (norm.includes("twitter") || norm.includes("x.com"))
      return "fa-brands fa-x-twitter";
    if (norm.includes("github")) return "fa-brands fa-github";
    if (norm.includes("linkedin")) return "fa-brands fa-linkedin";
    if (
      norm.includes("web") ||
      norm.includes("website") ||
      norm.includes("site")
    )
      return "fa-solid fa-globe";
    return "fa-solid fa-link";
  }

  // Filter members based on selected group tag
  $: filteredMembers =
    selectedGroup === "All"
      ? members
      : members.filter((m) => m.group.includes(selectedGroup));

  onMount(async () => {
    await initStatsActor();
    await fetchMembers();
  });
</script>

<SEO
  title="{$t('title_prefix')} - {$t('about')}"
  description="Meet the Delta Core Team and learn about our mission to democratize digital currency through keyless threshold cryptographic systems."
  {lang}
/>

<div
  class="min-h-screen bg-[#f8fafc] dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-sans selection:bg-primary/30 relative overflow-hidden pb-32 transition-colors duration-300"
>
  <!-- Background Glow Rings -->
  <div class="absolute inset-0 z-0 pointer-events-none">
    <div
      class="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"
    ></div>
    <div
      class="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-secondary/5 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"
    ></div>
  </div>

  <div class="container mx-auto px-4 md:px-6 py-10 relative z-10 max-w-7xl">
    <!-- Landing Page Header -->
    <header class="text-center mb-16 md:mb-24 animate-fade-in">
      <h1
        class="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 drop-shadow-sm transition-colors duration-300"
      >
        A keyless digital money system!
      </h1>
      <p
        class="text-lg text-slate-500 dark:text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed transition-colors duration-300"
      >
        Delta is building a keyless, energy-light, and community-owned
        decentralized digital money ecosystem for all mankind.
      </p>
    </header>

    <!-- Key Ecosystem Stats (Pi Layout Inspiration) -->
    <section
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 animate-fade-in"
    >
      <div
        class="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-lg border border-slate-100 dark:border-slate-700/50 hover:-translate-y-1 transition-all duration-300"
      >
        <div
          class="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-4 text-2xl font-bold"
        >
          <i class="fa-solid fa-users"></i>
        </div>
        <h4 class="text-xl font-extrabold text-slate-950 dark:text-white mb-2">
          500k+ Members
        </h4>
        <p class="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          An open global community mining and contributing to a utility-driven
          Web3 ecosystem.
        </p>
      </div>

      <div
        class="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-lg border border-slate-100 dark:border-slate-700/50 hover:-translate-y-1 transition-all duration-300"
      >
        <div
          class="w-12 h-12 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center mb-4 text-2xl font-bold"
        >
          <i class="fa-solid fa-mobile-screen-button"></i>
        </div>
        <h4 class="text-xl font-extrabold text-slate-950 dark:text-white mb-2">
          Free Mobile Mining
        </h4>
        <p class="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          Pioneering energy-saving verification algorithms, making
          cryptocurrency creation accessible to anyone.
        </p>
      </div>

      <div
        class="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-lg border border-slate-100 dark:border-slate-700/50 hover:-translate-y-1 transition-all duration-300"
      >
        <div
          class="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-4 text-2xl font-bold"
        >
          <i class="fa-solid fa-microchip"></i>
        </div>
        <h4 class="text-xl font-extrabold text-slate-950 dark:text-white mb-2">
          Keyless Security
        </h4>
        <p class="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          Threshold signature technology on ICP eliminates private key storage,
          passwords, and loss of assets.
        </p>
      </div>

      <div
        class="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-lg border border-slate-100 dark:border-slate-700/50 hover:-translate-y-1 transition-all duration-300"
      >
        <div
          class="w-12 h-12 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center mb-4 text-2xl font-bold"
        >
          <i class="fa-solid fa-network-wired"></i>
        </div>
        <h4 class="text-xl font-extrabold text-slate-950 dark:text-white mb-2">
          100% On-Chain
        </h4>
        <p class="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          Powered completely by Internet Computer smart contracts, securing
          transactions and governance transparently.
        </p>
      </div>
    </section>

    <!-- Who We Are / Core Vision -->
    <section
      class="bg-white dark:bg-slate-800 rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100 dark:border-slate-700 mb-20 animate-fade-in"
    >
      <div class="max-w-3xl mx-auto text-center">
        <h2 class="text-3xl md:text-4xl font-black mb-6">Who We Are</h2>
        <p
          class="text-slate-600 dark:text-slate-300 leading-relaxed text-lg mb-6"
        >
          To bring forth a fairer, more accessible world of cryptocurrency, the
          Delta founders integrated computer science research with real-world
          incentive models. By solving the critical user experience and
          accessibility barriers of traditional crypto—namely private key loss
          and high barrier-to-entry mining—Delta offers an intuitive,
          mobile-first Web3 ecosystem.
        </p>
        <p class="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
          The Delta Core Team brings together specialists in distributed ledger
          technology, human-computer interaction, and decentralization across
          the globe to build and maintain the secure smart contracts powering
          Delta.
        </p>
      </div>
    </section>

    <!-- Core Team Section -->
    <section class="space-y-10">
      <div class="text-center animate-fade-in">
        <h2 class="text-3xl md:text-4xl font-extrabold mb-4">
          Meet the Core Team
        </h2>
        <p class="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Driving technical breakthroughs, community-oriented design, and
          ecosystem growth.
        </p>
      </div>

      <!-- Error / Empty State Messages -->
      {#if errorMsg}
        <div
          class="bg-red-50 dark:bg-red-950/20 text-red-600 p-6 rounded-2xl border border-red-100 dark:border-red-900/50 max-w-md mx-auto text-center"
        >
          <p>{errorMsg}</p>
          <button
            class="mt-4 px-4 py-2 bg-red-100 dark:bg-red-900/40 font-bold rounded-xl text-sm"
            on:click={fetchMembers}
          >
            Retry Connection
          </button>
        </div>
      {/if}

      <!-- Group Category Filters -->
      {#if groups.length > 2}
        <div class="flex justify-center flex-wrap gap-2 animate-fade-in">
          {#each groups as grp}
            <button
              class="px-5 py-2.5 rounded-full font-bold text-sm transition-all {selectedGroup ===
              grp
                ? 'bg-primary text-white shadow-md'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/50'}"
              on:click={() => (selectedGroup = grp)}
            >
              {grp}
            </button>
          {/each}
        </div>
      {/if}

      <!-- Members Listing -->
      {#if loading}
        <!-- Premium Loading Skeleton -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {#each Array(3) as _}
            <div
              class="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-100 dark:border-slate-700 shadow-sm animate-pulse space-y-4"
            >
              <div class="flex items-center gap-4">
                <div
                  class="w-20 h-20 bg-slate-200 dark:bg-slate-700 rounded-full"
                ></div>
                <div class="flex-1 space-y-2">
                  <div
                    class="h-6 bg-slate-200 dark:bg-slate-700 rounded w-2/3"
                  ></div>
                  <div
                    class="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2"
                  ></div>
                </div>
              </div>
              <div
                class="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full"
              ></div>
              <div
                class="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6"
              ></div>
            </div>
          {/each}
        </div>
      {:else if filteredMembers.length === 0}
        <div
          class="text-center py-16 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700/50 max-w-md mx-auto shadow-sm"
        >
          <div class="text-4xl text-slate-300 mb-3">
            <i class="fa-solid fa-user-group"></i>
          </div>
          <p class="text-slate-500 dark:text-slate-400 font-medium">
            No core team members registered yet.
          </p>
        </div>
      {:else}
        <!-- Grid of Profiles -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {#each filteredMembers as member (member.id.toString())}
            <div
              class="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-lg border border-slate-100 dark:border-slate-700 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative group flex flex-col justify-between"
            >
              <!-- Member Content -->
              <div class="space-y-6">
                <!-- Member Header -->
                <div class="flex items-center gap-5">
                  {#if isValidPhoto(member.photo)}
                    <img
                      src={member.photo}
                      alt={member.name}
                      class="w-16 h-16 rounded-full object-cover shadow-md border-2 border-primary/20"
                    />
                  {:else}
                    <!-- Fallback Silhouette Avatar -->
                    <div
                      class="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shadow-md border-2 border-primary/20 overflow-hidden"
                    >
                      <svg
                        class="w-14 h-14 text-slate-400 dark:text-slate-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </div>
                  {/if}
                  <div>
                    <h3
                      class="text-xl font-extrabold text-slate-900 dark:text-white leading-tight"
                    >
                      {member.name}
                    </h3>
                    <p class="text-sm font-semibold text-primary mt-1">
                      {member.title}
                    </p>
                  </div>
                </div>

                <!-- Group Tag Badges -->
                {#if member.group && member.group.length > 0}
                  <div class="flex flex-wrap gap-1.5">
                    {#each member.group as tag}
                      <span
                        class="px-2.5 py-0.5 bg-slate-50 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400 font-bold text-[10px] uppercase tracking-wider rounded-md border border-slate-100 dark:border-slate-700/30"
                      >
                        {tag}
                      </span>
                    {/each}
                  </div>
                {/if}

                <!-- Member Description -->
                <p
                  class="text-slate-600 dark:text-slate-300 text-sm leading-relaxed font-normal"
                >
                  {#if member.detail.length > 180}
                    {#if expandedMembers[member.id.toString()]}
                      <span class="mr-1">{member.detail}</span>
                      <button
                        on:click={() => toggleExpand(member.id.toString())}
                        class="text-primary hover:underline font-semibold focus:outline-none focus:ring-0"
                      >
                        Read less
                      </button>
                    {:else}
                      <span class="mr-1">{member.detail.slice(0, 180)}...</span>
                      <button
                        on:click={() => toggleExpand(member.id.toString())}
                        class="text-primary hover:underline font-semibold focus:outline-none focus:ring-0"
                      >
                        Read more
                      </button>
                    {/if}
                  {:else}
                    {member.detail}
                  {/if}
                </p>
              </div>

              <!-- Social Links (Footer of Card) -->
              {#if member.pages && member.pages.length > 0}
                <div
                  class="pt-6 mt-6 border-t border-slate-50 dark:border-slate-700/50 flex items-center gap-3"
                >
                  {#each member.pages as [label, url]}
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-700/50 hover:bg-primary hover:text-white text-slate-500 dark:text-slate-400 flex items-center justify-center text-sm transition-all"
                      title={label}
                    >
                      <i class={getSocialIcon(label)}></i>
                    </a>
                  {/each}
                </div>
              {/if}
            </div>
          {/each}
        </div>
      {/if}
    </section>
  </div>
</div>

<style>
  /* Standard styles and matching animations */
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
    animation: blob 8s infinite ease-in-out;
  }
  .animation-delay-2000 {
    animation-delay: 2s;
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(15px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .animate-fade-in {
    animation: fadeIn 0.8s ease-out both;
  }
</style>
