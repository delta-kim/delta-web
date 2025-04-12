<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<script lang="ts">
  import { t, locale } from "svelte-i18n";
  import { Accordion, AccordionItem } from "@skeletonlabs/skeleton";
  export let lang = "en";
  locale.subscribe((_lang) => {
    console.log("locale.subscribe", _lang);
    lang = _lang || "en";
  });
</script>

<svelte:head>
  <title>{$t("title_prefix")} - {$t("access_terminal")}</title>
</svelte:head>
<section
  class="2xl:px-9 h-full flex flex-col justify-center items-center py-10"
>
  <div class="flex flex-col-reverse md:flex-row px-4 md:px-0">
    <figure class="flex-1 items-center">
      <img
        src="/img/dsms_verifier_terminal.png"
        width="280"
        alt="delta app Home Screen"
      />
    </figure>
    <div class="flex flex-col justify-evenly flex-1 py-10 mt:py-0">
      <h4 class="h4 md:w-5/6 leading-normal font-bold">
        {@html $t("DSMS_access_terminal_heading")}
      </h4>
      <Accordion autocollapse width="md:w-5/6" class="card p-4 my-4 text-token">
        <AccordionItem open>
          <svelte:fragment slot="lead">
            <i class="fa-solid fa-question text-xl w-6 text-center" />
          </svelte:fragment>
          <svelte:fragment slot="summary">
            <h5 class="h5">{$t("access_terminal_question1")}</h5>
          </svelte:fragment>
          <svelte:fragment slot="content">
            <p style="background-color: #ffffff80;" class="p-2">
              {$t("access_terminal_answer1")}
              <a
                class="text-tertiary-500 underline pl-2"
                href="./whitepaper#3.6.3">{$t("link…")}</a
              >
            </p>
          </svelte:fragment>
        </AccordionItem>
        <AccordionItem>
          <svelte:fragment slot="lead">
            <i class="fa-solid fa-question text-xl w-6 text-center" />
          </svelte:fragment>
          <svelte:fragment slot="summary"
            ><h5 class="h5">
              {$t("access_terminal_question2")}
            </h5></svelte:fragment
          >
          <svelte:fragment slot="content">
            <p style="background-color: #ffffff80;" class="p-2">
              {$t("access_terminal_answer2")}
            </p>
          </svelte:fragment>
        </AccordionItem>
        <AccordionItem>
          <svelte:fragment slot="lead">
            <i class="fa-solid fa-question text-xl w-6 text-center" />
          </svelte:fragment>
          <svelte:fragment slot="summary">
            <h5 class="h5">{$t("access_terminal_question3")}</h5>
          </svelte:fragment>
          <svelte:fragment slot="content">
            <p style="background-color: #ffffff80;" class="p-2">
              {$t("access_terminal_answer3")}
            </p>
          </svelte:fragment>
        </AccordionItem>
        <AccordionItem>
          <svelte:fragment slot="lead">
            <i class="fa-solid fa-question text-xl w-6 text-center" />
          </svelte:fragment>
          <svelte:fragment slot="summary">
            <h5 class="h5">{$t("access_terminal_question4")}</h5>
          </svelte:fragment>
          <svelte:fragment slot="content">
            <p style="background-color: #ffffff80;" class="p-2">
              {@html $t("access_terminal_answer4")}
            </p>
          </svelte:fragment>
        </AccordionItem>
      </Accordion>
      <p class="lg:w-5/6 my-4">
        {$t("about_3-No-Verification_to_whitepaper_chapters")}<a
          class="text-tertiary-500 underline pl-2"
          href="./whitepaper#3.4"
        >
          {$t("link…")}
        </a>
      </p>
      <p class="mb-4">
        <i class="fa-brands fa-youtube"style="color:rgb(255, 0, 51)"></i>
        <a class="underline text-tertiary-500" href="https://www.youtube.com/watch?v=Y5UwsM654gU" target="_blank"
          >How to Setup DSMS Terminal + Troubleshooting!
        </a>
      </p>

      <div class="flex flex-row items-center gap-3">
        <figure class="pt-1 flex items-center flex-col">
          <a
            target="_blank"
            href={lang == "zh-CN"
              ? "https://punks.oss-ap-southeast-1.aliyuncs.com/apk/delta_dsms_terminal_1.0.2.apk"
              : "https://github.com/delta-kim/dsms_verifier_terminal/releases/download/1.0.2/delta_dsms_terminal_1.0.2.apk"}
          >
            <img
              class="rounded-md w-[185px] object-contain"
              src="/img/android_apk.png"
              alt="Android apk"
            />
          </a>
          <div style="font-size: xx-small;text-align: center">
            <a
              style="text-decoration: underline;"
              href="https://github.com/delta-kim/dsms_verifier_terminal/releases"
              target="_blank">Version:1.0.2 Latest:2025-03-11</a
            >
          </div>
        </figure>
        <figure class="flex items-center flex-col">
          <img
            class="rounded-2xl w-[200px] object-contain"
            src="/img/apple_store.svg"
            alt="apple store"
          />
          <div
            style="color: brown;margin-top:-12px;text-align: center; font-size: xx-small"
          >
            Not supported
          </div>
        </figure>
      </div>
    </div>
  </div>
</section>

<style lang="postcss">
  figure {
    @apply flex relative flex-col;
  }
  .img-bg {
    @apply w-64 h-64 md:w-80 md:h-80;
  }
  .img-bg {
    @apply absolute z-[-1] rounded-full blur-[50px] transition-all;
    animation:
      pulse 5s cubic-bezier(0, 0, 0, 0.5) infinite,
      glow 5s linear infinite;
  }
</style>
