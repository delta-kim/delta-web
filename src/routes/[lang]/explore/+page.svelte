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
</script>

<svelte:head>
	<title>{$t("title_prefix")} - {$t("explore")}</title>
</svelte:head>
<div class="2xl:px-9 h-full flex flex-col justify-center items-center">
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
	<div class="w-full text-token flex flex-wrap p-10">
		<div class="pb-8 pr-8 w-full md:w-1/2 lg:w-1/3">
			<div
				class="card variant-soft card-hover py-4 pl-4 flex flex-row leading-none"
			>
				<figure class="mr-4 flex-none">
					<img
						width="80"
						alt="3-No-verification"
						src="/img/3-No-verification.svg"
					/>
				</figure>
				<div>
					<h3 class="h3">{$t("3No-Verification")}</h3>
					<p>
						{$t("3No-Verification_desc")}
					</p>
					<p class="-mt-3 text-right pr-4 underline">
						<a href="./whitepaper#3-no-verification"
							>{$t("more…")}</a
						>
					</p>
				</div>
			</div>
		</div>

		<div class="pb-8 pr-8 w-full md:w-1/2 lg:w-1/3">
			<div class="card variant-soft card-hover py-4 px-8 flex flex-row">
				<figure class="mr-4 flex-none">
					<img
						class=""
						width="100"
						alt="decentralization"
						src="/img/decentralization.svg"
					/>
				</figure>
				<div>
					<h3 class="h3">{$t("decentralization")}</h3>
					<p>{$t("decentralization_desc")}</p>
				</div>
			</div>
		</div>

		<div class="pb-8 pr-8 w-full md:w-1/2 lg:w-1/3">
			<div class="card variant-soft card-hover py-4 px-8 flex flex-row">
				<figure class="mr-4 flex-none">
					<img
						class=""
						width="100"
						alt="mobile Priority"
						src="/img/mobilePriority.svg"
					/>
				</figure>
				<div>
					<h3 class="h3">{$t("mobile_first")}</h3>
					<p>{$t("mobile_first_desc")}</p>
					<p class="text-right">
						<a href="./whitepaper#mobile_phone_mining"
							>{$t("more…")}</a
						>
					</p>
				</div>
			</div>
		</div>

		<div class="pb-8 pr-8 w-full md:w-1/2 lg:w-1/3">
			<div class="card variant-soft card-hover py-4 px-8 flex flex-row">
				<figure class="mr-4 flex-none">
					<img
						width="100"
						alt="environmentally Friendly"
						src="/img/environmentallyFriendly.svg"
					/>
				</figure>
				<div>
					<h3 class="h3">{$t("environment_friendly")}</h3>
					<p>{$t("environment_friendly_desc")}</p>
					<p class="text-right -mt-3">
						<a
							href="./whitepaper#energy_consumption_and_environmental_issues"
							>{$t("more…")}</a
						>
					</p>
				</div>
			</div>
		</div>
		<div class="pb-8 pr-8 w-full md:w-1/2 lg:w-1/3">
			<div
				class="card variant-soft card-hover py-4 {lang.startsWith('zh')
					? 'px-8'
					: 'pl-8'} flex flex-row"
			>
				<figure class="mr-4 flex-none">
					<img
						width="100"
						alt="safety Circle"
						src="/img/safetyCircle.svg"
					/>
				</figure>
				<div>
					<h3 class="h3">{$t("safety_circle")}</h3>
					<p>{$t("safety_circle_desc")}</p>
					<p class="text-right -mt-3 pr-4">
						<a href="./whitepaper#safety_circle">{$t("more…")}</a>
					</p>
				</div>
			</div>
		</div>
		<div class="pb-8 pr-8 w-full md:w-1/2 lg:w-1/3">
			<div
				class="card variant-soft card-hover py-4 pl-8 flex flex-row {lang.startsWith(
					'zh',
				)
					? ''
					: 'leading-none'}"
			>
				<figure class="mr-4 flex-none">
					<img width="100" alt="fairness" src="/img/fairness.svg" />
				</figure>
				<div>
					<h3 class="h3">{$t("fair_distribution")}</h3>
					<p>{$t("fair_distribution_desc")}</p>
					<p class="text-right -mt-3 pr-4">
						<a href="./whitepaper#economic_model">{$t("more…")}</a>
					</p>
				</div>
			</div>
		</div>
		<div class="pb-8 pr-8 w-full md:w-1/2 lg:w-1/3">
			<div class="card variant-soft card-hover py-4 px-8 flex flex-row">
				<figure class="mr-4 flex-none">
					<img
						width="100"
						alt="multi chain wallet"
						src="/img/multiChainWallet.svg"
					/>
				</figure>
				<div>
					<h3 class="h3">
						{@html $t("decentralized_multi-chain_wallet")}
					</h3>
					<p>{$t("decentralized_multi-chain_wallet_desc")}</p>
					<p class="text-right pr-4 -mt-3">
						<a href="./whitepaper#decentralized_multi-chain_wallet"
							>{$t("more…")}</a
						>
					</p>
				</div>
			</div>
		</div>
		<div class="pb-8 pr-8 w-full md:w-1/2 lg:w-1/3">
			<div class="card variant-soft card-hover py-4 px-8 flex flex-row">
				<figure class="mr-4 flex-none justify-center">
					<img width="100" alt="Web3" src="/img/Web3.svg" />
				</figure>
				<div>
					<h3 class="h3">{@html $t("web3_application_center")}</h3>
					<p>{$t("web3_application_center_desc")}</p>
					<p class="text-right pr-4 -mt-3">
						<a href="./whitepaper#dApp_square">{$t("more…")}</a>
					</p>
				</div>
			</div>
		</div>
		<div class="pb-8 pr-8 w-full md:w-1/2 lg:w-1/3">
			<div class="card variant-soft card-hover py-4 pl-4 flex flex-row">
				<figure class="mr-4 flex-none justify-center">
					<img width="100" alt="ICP" src="/img/ICPicon.svg" />
				</figure>
				<div>
					<h3 class="h3">{$t("ICP_smart_blockchain")}</h3>
					<p>{$t("ICP_smart_blockchain_desc")}</p>
					<p class="text-right pr-4 -mt-3">
						<a href="./whitepaper#technology_and_implementation"
							>{$t("more…")}</a
						>
					</p>
				</div>
			</div>
		</div>
		<div class="pb-8 pr-8 w-full md:w-1/2 lg:w-1/3">
			<div
				class="card variant-soft card-hover py-4 {lang.startsWith('zh')
					? 'px-8'
					: 'pl-8'} flex flex-row col-start-2"
			>
				<figure class="mr-4 flex-none">
					<img width="100" alt="DAO" src="/img/DAO.svg" />
				</figure>
				<div>
					<h3 class="h3">{@html $t("DAO_governance_model")}</h3>
					<p>{$t("DAO_governance_model_desc")}</p>
					<p class="text-right pr-4">
						<a href="./whitepaper#DAO_mode">{$t("more…")}</a>
					</p>
				</div>
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	figure {
		@apply flex relative flex-col;
	}
</style>
