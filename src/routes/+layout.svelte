<script lang="ts">
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
  import type { LayoutData } from "./$types";

  export let data: LayoutData;

  storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
  onMount(() => {
    // Disable browser scroll restoration
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  });
  afterNavigate(() => {
    // Force scroll to top after navigation
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
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
      icon: `<i class="fa-brands fa-square-x-twitter" style="color:black"></i>`,
      label: "Delta Kim DAO",
      link: "https://x.com/TheDeltaKim",
      creator: "CoreTeam",
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
      icon: `<i class="fa-brands fa-telegram" style="color:#0088CC"></i>`,
      label: "Delta Global",
      link: "https://t.me/GlobalDeltaCoin",
      creator: "josephangengang@gmail.com",
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
      icon: `<i class="fa-brands fa-square-x-twitter" style="color:black"></i>`,
      label: "DeltaPioneers",
      link: "https://x.com/Deltapioneers",
      creator: "josephangengang@gmail.com",
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
      icon: `<i class="fa-brands fa-square-x-twitter" style="color:black"></i>`,
      label: "Delta India",
      link: "https://x.com/DeltaKimIndia",
      creator: "andrei_madalin@yahoo.com",
    },
    {
      icon: `<i class="fa-brands fa-instagram" style="color:#000000"></i>`,
      label: "Delta Romania",
      link: "https://www.instagram.com/delta.kimromania?igsh=MTdrYndqdjJrc25mMw%3D%3D&utm_source=qr",
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
      link: "https://chat.whatsapp.com/HjleH8lEGJP4yphmlonHjZ?mode=ac_t",
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
      icon: `<i class="fa-brands fa-square-x-twitter" style="color:black"></i>`,
      label: "Delta Kim 🇨🇮",
      link: "https://x.com/Delta_Civ?t=ZfBtLfc9je3WGn9PuR5ogA&s=09",
      creator: "",
    },
    {
      icon: `<i class="fa-brands fa-whatsapp" style="color:#25d366"></i>`,
      label: "Delta Kim 🇺🇬",
      link: "https://chat.whatsapp.com/LOCGoR41yXI8hQnKtf7flL",
      creator: "",
    },
    {
      icon: `<i class="fa-brands fa-square-x-twitter" style="color:black"></i>`,
      label: "DeltaKimGal",
      link: "https://x.com/DeltaKimGal?t=2O1l4QJp5yugSxdvN58yMw&s=09",
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
      link: "https://chat.whatsapp.com/L3L4Ynpnhfu4FvSHBYAW2n",
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
      link: "https://chat.whatsapp.com/G6cH0qe5rg2KwE6vlNMSfO?mode=wwt",
      creator: "",
    },
  ];
</script>

