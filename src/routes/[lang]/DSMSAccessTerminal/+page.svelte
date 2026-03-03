<script lang="ts">
  import { t, locale } from "svelte-i18n";
  import { Accordion, AccordionItem } from "@skeletonlabs/skeleton";
  import SEO from "../../../components/SEO.svelte";

  export let data;
  let lang = data.lang;
  locale.subscribe((_lang) => {
    lang = _lang || "en";
  });
</script>

<SEO
  title="{$t('title_prefix')} - {$t('access_terminal')}"
  description="Delta DSMS Access Terminal - Setup your node and support the decentralized network."
  lang={data.lang}
/>

<div
  class="min-h-screen pt-20 pb-32 bg-[#f8fafc] dark:bg-slate-900 flex items-center justify-center relative overflow-hidden transition-colors duration-300"
>
  <!-- Background Glow -->
  <div class="absolute inset-0 z-0 pointer-events-none">
    <div
      class="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"
    ></div>
    <div
      class="absolute bottom-1/4 left-1/4 w-96 h-96 bg-secondary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"
    ></div>
  </div>

  <div class="container mx-auto px-6 relative z-10 max-w-6xl">
    <div class="flex flex-col lg:flex-row items-start gap-16">
      <!-- Video / Image Mockup -->
      <div
        class="flex-[0.8] w-full max-w-[12rem] sm:max-w-[14rem] lg:max-w-[16rem] mx-auto flex flex-col items-center"
      >
        <div class="relative group mb-8 w-full">
          <div
            class="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-[3rem] blur-2xl group-hover:blur-3xl transition-all duration-500 opacity-50"
          ></div>
          <img
            src="/img/dsms_verifier_terminal.png"
            alt="DSMS Terminal Screen"
            class="relative z-10 w-full rounded-[2.5rem] shadow-2xl transform lg:rotate-2 lg:group-hover:rotate-0 transition-transform duration-500 border-4 border-white/50"
          />
        </div>

        <a
          href="https://www.youtube.com/watch?v=Y5UwsM654gU"
          target="_blank"
          class="inline-flex items-center gap-3 bg-white dark:bg-slate-800 px-6 py-3 rounded-full shadow-md border border-slate-100 dark:border-slate-700 hover:shadow-lg hover:-translate-y-1 transition-all group"
        >
          <i
            class="fa-brands fa-youtube text-red-600 text-2xl group-hover:scale-110 transition-transform"
          ></i>
          <span class="font-medium text-slate-700 dark:text-slate-300"
            >How to Setup & Troubleshooting</span
          >
        </a>
      </div>

      <!-- Content -->
      <div class="flex-[1.2] flex flex-col w-full">
        <h1
          class="text-lg md:text-2xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-8 tracking-tight transition-colors duration-300 text-center px-4"
        >
          {@html $t("DSMS_access_terminal_heading")}
        </h1>

        <!-- Accordion FAQ -->
        <div
          class="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden mb-10 transition-colors duration-300"
        >
          <Accordion
            autocollapse
            class="divide-y divide-slate-100 dark:divide-slate-700 transition-colors duration-300"
          >
            <AccordionItem open class="group">
              <svelte:fragment slot="lead">
                <div
                  class="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-700/50 flex items-center justify-center text-primary group-hover:bg-primary/10 transition-colors"
                >
                  <i class="fa-solid fa-question text-lg"></i>
                </div>
              </svelte:fragment>
              <svelte:fragment slot="summary">
                <h3
                  class="text-xl font-bold text-slate-800 dark:text-slate-100 py-2 transition-colors duration-300"
                >
                  {$t("access_terminal_question1")}
                </h3>
              </svelte:fragment>
              <svelte:fragment slot="content">
                <div
                  class="text-slate-600 dark:text-slate-300 leading-relaxed text-lg pb-6 pr-6 transition-colors duration-300"
                >
                  {$t("access_terminal_answer1")}
                  <a
                    href={$t("validator_reward_link")}
                    class="text-primary font-medium hover:underline decoration-2 underline-offset-4 ml-1"
                  >
                    {$t("link…")}
                  </a>
                </div>
              </svelte:fragment>
            </AccordionItem>

            <AccordionItem class="group">
              <svelte:fragment slot="lead">
                <div
                  class="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-primary group-hover:bg-primary/10 transition-colors"
                >
                  <i class="fa-solid fa-question text-lg"></i>
                </div>
              </svelte:fragment>
              <svelte:fragment slot="summary">
                <h3
                  class="text-xl font-bold text-slate-800 dark:text-slate-100 py-2 transition-colors duration-300"
                >
                  {$t("access_terminal_question2")}
                </h3>
              </svelte:fragment>
              <svelte:fragment slot="content">
                <div class="text-slate-600 leading-relaxed text-lg pb-6 pr-6">
                  {$t("access_terminal_answer2")}
                </div>
              </svelte:fragment>
            </AccordionItem>

            <AccordionItem class="group">
              <svelte:fragment slot="lead">
                <div
                  class="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-primary group-hover:bg-primary/10 transition-colors"
                >
                  <i class="fa-solid fa-question text-lg"></i>
                </div>
              </svelte:fragment>
              <svelte:fragment slot="summary">
                <h3
                  class="text-xl font-bold text-slate-800 dark:text-slate-100 py-2 transition-colors duration-300"
                >
                  {$t("access_terminal_question3")}
                </h3>
              </svelte:fragment>
              <svelte:fragment slot="content">
                <div class="text-slate-600 leading-relaxed text-lg pb-6 pr-6">
                  {$t("access_terminal_answer3")}
                </div>
              </svelte:fragment>
            </AccordionItem>

            <AccordionItem class="group">
              <svelte:fragment slot="lead">
                <div
                  class="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-primary group-hover:bg-primary/10 transition-colors"
                >
                  <i class="fa-solid fa-question text-lg"></i>
                </div>
              </svelte:fragment>
              <svelte:fragment slot="summary">
                <h3
                  class="text-xl font-bold text-slate-800 dark:text-slate-100 py-2 transition-colors duration-300"
                >
                  {$t("access_terminal_question4")}
                </h3>
              </svelte:fragment>
              <svelte:fragment slot="content">
                <div class="text-slate-600 leading-relaxed text-lg pb-6 pr-6">
                  {@html $t("access_terminal_answer4")}
                </div>
              </svelte:fragment>
            </AccordionItem>
          </Accordion>
        </div>

        <p class="text-slate-500 font-light mb-10 text-lg">
          {$t("about_3-No-Verification_to_whitepaper_chapters")}
          <a
            href="./whitepaper#3.4_3-no-verification"
            class="text-slate-800 font-medium hover:text-primary transition-colors hover:underline decoration-2 underline-offset-4 ml-1"
          >
            {$t("link…")}
          </a>
        </p>

        <!-- Download Buttons -->
        <div
          class="flex flex-col sm:flex-row items-center gap-6 p-8 bg-white rounded-3xl border border-slate-100 shadow-sm"
        >
          <div class="flex flex-col items-center">
            <a
              target="_blank"
              href={lang == "zh-CN"
                ? "https://wwrm.lanzoue.com/delta-dsms-terminal"
                : "https://github.com/delta-kim/dsms_verifier_terminal/releases/download/1.0.9/dsms_terminal_1.0.9.apk"}
              class="transform hover:scale-105 hover:-translate-y-1 transition-all inline-block"
            >
              <img
                class="h-16 object-contain rounded-xl shadow-md border border-slate-100"
                src="/img/android_apk.png"
                alt="Android APK"
              />
            </a>
            <a
              href="https://github.com/delta-kim/dsms_verifier_terminal/releases"
              target="_blank"
              class="text-[10px] uppercase tracking-wider font-bold text-slate-400 hover:text-primary transition-colors mt-3"
            >
              Version 1.0.9 &bull; 2026-03-02
            </a>
          </div>

          <div class="w-px h-16 bg-slate-100 hidden sm:block"></div>

          <div
            class="flex flex-col items-center opacity-50 grayscale cursor-not-allowed group"
          >
            <img
              class="h-16 object-contain"
              src="/img/apple_store.svg"
              alt="apple store"
            />
            <span
              class="text-[10px] uppercase tracking-wider font-bold text-red-400 mt-3 group-hover:text-red-500 transition-colors"
            >
              Not Supported Yet
            </span>
          </div>
        </div>
      </div>
    </div>
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
</style>
