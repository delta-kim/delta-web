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

					<a
						href="https://t.me/deltacoinmining"
						target="_blank"
						title="Created by the community"
					>
						<i class="fa-brands fa-telegram"></i>
						<!--Creator: kbuhfils@gmail.com -->
						<span class="hidden md:inline" style="font-size: small;">DELTA COIN MINAGE</span>
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
				<div class="flex flex-row justify-around">
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
						<li><a href="./whitepaper">{$t("whitepaper")}</a></li>
						<li>
							<a href="./terms_of_service"
								>{$t("termsOfService")}</a
							>
						</li>
						<li>
							<a href="./privacy_policy">{$t("privacy_policy")}</a
							>
						</li>
						<li><a href="./support">{$t("support")}</a></li>
					</ul>
					<div class="hidden md:block md:w-px"></div>
					<a class="w-1/3 md:w-80" href="./home"
						><img
							src="/img/delta.logo.svg"
							style="opacity: 0.5"
							alt="Delta"
						/></a
					>
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

	ul.lang .list:hover {
		display: block;
	}
</style>
