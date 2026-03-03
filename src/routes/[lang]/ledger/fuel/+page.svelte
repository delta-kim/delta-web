<script lang="ts">
  import type { PageData } from "./$types";
  import { t, locale } from "svelte-i18n";

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
  class="min-h-screen bg-[#f8fafc] dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-sans selection:bg-primary/30 relative pb-32 transition-colors duration-300"
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
    class="container mx-auto px-6 pt-20 relative z-10 max-w-7xl flex flex-col items-center"
  >
    <div class="gap-4 w-full lg:w-[70vw] my-10 px-2">
      <div
        class="bg-white dark:bg-slate-800 w-full rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6"
      >
        <h1
          class="text-xl font-bold text-slate-800 dark:text-white mb-6 pb-4 border-b border-slate-100 dark:border-slate-700"
        >
          Fueling
        </h1>
        <div class="w-full overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="border-b border-slate-100 dark:border-slate-700">
                <th
                  class="py-3 px-4 text-sm font-semibold text-slate-500 dark:text-slate-400"
                  >S/N</th
                >
                <th
                  class="py-3 px-4 text-sm font-semibold text-slate-500 dark:text-slate-400"
                  >Hash</th
                >
                <th
                  class="py-3 px-4 text-sm font-semibold text-slate-500 dark:text-slate-400"
                  >Method</th
                >
                <th
                  class="py-3 px-4 text-sm font-semibold text-slate-500 dark:text-slate-400"
                  >Age</th
                >
                <th
                  class="py-3 px-4 text-sm font-semibold text-slate-500 dark:text-slate-400"
                  >From</th
                >
                <th
                  class="py-3 px-4 text-sm font-semibold text-slate-500 dark:text-slate-400"
                  >To</th
                >
                <th
                  class="py-3 px-4 text-sm font-semibold text-slate-500 dark:text-slate-400"
                  >Amount</th
                >
                <th
                  class="py-3 px-4 text-sm font-semibold text-slate-500 dark:text-slate-400"
                  >Fee</th
                >
              </tr>
            </thead>

            <tbody>
              <tr
                class="border-b border-slate-50 dark:border-slate-700/50 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
              >
                <td class="py-3 px-4 text-sm text-slate-600 dark:text-slate-300"
                  >1</td
                >
                <td class="py-3 px-4 text-sm"
                  ><a
                    href="./fuel/123456"
                    class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                    >DeltaCoin</a
                  ></td
                >
                <td class="py-3 px-4 text-sm text-slate-600 dark:text-slate-300"
                  >Transfer</td
                >
                <td class="py-3 px-4 text-sm text-slate-500 dark:text-slate-400"
                  >1 sec</td
                >
                <td class="py-3 px-4 text-sm"
                  ><a
                    href="./account/123456"
                    class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                    >DeltaCoin</a
                  ></td
                >
                <td class="py-3 px-4 text-sm"
                  ><a
                    href="./account/123456"
                    class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                    >DeltaCoin</a
                  ></td
                >
                <td
                  class="py-3 px-4 text-sm font-medium text-slate-700 dark:text-slate-200"
                  >0DTC</td
                >
                <td class="py-3 px-4 text-sm text-slate-500 dark:text-slate-400"
                  >0DTC</td
                >
              </tr>
              <!-- Repeat for other dummy rows with same styling -->
              <tr
                class="border-b border-slate-50 dark:border-slate-700/50 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
              >
                <td class="py-3 px-4 text-sm text-slate-600 dark:text-slate-300"
                  >2</td
                >
                <td class="py-3 px-4 text-sm"
                  ><a
                    href="./fuel/123456"
                    class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                    >DeltaCoin</a
                  ></td
                >
                <td class="py-3 px-4 text-sm text-slate-600 dark:text-slate-300"
                  >Transfer</td
                >
                <td class="py-3 px-4 text-sm text-slate-500 dark:text-slate-400"
                  >5 sec</td
                >
                <td class="py-3 px-4 text-sm"
                  ><a
                    href="./account/123456"
                    class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                    >DeltaCoin</a
                  ></td
                >
                <td class="py-3 px-4 text-sm"
                  ><a
                    href="./account/123456"
                    class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                    >DeltaCoin</a
                  ></td
                >
                <td
                  class="py-3 px-4 text-sm font-medium text-slate-700 dark:text-slate-200"
                  >0DTC</td
                >
                <td class="py-3 px-4 text-sm text-slate-500 dark:text-slate-400"
                  >0DTC</td
                >
              </tr>
            </tbody>
          </table>
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