<!-- App Shell -->
<AppShell regionPage="relative" slotHeader="top-0" slotPageFooter="mt-4">
  <!-- <svelte:fragment slot="header">header</svelte:fragment> -->
  <!--  <svelte:fragment slot="pageHeader"> -->
  <svelte:fragment slot="header">
    <!-- App Bar -->
    <!-- <div class="bg-primary"> -->
    <div>
      <div class="container mx-auto">
        <AppBar background="">
          <svelte:fragment slot="lead">
            <figure class="ml-4 hidden lg:block">
              <img
                src="/img/delta.logo.png"
                width="300"
                alt="Delta"
                class="object-contain"
              />
            </figure>
            <ul class="menu lg:hidden">
              <li><i class="fa-solid fa-bars"></i></li>
              <li class="list">
                <TabGroup
                  justify="flex-col"
                  active="bg-surface-500"
                  border=""
                  rounded="rounded-full"
                  class="text-black"
                >
                  <TabAnchor
                    href="./home"
                    selected={$page.url.pathname.endsWith("/home")}
                  >
                    <span>{$t("home")}</span>
                  </TabAnchor>
                  <TabAnchor
                    href="./download"
                    selected={$page.url.pathname.endsWith("/download")}
                  >
                    <span>{$t("download")}</span>
                  </TabAnchor>
                  <TabAnchor
                    href="./explore"
                    selected={$page.url.pathname.endsWith("/explore")}
                  >
                    <span>{$t("explore")}</span>
                  </TabAnchor>
                  <TabAnchor
                    href="./ledger"
                    selected={$page.url.pathname.endsWith("/ledger")}
                  >
                    <span>{$t("ledger")}</span>
                  </TabAnchor>
                  <TabAnchor
                    href="./DSMSAccessTerminal"
                    selected={$page.url.pathname.endsWith(
                      "/DSMSAccessTerminal",
                    )}
                  >
                    <span>{$t("access_terminal")}</span>
                  </TabAnchor>

                  <TabAnchor
                    href="./whitepaper#introduction"
                    selected={$page.url.pathname.endsWith("/whitepaper")}
                  >
                    <span>{$t("whitepaper")}</span>
                  </TabAnchor>
                  <TabAnchor
                    href="./support"
                    selected={$page.url.pathname.endsWith("/support")}
                  >
                    <span>{$t("faq")}</span>
                  </TabAnchor>
                  <TabAnchor
                    href="./canister-status"
                    selected={$page.url.pathname.endsWith("/canister-status")}
                  >
                    <span class="flex items-center"
                      >Built on ICP <img
                        src="/img/icp-logo.svg"
                        width="30"
                        height="30"
                        class="inline-block ml-1"
                        alt="ICP Logo"
                      /></span
                    >
                  </TabAnchor>
                </TabGroup>
              </li>
            </ul>
          </svelte:fragment>
          <figure class="w-5/6 sm:w-4/6 lg:hidden">
            <img src="/img/delta.logo.png" alt="Delta" />
          </figure>
          <TabGroup
            justify="justify-center"
            border=""
            class="hidden lg:block text-black"
          >
            <TabAnchor
              href="/{data.lang}/home"
              selected={$page.url.pathname.endsWith("/home")}
            >
              <span>{$t("home")}</span>
            </TabAnchor>
            <TabAnchor
              href="/{data.lang}/download"
              selected={$page.url.pathname.endsWith("/download")}
            >
              <span>{$t("download")}</span>
            </TabAnchor>
            <TabAnchor
              href="/{data.lang}/explore"
              selected={$page.url.pathname.endsWith("/explore")}
            >
              <span>{$t("explore")}</span>
            </TabAnchor>
            <TabAnchor
              href="/{data.lang}/ledger"
              selected={$page.url.pathname.endsWith("/ledger")}
            >
              <span>{$t("ledger")}</span>
            </TabAnchor>
            <TabAnchor
              href="/{data.lang}/DSMSAccessTerminal"
              selected={$page.url.pathname.endsWith("/DSMSAccessTerminal")}
            >
              <span>{$t("access_terminal")}</span>
            </TabAnchor>

            <TabAnchor
              href="/{data.lang}/whitepaper"
              selected={$page.url.pathname.endsWith("/whitepaper")}
            >
              <span>{$t("whitepaper")}</span>
            </TabAnchor>
            <TabAnchor
              href="/{data.lang}/support"
              selected={$page.url.pathname.endsWith("/support")}
            >
              <span>{$t("faq")}</span>
            </TabAnchor>
            <TabAnchor
              href="/{data.lang}/canister-status"
              selected={$page.url.pathname.endsWith("/canister-status")}
            >
              <span class="flex items-center"
                >Built on ICP <img
                  src="/img/icp-logo.svg"
                  width="30"
                  height="30"
                  class="inline-block ml-1"
                  alt="ICP Logo"
                /></span
              >
            </TabAnchor>
          </TabGroup>
          <svelte:fragment slot="trail">
            <ul class="lang">
              <li class="lable">
                <i class="fa-solid fa-language text-black text-xl"></i>
                <span class="hidden md:inline">{langs[data.lang]}</span>
              </li>
              <li class="list">
                <ul>
                  {#each Object.keys(langs) as key}
                    <li>
                      <a href={$page.url.pathname.replace(data.lang, key)}>
                        {langs[key]}</a
                      >
                    </li>
                  {/each}
                </ul>
              </li>
            </ul>
            <a
              class="btn btn-sm border border-black"
              href="https://github.com/delta-kim"
              target="_blank"
              rel="noreferrer"
            >
              <i class="fa-brands fa-github"></i>
              <span class="hidden md:inline">GitHub</span>
            </a>
          </svelte:fragment>
        </AppBar>
      </div>
    </div>
  </svelte:fragment>
  <!-- Page Route Content -->
  <slot />

  <svelte:fragment slot="pageFooter">
    <div class="footerBack bg-slate-900 text-white px-6 md:px-0">
      <div class="py-9 container mx-auto">
        <div class="flex md:flex-row flex-col justify-around items-start">
          <div class="flex flex-row flex-wrap md:justify-around md:w-1/2 gap-5">
            <ul>
              <li class="text-lg font-[600] mb-3">Apps</li>
              {#each deltaApps as item}
                <li class="text-lg font-[300]">
                  <a href={`/${data.lang}${item.link}`}>{item.label}</a>
                </li>
              {/each}
            </ul>
            <ul>
              <li class="text-lg font-[600] mb-3">Useful Links</li>
              {#each usefulLinks as item}
                <li class="text-lg font-[300]">
                  <a href={`/${data.lang}${item.link}`}>{item.label}</a>
                </li>
              {/each}
            </ul>
          </div>
          <div class="footerLogoBack p-4 mt-5 md:mt-0 md:w-[75%]">
            <div class="flex justify-between mb-2">
              <p class="text-xl font-bold text-primary">
                Community social media channels
              </p>
              <img
                src="/img/delta.logo.png"
                alt="DELTA LOGO"
                class="w-[60px] object-contain"
              />
            </div>
            <div class="flex flex-row justify-between mb-1">
              <ul
                class="grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-2 justify-between"
              >
                {#each communities as community}
                  <li class="font-[500] text-blue-600">
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
            <div
              class="hidden lg:block text-sm text-center"
              style="color: orange;"
            >
              "ann.: New links are not accepted for the time being. Since some
              channels are found to spread pornographic content, we plan to
              develop a "media center" driven and managed by the community in
              the future to eliminate unhealthy content (2025-03-16)"
            </div>
          </div>
        </div>
        <p class="text-center text-md mt-10">
          {`© Delta Web Project 2023-${new Date().getFullYear()} Released under the
          MIT license`}
        </p>
      </div>
    </div>
  </svelte:fragment>
</AppShell>

<style lang="postcss">
  ul.lang,
  ul.menu {
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

  ul.lang .list,
  ul.menu .list {
    display: none;
    right: 0;
    position: absolute;
    background-color: #ffffffd9;
    padding: 13px;
    border: 1px solid #dfdfdf;
    white-space: nowrap;
    z-index: 100;
  }
  ul.menu .list {
    right: unset;
  }
  ul.lang:hover .list,
  ul.menu:hover .list {
    display: block;
  }
  ul.lang .list a:hover {
    text-decoration: underline;
  }

  footer {
    margin-top: 0 !important;
  }
  .footerBack .container {
    padding: 5rem 0;
    background-image: url(/img/footer-bg.svg);
    background-repeat: no-repeat;
  }

  .footerLogoBack {
    background-color: white;
    border-radius: 20px;
  }

  ul.lang .list:hover {
    display: block;
  }
</style>
