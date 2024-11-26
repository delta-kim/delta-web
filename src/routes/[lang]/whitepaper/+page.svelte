<script lang="ts">
	import { afterUpdate, onMount } from "svelte";
	//import { TableOfContents, tocCrawler } from '@skeletonlabs/skeleton';
	import type { PageData } from "./$types";
	export let data: PageData;

	/** @type {import('svelte/action').Action}  */
	function tocCrawler(node: HTMLDivElement) {
		// the node has been mounted in the DOM
		//console.log('tocCrawler init', node);
		node.querySelectorAll("p").forEach((p) => {
			p.classList.add("indent-8");
			p.classList.add("mb-2");
		});
		node.querySelectorAll("ul").forEach((ul) => {
			ul.classList.add("mb-2");
			ul.classList.add("list-inside");
			ul.classList.add("ml-4");
		});
		let headlines = node.querySelectorAll("h2,h3,h4");

		function onWindowScroll(e: WindowEventMap["scroll"]): void {
			if (!headlines?.length) return;
			const targetElem = e.target;
			if (!(targetElem instanceof HTMLElement))
				throw new Error("scrollTarget is not an HTMLElement");

			const scrollableTop = targetElem.getBoundingClientRect().top || 0;
			const headingSizeThreshold = 40; // px

			for (const elemHeading of headlines) {
				const headerBoundTop = elemHeading.getBoundingClientRect().top;
				const offsetTop =
					headerBoundTop - scrollableTop + headingSizeThreshold;
				if (offsetTop >= 0) {
					for (const elem of document.querySelectorAll(
						".toc-list li a.text-primary-500",
					)) {
						elem.classList.remove("text-primary-500");
					}
					document
						.querySelector(`a[href="#${elemHeading.id}"]`)
						?.classList.add("text-primary-500");
					return;
				}
			}
		}
		let pageElem = document.querySelector("#page");
		pageElem?.addEventListener("scroll", onWindowScroll);
		return {
			update() {},
			destroy() {
				pageElem?.removeEventListener("scroll", onWindowScroll);
			},
		};
	}

	onMount(() => {
		console.log("onMount");
		if (document.querySelector("head script#MathJax-script") == null) {
			const script = document.createElement("script");
			script.src =
				"https://cdn.jsdelivr.net/npm/mathjax@3.2.2/es5/tex-mml-chtml.min.js";
			script.id = "MathJax-script";
			script.async = true;
			document.head.appendChild(script);
			console.log("src");
		} else {
			if ((window as any).MathJax && (window as any).MathJax.typeset) {
				(window as any).MathJax.typeset();
			}
		}
	});
	afterUpdate(function () {
		if ((window as any).MathJax && (window as any).MathJax.typeset) {
			(window as any).MathJax.typeset();
		}
	});
</script>

<div class="flex-auto w-full h-full flex flex-col md:flex-row gap-8">
	<aside
		id="sidebar-left"
		class="md:sticky md:top-0 md:w-1/3"
		style="display: block; height: min-content"
	>
		<h3 class="h3 my-4">{data.catas.shift()?.text}</h3>
		<nav
			class="toc space-y-4 overflow-y-auto inset-0"
			data-testid="toc"
			style="height: 80vh;"
		>
			<ul class="toc-list space-y-2">
				{#each data.catas as cata}
					<li class="toc-list-item block {cata.addClass.join(' ')}">
						<a
							href="#{cata.id}"
							class="toc-anchor text-ellipsis overflow-hidden"
							style="display: inline-block;">{cata.text}</a
						>
					</li>
				{/each}
			</ul>
		</nav>
	</aside>
	<div class="container px-1 2xl:px-10 h-full mx-auto flex flex-col justify-center">
		<div use:tocCrawler id="whitePaper">
			{@html data.content}
		</div>
	</div>
</div>

<style lang="css">
</style>
