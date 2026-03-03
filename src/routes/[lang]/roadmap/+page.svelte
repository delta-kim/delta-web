<script lang="ts">
  import { t } from "svelte-i18n";
  import { onMount } from "svelte";
  import { popup } from "@skeletonlabs/skeleton";
  import { createActor } from "../../../declarations/RoadMap/index";
  import { ic_host } from "../../../lib/store";
  import StatusTag from "../../../components/StatusTag.svelte";
  import SEO from "../../../components/SEO.svelte";

  export let data;

  let canisterId = "mgul3-nqaaa-aaaam-adtiq-cai";
  let roadNodes: any[] = [];
  let index2s: number[] = [];
  let max = 0;
  let mod = 0;
  onMount(async () => {
    const actor = await createActor(canisterId, {
      agentOptions: { host: $ic_host },
    });
    roadNodes = await actor.listRoadNodes();
    roadNodes.reverse();
    index2s = new Array(Math.floor(roadNodes.length / 2));
    mod = roadNodes.length % 2;
  });

  function formatDate(bi: BigInt) {
    return new Date(Number(bi) * 1000).toLocaleString();
  }
</script>

<SEO
  title="{$t('title_prefix')} - {$t('roadmap')}"
  description="Tracking our journey as we build a truly decentralized and user-owned ecosystem."
  lang={data.lang}
/>

