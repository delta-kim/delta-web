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
      link: "./communities",
      label: $t("communities"),
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

  const socials = [
    {
      icon: `<i class="fa-brands fa-discord"style="color:rgb(88, 101, 242)"></i>`,
      label: "Delta Kim DAO",
      link: "https://discord.gg/fw7mTD8Gha",
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
                      "/DSMSAccessTerminal"
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
        <div class="flex md:flex-row flex-col justify-between items-start">
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
          <div class="flex flex-row justify-between mt-3 md:mt-0">
            <ul
              class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2 justify-between"
            >
              {#each socials as social}
                <li class="text-md font-[500] text-blue-600 mb-1">
                  <a
                    href={social.link}
                    target="_blank"
                    class="flex items-center gap-x-1 bg-white rounded-full p-2"
                    title={social.label}
                  >
                    {@html social.icon}
                  </a>
                </li>
              {/each}
            </ul>
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

  .footerBack .container {
    padding: 5rem 0;
    background-image: url(/img/footer-bg.svg);
    background-repeat: no-repeat;
  }

  ul.lang .list:hover {
    display: block;
  }
</style>
