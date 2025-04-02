<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<script lang="ts">
  import { t, locale } from "svelte-i18n";
  export let lang = "en";
  locale.subscribe((_lang) => {
    console.log("locale.subscribe", _lang);
    lang = _lang || "en";
  });

  const items = [
    {
      image: "/img/NoPrivateKey.svg",
      label: $t("no_private_key"),
    },
    {
      image: "/img/NoMnemonicWords.svg",
      label: $t("no_mnemonic_words"),
    },
    {
      image: "/img/NoPassword.svg",
      label: $t("no_password"),
    },
  ];
</script>

<svelte:head>
  <title>{$t("title_prefix")} - {$t("title_home")}</title>
</svelte:head>
<div>
  <!-- <div class="bg-primary"> -->
  <div>
    <div
      class="container mx-auto 2xl:px-9 md:min-h-[70vh] flex flex-col justify-center items-center py-10 md:py-0"
    >
      <!-- class="space-y-10 text-center flex flex-col md:flex-row items-stretch text-white" -->
      <section
        class="space-y-10 text-center flex flex-col md:flex-row items-stretch text-black"
      >
        <div class="flex flex-col flex-1 px-3 justify-center">
          <h1
            class="h1 md:text-6xl md:leading-[70px] font-bold text-left {lang.startsWith(
              'zh'
            )
              ? ''
              : 'home_mianheading'}"
          >
            <div class="forme"></div>
            <!-- {$t("home_mianheading")} -->
            {$t("title_prefix")} - {$t("title_home")}
          </h1>
          <p
            class="text-md md:text-2xl font-normal text-left !important my-6 md:my-10"
          >
            {$t("home_subheading")}
          </p>

          <div class="flex flex-wrap items-center md:gap-8">
            <div class="justify-center">
              <a
                class="btn text-white hover:border hover:border-white rounded-md bg-secondary hover:bg-primary"
                href="./download">{$t("download_delta_application_now")}</a
              >
            </div>
            <a class="btn rounded-md bg-black text-white" href="./explore">
              {$t("learn_more")}
            </a>
          </div>
        </div>
        <div class="flex flex-col md:w-[35%]">
          <figure class="flex-1 items-center">
            <section class="img-bg" />

            <img alt="delta moble" src="/img/handheld.delta.png" width="480" />
          </figure>
          <!-- <figure class="flex-1 items-center">
            <img
              src="/img/appMain1.png"
              width="280"
              alt="delta app Home Screen"
            />
          </figure> -->
        </div>
      </section>
    </div>
  </div>
  <!-- class="min-h-[30vh] bg-white flex items-center justify-center py-10 md:py-0" -->
  <div class="min-h-[30vh] flex justify-center py-10 md:py-0">
    <div class="px-4 md:px-0 mx-auto">
      <div class="gap-10">
        <div
          class="flex flex-wrap gap-5 lg:gap-10 items-center justify-center mb-10"
        >
          {#each items as item}
            <figure
              class="w-[145px] md:w-[200px] bg-white shadow-xl flex flex-col items-center justify-center border border-slate-200 rounded-lg py-2 md:py-4"
            >
              <img class="object-contain" alt={item.label} src={item.image} />
              <div class="text-sm md:text-md -mt-6 font-normal">
                {item.label}
              </div>
            </figure>
          {/each}
        </div>
        <p class="text-md md:text-2xl font-[400] text-center">
          {$t("home_mianheading")}
        </p>
      </div>
    </div>
  </div>
</div>

<style lang="postcss">
  .img-edge-cover {
    position: relative;
  }
  .img-edge-cover:after {
    position: absolute;
    content: "";
    width: 37%;
    height: 21%;
    bottom: 0;
    right: 0;
    box-shadow: -10px -10px 8px 0px rgba(255, 204, 204, 0.5) inset;
  }
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
  @keyframes glow {
    0% {
      @apply bg-primary;
    }
    33% {
      @apply bg-secondary;
    }
    66% {
      @apply bg-tertiary-400/50;
    }
    100% {
      @apply bg-primary;
    }
  }
  @keyframes pulse {
    50% {
      transform: scale(1.5);
    }
  }
  .home_mianheading {
    //width: 100%;
    /* margin-right: -11rem; */
    /* height: 385px; */
    //border: 1px solid red;
  }
  .home_mianheading .forme {
    //height: 100%;
    width: 11rem;
    float: right;
    shape-outside: polygon(100% 0, 100% 100%, 0 100%);
  }
</style>
