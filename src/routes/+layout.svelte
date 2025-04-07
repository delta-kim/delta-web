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
  import type { LayoutData } from "./$types";

  export let data: LayoutData;

  storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
  onMount(() => {
    console.log("layout onMount");
    // console.log($page.url);
    // console.log(data.lang);
  });

  const deltaApps = [
    {
      link: "./download",
      label: "Mobile App",
    },
    {
      link: "./DSMSAccessTerminal",
      label: `DSMS ${$t("access_terminal")}`,
    },
    {
      link: "./explore",
      label: $t("explore"),
    },
  ];
  const usefulLinks = [
    {
      link: "./roadmap",
      label: $t("roadmap"),
    },
    {
      link: "./whitepaper",
      label: $t("whitepaper"),
    },
    {
      link: "./terms_of_service",
      label: $t("termsOfService"),
    },
    {
      link: "./privacy_policy",
      label: $t("privacy_policy"),
    },
  ];

  const communities = [
    {
      icon: `<i class="fa-brands fa-discord"style="color:rgb(88, 101, 242)"></i>`,
      label: "Delta Kim DAO",
      link: "https://discord.gg/fw7mTD8Gha",
      creator: "",
    },
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
      icon: `<i class="fa-brands fa-facebook"style="color:rgb(8, 102, 255)"></i>`,
      label: "Delta δ بالعربي",
      link: "https://www.facebook.com/groups/9774910459215134",
      creator: "kbuhfils@gmail.com",
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
      label: "Delta.🇮🇳 India",
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
      label: "delta.🇫🇷 Kim",
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
    {
      icon: `<i class="fa-brands fa-whatsapp" style="color:#25d366"></i>`,
      label: "DELTA NETWORK",
      link: "https://chat.whatsapp.com/KM17LYtiafpCbkmkQa8Pau",
      creator: "",
    },
    {
      icon: `<i class="fa-brands fa-facebook" style="color: rgb(8, 102, 255);"></i>`,
      label: "DELTA Minage",
      link: "https://www.facebook.com/share/195yPi4xKa/",
      creator: "",
    },
    {
      icon: `<i class="fa-brands fa-telegram" style="color:#0088CC"></i>`,
      label: "DSMS validators",
      link: "https://t.me/+9CtwcPRD3-YxNGY0",
      creator: "",
    },
    {
      icon: `<i class="fa-brands fa-whatsapp" style="color:#25d366"></i>`,
      label: "DELTA.🇳🇬 Nigerian",
      link: "https://chat.whatsapp.com/IspshMN2PTA2UCl27Jg48V",
      creator: "",
    },
    {
      icon: `<i class="fa-brands fa-whatsapp" style="color:#25d366"></i>`,
      label: "Delta miners",
      link: "https://chat.whatsapp.com/KoRkXd7VqSeDtu0DlxbYIS",
      creator: "",
    },
    {
      icon: `<i class="fa-brands fa-facebook" style="color: rgb(8, 102, 255);"></i>`,
      label: "DELTA کوردی",
      link: "https://www.facebook.com/share/g/1A9jYD7BnQ/",
      creator: "viko.bradosty@gmail.com",
    },
    {
      icon: `<i class="fa-brands fa-telegram" style="color:#0088CC"></i>`,
      label: "Delta کوردی",
      link: "https://t.me/deltakurdish",
      creator: "viko.bradosty@gmail.com",
    },
    {
      icon: `<i class="fa-brands fa-square-x-twitter" style="color:black"></i>`,
      label: "δ Network",
      link: "https://x.com/DeltaCoreTeam",
      creator: "",
    },
    {
      icon: `<i class="fa-brands fa-whatsapp" style="color:#25d366"></i>`,
      label: "PIONEERS global",
      link: "https://chat.whatsapp.com/KERNMTagC5I3xvOw33Whp3",
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
                    href="./DSMSAccessTerminal"
                    selected={$page.url.pathname.endsWith(
                      "/DSMSAccessTerminal",
                    )}
                  >
                    <span>{$t("access_terminal")}</span>
                  </TabAnchor>

                  <TabAnchor
                    href="./whitepaper"
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
              href="./DSMSAccessTerminal"
              selected={$page.url.pathname.endsWith("/DSMSAccessTerminal")}
            >
              <span>{$t("access_terminal")}</span>
            </TabAnchor>

            <TabAnchor
              href="./whitepaper"
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
                  <a href={item.link}>{item.label}</a>
                </li>
              {/each}
            </ul>
            <ul>
              <li class="text-lg font-[600] mb-3">Useful Links</li>
              {#each usefulLinks as item}
                <li class="text-lg font-[300]">
                  <a href={item.link}>{item.label}</a>
                </li>
              {/each}
            </ul>
          </div>
          <div class="footerLogoBack p-4 mt-5 md:mt-0 md:w-1/2">
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
            <div class="flex flex-row justify-between">
              <ul
                class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2 justify-between"
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
