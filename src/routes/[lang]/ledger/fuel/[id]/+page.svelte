<script lang="ts">
  import type { PageData } from "./$types";
  import { t, locale } from "svelte-i18n";

  import { TabAnchor } from "@skeletonlabs/skeleton";

  export let data: PageData;

  export let lang = data.lang;
  locale.subscribe((_lang) => {
    console.log("locale.subscribe", _lang);
    lang = _lang || "en";
  });
</script>

<svelte:head>
  <title>{$t("title_prefix")} - {$t("explore")}</title>
</svelte:head>
<div
  class="min-h-screen bg-[#f8fafc] dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-sans selection:bg-primary/30 relative pb-32 transition-colors duration-300 flex justify-center items-center"
>
  <!-- Background Glow -->
  <div class="absolute inset-0 z-0 pointer-events-none overflow-hidden">
    <div
      class="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"
    ></div>
    <div
      class="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-secondary/5 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"
    ></div>
  </div>

  <div
    class="container mx-auto px-6 relative z-10 max-w-7xl flex flex-col items-center"
  >
    <div class="gap-4 w-full md:w-[50vw] my-10 px-2">
      <div
        class="bg-white dark:bg-slate-800 w-full rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6"
      >
        <h1
          class="text-xl font-bold text-slate-800 dark:text-white mb-6 pb-4 border-b border-slate-100 dark:border-slate-700"
        >
          Fuel Details
        </h1>
        <div class="space-y-0">
          <div
            class="flex justify-between items-center border-b border-slate-50 dark:border-slate-700/50 py-3 px-2"
          >
            <p class="font-bold text-slate-800 dark:text-slate-200">Hash</p>
            <p class="text-sm font-mono text-slate-600 dark:text-slate-400">
              234567809876543456
            </p>
          </div>
          <div
            class="flex justify-between items-center border-b border-slate-50 dark:border-slate-700/50 py-3 px-2"
          >
            <p class="font-bold text-slate-800 dark:text-slate-200">Type</p>
            <p class="text-sm text-slate-600 dark:text-slate-400">Fuel</p>
          </div>
          <div
            class="flex justify-between items-center border-b border-slate-50 dark:border-slate-700/50 py-3 px-2"
          >
            <p class="font-bold text-slate-800 dark:text-slate-200">Status</p>
            <span
              class="px-2 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
              >Completed</span
            >
          </div>
          <div
            class="flex justify-between items-center border-b border-slate-50 dark:border-slate-700/50 py-3 px-2"
          >
            <p class="font-bold text-slate-800 dark:text-slate-200">Index</p>
            <p class="text-sm text-slate-600 dark:text-slate-400">0</p>
          </div>
          <div
            class="flex justify-between items-center border-b border-slate-50 dark:border-slate-700/50 py-3 px-2"
          >
            <p class="font-bold text-slate-800 dark:text-slate-200">
              Timestamp
            </p>
            <p class="text-sm text-slate-600 dark:text-slate-400">
              {new Date().toISOString()}
            </p>
          </div>
          <div
            class="flex justify-between items-center border-b border-slate-50 dark:border-slate-700/50 py-3 px-2"
          >
            <p class="font-bold text-slate-800 dark:text-slate-200">From</p>
            <p>
              <a
                href="./account/123456"
                class="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                >DeltaCoin</a
              >
            </p>
          </div>
          <div
            class="flex justify-between items-center border-b border-slate-50 dark:border-slate-700/50 py-3 px-2"
          >
            <p class="font-bold text-slate-800 dark:text-slate-200">To</p>
            <p>
              <a
                href="./account/123456"
                class="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                >DeltaCoin</a
              >
            </p>
          </div>
          <div
            class="flex justify-between items-center border-b border-slate-50 dark:border-slate-700/50 py-3 px-2"
          >
            <p class="font-bold text-slate-800 dark:text-slate-200">Amount</p>
            <p class="text-sm font-medium text-slate-700 dark:text-slate-200">
              0ICP
            </p>
          </div>
          <div
            class="flex justify-between items-center border-b border-slate-50 dark:border-slate-700/50 py-3 px-2"
          >
            <p class="font-bold text-slate-800 dark:text-slate-200">Fee</p>
            <p class="text-sm text-slate-500 dark:text-slate-400">0ICP</p>
          </div>
          <div class="flex justify-between items-center py-3 px-2">
            <p class="font-bold text-slate-800 dark:text-slate-200">Memo</p>
            <p class="text-sm text-slate-500 dark:text-slate-400">0</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style lang="postcss">
  figure {
    @apply flex relative flex-col;
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
</style>
