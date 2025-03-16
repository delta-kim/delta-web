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
</script>

<!-- App Shell -->
<AppShell regionPage="relative" slotHeader="top-0" slotPageFooter="mt-4">
	<!-- <svelte:fragment slot="header">header</svelte:fragment> -->
	<!--  <svelte:fragment slot="pageHeader"> -->
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<div class="container mx-auto">
			<AppBar background="">
				<svelte:fragment slot="lead">
					<figure class="ml-4 hidden lg:block">
						<img
							src="/img/delta.logo.svg"
							width="300"
							alt="Delta"
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
								class=""
							>
								<TabAnchor
									href="./home"
									selected={$page.url.pathname.endsWith(
										"/home",
									)}
								>
									<span>{$t("home")}</span>
								</TabAnchor>
								<TabAnchor
									href="./download"
									selected={$page.url.pathname.endsWith(
										"/download",
									)}
								>
									<span>{$t("download")}</span>
								</TabAnchor>
								<TabAnchor
									href="./explore"
									selected={$page.url.pathname.endsWith(
										"/explore",
									)}
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
									selected={$page.url.pathname.endsWith(
										"/whitepaper",
									)}
								>
									<span>{$t("whitepaper")}</span>
								</TabAnchor>
							</TabGroup>
						</li>
					</ul>
				</svelte:fragment>
				<figure class="w-5/6 sm:w-4/6 lg:hidden">
					<img src="/img/delta.logo.svg" alt="Delta" />
				</figure>
				<TabGroup
					justify="justify-center"
					border=""
					class="hidden lg:block"
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
				</TabGroup>
				<svelte:fragment slot="trail">
					<ul class="lang">
						<li class="lable">
							<i
								class="fa-solid fa-language text-surface-600 text-xl"
							></i>
							<span class="hidden md:inline"
								>{langs[data.lang]}</span
							>
						</li>
						<li class="list">
							<ul>
								{#each Object.keys(langs) as key}
									<li>
										<a
											href={$page.url.pathname.replace(
												data.lang,
												key,
											)}
										>
											{langs[key]}</a
										>
									</li>
								{/each}
							</ul>
						</li>
					</ul>
					<a
						class="btn btn-sm variant-ghost-surface"
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
	</svelte:fragment>
	<!-- Page Route Content -->
	<div class="container mx-auto">
		<slot />
	</div>
	<svelte:fragment slot="pageFooter">
		<div class="footerBack">
			<div class="container mx-auto">
				<div class="flex md:flex-row flex-col justify-around">
					<div class="flex flex-row justify-around md:w-1/2">
						<ul>
							<li><a href="./download">Delta App</a></li>
							<li>
								<a href="./DSMSAccessTerminal"
									>DSMS {$t("access_terminal")}</a
								>
							</li>
							<li><a href="./roadmap">{$t("roadmap")}</a></li>
							<li><a href="./explore">{$t("explore")}</a></li>
						</ul>
						<ul>
							<li>
								<a href="./whitepaper">{$t("whitepaper")}</a>
							</li>
							<li>
								<a href="./terms_of_service"
									>{$t("termsOfService")}</a
								>
							</li>
							<li>
								<a href="./privacy_policy"
									>{$t("privacy_policy")}</a
								>
							</li>
							<li><a href="./support">{$t("support")}</a></li>
						</ul>
					</div>
					<div
						class="footerLogoBack pr-1 md:-mt-8 mt-1 md:w-1/2"
						style="min-height : 96px;"
					>
						<div style="color:green;" class="pl-1">
							Community social media channels
						</div>
						<div class="flex flex-row justify-around">
							<ul class="pl-2 lg:pl-4">
								<li>
									<a
										href="https://t.me/deltacoinmining"
										target="_blank"
									>
										<i
											class="fa-brands fa-telegram"
											style="color:#0088CC"
										></i>
										<!--Creator: kbuhfils@gmail.com -->
										<span style="font-size: small;"
											>DELTA COIN MINAGE</span
										>
									</a>
								</li>
								<li>
									<a
										href="https://t.me/DeltaCoinMiners"
										target="_blank"
									>
										<i
											class="fa-brands fa-telegram"
											style="color:#0088CC"
										></i>
										<!--Creator: magnohoved@gmail.com -->
										<span style="font-size: small;"
											>Delta Coin</span
										>
									</a>
								</li>
								<li>
									<a
										href="https://x.com/DeltaCoinNews"
										target="_blank"
									>
										<i
											class="fa-brands fa-square-x-twitter"
											style="color:black"
										></i>
										<!--Creator: princejames.biz@gmail.com -->
										<span style="font-size: small;"
											>DeltaCoinNews</span
										>
									</a>
								</li>
								<li>
									<a
										href="https://t.me/DeltaCoinNews"
										target="_blank"
									>
										<i
											class="fa-brands fa-telegram"
											style="color:#0088CC"
										></i>
										<!--Creator: princejames.biz@gmail.com -->
										<span style="font-size: small;"
											>DELTA COIN CHANNEL</span
										>
									</a>
								</li>
								<li>
									<a
										href="https://www.youtube.com/@DeltaCoinNews"
										target="_blank"
									>
										<i
											class="fa-brands fa-youtube"
											style="color:rgb(255, 0, 51)"
										></i>
										<!--Creator: princejames.biz@gmail.com -->
										<span style="font-size: small;"
											>Delta Coin Minage</span
										>
									</a>
								</li>
								<li>
									<a
										href="https://t.co/JlN1ieKUeQ"
										target="_blank"
									>
										<i
											class="fa-brands fa-facebook"
											style="color: rgb(8, 102, 255);"
										></i>
										<!--Creator: adimadojoel08@gmail.com -->
										<span style="font-size: small;"
											>Delta in Africa</span
										>
									</a>
								</li>
							</ul>
							<ul class="pl-2 lg:pl-4">
								<li>
									<a
										href="https://t.me/deltafrancophone"
										target="_blank"
									>
										<i
											class="fa-brands fa-telegram"
											style="color:#0088CC"
										></i>
										<!--Creator: josephangengang@gmail.com -->
										<span style="font-size: small;"
											>DELTA 🇫🇷</span
										>
									</a>
								</li>
								<li>
									<a
										href="https://discord.gg/8XNeDAun75"
										target="_blank"
									>
										<i
											class="fa-brands fa-discord"
											style="color:rgb(88, 101, 242)"
										></i>
										<!--Creator: magnohoved@gmail.com -->
										<span style="font-size: small;"
											>Delta Coin</span
										>
									</a>
								</li>
								<li>
									<a
										href="https://www.facebook.com/share/14rvbXR1fv9/"
										target="_blank"
									>
										<i
											class="fa-brands fa-facebook"
											style="color:rgb(8, 102, 255)"
										></i>
										<!--Creator: kbuhfils@gmail.com -->
										<span style="font-size: small;"
											>Delta Coin Minage</span
										>
									</a>
								</li>
								<li>
									<a
										href="https://www.youtube.com/@DeltaOnICPBlockchain"
										target="_blank"
									>
										<!--Creator: choudharysushobhan97@gmail.com -->
										<i
											class="fa-brands fa-youtube"
											style="color:rgb(255, 0, 51)"
										></i>
										<span style="font-size: small;"
											>Delta On ICP</span
										>
									</a>
								</li>
								<li>
									<a
										href="https://chat.whatsapp.com/ERxqenilgXc9RG13RwWAdP"
										target="_blank"
									>
										<!--Creator: kbuhfils@gmail.com -->
										<i
											class="fa-brands fa-whatsapp"
											style="color:#25d366"
										></i>
										<span style="font-size: small;"
											>DELTA NETWORK</span
										>
									</a>
								</li>
								<li>
									<a
										href="https://www.youtube.com/@deltakimfr"
										target="_blank"
									>
										<!--Creator: josephangengang@gmail.com -->
										<i
											class="fa-brands fa-youtube"
											style="color:rgb(255, 0, 51)"
										></i>
										<span style="font-size: small;"
											>Delta kim 🇫🇷</span
										>
									</a>
								</li>
							</ul>
							<ul class="pl-2 lg:pl-4">
								<!--
								<li>
									<a
										href="https://t.me/+n-bytOLp7NcyN2M0"
										target="_blank"
									>
										<i
											class="fa-brands fa-telegram"
											style="color:#0088CC"
										></i>
										< Creator: 色情 >
										<span style="font-size: small;"
											>DTC Afrique</span
										>
									</a>
								</li>-->

								<li>
									<a
										href="https://x.com/Deltapioneers?t=jVLBg-2g-ATJbEbmMi_X7w&s=09"
										target="_blank"
									>
										<i
											class="fa-brands fa-square-x-twitter"
											style="color:black"
										></i>
										<!--Creator: josephangengang@gmail.com -->
										<span style="font-size: small;"
											>DeltaPioneers</span
										>
									</a>
								</li>

								<li>
									<a
										href="https://facebook.com/groups/1394421291722968/"
										target="_blank"
									>
										<i
											class="fa-brands fa-facebook"
											style="color: rgb(8, 102, 255);"
										></i>
										<!--Creator: josephangengang@gmail.com -->
										<span style="font-size: small;"
											>Delta facebook</span
										>
									</a>
								</li>
								<li>
									<a
										href="https://chat.whatsapp.com/EKPHb5BuX5p3yiQVEJ5z72"
										target="_blank"
									>
										<i
											class="fa-brands fa-whatsapp"
											style="color:#25d366"
										></i>
										<!--Creator: josephangengang@gmail.com -->
										<span style="font-size: small;"
											>Delta Pioneers</span
										>
									</a>
								</li>
								<li>
									<a
										href="https://t.me/DeltaNetworkPioneers"
										target="_blank"
									>
										<i
											class="fa-brands fa-telegram"
											style="color:#0088CC"
										></i>
										<!--Creator: josephangengang@gmail.com -->
										<span style="font-size: small;"
											>Delta Pioneers</span
										>
									</a>
								</li>
							</ul>
							<div class="lg:w-2/6 hidden lg:block" style="color: orange;font-size: x-small;">
								ann.: New links are not accepted for the
								time being. Since some channels are found to
								spread pornographic content, we plan to develop
								a "media center" driven and managed by the
								community in the future to eliminate unhealthy
								content (2025-03-16)
							</div>
						</div>
					</div>
				</div>
				<p class="text-center py-4">
					© Delta Web Project 2023-{new Date().getFullYear()} Released
					under the MIT license
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

	.footerBack {
		background-image: radial-gradient(
				at 0% 0%,
				rgba(var(--color-secondary-500) / 0.33) 0px,
				transparent 50%
			),
			radial-gradient(
				at 98% 1%,
				rgba(var(--color-error-500) / 0.33) 0px,
				transparent 50%
			);
		//background-position: top;
	}
	.footerBack .container {
		padding-top: 3rem;
		background-image: url(/img/footer-bg.svg);
		background-repeat: no-repeat;
	}

	.footerLogoBack {
		background-color: rgba(255, 255, 255, 0.5);
		background-image: url(/img/delta.logo.svg);
		background-repeat: no-repeat;
		background-position: center center;
		background-size: auto 90px;
		background-blend-mode: overlay;
	}

	ul.lang .list:hover {
		display: block;
	}
</style>
