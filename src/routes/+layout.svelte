<script lang="ts">
  import type { LayoutData } from "./$types";
  import "../app.postcss";
  import "@fortawesome/fontawesome-free/css/fontawesome.css";
  import "@fortawesome/fontawesome-free/css/brands.css";
  import "@fortawesome/fontawesome-free/css/solid.css";

  import {
    AppShell,
    AppBar,
    TabGroup,
    TabAnchor,
    popup,
    LightSwitch,
    modeCurrent,
    autoModeWatcher,
  } from "@skeletonlabs/skeleton";
  import {
    computePosition,
    autoUpdate,
    offset,
    shift,
    flip,
    arrow,
  } from "@floating-ui/dom";
  import { storePopup } from "@skeletonlabs/skeleton";
  import { page } from "$app/stores";
  import { t } from "svelte-i18n";
  import { langs } from "$lib/i18n/langs";
  import { onMount } from "svelte";
  import { afterNavigate, beforeNavigate } from "$app/navigation";
  import SEO from "../components/SEO.svelte";

  export let data: LayoutData;

  storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
  onMount(() => {
    // Skeleton auto-mode watcher
    autoModeWatcher();

    // Disable browser scroll restoration
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  });
  afterNavigate(() => {
    // Force scroll to top or hash after navigation
    requestAnimationFrame(() => {
      const pageWrapper = document.querySelector("#page");
      const hash = window.location.hash;

      if (hash && document.querySelector(hash)) {
        // Scroll to hash target
        const targetElement = document.querySelector(hash) as HTMLElement;
        if (pageWrapper && targetElement) {
          const topPos = targetElement.offsetTop - 120; // offset for sticky nav
          pageWrapper.scrollTo({ top: topPos, left: 0, behavior: "smooth" });
        }
      } else {
        if (pageWrapper) {
          pageWrapper.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
    });
  });
  const deltaApps = [
    {
      link: "/download",
      label: "Mobile App",
    },
    {
      link: "/DSMSAccessTerminal",
      label: `DSMS ${$t("access_terminal")}`,
    },
    {
      link: "/explore",
      label: $t("explore"),
    },
    {
      link: "/ledger",
      label: $t("ledger"),
    },
    {
      link: "/canister-status",
      label: "Built on ICP",
    },
  ];
  const usefulLinks = [
    {
      link: "/roadmap",
      label: $t("roadmap"),
    },
    {
      link: "/whitepaper#introduction",
      label: $t("whitepaper"),
    },
    {
      link: "/blog",
      label: "Blog",
    },
    // {
    //   link: "./communities",
    //   label: $t("communities"),
    // },
    {
      link: "/terms_of_service",
      label: $t("termsOfService"),
    },
    {
      link: "/privacy_policy",
      label: $t("privacy_policy"),
    },
  ];

  const communities = [
    {
      icon: `<i class="fa-brands fa-discord"style="color:rgb(88, 101, 242)"></i>`,
      label: "Delta Kim DAO",
      link: "https://discord.gg/fw7mTD8Gha",
      creator: "CoreTeam",
    },
    {
      icon: `<i class="fa-brands fa-square-x-twitter" style="color:white"></i>`,
      label: "Delta Kim DAO",
      link: "https://x.com/TheDeltaKim",
      creator: "CoreTeam",
    },
    {
      icon: `<i class="fa-brands fa-telegram" style="color:#0088CC"></i>`,
      label: "Delta Kim",
      link: "https://t.me/TheDeltaKim",
      creator: "josephangengang@gmail.com",
    },
    {
      icon: `<i class="fa-brands fa-telegram" style="color:#0088CC"></i>`,
      label: "Delta Coin",
      link: "https://t.me/DeltaCoinMiners",
      creator: "magnohoved@gmail.com",
    },
    {
      icon: `<i class="fa-brands fa-telegram" style="color:#0088CC"></i>`,
      label: "Delta.🇮🇳 India",
      link: "https://t.me/delta_in",
      creator: "",
    },
    {
      icon: `<i class="fa-brands fa-square-x-twitter" style="color:white"></i>`,
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
      icon: `<i class="fa-brands fa-square-x-twitter" style="color:white"></i>`,
      label: "DeltaPioneers",
      link: "https://x.com/Deltapioneers",
      creator: "josephangengang@gmail.com",
    },
    {
      icon: `<i class="fa-brands fa-square-x-twitter" style="color:white"></i>`,
      label: "Delta Global",
      link: "https://x.com/thedeltaglobal",
      creator: "josephangengang@gmail.com",
    },
    {
      icon: `<i class="fa-brands fa-youtube"style="color:rgb(255, 0, 51)"></i>`,
      label: "DeltaCoinNews",
      link: "https://www.youtube.com/@DeltaCoinNews",
      creator: "princejames.biz@gmail.com",
    },
    {
      icon: ` <i class="fa-brands fa-telegram" style="color:#0088CC"></i>`,
      label: "DELTA.🇫🇷 Kim",
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
      icon: `<i class="fa-brands fa-facebook"style="color: rgb(8, 102, 255);"></i>`,
      label: "Delta facebook",
      link: "https://facebook.com/groups/1394421291722968/",
      creator: "josephangengang@gmail.com",
    },
    {
      icon: `<i class="fa-brands fa-telegram" style="color:#0088CC"></i>`,
      label: "Delta Pioneers",
      link: "https://t.me/DeltaNetworkPioneers",
      creator: "josephangengang@gmail.com",
    },
    {
      icon: `<i class="fa-brands fa-reddit" style="color:rgb(255, 69, 0);"></i>`,
      label: "Delta Crypto",
      link: "https://www.reddit.com/r/Delta_Crypto",
      creator: "princejames.biz@gmail.com",
    },
    {
      icon: `<img style="width: 15px;display: inline;"alt="delta medium"src="/img/medium.png"/>`,
      label: "Delta on ICP",
      link: "https://medium.com/@DeltaKimonICP/",
      creator: "",
    },
    {
      icon: `<i class="fa-brands fa-youtube"style="color:rgb(255, 0, 51)"></i>`,
      label: "delta.🇫🇷 Kim",
      link: "https://www.youtube.com/@deltakimfr",
      creator: "",
    },
    {
      icon: `<i class="fa-brands fa-telegram" style="color:#0088CC"></i>`,
      label: "Delta کوردی",
      link: "https://t.me/deltakurdish",
      creator: "viko.bradosty@gmail.com",
    },
    {
      icon: `<i class="fa-brands fa-whatsapp" style="color:#25d366"></i>`,
      label: "Delta.🇳🇬 NIG ",
      link: "https://chat.whatsapp.com/DEAD9pAQ9dmH60SVRqzZ9G",
      creator: "chizimuzoridenyi@outlook.com",
    },
    {
      icon: `<i class="fa-brands fa-whatsapp" style="color:#25d366"></i>`,
      label: "Delta Pioneers",
      link: "https://chat.whatsapp.com/Erg4ErXlbTh7LUfBwOq3Ik",
      creator: "",
    },
    {
      icon: `<i class="fa-brands fa-telegram" style="color:#0088CC"></i>`,
      label: "Delta Romania 🇷🇴",
      link: "https://t.me/DeltaRomania",
      creator: "cristian.nicula@icloud.com",
    },
    {
      icon: `<i class="fa-brands fa-tiktok" style="color:#000000"></i>`,
      label: "Delta Romania 🇷🇴",
      link: "https://tiktok.com/@deltaromania",
      creator: "cristian.nicula@icloud.com",
    },
    {
      icon: `<i class="fa-brands fa-telegram" style="color:#0088CC"></i>`,
      label: "Delta Iran 🇮🇷",
      link: "https://t.me/DeltaIranian",
      creator: "alirezanoori38404@gamil.com",
    },
    {
      icon: `<i class="fa-brands fa-discord"style="color:rgb(88, 101, 242)"></i>`,
      label: "Delta Romania 🇷🇴",
      link: "https://discord.gg/avywUbKDvh",
      creator: "cristian.nicula@icloud.com",
    },
    {
      icon: `<i class="fa-brands fa-telegram" style="color:#0088CC"></i>`,
      label: "Delta 🇳🇬 NIG ",
      link: "https://t.me/OfficialDeltakimNIG",
      creator: "chizimuzoridenyi@outlook.com",
    },
    {
      icon: `<i class="fa-brands fa-square-x-twitter" style="color:white"></i>`,
      label: "Delta India",
      link: "https://x.com/DeltaKimIndia",
      creator: "andrei_madalin@yahoo.com",
    },
    {
      icon: `<i class="fa-brands fa-instagram" style="color:white"></i>`,
      label: "Delta Romania",
      link: "https://www.instagram.com/delta.kimromania",
      creator: "andrei_madalin@yahoo.com",
    },
    {
      icon: `<i class="fa-brands fa-youtube"style="color:rgb(255, 0, 51)"></i>`,
      label: "Delta Romania",
      link: "https://www.youtube.com/@DeltaKimRomania",
      creator: "andrei_madalin@yahoo.com",
    },
    {
      icon: `<i class="fa-brands fa-whatsapp" style="color:#25d366"></i>`,
      label: "DELTA ACADEMY",
      link: "https://whatsapp.com/channel/0029VbAP8Oa1CYoPxixKtC3B",
      creator: "",
    },
    {
      icon: `<i class="fa-brands fa-whatsapp" style="color:#25d366"></i>`,
      label: "DELTA COIN",
      link: "https://chat.whatsapp.com/Fwoc1RkrkrLHsUmAKLh3hP",
      creator: "",
    },
    {
      icon: `<i class="fa-brands fa-whatsapp" style="color:#25d366"></i>`,
      label: "DELTA Kim Benin",
      link: "https://chat.whatsapp.com/IlniwHBT6X49gaDSkiEBWG",
      creator: "",
    },
    {
      icon: `<i class="fa-brands fa-whatsapp" style="color:#25d366"></i>`,
      label: "Delta DRC",
      link: "https://chat.whatsapp.com/IdHMRAx90t6E4Fdl1qYgfV",
      creator: "",
    },
    {
      icon: `<i class="fa-brands fa-telegram" style="color:#0088CC"></i>`,
      label: "Comunitatea Delta 🇷🇴",
      link: "https://t.me/deltakimnetworkromania",
      creator: "",
    },
    {
      icon: `<i class="fa-brands fa-whatsapp" style="color:#25d366"></i>`,
      label: "DELTA Kuki",
      link: "https://chat.whatsapp.com/LpHxuiy5VhVKOyTCVj9xNE",
      creator: "",
    },
    {
      icon: `<i class="fa-brands fa-telegram" style="color:#0088CC"></i>`,
      label: "Delta Astuces",
      link: "https://t.me/delta_astuces",
      creator: "",
    },
    {
      icon: `<i class="fa-brands fa-telegram" style="color:#0088CC"></i>`,
      label: "Delta Português 🇵🇹",
      link: "https://t.me/deltacoinmozambique",
      creator: "",
    },
    {
      icon: `<i class="fa-brands fa-whatsapp" style="color:#25d366"></i>`,
      label: "DELTA BURKINA 🇧🇫",
      link: "https://chat.whatsapp.com/I2SjVUY2xkGDNdJRNZLTRw",
      creator: "",
    },
    {
      icon: `<i class="fa-brands fa-whatsapp" style="color:#25d366"></i>`,
      label: "DELTA Tanzania 🇹🇿",
      link: "https://chat.whatsapp.com/CFk7onF96YE6XajMdJ5dcD",
      creator: "",
    },
    {
      icon: `<i class="fa-brands fa-whatsapp" style="color:#25d366"></i>`,
      label: "Delta Kim 🇨🇮",
      link: "https://chat.whatsapp.com/LVVMk6lb5YqKCMHADWFZCg",
      creator: "",
    },
    {
      icon: `<i class="fa-brands fa-square-x-twitter" style="color:white"></i>`,
      label: "Delta Kim 🇨🇮",
      link: "https://x.com/Delta_Civ",
      creator: "",
    },
    {
      icon: `<i class="fa-brands fa-whatsapp" style="color:#25d366"></i>`,
      label: "Delta Kim 🇺🇬",
      link: "https://chat.whatsapp.com/LOCGoR41yXI8hQnKtf7flL",
      creator: "",
    },
    {
      icon: `<i class="fa-brands fa-square-x-twitter" style="color:white"></i>`,
      label: "Deltakimafrica",
      link: "https://x.com/Deltakimafrica",
      creator: "",
    },
    {
      icon: `<i class="fa-brands fa-facebook"style="color: rgb(8, 102, 255);"></i>`,
      label: "DeltaKim",
      link: "https://www.facebook.com/profile.php?id=61562941726667",
      creator: "",
    },
    {
      icon: `<i class="fa-brands fa-whatsapp" style="color:#25d366"></i>`,
      label: "Delta Francophone",
      link: "https://chat.whatsapp.com/LkzhyLAJco91skDo3xMuL5?mode=ems_copy_c",
      creator: "",
    },
    {
      icon: `<i class="fa-brands fa-whatsapp" style="color:#25d366"></i>`,
      label: "Delta Kim Afrique",
      link: "https://chat.whatsapp.com/GyovOLw8T1h7kcK18n2rw0?mode=ac_t",
      creator: "",
    },
    {
      icon: `<i class="fa-brands fa-whatsapp" style="color:#25d366"></i>`,
      label: "Delta Rwanda",
      link: "https://chat.whatsapp.com/Ca8YMneT48w0a5UbVJzQPc",
      creator: "",
    },
    {
      icon: `<i class="fa-brands fa-whatsapp" style="color:#25d366"></i>`,
      label: "Delta 🇮🇳 India",
      link: "https://chat.whatsapp.com/FZCpCo39DaC3QV5X4DKxBu",
      creator: "",
    },
    {
      icon: `<i class="fa-brands fa-whatsapp" style="color:#25d366"></i>`,
      label: "Infos DELTA Kim 🇧🇯",
      link: "https://chat.whatsapp.com/IW7CNmVD9Nv45CveABfkKh",
      creator: "",
    },
    {
      icon: `<i class="fa-brands fa-telegram" style="color:#0088CC"></i>`,
      label: "Delta Indonesia 🇮🇩",
      link: "https://t.me/deltakim_indonesia",
      creator: "",
    },
    {
      icon: `<i class="fa-brands fa-whatsapp" style="color:#25d366"></i>`,
      label: "DELTA News EN/FR",
      link: "https://whatsapp.com/channel/0029VbCSAhu9Gv7MKg5cSN2S",
      creator: "",
    },
    {
      icon: `<i class="fa-brands fa-whatsapp" style="color:#25d366"></i>`,
      label: "DELTA Togo 🇹🇬",
      link: "https://chat.whatsapp.com/CTo8sfLSm1EHgytMGuI60x",
      creator: "",
    },
    {
      icon: `<i class="fa-brands fa-whatsapp" style="color:#25d366"></i>`,
      label: "DELTA Francophone",
      link: "https://whatsapp.com/channel/0029Vb76kFtJpe8YiGxAei31",
      creator: "",
    },
    {
      icon: `<i class="fa-brands fa-whatsapp" style="color:#25d366"></i>`,
      label: "DELTA Tanzania 🇹🇿",
      link: "https://chat.whatsapp.com/C4uNO50NXM95K9ooG6RPvS",
      creator: "",
    },
    {
      icon: `<i class="fa-brands fa-facebook"style="color: rgb(8, 102, 255);"></i>`,
      label: "DeltaKim Nigeria",
      link: "https://www.facebook.com/groups/1220053980248582/",
      creator: "",
    },
  ];
</script>

<!-- App Shell -->
<AppShell
  regionPage="relative bg-transparent"
  slotHeader="top-0"
  slotPageHeader="bg-transparent"
  slotPageFooter="mt-0"
>
  <!-- <svelte:fragment slot="header">header</svelte:fragment> -->
  <!--  <svelte:fragment slot="pageHeader"> -->
  <svelte:fragment slot="header">
    <!-- App Bar -->
    <!-- <div class="bg-primary"> -->
    <div
      class="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-gray-100 dark:border-slate-800 shadow-sm transition-colors duration-300"
    >
      <div class="container mx-auto px-4 lg:px-8">
        <AppBar background="bg-transparent dark:bg-transparent" padding="py-3">
          <svelte:fragment slot="lead">
            <!-- Desktop Logo -->
            <a
              href="/{data.lang}/home"
              class="flex items-center mr-6 hidden lg:flex"
            >
              <img
                src="/img/delta.logo.png"
                alt="Delta"
                class="h-10 object-contain"
              />
            </a>

            <!-- Mobile Menu & Logo -->
            <div class="flex items-center lg:hidden w-full justify-between">
              <div class="mr-4 relative">
                <button
                  use:popup={{
                    event: "click",
                    target: "mobileMenu",
                    placement: "bottom-start",
                    closeQuery: "a",
                    middleware: { offset: 12, shift: { padding: 8 } },
                  }}
                >
                  <i
                    class="fa-solid fa-bars text-2xl text-slate-800 dark:text-slate-200 transition-colors duration-300"
                  ></i>
                </button>
                <div
                  data-popup="mobileMenu"
                  class="z-[100] shadow-2xl rounded-2xl"
                >
                  <div
                    class="flex flex-col bg-white dark:bg-slate-900 rounded-2xl w-[280px] max-h-[75vh] overflow-y-auto p-4 gap-1 text-slate-800 dark:text-slate-100 font-bold border border-slate-100 dark:border-slate-800 transition-colors duration-300 overscroll-contain shadow-2xl"
                  >
                    <a
                      href="/{data.lang}/home"
                      class="p-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-xl transition-colors"
                      >{$t("home")}</a
                    >
                    <!-- <a
                      href="/{data.lang}/explore"
                      class="p-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-xl transition-colors"
                      >{$t("explore")}</a
                    > -->
                    <a
                      href="/{data.lang}/ledger"
                      class="p-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-xl transition-colors"
                      >{$t("ledger")}</a
                    >
                    <a
                      href="/{data.lang}/roadmap"
                      class="p-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-xl transition-colors"
                      >{$t("roadmap")}</a
                    >
                    <a
                      href="/{data.lang}/whitepaper"
                      class="p-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-xl transition-colors {$page.url.pathname.includes(
                        '/whitepaper',
                      )
                        ? 'text-primary'
                        : ''}">{$t("whitepaper")}</a
                    >
                    <a
                      href="/{data.lang}/blog"
                      class="p-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-xl transition-colors {$page.url.pathname.includes(
                        '/blog',
                      )
                        ? 'text-primary'
                        : ''}">Blog</a
                    >
                    <a
                      href="/{data.lang}/support"
                      class="p-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-xl transition-colors"
                      >{$t("faq")}</a
                    >
                    <a
                      href="/{data.lang}/DSMSAccessTerminal"
                      class="p-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-xl transition-colors"
                      >{$t("access_terminal")}</a
                    >
                    <a
                      href="/{data.lang}/canister-status"
                      class="p-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-xl transition-colors flex items-center"
                    >
                      Built on ICP <img
                        src="/img/icp-logo.svg"
                        width="20"
                        height="20"
                        class="inline-block ml-2"
                        alt="ICP Logo"
                      />
                    </a>
                    <div
                      class="border-t border-slate-100 dark:border-slate-700 mt-2 mx-2 pt-4 pb-2 flex items-center justify-between pointer-events-auto"
                    >
                      <span class="text-sm font-medium"
                        >Theme ({$modeCurrent === true
                          ? "Light"
                          : "Dark"})</span
                      >
                      <div class="scale-90 origin-right">
                        <LightSwitch />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <a
                href="/{data.lang}/home"
                class="flex-1 flex justify-center mr-8"
              >
                <img
                  src="/img/delta.logo.png"
                  alt="Delta"
                  class="h-8 object-contain"
                />
              </a>
            </div>
          </svelte:fragment>

          <!-- Desktop Center Navigation -->
          <div
            class="hidden lg:flex items-center justify-center gap-6 xl:gap-8 text-[15px] font-bold text-slate-700 dark:text-slate-200 transition-colors duration-300 w-full"
          >
            <a
              href="/{data.lang}/home"
              class="hover:text-primary transition-colors {$page.url.pathname.endsWith(
                '/home',
              )
                ? 'text-primary'
                : ''}">{$t("home")}</a
            >
            <!-- <a
              href="/{data.lang}/explore"
              class="hover:text-primary transition-colors {$page.url.pathname.endsWith(
                '/explore',
              )
                ? 'text-primary'
                : ''}">{$t("explore")}</a
            > -->
            <a
              href="/{data.lang}/ledger"
              class="hover:text-primary transition-colors {$page.url.pathname.endsWith(
                '/ledger',
              )
                ? 'text-primary'
                : ''}">{$t("ledger")}</a
            >
            <a
              href="/{data.lang}/roadmap"
              class="hover:text-primary transition-colors {$page.url.pathname.endsWith(
                '/roadmap',
              )
                ? 'text-primary'
                : ''}">{$t("roadmap")}</a
            >
            <a
              href="/{data.lang}/whitepaper"
              class="hover:text-primary transition-colors {$page.url.pathname.endsWith(
                '/whitepaper',
              )
                ? 'text-primary'
                : ''}">{$t("whitepaper")}</a
            >
            <a
              href="/{data.lang}/blog"
              class="hover:text-primary transition-colors {$page.url.pathname.endsWith(
                '/blog',
              )
                ? 'text-primary'
                : ''}">Blog</a
            >
            <a
              href="/{data.lang}/support"
              class="hover:text-primary transition-colors {$page.url.pathname.endsWith(
                '/support',
              )
                ? 'text-primary'
                : ''}">{$t("faq")}</a
            >
            <a
              href="/{data.lang}/DSMSAccessTerminal"
              class="hover:text-primary transition-colors {$page.url.pathname.endsWith(
                '/DSMSAccessTerminal',
              )
                ? 'text-primary'
                : ''}">{$t("access_terminal")}</a
            >
            <a
              href="/{data.lang}/canister-status"
              class="hover:text-primary transition-colors flex items-center gap-1.5 {$page.url.pathname.endsWith(
                '/canister-status',
              )
                ? 'text-primary'
                : ''}"
            >
              Build on ICP <img
                src="/img/icp-logo.svg"
                width="16"
                height="16"
                class="inline-block"
                alt="ICP Logo"
              />
            </a>
          </div>

          <svelte:fragment slot="trail">
            <div class="flex items-center gap-4 lg:gap-6">
              <ul class="lang relative z-50">
                <li
                  class="lable cursor-pointer flex items-center gap-1.5 text-slate-700 dark:text-slate-200 font-bold hover:text-primary transition-colors duration-300"
                >
                  <i class="fa-solid fa-language text-xl"></i>
                  <span class="hidden md:inline uppercase text-sm"
                    >{langs[data.lang]}</span
                  >
                </li>
                <li
                  class="list bg-white/90 dark:bg-slate-800/95 backdrop-blur-sm rounded-xl shadow-2xl border border-slate-100 dark:border-slate-700 mt-2 absolute right-0 w-32 max-h-64 overflow-y-auto no-scrollbar transition-colors duration-300"
                >
                  <ul class="p-2 flex flex-col gap-1">
                    {#each Object.keys(langs) as key}
                      <li>
                        <a
                          href={$page.url.pathname.replace(data.lang, key)}
                          class="block px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 transition-colors"
                        >
                          {langs[key]}
                        </a>
                      </li>
                    {/each}
                  </ul>
                </li>
              </ul>

              <div
                class="hidden md:flex items-center gap-3 mr-2 bg-slate-50 dark:bg-slate-800/50 px-3 py-1.5 rounded-full border border-slate-100 dark:border-slate-700 transition-colors duration-300"
              >
                <span
                  class="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider"
                  >{$modeCurrent === true ? "Light" : "Dark"}</span
                >
                <LightSwitch />
              </div>

              <a
                href="/{data.lang}/download"
                class="hidden md:flex bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white px-5 lg:px-6 py-2.5 rounded-full font-extrabold transition-all items-center gap-2 shadow-sm text-[15px] hover:-translate-y-0.5"
              >
                {$t("download")} <i class="fa-solid fa-arrow-right ml-1"></i>
              </a>
            </div>
          </svelte:fragment>
        </AppBar>
      </div>
    </div>
  </svelte:fragment>
  <!-- Page Route Content -->
  <main class="min-h-screen">
    <SEO
      title={$t("title_home")}
      description={$t("home_subheading")}
      lang={data.lang}
    />
    <slot />
  </main>

  <svelte:fragment slot="pageFooter">
    <footer class="bg-[#0f172a] text-slate-300 py-16 border-t border-slate-800">
      <div class="container mx-auto px-6 lg:px-8">
        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16"
        >
          <!-- Brand Column -->
          <div class="flex flex-col gap-6">
            <img
              src="/img/delta.logo.png"
              alt="Delta Logo"
              class="h-12 w-auto object-contain object-left opacity-90"
            />
            <p class="text-slate-400 text-sm leading-relaxed max-w-xs">
              {$t("home_subheading")}
            </p>
            <div class="flex items-center gap-4 mt-2">
              <a
                href="https://github.com/delta-kim/"
                target="_blank"
                rel="noreferrer"
                class="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-primary hover:text-white transition-colors"
                aria-label="GitHub Repository"
              >
                <i class="fa-brands fa-github text-lg"></i>
              </a>
            </div>
          </div>

          <!-- Apps Column -->
          <div>
            <h4 class="text-white font-bold text-lg mb-6 tracking-wide">
              Apps
            </h4>
            <ul class="flex flex-col gap-4">
              {#each deltaApps as item}
                <li>
                  <a
                    href={`/${data.lang}${item.link}`}
                    class="hover:text-primary transition-colors duration-300 font-light"
                  >
                    {item.label}
                  </a>
                </li>
              {/each}
            </ul>
          </div>

          <!-- Links Column -->
          <div>
            <h4 class="text-white font-bold text-lg mb-6 tracking-wide">
              Ecosystem
            </h4>
            <ul class="flex flex-col gap-4">
              {#each usefulLinks as item}
                <li>
                  <a
                    href={`/${data.lang}${item.link}`}
                    class="hover:text-primary transition-colors duration-300 font-light"
                  >
                    {item.label}
                  </a>
                </li>
              {/each}
            </ul>
          </div>

          <!-- Community Column -->
          <div>
            <h4 class="text-white font-bold text-lg mb-6 tracking-wide">
              Community
            </h4>
            <ul class="grid grid-cols-2 gap-y-4 gap-x-2">
              {#each communities as community}
                <li>
                  <a
                    href={community.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex items-center gap-2 hover:text-primary hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <span class="text-xl opacity-80"
                      >{@html community.icon}</span
                    >
                    <span class="text-sm font-light">{community.label}</span>
                  </a>
                </li>
              {/each}
            </ul>
          </div>
        </div>

        <!-- Footer Bottom -->
        <div
          class="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p class="text-sm text-slate-500 font-light">
            © {new Date().getFullYear()} Delta Web Project. Released under the MIT
            license.
          </p>
          <div class="flex gap-6 text-sm font-light">
            <a
              href="/{data.lang}/privacy_policy"
              class="hover:text-white transition-colors">Privacy Policy</a
            >
            <a
              href="/{data.lang}/terms_of_service"
              class="hover:text-white transition-colors">Terms of Service</a
            >
          </div>
        </div>
      </div>
    </footer>
  </svelte:fragment>
</AppShell>

<style lang="postcss">
  ul.lang {
    position: relative;
  }
  ul.lang .lable::after {
    content: ">";
    display: inline-block;
    padding-left: 5px;
    opacity: 0.6;
  }
  ul.lang:hover .lable::after {
    transform: rotate(90deg);
  }

  ul.lang .list {
    display: none;
    right: 0;
    position: absolute;
    @apply bg-white/90 dark:bg-slate-800/95 backdrop-blur-sm p-4 border border-slate-100 dark:border-slate-700 rounded-xl shadow-2xl;
    white-space: nowrap;
    z-index: 100;
  }
  ul.lang:hover .list {
    display: block;
  }
  ul.lang .list a:hover {
    @apply text-primary no-underline bg-slate-50 dark:bg-slate-700/50 rounded-lg;
  }

  footer {
    margin-top: 0 !important;
  }

  ul.lang .list:hover {
    display: block;
  }
</style>
