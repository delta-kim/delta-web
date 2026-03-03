<script lang="ts">
    import { t } from "svelte-i18n";
    import { page } from "$app/stores";
    import SEO from "../../../components/SEO.svelte";

    export let data;

    // Mock blog database summary
    const blogPosts = [
        {
            slug: "open-letter-delta-day-2026",
            title: "AN OPEN LETTER TO THE DELTA COMMUNITY",
            date: "3rd March 2026",
            category: "Announcement",
            excerpt:
                "Haida, on behalf of the Delta Core Team, shares a heartfelt message about the journey, challenges, and the exciting future of the Delta ecosystem.",
        },
    ];
</script>

<SEO
    title="{$t('title_prefix')} - Blog"
    description="Latest news, updates, and deep dives into the Delta ecosystem."
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

    <div class="container mx-auto px-6 py-20 lg:py-32 relative z-10 max-w-5xl">
        <header class="text-center mb-20 animate-fade-in">
            <h1
                class="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 drop-shadow-sm transition-colors duration-300"
            >
                Blog Updates
            </h1>
            <p
                class="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
            >
                Latest news, updates, and deep dives into the Delta ecosystem.
            </p>
        </header>

        <div
            class="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in"
            style="animation-delay: 0.2s; animation-fill-mode: both;"
        >
            {#each blogPosts as post}
                <a
                    href="/{$page.params.lang}/blog/{post.slug}"
                    class="group block h-full"
                >
                    <div
                        class="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-md hover:shadow-xl border border-slate-100 dark:border-slate-700 h-full flex flex-col transition-all duration-300 transform group-hover:scale-[1.02]"
                    >
                        <div class="flex items-center justify-between mb-6">
                            <span
                                class="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider"
                            >
                                {post.category}
                            </span>
                            <span class="text-sm text-slate-500 font-medium">
                                {post.date}
                            </span>
                        </div>

                        <h2
                            class="text-2xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-primary transition-colors"
                        >
                            {post.title}
                        </h2>

                        <p
                            class="text-slate-600 dark:text-slate-400 flex-grow leading-relaxed mb-8"
                        >
                            {post.excerpt}
                        </p>

                        <div
                            class="mt-auto flex items-center text-primary font-semibold group-hover:gap-2 transition-all"
                        >
                            Read Article <i
                                class="fa-solid fa-arrow-right ml-2 text-sm"
                            ></i>
                        </div>
                    </div>
                </a>
            {/each}
        </div>
    </div>
</div>

<style>
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
