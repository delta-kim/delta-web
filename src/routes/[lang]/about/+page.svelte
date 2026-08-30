<script lang="ts">
  import { t, locale } from "svelte-i18n";
  import SEO from "../../../components/SEO.svelte";

  export let data;
  let lang = data.lang;
  locale.subscribe((_lang) => {
    lang = _lang || "en";
  });
</script>

<SEO
  title="{$t('title_prefix')} - {$t('about')}"
  description="Learn about Delta's mission to democratize digital currency through keyless threshold cryptographic systems."
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
      class="bg-white dark:bg-slate-800 rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100 dark:border-slate-700 animate-fade-in"
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
          The Delta project brings together specialists in distributed ledger
          technology, human-computer interaction, and decentralization across
          the globe to build and maintain the secure smart contracts powering
          Delta.
        </p>
      </div>
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

