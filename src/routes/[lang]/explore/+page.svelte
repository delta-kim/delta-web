<script lang="ts">
  import type { PageData } from "./$types";
  import { t, locale } from "svelte-i18n";
  import { onMount } from "svelte";
  import ExploreCard from "../../../components/ExploreCard.svelte";
  import SEO from "../../../components/SEO.svelte";

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

<SEO
  title="{$t('title_prefix')} - {$t('explore')}"
  description="Explore the innovative features of the Delta ecosystem, from keyless mobile mining to decentralized governance."
  lang={data.lang}
/>

<div class="container mx-auto pb-20 px-4">
  <div class="pt-16 pb-16 text-center max-w-3xl mx-auto">
    <h2
      class="text-2xl md:text-4xl lg:text-5xl font-bold text-slate-800 dark:text-white mb-6 leading-tight transition-colors duration-300"
    >
      {@html $t("explore_delta_heading")}
    </h2>
    <div
      class="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full opacity-80 mb-2"
    ></div>
  </div>
  <div
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 max-w-7xl mx-auto"
  >
    {#each explore_apps as app}
      <ExploreCard
        image={app.image}
        title={app.title}
        subtitle={app.subtitle}
        link={app.link}
      />
    {/each}
  </div>
</div>
