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
<div class="container mx-auto h-full flex flex-col justify-center items-center">
  <div style="margin-bottom :-8rem;" class="pt-10 pb-32">
    <h2 class="h2 leading-normal text-center" style="opacity: 0.8;">
      {@html $t("explore_delta_heading")}
    </h2>
  </div>
  <!-- <svg
			style="height: 8rem;fill :white; width: 100%;"
			class="nectar-shape-divider"
			aria-hidden="true"
			fill=""
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 1000 300"
			preserveAspectRatio="none"
		>
			<path
				style="opacity :0.15"
				d="M 1000 299 l 2 -279 c -155 -36 -310 135 -415 164 c -102.64 28.35 -149 -32 -232 -31 c -80 1 -142 53 -229 80 c -65.54 20.34 -101 15 -126 11.61 v 54.39 z"
			></path>
			<path
				style="opacity :0.3"
				d="M 1000 286 l 2 -252 c -157 -43 -302 144 -405 178 c -101.11 33.38 -159 -47 -242 -46 c -80 1 -145.09 54.07 -229 87 c -65.21 25.59 -104.07 16.72 -126 10.61 v 22.39 z"
			></path>
			<path style="opacity :0"
				d="M 1000 300 l 1 -230.29 c -217 -12.71 -300.47 129.15 -404 156.29 c -103 27 -174 -30 -257 -29 c -80 1 -130.09 37.07 -214 70 c -61.23 24 -108 15.61 -126 10.61 v 22.39 z"
			></path>
			md:grid-cols-2 lg:grid-cols-3
		</svg> -->
  <div
    class="w-full text-token grid lg:grid-cols-3 xl:grid-cols-4 gap-4 py-10 px-4 lg:px-10 pl-4"
  >
    {#each explore_apps as app}
      <div
        class=" bg-white shadow-xl flex flex-col items-center justify-center border border-slate-400 rounded-xl p-5"
      >
        <div class="py-4 pl-4 flex flex-col items-center text-center gap-3">
          <figure class="mr-4 flex-none">
            <img width="80" alt={app.alt} src={app.image} />
          </figure>
          <div>
            <h3 class="h3">{@html app.title}</h3>
            <p>
              {@html app.subtitle}
            </p>
            {#if app.link != null}
              <a href={app.link} class="mt-2 underline">{$t("more…")}</a>
            {/if}
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>

<style lang="postcss">
  figure {
    @apply flex relative flex-col;
  }
</style>