<div
  class="min-h-screen bg-[#f8fafc] dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-sans selection:bg-primary/30 relative overflow-hidden pb-32 transition-colors duration-300"
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

  <div class="container mx-auto px-6 py-20 lg:py-32 relative z-10 max-w-6xl">
    <header class="text-center mb-24 animate-fade-in">
      <h1
        class="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 drop-shadow-sm transition-colors duration-300"
      >
        {$t("roadmap")}
      </h1>
      <div
        class="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full opacity-80 mb-6"
      ></div>
      <p
        class="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium transition-colors duration-300"
      >
        Tracking our journey as we build a truly decentralized and user-owned
        ecosystem.
      </p>
    </header>

    <div class="roadmap-wrapper space-y-4 md:space-y-0">
      {#each index2s as key, i}
        <div
          class="flex flex-col md:flex-row items-center w-full animate-fade-in"
          style="animation-delay: {i * 0.1}s; animation-fill-mode: both;"
        >
          <!-- LEFT CARD -->
          <div
            class="bg-white dark:bg-slate-800 rounded-[2rem] p-6 md:p-8 shadow-xl border border-slate-100 dark:border-slate-700 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 w-full md:w-1/3 relative z-10 group"
          >
            <h3
              class="text-xl font-bold text-slate-900 dark:text-white mb-4 transition-colors duration-300"
            >
              {roadNodes[i * 2].title}
            </h3>
            <div
              class="text-slate-600 dark:text-slate-300 leading-relaxed h-32 overflow-y-auto no-scrollbar mb-4 text-sm md:text-base transition-colors duration-300"
            >
              {@html roadNodes[i * 2].content}
            </div>
            <div
              class="pt-4 border-t border-slate-50 dark:border-slate-700/50 flex items-center justify-between transition-colors duration-300"
            >
              <button
                class="px-4 py-2 bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-600 rounded-xl transition-colors font-medium text-sm border border-slate-100 dark:border-slate-700/50"
                use:popup={{
                  event: "hover",
                  target: "popupFeatured" + i * 2,
                  placement: "bottom",
                }}
              >
                <StatusTag status={roadNodes[i * 2].status} />
              </button>

              <!-- Popup -->
              <div
                class="bg-white dark:bg-slate-800 rounded-2xl p-4 w-72 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-slate-100 dark:border-slate-700 transition-colors duration-300"
                data-popup={`popupFeatured${i * 2}`}
              >
                <div class="space-y-3">
                  <ul class="space-y-2">
                    {#each roadNodes[i * 2].progressLine as item}
                      <li
                        class="flex flex-row justify-between items-center text-sm border-b border-slate-50 dark:border-slate-700/50 pb-2 last:border-0 last:pb-0 transition-colors duration-300"
                      >
                        <StatusTag status={item[0]} />
                        <span
                          class="text-xs text-slate-500 dark:text-slate-400 font-medium transition-colors duration-300"
                        >
                          {formatDate(item[1])}
                        </span>
                      </li>
                    {/each}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- CONNECTOR X -->
          <div
            class="hidden md:block w-1/3 line-x opacity-40 {i % 2 == 0
              ? 'transform180'
              : ''}"
          ></div>

          <!-- VERTICAL CONNECTOR MOBILE -->
          <div
            class="block md:hidden h-12 w-1 bg-gradient-to-b from-slate-200 to-slate-200 mx-auto my-2"
          ></div>

          <!-- RIGHT CARD -->
          <div
            class="bg-white dark:bg-slate-800 rounded-[2rem] p-6 md:p-8 shadow-xl border border-slate-100 dark:border-slate-700 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 w-full md:w-1/3 relative z-10 group"
          >
            <h3
              class="text-xl font-bold text-slate-900 dark:text-white mb-4 transition-colors duration-300"
            >
              {roadNodes[i * 2 + 1].title}
            </h3>
            <div
              class="text-slate-600 dark:text-slate-300 leading-relaxed h-32 overflow-y-auto no-scrollbar mb-4 text-sm md:text-base transition-colors duration-300"
            >
              {@html roadNodes[i * 2 + 1].content}
            </div>
            <div
              class="pt-4 border-t border-slate-50 flex items-center justify-between"
            >
              <button
                class="px-4 py-2 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors font-medium text-sm border border-slate-100"
                use:popup={{
                  event: "hover",
                  target: `popupFeatured${i * 2 + 1}`,
                  placement: "bottom",
                }}
              >
                <StatusTag status={roadNodes[i * 2 + 1].status} />
              </button>

              <!-- Popup -->
              <div
                class="bg-white rounded-2xl p-4 w-72 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-slate-100"
                data-popup={`popupFeatured${i * 2 + 1}`}
              >
                <div class="space-y-3">
                  <ul class="space-y-2">
                    {#each roadNodes[i * 2 + 1].progressLine as item}
                      <li
                        class="flex flex-row justify-between items-center text-sm border-b border-slate-50 dark:border-slate-700/50 pb-2 last:border-0 last:pb-0 transition-colors duration-300"
                      >
                        <StatusTag status={item[0]} />
                        <span
                          class="text-xs text-slate-500 dark:text-slate-400 font-medium transition-colors duration-300"
                        >
                          {formatDate(item[1])}
                        </span>
                      </li>
                    {/each}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- CONNECTOR Y -->
        <div
          class="hidden md:flex {i % 2
            ? 'flex-row'
            : 'flex-row-reverse'} animate-fade-in"
          style="animation-delay: {i * 0.1 + 0.1}s; animation-fill-mode: both;"
        >
          <div class="flex flex-row justify-center w-1/3" style="height: 6rem">
            <div class="line-y opacity-30"></div>
          </div>
        </div>

        <!-- VERTICAL CONNECTOR MOBILE -->
        <div
          class="block md:hidden h-12 w-1 bg-gradient-to-b from-slate-200 to-slate-200 mx-auto my-2 animate-fade-in"
        ></div>
      {/each}

      {#if mod == 0}
        <div
          class="hidden md:flex {index2s.length - (1 % 2)
            ? 'flex-row'
            : 'flex-row-reverse'} animate-fade-in"
        >
          <div class="flex flex-row justify-center w-1/3" style="height: 6rem">
            <div
              class="bg-white rounded-[2rem] p-4 w-full md:w-1/3 shadow-xl border border-slate-100 flex flex-col items-center justify-center transform hover:scale-105 transition-transform duration-500"
            >
              <img
                alt="launch"
                class="h-16 object-contain mb-3 drop-shadow-md"
                src="/img/launch.png"
              />
              <button
                class="px-6 py-2 bg-gradient-to-r from-primary to-green-600 text-white font-bold rounded-full shadow-lg text-sm"
                >{$t("launch")}</button
              >
            </div>
          </div>
        </div>
        <!-- Mobile Launch -->
        <div
          class="flex md:hidden flex-row justify-center w-full mt-8 animate-fade-in"
        >
          <div
            class="bg-white rounded-[2rem] p-6 w-full max-w-sm shadow-xl border border-slate-100 flex flex-col items-center justify-center"
          >
            <img
              alt="launch"
              class="h-20 object-contain mb-4 drop-shadow-md"
              src="/img/launch.png"
            />
            <button
              class="px-8 py-3 bg-gradient-to-r from-primary to-green-600 text-white font-bold rounded-full shadow-lg w-full"
              >{$t("launch")}</button
            >
          </div>
        </div>
      {:else}
        <div
          class="flex flex-col md:flex-row items-center w-full animate-fade-in"
        >
          <div
            class="bg-white rounded-[2rem] p-6 md:p-8 shadow-xl border border-slate-100 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 w-full md:w-1/3 relative z-10 group"
          >
            <h3 class="text-xl font-bold text-slate-900 mb-4">
              {roadNodes[roadNodes.length - 1].title}
            </h3>
            <div
              class="text-slate-600 leading-relaxed h-32 overflow-y-auto no-scrollbar mb-4 text-sm md:text-base"
            >
              {@html roadNodes[roadNodes.length - 1].content}
            </div>
            <div
              class="pt-4 border-t border-slate-50 flex items-center justify-between"
            >
              <button
                class="px-4 py-2 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors font-medium text-sm border border-slate-100"
                use:popup={{
                  event: "hover",
                  target: "popupFeatured" + roadNodes.length,
                  placement: "bottom",
                }}
              >
                <StatusTag status={roadNodes[roadNodes.length - 1].status} />
              </button>

              <!-- Popup -->
              <div
                class="bg-white rounded-2xl p-4 w-72 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-slate-100"
                data-popup={`popupFeatured${roadNodes.length}`}
              >
                <div class="space-y-3">
                  <ul class="space-y-2">
                    {#each roadNodes[roadNodes.length - 1].progressLine as item}
                      <li
                        class="flex flex-row justify-between items-center text-sm border-b border-slate-50 dark:border-slate-700/50 pb-2 last:border-0 last:pb-0 transition-colors duration-300"
                      >
                        <StatusTag status={item[0]} />
                        <span
                          class="text-xs text-slate-500 dark:text-slate-400 font-medium transition-colors duration-300"
                        >
                          {formatDate(item[1])}
                        </span>
                      </li>
                    {/each}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div
            class="hidden md:block w-1/3 line-x opacity-40 {0 % 2 == 0
              ? 'transform180'
              : ''}"
          ></div>

          <div
            class="block md:hidden h-12 w-1 bg-gradient-to-b from-slate-200 to-slate-200 mx-auto my-4"
          ></div>

          <div
            class="bg-white rounded-[2rem] p-6 md:p-8 shadow-xl border border-slate-100 flex flex-col items-center justify-center transform hover:scale-105 transition-transform duration-500 w-full md:w-1/3"
          >
            <img
              alt="launch"
              class="h-24 object-contain mb-4 drop-shadow-md"
              src="/img/launch.png"
            />
            <button
              class="px-8 py-3 bg-gradient-to-r from-primary to-green-600 text-white font-bold rounded-full shadow-lg w-full"
              >{$t("launch")}</button
            >
          </div>
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  .line-x {
    height: 2rem;
    background-image: url(/img/progress_arrow.png);
    background-repeat: repeat-x;
    background-position: center;
    filter: grayscale(100%) opacity(0.3);
  }

  .transform180 {
    transform: rotate(180deg);
  }

  .line-y {
    width: 2rem;
    height: 100%;
    background-image: url(/img/progress_arrow1.png);
    background-repeat: repeat-y;
    background-position: center;
    filter: grayscale(100%) opacity(0.3);
  }

  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }

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
  .animate-fade-in {
    animation: fadeIn 0.8s ease-out;
  }
</style>
