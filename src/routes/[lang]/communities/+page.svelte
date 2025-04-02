<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<script lang="ts">
  import { t, locale } from "svelte-i18n";
  import { onMount } from "svelte";
  import type { PageData } from "./$types";

  export let data: PageData;

  export let lang = data.lang;
  locale.subscribe((_lang) => {
    console.log("locale.subscribe", _lang);
    lang = _lang || "en";
  });
  const communities = [
    // {
    //   icon: `<i class="fa-brands fa-discord"style="color:rgb(88, 101, 242)"></i>`,
    //   label: "Delta Kim DAO",
    //   link: "https://discord.gg/fw7mTD8Gha",
    //   creator: "",
    // },
    {
      icon: `<i class="fa-brands fa-telegram" style="color:#0088CC"></i>`,
      label: "DELTA COIN",
      link: "https://t.me/DeltaCoinMiners",
      creator: "magnohoved@gmail.com",
    },
    {
      icon: `<i class="fa-brands fa-square-x-twitter" style="color:black"></i>`,
      label: "DeltaCoinNews",
      link: "https://x.com/DeltaCoinNews",
      creator: "princejames.biz@gmail.com",
    },
    {
      icon: `<i class="fa-brands fa-telegram" style="color:#0088CC"></i>`,
      label: "DeltaCoinNews",
      link: "https://t.me/DeltaCoinNews",
      creator: "princejames.biz@gmail.com",
    },
    {
      icon: `<img style="width: 15px;display: inline;"alt="delta medium"src="/img/medium.png"/>`,
      label: "DeltaCoinNews",
      link: "https://medium.com/@DeltaCoinNews",
      creator: "princejames.biz@gmail.com",
    },
    {
      icon: `<i class="fa-brands fa-youtube"style="color:rgb(255, 0, 51)"></i>`,
      label: "DeltaCoinNews",
      link: "https://www.youtube.com/@DeltaCoinNews",
      creator: "princejames.biz@gmail.com",
    },
    {
      icon: `<i class="fa-brands fa-facebook" style="color: rgb(8, 102, 255);"></i>`,
      label: "Delta in Africa",
      link: "https://t.co/JlN1ieKUeQ",
      creator: "adimadojoel08@gmail.com",
    },
    {
      icon: ` <i class="fa-brands fa-telegram" style="color:#0088CC"></i>`,
      label: "DELTA 🇫🇷",
      link: "https://t.me/deltafrancophone",
      creator: "josephangengang@gmail.com",
    },
    {
      icon: `<i class="fa-brands fa-discord"style="color:rgb(88, 101, 242)"></i>`,
      label: "Delta Coin",
      link: "https://discord.gg/8XNeDAun75",
      creator: "magnohoved@gmail.com",
    },
    {
      icon: `<i class="fa-brands fa-youtube"style="color:rgb(255, 0, 51)"></i>`,
      label: "Delta On ICP",
      link: "https://www.youtube.com/@DeltaOnICPBlockchain",
      creator: "choudharysushobhan97@gmail.com",
    },

    {
      icon: `<i class="fa-brands fa-facebook"style="color:rgb(8, 102, 255)"></i>`,
      label: "Delta δ بالعربي",
      link: "https://www.facebook.com/groups/9774910459215134",
      creator: "kbuhfils@gmail.com",
    },
    {
      icon: `<i class="fa-brands fa-square-x-twitter" style="color:black"></i>`,
      label: "DeltaPioneers",
      link: "https://x.com/Deltapioneers?t=jVLBg-2g-ATJbEbmMi_X7w&s=09",
      creator: "josephangengang@gmail.com",
    },
    {
      icon: `<i class="fa-brands fa-facebook"style="color: rgb(8, 102, 255);"></i>`,
      label: "Delta facebook",
      link: "https://facebook.com/groups/1394421291722968/",
      creator: "josephangengang@gmail.com",
    },
    {
      icon: `<i class="fa-brands fa-whatsapp" style="color:#25d366"></i>`,
      label: "Delta Pioneers",
      link: "https://chat.whatsapp.com/EKPHb5BuX5p3yiQVEJ5z72",
      creator: "josephangengang@gmail.com",
    },
    {
      icon: `<i class="fa-brands fa-telegram" style="color:#0088CC"></i>`,
      label: "Delta Pioneers",
      link: "https://t.me/DeltaNetworkPioneers",
      creator: "josephangengang@gmail.com",
    },
    {
      icon: `<i class="fa-brands fa-whatsapp" style="color:#25d366"></i>`,
      label: "DTC NETWORK",
      link: "https://chat.whatsapp.com/HelA80BXOt6JpfJBAUTWKU",
      creator: "josephangengang@gmail.com",
    },
    {
      icon: `<i class="fa-brands fa-whatsapp" style="color:#25d366"></i>`,
      label: "Deploy DSMS t.",
      link: "https://chat.whatsapp.com/K8hgtui0nEy0wTBCYJPAa1",
      creator: "josephangengang@gmail.com",
    },
    {
      icon: `<i class="fa-brands fa-telegram" style="color:#0088CC"></i>`,
      label: "Delta Türkiye",
      link: "https://t.me/deltakimtr",
      creator: "josephangengang@gmail.com",
    },
    {
      icon: `<i class="fa-brands fa-reddit" style="color:rgb(255, 69, 0);"></i>`,
      label: "Delta Crypto",
      link: "https://www.reddit.com/r/Delta_Crypto",
      creator: "princejames.biz@gmail.com",
    },
    {
      icon: `<i class="fa-brands fa-telegram" style="color:#0088CC"></i>`,
      label: "Delta Global",
      link: "https://t.me/GlobalDeltaCoin",
      creator: "josephangengang@gmail.com",
    },
    {
      icon: `<i class="fa-brands fa-whatsapp" style="color:#25d366"></i>`,
      label: "DELTA FORCE",
      link: "https://chat.whatsapp.com/HeUXuQtdP390MDu6pnpAij",
      creator: "kbuhfils@gmail.com",
    },
    {
      icon: `<i class="fa-brands fa-telegram" style="color:#0088CC"></i>`,
      label: "Delta India 🇮🇳",
      link: "https://t.me/delta_in",
      creator: "",
    },
    {
      icon: `<img style="width: 15px;display: inline;"alt="delta medium"src="/img/medium.png"/>`,
      label: "Delta on ICP",
      link: "https://medium.com/@DeltaKimonICP/",
      creator: "",
    },
    {
      icon: `<i class="fa-brands fa-youtube"style="color:rgb(255, 0, 51)"></i>`,
      label: "delta Kim 🇫🇷",
      link: "https://www.youtube.com/@deltakimfr",
      creator: "",
    },
    {
      icon: `<i class="fa-brands fa-whatsapp" style="color:#25d366"></i>`,
      label: "Deploy DSMS t.",
      link: "https://chat.whatsapp.com/KdLc4CnGYIl1fjAd49G7jy",
      creator: "",
    },
    {
      icon: `<i class="fa-brands fa-telegram" style="color:#0088CC"></i>`,
      label: "DELTA MINAGE",
      link: "https://t.me/deltacoinmining",
      creator: "kbuhfils@gmail.com",
    },
  ];
