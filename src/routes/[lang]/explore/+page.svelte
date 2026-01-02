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

  const explore_apps = [
    {
      image: "/img/3-No-verification.svg",
      alt: "3-No-verification",
      title: $t("3No-Verification"),
      subtitle: $t("3No-Verification_desc"),
      link: $t("3No-Verification_link"),
    },
    {
      image: "/img/decentralization.svg",
      alt: "decentralization",
      title: $t("decentralization"),
      subtitle: $t("decentralization_desc"),
    },
    {
      image: "/img/mobilePriority.svg",
      alt: "mobile Priority",
      title: $t("mobile_first"),
      subtitle: $t("mobile_first_desc"),
      link: $t("mobile_first_link"),
    },
    {
      image: "/img/environmentallyFriendly.svg",
      alt: "environmentally Friendly",
      title: $t("environment_friendly"),
      subtitle: $t("environment_friendly_desc"),
      link: $t("environment_friendly_link"),
    },
    {
      image: "/img/safetyCircle.svg",
      alt: "safety Circle",
      title: $t("safety_circle"),
      subtitle: $t("safety_circle_desc"),
      link: $t("safety_circle_link"),
    },
    {
      image: "/img/fairness.svg",
      alt: "fairness",
      title: $t("fair_distribution"),
      subtitle: $t("fair_distribution_desc"),
      link: $t("fair_distribution_link"),
    },
    {
      image: "/img/multiChainWallet.svg",
      alt: "multiChain Wallet",
      title: $t("decentralized_multi-chain_wallet"),
      subtitle: $t("decentralized_multi-chain_wallet_desc"),
      link: $t("decentralized_multi-chain_wallet_link"),
    },
    {
      image: "/img/Web3.svg",
      alt: "Web3",
      title: $t("web3_application_center"),
      subtitle: $t("web3_application_center_desc"),
      link: $t("web3_application_center_link"),
    },
    {
      image: "/img/ICPicon.svg",
      alt: "ICP",
      title: $t("ICP_smart_blockchain"),
      subtitle: $t("ICP_smart_blockchain_desc"),
      link: $t("ICP_smart_blockchain_link"),
    },
    {
      image: "/img/DAO.svg",
      alt: "DAO",
      title: $t("DAO_governance_model"),
      subtitle: $t("ICP_smart_blockchain_desc"),
      link: $t("DAO_governance_model_link"),
    },
  ];
</script>

<svelte:head>
  <title>{$t("title_prefix")} - {$t("explore")}</title>
</svelte:head>
<div class="container mx-auto pb-20 px-4">
  <div class="pt-16 pb-16 text-center max-w-3xl mx-auto">
    <h2
      class="text-4xl md:text-5xl font-bold text-slate-800 mb-6 leading-tight"
    >
      {@html $t("explore_delta_heading")}
    </h2>
    <div class="h-1 w-20 bg-blue-600 mx-auto rounded-full"></div>
  </div>

  <div
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 max-w-7xl mx-auto"
  >
    {#each explore_apps as app}
      <div
        class="group bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-start h-full"
      >
        <div
          class="mb-6 p-4 rounded-2xl bg-blue-50 group-hover:bg-blue-100 transition-colors"
        >
          <img
            width="64"
            height="64"
            alt={app.alt}
            src={app.image}
            class="w-16 h-16 object-contain"
          />
        </div>

        <h3 class="text-xl font-bold text-slate-900 mb-3">{@html app.title}</h3>

        <p class="text-slate-600 leading-relaxed mb-6 flex-grow">
          {@html app.subtitle}
        </p>

        {#if app.link != null}
          <a
            href={app.link}
            class="inline-flex items-center text-blue-600 font-semibold group-hover:text-blue-700 transition-colors"
          >
            {$t("more…")}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        {/if}
      </div>
    {/each}
  </div>
</div>
