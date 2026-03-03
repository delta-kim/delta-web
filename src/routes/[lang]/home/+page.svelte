<script lang="ts">
  import { t } from "svelte-i18n";
  import SEO from "../../../components/SEO.svelte";

  export let data;

  const explore_apps = [
    {
      image: "/img/3-No-verification.svg",
      title: $t("3No-Verification"),
      subtitle: $t("3No-Verification_desc"),
      link: $t("3No-Verification_link"),
    },
    {
      image: "/img/decentralization.svg",
      title: $t("decentralization"),
      subtitle: $t("decentralization_desc"),
    },
    {
      image: "/img/mobilePriority.svg",
      title: $t("mobile_first"),
      subtitle: $t("mobile_first_desc"),
      link: $t("mobile_first_link"),
    },
    {
      image: "/img/environmentallyFriendly.svg",
      title: $t("environment_friendly"),
      subtitle: $t("environment_friendly_desc"),
      link: $t("environment_friendly_link"),
    },
    {
      image: "/img/safetyCircle.svg",
      title: $t("safety_circle"),
      subtitle: $t("safety_circle_desc"),
      link: $t("safety_circle_link"),
    },
    {
      image: "/img/fairness.svg",
      title: $t("fair_distribution"),
      subtitle: $t("fair_distribution_desc"),
      link: $t("fair_distribution_link"),
    },
  ];

  const items = [
    {
      image: "/img/no_private_keys_new.png",
      label: $t("no_private_key"),
    },
    {
      image: "/img/no_recovery_phrases_new.png",
      label: $t("no_mnemonic_words"),
    },
    {
      image: "/img/no_passwords_new.png",
      label: $t("no_password"),
    },
  ];
</script>

<SEO
  title="{$t('title_prefix')} - {$t('title_home')}"
  description={$t("home_subheading")}
  lang={data.lang}
/>

<div
  class="flex flex-col min-h-screen bg-[#f8fafc] dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-300"
