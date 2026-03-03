<script lang="ts">
  import type { PageData } from "./$types";
  import { afterUpdate, onMount } from "svelte";
  import { t } from "svelte-i18n";
  import SEO from "../../../components/SEO.svelte";

  export let data: PageData;

  /** @type {import('svelte/action').Action}  */
  function tocCrawler(node: HTMLDivElement) {
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
        const offsetTop = headerBoundTop - scrollableTop + headingSizeThreshold;
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
    if (document.querySelector("head script#MathJax-script") == null) {
      const script = document.createElement("script");
      script.src =
        "https://cdn.jsdelivr.net/npm/mathjax@3.2.2/es5/tex-mml-chtml.min.js";
      script.id = "MathJax-script";
      script.async = true;
      document.head.appendChild(script);
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

<SEO
  title="{$t('title_prefix')} - {$t('whitepaper')}"
  description="Detailed technical implementation and vision of the Delta ecosystem."
  lang={data.lang}
/>

<div
  class="min-h-screen bg-[#f8fafc] dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-sans selection:bg-primary/30 relative transition-colors duration-300"
>
  <!-- Background Glow -->
  <div class="absolute inset-0 z-0 pointer-events-none overflow-hidden">
    <div
      class="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"
    ></div>
    <div
      class="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-secondary/5 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"
    ></div>
  </div>

  <div class="container mx-auto px-6 py-20 lg:py-32 relative z-10 max-w-7xl">
    <header class="text-center mb-16 animate-fade-in">
      <h1
        class="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 drop-shadow-sm transition-colors duration-300"
      >
        {$t("whitepaper")}
      </h1>
      <div
        class="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full opacity-80"
      ></div>
    </header>

    <div
      class="flex-auto w-full h-full flex flex-col md:flex-row items-start gap-8 text-slate-700 animate-fade-in"
      style="animation-delay: 0.2s; animation-fill-mode: both;"
    >
      <aside
        id="sidebar-left"
        class="w-full md:w-1/4 md:sticky md:top-32 bg-white/50 dark:bg-slate-800/80 backdrop-blur-md rounded-3xl p-6 border border-slate-100 dark:border-slate-700/50 shadow-sm self-start h-auto max-h-[80vh] overflow-y-auto no-scrollbar transition-colors duration-300"
      >
        <h3
          class="text-xl font-bold text-slate-900 dark:text-white mb-6 transition-colors duration-300"
        >
          {data.catas.length > 0 ? data.catas[0]?.text : "Contents"}
        </h3>
        <nav class="toc space-y-4" data-testid="toc">
          <ul class="toc-list space-y-3">
            {#each data.catas as cata, idx}
              {#if idx !== 0}
                <li class="toc-list-item block {cata.addClass.join(' ')}">
                  <a
                    href="#{cata.id}"
                    class="toc-anchor text-sm block truncate text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary font-medium transition-colors"
                    >{cata.text}</a
                  >
                </li>
              {/if}
            {/each}
          </ul>
        </nav>
      </aside>

      <div
        class="w-full md:w-3/4 bg-white dark:bg-slate-800 rounded-[2.5rem] p-6 md:p-14 shadow-xl border border-slate-100 dark:border-slate-700 content-wrapper transition-colors duration-300 overflow-x-hidden"
      >
        <div use:tocCrawler id="whitePaper">
          {@html data.content}
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }

  /* Target dynamically generated whitepaper HTML using global scope to ensure styles apply */
  :global(#whitePaper) {
    color: #475569;
    font-size: 1.125rem;
    line-height: 1.8;
  }
  :global(#whitePaper h2),
  :global(#whitePaper h3),
  :global(#whitePaper h4) {
    color: #0f172a;
    font-weight: 800;
    margin-top: 2.5rem;
    margin-bottom: 1.5rem;
    line-height: 1.3;
    letter-spacing: -0.025em;
  }
  :global(#whitePaper h2) {
    font-size: 2rem;
  }
  :global(#whitePaper h3) {
    font-size: 1.5rem;
  }
  :global(#whitePaper h4) {
    font-size: 1.25rem;
  }

  :global(#whitePaper p) {
    margin-bottom: 1.5rem;
  }
  :global(#whitePaper ul) {
    list-style-type: disc !important;
    padding-left: 1.5rem !important;
    margin-bottom: 1.5rem;
  }
  :global(#whitePaper li) {
    margin-bottom: 0.5rem;
  }
  :global(#whitePaper a) {
    color: #3b82f6;
    text-decoration: underline;
    text-underline-offset: 4px;
    font-weight: 500;
  }
  :global(#whitePaper a:hover) {
    color: #2563eb;
  }

  /* Dark mode overrides for generated HTML */
  :global(.dark #whitePaper) {
    color: #f8fafc; /* slate-50 */
  }
  :global(.dark #whitePaper h1),
  :global(.dark #whitePaper h2),
  :global(.dark #whitePaper h3),
  :global(.dark #whitePaper h4) {
    color: #ffffff;
  }
  :global(.dark #whitePaper a) {
    color: #60a5fa; /* blue-400 */
  }
  :global(.dark #whitePaper a:hover) {
    color: #93c5fd; /* blue-300 */
  }

  @keyframes blob {
    0% {
      transform: translate(0px, 0px) scale(1);
    }
    33% {
      transform: translate(30px, -50px) scale(1.1);
    }
    66% {
      transform: translate(-20px, 20px) scale(0.9);
    }
    100% {
      transform: translate(0px, 0px) scale(1);
    }
  }
  .animate-blob {
    animation: blob 7s infinite;
  }
  .animation-delay-2000 {
    animation-delay: 2s;
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .animate-fade-in {
    animation: fadeIn 1s ease-out;
  }
</style>