</script>

<svelte:head>
  <title>{$t("title_prefix")} - {$t("explore")}</title>
</svelte:head>
<div
  class="container mx-auto h-full flex flex-col justify-center items-center mt-8 m:px-0"
>
  <div class="bg-white p-4 md:p-7 mb-20 md:mt-0 md:w-[80%] mx-auto rounded-2xl">
    <div class="flex justify-between mb-2">
      <p class="text-lg md:text-4xl font-bold text-primary">
        Community social media channels
      </p>
      <img
        src="/img/delta.logo.png"
        alt="DELTA LOGO"
        class="w-[100px] object-contain hidden md:block"
      />
    </div>
    <div class="flex flex-row justify-between my-4 md:my-8">
      <ul
        class="grid grid-cols-2 lg:grid-cols-5 xl:grid-cols-5 gap-2 justify-between w-full"
      >
        {#each communities as community}
          <li class="text-xl md:text-2xl font-[500] text-blue-600 mb-1">
            <a
              href={community.link}
              target="_blank"
              class="flex items-center gap-x-1"
            >
              {@html community.icon}

              <span style="font-size: small;" class="underline"
                >{community.label}</span
              >
            </a>
          </li>
        {/each}
      </ul>
    </div>
    <div class="hidden lg:block text-sm text-center" style="color: orange;">
      "ann.: New links are not accepted for the time being. Since some channels
      are found to spread pornographic content, we plan to develop a "media
      center" driven and managed by the community in the future to eliminate
      unhealthy content (2025-03-16)"
    </div>
  </div>
</div>

<style lang="postcss">
  figure {
    @apply flex relative flex-col;
  }
</style>