>
  <!-- HERO SECTION -->
  <section class="relative pt-20 pb-32 overflow-hidden">
    <div class="absolute inset-0 z-0">
      <div
        class="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"
      ></div>
      <div
        class="absolute top-1/3 right-1/4 w-96 h-96 bg-secondary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"
      ></div>
    </div>

    <div class="container mx-auto px-4 lg:px-8 relative z-10">
      <div class="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        <!-- Hero Text -->
        <div class="flex-1 text-center lg:text-left">
          <h1
            class="text-3xl md:text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-8 leading-tight transition-colors duration-300"
          >
            <span
              class="block bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
            >
              {$t("title_prefix")}
            </span>
            {$t("title_home")}
          </h1>
          <p
            class="text-xl lg:text-2xl text-slate-600 dark:text-slate-300 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light transition-colors duration-300"
          >
            {$t("home_subheading")}
          </p>
          <div
            class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
          >
            <a
              href="./download"
              class="w-full sm:w-auto px-8 py-4 rounded-full bg-primary text-white font-bold text-lg hover:brightness-110 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
            >
              {$t("download_delta_application_now")}
            </a>
            <a
              href="./explore"
              class="w-full sm:w-auto px-8 py-4 rounded-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-lg border-2 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
            >
              {$t("learn_more")}
            </a>
          </div>
        </div>

        <!-- Hero Images -->
        <div class="flex-1 relative w-full max-w-lg mx-auto lg:max-w-none">
          <div
            class="relative w-full aspect-[4/5] flex justify-center items-center"
          >
            <!-- Light Mode Image -->
            <img
              src="/img/delta_new_screen_2.png"
              alt="Delta App"
              class="relative z-20 w-3/4 max-w-sm rounded-[2.5rem] shadow-2xl transform lg:rotate-[-5deg] hover:rotate-0 transition-transform duration-500 block dark:hidden"
            />
            <!-- Dark Mode Image (delta_new_screen_1.png) -->
            <img
              src="/img/delta_new_screen_1.png"
              alt="Delta App"
              class="relative z-20 w-3/4 max-w-sm rounded-[2.5rem] shadow-2xl transform lg:rotate-[-5deg] hover:rotate-0 transition-transform duration-500 hidden dark:block"
            />
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- HIGHLIGHTS STRIP -->
  <section
    class="py-12 bg-white dark:bg-slate-800 border-y border-slate-100 dark:border-slate-800/50 shadow-sm relative z-20 transition-colors duration-300"
  >
    <div class="container mx-auto px-4">
      <div class="flex flex-wrap justify-center gap-8 lg:gap-16">
        {#each items as item}
          <div
            class="flex flex-col items-center justify-center group hover:-translate-y-2 transition-transform duration-300"
          >
            <img
              src={item.image}
              alt={item.label}
              class="h-32 md:h-40 lg:h-48 object-contain drop-shadow-xl group-hover:drop-shadow-2xl transition-all"
            />
            <span
              class="text-lg font-bold text-slate-700 dark:text-slate-200 tracking-wide uppercase mt-4 text-center transition-colors duration-300"
            >
              {item.label}
            </span>
          </div>
        {/each}
      </div>
      <div class="text-center mt-12">
        <p
          class="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-600 to-slate-400 dark:from-slate-300 dark:to-slate-100 transition-colors duration-300"
        >
          {$t("home_mianheading")}
        </p>
      </div>
    </div>
  </section>

  <!-- FEATURES / VALUE PROP -->
  <section
    class="py-32 bg-[#f8fafc] dark:bg-slate-900 transition-colors duration-300"
  >
    <div class="container mx-auto px-0 md:px-4 lg:px-8">
      <div class="flex justify-center items-center mb-16">
        <div
          class="h-px bg-slate-200 dark:bg-slate-700 w-16 transition-colors duration-300"
        ></div>
        <h2
          class="text-md md:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mx-1 md:mx-6 uppercase tracking-widest text-center transition-colors duration-300"
        >
          {@html $t("explore_delta_heading")}
        </h2>
        <div
          class="h-px bg-slate-200 dark:bg-slate-700 w-16 transition-colors duration-300"
        ></div>
      </div>

      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
      >
        {#each explore_apps as app}
          <div
            class="bg-white dark:bg-slate-800 rounded-[2rem] p-8 shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group"
          >
            <div
              class="mb-8 w-16 h-16 rounded-2xl bg-slate-50 dark:bg-slate-700/50 flex items-center justify-center group-hover:bg-primary/10 transition-colors"
            >
              <img
                src={app.image}
                alt={app.title}
                class="w-10 h-10 object-contain group-hover:scale-110 transition-transform dark:brightness-150"
              />
            </div>
            <h3
              class="text-2xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight transition-colors duration-300"
            >
              {@html app.title}
            </h3>
            <p
              class="text-slate-600 dark:text-slate-300 leading-relaxed text-lg transition-colors duration-300"
            >
              {@html app.subtitle}
            </p>
          </div>
        {/each}
      </div>

      <div class="text-center mt-16">
        <a
          href="./explore"
          class="inline-flex items-center gap-2 text-primary font-bold hover:text-green-700 dark:hover:text-green-400 text-xl border-b-2 border-primary pb-1 hover:border-green-700 dark:hover:border-green-400 transition-colors"
        >
          {$t("explore")} <i class="fa-solid fa-arrow-right"></i>
        </a>
      </div>
    </div>
  </section>

  <!-- BUILT ON ICP SECTION -->
  <section class="py-32 bg-slate-900 text-white relative overflow-hidden">
    <div
      class="absolute inset-0 opacity-10 bg-[url('/img/footer-bg.svg')] bg-repeat"
    ></div>
    <div
      class="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"
    ></div>

    <div class="container mx-auto px-4 lg:px-8 relative z-10 text-center">
      <div
        class="inline-block p-4 bg-white/5 rounded-3xl backdrop-blur-md border border-white/10 mb-8"
      >
        <img
          src="/img/icp-logo.svg"
          alt="ICP"
          class="w-20 h-20 filter drop-shadow-[0_0_15px_rgba(255,255,255,0.7)]"
        />
      </div>
      <h2 class="text-4xl md:text-6xl font-extrabold mb-8 tracking-tight">
        A keyless digital money system!
      </h2>
      <p
        class="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-12 font-light"
      >
        Delta is 100% based on the ICP blockchain and is secured by ECDSA
        threshold signature technology.
      </p>
      <a
        href="./canister-status"
        class="inline-block px-10 py-5 rounded-full bg-white text-slate-900 font-bold text-lg hover:bg-slate-100 hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,255,255,0.3)]"
      >
        View Canister Status
      </a>
    </div>
  </section>

  <!-- BOTTOM CTA -->
  <section
    class="py-32 bg-white dark:bg-slate-800 relative overflow-hidden border-t border-slate-100 dark:border-slate-800/50 transition-colors duration-300"
  >
    <div class="container mx-auto px-4 lg:px-8 text-center max-w-4xl">
      <h2
        class="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white mb-8 tracking-tight transition-colors duration-300"
      >
        {$t("download_heading")}
      </h2>
      <p class="text-xl text-slate-600 mb-16 font-light">
        {@html $t("download_desc1")}
      </p>
      <div
        class="flex flex-row items-center justify-center gap-3 sm:gap-6 flex-wrap"
      >
        <a
          target="_blank"
          href="https://play.google.com/store/apps/details?id=kim.delta.mobile"
          class="transform hover:scale-105 hover:-translate-y-2 transition-all"
        >
          <img
            class="w-auto h-10 sm:h-12 md:h-14 object-contain drop-shadow-md"
            src="/img/google_play.svg"
            alt="Google Play"
          />
        </a>
        <a
          target="_blank"
          href="https://apps.apple.com/app/delta-kim/id6738377112"
          class="transform hover:scale-105 hover:-translate-y-2 transition-all"
        >
          <img
            class="w-auto h-10 sm:h-12 md:h-14 object-contain drop-shadow-md"
            src="/img/apple_store.svg"
            alt="Apple store"
          />
        </a>
        <a
          target="_blank"
          href="https://github.com/delta-kim/delta_mobile_app/releases"
          class="transform hover:scale-105 hover:-translate-y-2 transition-all"
        >
          <img
            class="w-auto h-10 sm:h-12 md:h-14 object-contain rounded-xl shadow-md border border-slate-100"
            src="/img/android_apk.png"
            alt="Android APK"
          />
        </a>
      </div>
    </div>
  </section>
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
