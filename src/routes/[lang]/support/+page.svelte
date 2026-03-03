<script lang="ts">
  import type { PageData } from "./$types";
  import { onMount } from "svelte";
  import { t } from "svelte-i18n";
  import { Accordion, AccordionItem } from "@skeletonlabs/skeleton";
  import SEO from "../../../components/SEO.svelte";

  export let data: PageData;
  onMount(() => {
    // console.log("faq", data);
  });
</script>

<SEO
  title="{$t('title_prefix')} - {$t('support')}"
  description="Delta Support Center - Find answers to frequently asked questions and get in touch with the community."
  lang={data.lang}
/>

<div
  class="min-h-screen pt-20 pb-32 bg-[#f8fafc] dark:bg-slate-900 text-slate-800 dark:text-slate-100 flex justify-center relative overflow-hidden transition-colors duration-300"
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
    class="container mx-auto px-6 relative z-10 max-w-5xl flex flex-col md:flex-row items-start gap-12"
  >
    <!-- Sidebar Navigation -->
    <aside class="md:w-1/3 lg:w-1/4 md:sticky md:top-32 h-max">
      <div
        class="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-slate-700 mb-8 transition-colors duration-300"
      >
        <h1
          class="text-3xl font-extrabold text-slate-900 dark:text-white mb-8 tracking-tight transition-colors duration-300"
        >
          {$t("support")}
        </h1>
        <ul class="space-y-4">
          <li>
            <a
              href="#read_FAQs"
              class="flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:text-primary transition-colors font-medium group"
            >
              <div
                class="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-700/50 flex items-center justify-center group-hover:bg-primary/10 transition-colors"
              >
                <span class="text-sm font-bold">1</span>
              </div>
              {$t("read_faqs")}
            </a>
          </li>
          <li>
            <a
              href="#contact_discord"
              class="flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:text-primary transition-colors font-medium group"
            >
              <div
                class="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-700/50 flex items-center justify-center group-hover:bg-primary/10 transition-colors"
              >
                <span class="text-sm font-bold">2</span>
              </div>
              Discord
            </a>
          </li>
          <li>
            <a
              href="#contact_via_email"
              class="flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:text-primary transition-colors font-medium group"
            >
              <div
                class="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-700/50 flex items-center justify-center group-hover:bg-primary/10 transition-colors"
              >
                <span class="text-sm font-bold">3</span>
              </div>
              {$t("contact_via_email")}
            </a>
          </li>
        </ul>
      </div>

      <!-- Quick Help Card -->
      <div
        class="bg-gradient-to-br from-primary to-green-700 rounded-3xl p-8 shadow-lg text-white"
      >
        <h3 class="font-bold text-xl mb-3">Need urgent help?</h3>
        <p class="text-sm text-white/80 mb-6">
          Our community moderators are highly active on Discord.
        </p>
        <a
          href="https://discord.com/invite/fw7mTD8Gha"
          target="_blank"
          class="block text-center bg-white text-primary font-bold py-3 px-6 rounded-full hover:shadow-lg hover:scale-105 transition-all"
        >
          Join Discord
        </a>
      </div>
    </aside>

    <!-- Main ContentArea -->
    <div class="flex-1 w-full">
      <!-- FAQs Section -->
      <section id="read_FAQs" class="mb-16 scroll-mt-32">
        <h2
          class="text-3xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-4"
        >
          <i class="fa-solid fa-clipboard-question text-primary"></i>
          {$t("read_faqs")}
        </h2>

        <div
          class="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden"
        >
          <Accordion
            autocollapse
            class="divide-y divide-slate-100 dark:divide-slate-700 text-slate-800 dark:text-slate-200"
          >
            {#each data.items as group, i}
              <AccordionItem class="group">
                <svelte:fragment slot="lead">
                  <div
                    class="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-700/50 flex items-center justify-center text-primary group-hover:bg-primary/10 transition-colors"
                  >
                    <span class="font-bold text-sm">Q{i + 1}</span>
                  </div>
                </svelte:fragment>
                <svelte:fragment slot="summary">
                  <h3 class="text-lg font-bold py-3 pr-4 leading-snug">
                    {group[0].text}
                  </h3>
                </svelte:fragment>
                <svelte:fragment slot="content">
                  <div
                    class="text-slate-600 dark:text-slate-400 leading-relaxed pb-6 pr-6 prose prose-slate dark:prose-invert"
                  >
                    {@html group[1].text}
                  </div>
                </svelte:fragment>
              </AccordionItem>
            {/each}
          </Accordion>
        </div>
      </section>

      <!-- Discord Support Section -->
      <section id="contact_discord" class="mb-16 scroll-mt-32">
        <h2
          class="text-3xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-4"
        >
          <i class="fa-brands fa-discord text-[#5865F2]"></i>
          Discord Support
        </h2>
        <div
          class="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col md:flex-row items-center gap-8 justify-between"
        >
          <div>
            <h3 class="text-xl font-bold mb-2">
              Community support has moved to Discord
            </h3>
            <p class="text-slate-500 dark:text-slate-400">
              Get faster responses and connect directly with the community and
              developers.
            </p>
          </div>
          <a
            href="https://discord.com/invite/fw7mTD8Gha"
            target="_blank"
            class="px-8 py-3 bg-[#5865F2] text-white font-bold rounded-full hover:bg-opacity-90 transition-colors whitespace-nowrap shadow-md"
          >
            discord.com/invite
          </a>
        </div>
      </section>

      <!-- Email Support Section -->
      <section id="contact_via_email" class="scroll-mt-32">
        <h2
          class="text-3xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-4"
        >
          <i class="fa-solid fa-envelope text-primary"></i>
          {$t("contact_via_email")}
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            class="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 hover:border-primary/30 transition-colors group"
          >
            <div
              class="w-12 h-12 bg-slate-50 dark:bg-slate-700/50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors"
            >
              <i class="fa-solid fa-users text-primary text-xl"></i>
            </div>
            <h3 class="text-xl font-bold mb-3">Community Links</h3>
            <p class="text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
              Please send any community link you'd like us to add to our website
              communities list to the email below.
            </p>
            <a
              href="mailto:socio@delta.kim"
              target="_blank"
              class="text-primary font-bold hover:underline decoration-2 underline-offset-4"
            >
              socio@delta.kim
            </a>
          </div>

          <div
            class="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 hover:border-primary/30 transition-colors group"
          >
            <div
              class="w-12 h-12 bg-slate-50 dark:bg-slate-700/50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors"
            >
              <i class="fa-solid fa-bullhorn text-primary text-xl"></i>
            </div>
            <h3 class="text-xl font-bold mb-3">Partnerships</h3>
            <p class="text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
              For advertising cooperation and business development inquiries,
              please send an email to the address below.
            </p>
            <a
              href="mailto:delta.ad.cooperation@gmail.com"
              target="_blank"
              class="text-primary font-bold hover:underline decoration-2 underline-offset-4"
            >
              delta.ad.cooperation@gmail.com
            </a>
          </div>
        </div>
      </section>
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
