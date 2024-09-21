<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<script lang="ts">
	import { t } from 'svelte-i18n';
</script>

<section class="2xl:px-9 h-full flex flex-col justify-center items-center">
	<div class="flex flex-col-reverse md:flex-row">
		<figure class="flex-1 items-center">
			<section class="img-bg" />
			<img src="/img/appMain.png" width="280" alt="delta app Home Screen" />
		</figure>
		<div class="flex flex-col justify-evenly flex-1 px-3">
			<h2 class="h2 lg:w-5/6 leading-normal font-bold">
				{$t('download_heading')}
			</h2>
			<ul class="lg:w-5/6 my-4">
				<li class="my-2">{@html $t('download_desc1')}</li>
				<li class="my-2">
					{$t('is_no_referrer_DID_yet')}，
					<a
						class="underline underline-offset-2"
						target="_blank"
						href="https://www.google.com/search?q=Delta+referrer+DID"
					>
						{$t('search_find_delta_referrer')}
					</a>
				</li>
				<li class="my-2">{$t('download_desc2')}</li>
			</ul>

			<div class="flex flex-row justify-evenly mb-8 md:mb-40 lg:w-5/6">
				<figure class="w-2/6">
					<a target="_blank" href="https://play.google.com/store/apps/details?id">
						<img
							class="border-2 rounded-md w-full card-hover"
							src="/img/google_play.svg"
							alt="google play"
						/>
					</a>
				</figure>
				<figure class="w-2/6">
					<a target="_blank" href="https://apps.apple.com/us/app/">
						<img
							class="border-2 rounded-md w-full card-hover"
							src="/img/apple_store.svg"
							alt="apple store"
						/>
					</a>
				</figure>
			</div>
		</div>
	</div>
</section>

<style lang="postcss">
	figure {
		@apply flex relative flex-col;
	}
	figure, .img-bg {
		@apply w-64 h-64 md:w-80 md:h-80;
	}
	.img-bg {
		@apply absolute z-[-1] rounded-full blur-[50px] transition-all;
		animation:
			pulse 5s cubic-bezier(0, 0, 0, 0.5) infinite,
			glow 5s linear infinite;
	}
</style>
