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
  title="{$t('title_prefix')} - {$t('download')}"
  description="Download Delta Kim mobile app for Android and iOS. Start mining keyless digital money today."
  lang={data.lang}
/>

<div
  class="min-h-screen pt-20 pb-32 bg-[#f8fafc] dark:bg-slate-900 flex items-center justify-center relative overflow-hidden transition-colors duration-300"
>
  <!-- Background Glow -->
  <div class="absolute inset-0 z-0 pointer-events-none">
    <div
      class="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"
    ></div>
    <div
      class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"
    ></div>
  </div>

  <div class="container mx-auto px-6 relative z-10 max-w-6xl">
    <div class="flex flex-col lg:flex-row items-center gap-16">
      <!-- App Mockup -->
      <div
        class="flex-1 w-full max-w-md lg:max-w-full flex justify-center order-2 lg:order-1"
      >
        <div class="relative group">
          <div
            class="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-[3rem] blur-2xl group-hover:blur-3xl transition-all duration-500 opacity-50"
          ></div>
          <!-- Light Image -->
          <img
            src="/img/delta_new_screen_2.png"
            alt="Delta App Screen"
            class="relative z-10 w-3/4 max-w-sm mx-auto rounded-[2.5rem] shadow-2xl transform lg:-rotate-6 lg:group-hover:rotate-0 transition-all duration-500 border-4 border-white/50 block dark:hidden"
          />
          <!-- Dark Image -->
          <img
            src="/img/delta_new_screen_1.png"
            alt="Delta App Screen Dark"
            class="relative z-10 w-3/4 max-w-sm mx-auto rounded-[2.5rem] shadow-2xl transform lg:-rotate-6 lg:group-hover:rotate-0 transition-all duration-500 border-4 border-slate-700/50 hidden dark:block"
          />
        </div>
      </div>

      <!-- Content -->
      <div
        class="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left order-1 lg:order-2"
      >
        <h1
          class="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight transition-colors duration-300"
        >
          {$t("download_heading")}
        </h1>

        <div
          class="space-y-4 text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-10 font-light max-w-2xl transition-colors duration-300"
        >
          <p>{@html $t("download_desc1")}</p>
          <p>
            {$t("is_no_referrer_DID_yet")}
            <a
              href="https://www.google.com/search?q=Delta+referrer+DID"
              target="_blank"
              class="text-primary font-medium hover:underline decoration-2 underline-offset-4 ml-1"
            >
              {$t("search_find_delta_referrer")}
            </a>
          </p>
          <p>{$t("download_desc2")}</p>
        </div>

        <!-- Download Buttons -->
        <div
          class="flex flex-row flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-6"
        >
          <a
            target="_blank"
            href="https://play.google.com/store/apps/details?id=kim.delta.mobile"
            class="transform hover:scale-105 hover:-translate-y-1 transition-all"
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
            class="transform hover:scale-105 hover:-translate-y-1 transition-all"
          >
            <img
              class="w-auto h-10 sm:h-12 md:h-14 object-contain drop-shadow-md"
              src="/img/apple_store.svg"
              alt="Apple store"
            />
          </a>
        </div>

        <!-- Direct APK -->
        <div
          class="mt-8 pt-8 border-t border-slate-200/60 dark:border-slate-800/60 w-full flex flex-col items-center lg:items-start text-center transition-colors duration-300"
        >
          <a
            target="_blank"
            href={lang == "zh-CN"
              ? "https://wwrm.lanzoue.com/delta-mobile"
              : "https://github.com/delta-kim/delta_mobile_app/releases/download/2.0.2/delta_mobile_2.0.2.apk"}
            class="transform hover:scale-105 hover:-translate-y-1 transition-all inline-block"
          >
            <img
              class="w-auto h-10 sm:h-12 md:h-14 object-contain rounded-xl shadow-md border border-slate-100 dark:border-slate-800"
              src="/img/android_apk.png"
              alt="Android APK"
            />
          </a>
          <a
            href="https://github.com/delta-kim/delta_mobile_app/releases"
            target="_blank"
            class="text-sm font-medium text-slate-500 hover:text-primary transition-colors mt-3"
          >
            Version: 2.0.2 &bull; Released: 2026-03-13
          </a>
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
