<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<script lang="ts">
	import { t } from 'svelte-i18n';
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
</script>

<section class="2xl:px-9 h-full flex flex-col justify-center items-center">
	<div class="flex flex-col-reverse md:flex-row px-4 md:px-0">
		<figure class="flex-1 items-center">
			<section class="img-bg" />
			<img src="/img/dsms_verifier_terminal.jpg" width="280" alt="delta app Home Screen" />
		</figure>
		<div class="flex flex-col justify-evenly flex-1 py-10 mt:py-0">
			<h4 class="h4 md:w-5/6 leading-normal font-bold">
				{@html $t('DSMS_access_terminal_heading')}
			</h4>
			<Accordion autocollapse width="md:w-5/6" class="card p-4 my-4 text-token">
				<AccordionItem open>
					<svelte:fragment slot="lead">
						<i class="fa-solid fa-question text-xl w-6 text-center" />
					</svelte:fragment>
					<svelte:fragment slot="summary">
						<h5 class="h5">{$t('access_terminal_question1')}</h5>
					</svelte:fragment>
					<svelte:fragment slot="content">
						<p style="background-color: #ffffff80;" class="p-2">
							{$t('access_terminal_answer1')}
							<a class="text-tertiary-500 underline pl-2" href="./whitepaper#3.6.3">{$t('link…')}</a>
						</p>
					</svelte:fragment>
				</AccordionItem>
				<AccordionItem>
					<svelte:fragment slot="lead">
						<i class="fa-solid fa-question text-xl w-6 text-center" />
					</svelte:fragment>
					<svelte:fragment slot="summary"
						><h5 class="h5">{$t('access_terminal_question2')}</h5></svelte:fragment
					>
					<svelte:fragment slot="content">
						<p style="background-color: #ffffff80;" class="p-2">
							{$t('access_terminal_answer2')}
						</p>
					</svelte:fragment>
				</AccordionItem>
				<AccordionItem>
					<svelte:fragment slot="lead">
						<i class="fa-solid fa-question text-xl w-6 text-center" />
					</svelte:fragment>
					<svelte:fragment slot="summary">
						<h5 class="h5">{$t('access_terminal_question3')}</h5>
					</svelte:fragment>
					<svelte:fragment slot="content">
						<p style="background-color: #ffffff80;" class="p-2">
							{$t('access_terminal_answer3')}
						</p>
					</svelte:fragment>
				</AccordionItem>
				<AccordionItem>
					<svelte:fragment slot="lead">
						<i class="fa-solid fa-question text-xl w-6 text-center" />
					</svelte:fragment>
					<svelte:fragment slot="summary">
						<h5 class="h5">{$t('access_terminal_question4')}</h5>
					</svelte:fragment>
					<svelte:fragment slot="content">
						<p style="background-color: #ffffff80;" class="p-2">
							{@html $t('access_terminal_answer4')}
						</p>
					</svelte:fragment>
				</AccordionItem>
			</Accordion>
			<p class="lg:w-5/6 my-4">
				{$t('about_3-No-Verification_to_whitepaper_chapters')}<a
					class="text-tertiary-500 underline pl-2"
					href="./whitepaper#3.4"
				>
					{$t('link…')}
				</a>
			</p>

			<div class="flex flex-row justify-evenly lg:w-5/6">
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
	.img-bg {
		@apply w-64 h-64 md:w-80 md:h-80;
	}
	.img-bg {
		@apply absolute z-[-1] rounded-full blur-[50px] transition-all;
		animation:
			pulse 5s cubic-bezier(0, 0, 0, 0.5) infinite,
			glow 5s linear infinite;
	}
</style>
