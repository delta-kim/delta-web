<script lang="ts">
    import { t } from "svelte-i18n";
    export let image: string;
    export let title: string;
    export let subtitle: string;
    export let link: string | null = null;
</script>

<div
    class="bg-white dark:bg-slate-800 rounded-[2rem] p-8 shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group flex flex-col h-full"
>
    <div
        class="mb-8 w-16 h-16 rounded-2xl bg-slate-50 dark:bg-slate-700/50 flex items-center justify-center group-hover:bg-primary/10 transition-colors"
    >
        <img
            src={image}
            alt={title}
            class="w-10 h-10 object-contain group-hover:scale-110 transition-transform dark:brightness-150"
        />
    </div>
    <h3
        class="text-2xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight transition-colors duration-300"
    >
        {@html title}
    </h3>
    <p
        class="text-slate-600 dark:text-slate-300 leading-relaxed text-lg flex-grow transition-colors duration-300"
    >
        {@html subtitle}
    </p>

    {#if link != null}
        <div
            class="mt-3 pt-2 border-t border-slate-50 dark:border-slate-700/50"
        >
            <a
                href={link}
                class="inline-flex items-center text-primary font-bold group-hover:text-green-700 dark:group-hover:text-green-400 transition-colors text-lg"
            >
                {$t("more…")}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2.5"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                </svg>
            </a>
        </div>
    {/if}
</div>
