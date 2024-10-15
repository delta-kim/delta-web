<script lang="ts">
	import { t } from "svelte-i18n";
	import { onMount } from "svelte";
	import { popup } from "@skeletonlabs/skeleton";
	// import type { PopupSettings } from "@skeletonlabs/skeleton";
	import { createActor } from "../../../declarations/RoadMap/index";
	import { ic_host } from "../../../lib/store";
	import StatusTag from "../../../components/StatusTag.svelte";

	let canisterId = "ufamd-fyaaa-aaaak-qlo2q-cai";
	let roadNodes: any[] = [];
	let index2s: number[] = [];
	let max = 0;
	let mod = 0;
	onMount(async () => {
		const actor = await createActor(canisterId, {
			agentOptions: { host: $ic_host },
		});
		roadNodes = await actor.listRoadNodes();
		roadNodes.reverse();
		index2s = new Array(Math.floor(roadNodes.length / 2));
		mod = roadNodes.length % 2;
		console.log(roadNodes);
	});

	function formatDate(bi: BigInt) {
		return new Date(Number(bi) * 1000).toLocaleString();
	}

	// Call the IC
</script>

<div>
	<h1 class="h1 my-10">路线图</h1>

	{#each index2s as key, i}
		<div class="flex flex-row items-center">
			<div class="card p-4 w-1/3" style="">
				<h3 class="card-header">{roadNodes[i * 2].title}</h3>
				<div class="p-2" style="height: 8rem;overflow: overlay">
					{@html roadNodes[i * 2].content}
				</div>
				<div class="card-footer" style="padding-bottom: 0;">
					<button
						class="btn bg-initial"
						use:popup={{
							event: "hover",
							target: "popupFeatured" + i * 2,
							placement: "bottom",
						}}
					>
						<StatusTag status={roadNodes[i * 2].status} />
					</button>
					<!-- --- -->
					<div
						class="card p-4 w-72 shadow-xl"
						data-popup={`popupFeatured${i * 2}`}
					>
						<div class="space-y-4">
							<ul class="list">
								{#each roadNodes[i * 2].progressLine as item}
									<li class="flex flex-row justify-between">
										<StatusTag status={item[0]} />
										<span class="text-xs">
											{formatDate(item[1])}
										</span>
									</li>
								{/each}
							</ul>
						</div>
					</div>
					<!-- --- -->
				</div>
			</div>
			<div
				class="bg-surface-100 w-1/3 line-x {i % 2 == 0 &&
					'transform180'}"
			></div>
			<div class="card p-4 w-1/3">
				<h3 class="card-header">{roadNodes[i * 2 + 1].title}</h3>
				<div class="p-2" style="height: 8rem;overflow: overlay">
					{@html roadNodes[i * 2 + 1].content}
				</div>
				<div class="card-footer" style="padding-bottom: 0;">
					<button
						class="btn bg-initial"
						use:popup={{
							event: "hover",
							target: `popupFeatured${i * 2 + 1}`,
							placement: "bottom",
						}}
					>
						<StatusTag status={roadNodes[i * 2 + 1].status} />
					</button>
					<!-- --- -->
					<div
						class="card p-4 w-72 shadow-xl"
						data-popup={`popupFeatured${i * 2 + 1}`}
					>
						<div class="space-y-4">
							<ul class="list">
								{#each roadNodes[i * 2 + 1].progressLine as item}
									<li class="flex flex-row justify-between">
										<StatusTag status={item[0]} />
										<span class="text-xs">
											{formatDate(item[1])}
										</span>
									</li>
								{/each}
							</ul>
						</div>
					</div>
					<!-- --- -->
				</div>
			</div>
		</div>
		<div class="flex {i % 2 ? 'flex-row' : 'flex-row-reverse'}">
			<div
				class="flex flex-row justify-center w-1/3"
				style="height: 6rem"
			>
				<div class="line-y"></div>
			</div>
		</div>
	{/each}
	{#if mod == 0}
		<div
			class="flex {index2s.length - (1 % 2)
				? 'flex-row'
				: 'flex-row-reverse'}"
		>
			<div
				class="flex flex-row justify-center w-1/3"
				style="height: 6rem"
			>
				<div class="card p-4 w-1/3">
					<div
						class="p-2 flex flex-row justify-center"
						style="height: 10rem;"
					>
						<img
							alt="launch"
							style="height: 8rem;"
							src="/img/launch.png"
						/>
					</div>
					<div
						class="card-footer flex flex-row justify-center"
						style="padding-bottom: 0;"
					>
						<button class="btn bg-initial">{$t("launch")}</button>
					</div>
				</div>
			</div>
		</div>
	{:else}
		<div class="flex flex-row items-center">
			<div class="card p-4 w-1/3" style="">
				<h3 class="card-header">
					{roadNodes[roadNodes.length - 1].title}
				</h3>
				<div class="p-2" style="height: 8rem;overflow: overlay">
					{@html roadNodes[roadNodes.length - 1].content}
				</div>
				<div class="card-footer" style="padding-bottom: 0;">
					<button
						class="btn bg-initial"
						use:popup={{
							event: "hover",
							target: "popupFeatured" + roadNodes.length,
							placement: "bottom",
						}}
					>
						<StatusTag
							status={roadNodes[roadNodes.length - 1].status}
						/>
					</button>
					<!-- --- -->
					<div
						class="card p-4 w-72 shadow-xl"
						data-popup={`popupFeatured${roadNodes.length}`}
					>
						<div class="space-y-4">
							<ul class="list">
								{#each roadNodes[roadNodes.length - 1].progressLine as item}
									<li class="flex flex-row justify-between">
										<StatusTag status={item[0]} />
										<span class="text-xs">
											{formatDate(item[1])}
										</span>
									</li>
								{/each}
							</ul>
						</div>
					</div>
					<!-- --- -->
				</div>
			</div>
			<div
				class="bg-surface-100 w-1/3 line-x {0 % 2 == 0 &&
					'transform180'}"
			></div>
			<div class="card p-4 w-1/3">
				<div
					class="p-2 flex flex-row justify-center"
					style="height: 10rem;"
				>
					<img
						alt="launch"
						style="height: 8rem;"
						src="/img/launch.png"
					/>
				</div>
				<div
					class="card-footer flex flex-row justify-center"
					style="padding-bottom: 0;"
				>
					<button class="btn bg-initial">{$t("launch")}</button>
				</div>
			</div>
		</div>
	{/if}
</div>

<style lang="postcss">
	.line-x {
		height: 2rem;
		background-image: url(/img/progress_arrow.png);
		background-repeat: repeat-x;
		background-position: center;
	}

	.transform180 {
		transform: rotate(180deg);
	}

	.line-y {
		width: 2rem;
		height: 100%;
		background-image: url(/img/progress_arrow1.png);
		background-repeat: repeat-y;
		background-position: center;
	}
</style>
