<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<script lang="ts">
	import { t, locale } from 'svelte-i18n';
	export let lang = 'en';
	locale.subscribe((_lang) => {
		console.log('locale.subscribe', _lang);
		lang = _lang || 'en';
	});
</script>

<svelte:head>
	<title>{$t('title_prefix')} - {$t('title_home')}</title>
</svelte:head>
<div class="2xl:px-9 h-full flex flex-col justify-center items-center">
	<section class="space-y-10 text-center flex flex-col md:flex-row items-stretch" style="">
		<div class="flex flex-col flex-1 px-3 justify-evenly gap-6 md:gap-0">
			<h1 class="h1 leading-normal font-bold text-left {lang.startsWith('zh') ? "" : "home_mianheading"}">
				<div class="forme"></div>
				{$t('home_mianheading')}
			</h1>
			<h3 class="h3 leading-normal text-left">
				{$t('home_subheading')}
			</h3>

			<div class="flex flex-wrap items-end justify-around">
				<div class="justify-center space-x-2">
					<a class="btn variant-filled" href="./download">{$t('download_delta_application_now')}</a>
				</div>
				<a class="text-current underline underline-offset-4" href="./explore">
					{$t('learn_more')}
				</a>
				<a class="text-current underline underline-offset-4 pl-36" href="./faq">
					{$t('faq')}
				</a>
			</div>
		</div>
		<div class="flex-1 flex flex-col">
			<figure class="pl-9 -mb-16">
				<section class="img-bg" />
				<div class="img-edge-cover  xl:w-5/6">
					<img alt="delta moble" src="/img/handheld.delta.png" />
				</div>
			</figure>
			<div class="flex flex-row justify-around xl:w-5/6">
				<figure class="">
					<img class="-mb-4" width="180" alt="No Private Key" src="/img/NoPrivateKey.svg" />
					<div class="text-lg font-semibold">{$t('no_private_key')}</div>
				</figure>
				<figure class="">
					<img class="-mb-4" width="180" alt="No Mnemonic Words" src="/img/NoMnemonicWords.svg" />
					<div class="text-lg font-semibold">{$t('no_mnemonic_words')}</div>
				</figure>
				<figure class="">
					<img class="-mb-4" width="180" alt="No Password" src="/img/NoPassword.svg" />
					<div class="text-lg font-semibold">{$t('no_password')}</div>
				</figure>
			</div>
		</div>
	</section>
</div>

<style lang="postcss">
	.img-edge-cover {
		position: relative;
	}
	.img-edge-cover:after {
		position: absolute;
		content: '';
		width: 37%;
		height: 21%;
		bottom: 0;
		right: 0;
		box-shadow: -10px -10px 8px 0px rgba(255, 204, 204, 0.5) inset;
	}
	figure {
		@apply flex relative flex-col;
	}
	.img-bg {
		@apply w-64 h-64 md:w-80 md:h-80;
	}
	.img-bg {
		@apply absolute z-[-1] rounded-full blur-[50px] transition-all;
		animation:
			pulse 5s cubic-bezier(0, 0, 0, 0.5) infinite,
			glow 5s linear infinite;
	}
	@keyframes glow {
		0% {
			@apply bg-primary-400/50;
		}
		33% {
			@apply bg-secondary-400/50;
		}
		66% {
			@apply bg-tertiary-400/50;
		}
		100% {
			@apply bg-primary-400/50;
		}
	}
	@keyframes pulse {
		50% {
			transform: scale(1.5);
		}
	}
	.home_mianheading {
		//width: 100%;
		margin-right: -11rem;
		/* height: 385px; */
		//border: 1px solid red;
	}
	.home_mianheading .forme {
		//height: 100%;
		width: 11rem;
		float: right;
		shape-outside: polygon(100% 0, 100% 100%, 0 100%);
	}
</style>
