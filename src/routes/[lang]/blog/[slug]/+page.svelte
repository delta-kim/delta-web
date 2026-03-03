<script lang="ts">
    import { t } from "svelte-i18n";
    import { page } from "$app/stores";
    import SEO from "../../../../components/SEO.svelte";

    export let data;

    // Mock blog database
    const blogPosts = {
        "open-letter-delta-day-2026": {
            title: "AN OPEN LETTER TO THE DELTA COMMUNITY",
            date: "3rd March 2026",
            category: "Announcement",
            excerpt:
                "Haida, on behalf of the Delta Core Team, shares a comprehensive message reflecting on double-digit growth, technical breakthroughs, and the ambitious vision for Delta's future ecosystem.",
            content: `
        <div class="space-y-6 text-slate-700 dark:text-slate-200 leading-relaxed">
          <p class="text-xl font-bold text-slate-900 dark:text-white">AN OPEN LETTER TO THE DELTA COMMUNITY</p>

          <p>Hello, Deltans!</p>
          <p>Today marks the first time the Deltans around the world are publicly celebrating <strong>“Delta Day”</strong> together, making this occasion quite special.</p>
          
          <p>Since 2023, every “Delta Day” has quietly been a day of coding behind the scenes. Hundreds of days and nights of technical dedication ensured that when our system was officially released in November 2024, it demonstrated strong reliability. These accumulated efforts have laid forth a robust foundation for Delta’s development today and brought us boundless hope for the future.</p>
          
          <p>Delta’s vision is inspiring, aspirational, and in many ways ambitious. It’s the direction we firmly advance towards and Delta’s Whitepaper has laid a strong foundation behind Delta’s present-day growth and future. In the year since Delta’s release, we have experienced silence, joy, excitement, and also moments of frustration.</p>
          
          <p>During the first two to three months after launch, we went through a <strong>stagnant phase</strong>, with only a handful to a few dozen new users registering each day. However, this didn’t deter the Deltans as well as the developers from undertaking endeavors and they remained unwavering in their belief. Ever since the inception, the community members have carefully and passionately reported issues and offered suggestions, while developers actively gathered feedback, fixed bugs, and continuously updated and improved the platform.</p>
          
          <p>Through everyone’s shared dedication and effort, daily new registrations reached <strong>8,000–10,000 around March and April 2025</strong>. During that period, we embraced pure exhilaration and excitement. This was the outcome of transformation, perseverance, trust, and collaboration. It was also during this time that a group of perceptive and responsible members stepped forward to join the original developer in forming the <strong>core team</strong> we have today. Team members come from different parts of the world, including <strong>@MarinHristov</strong> (Bulgaria), <strong>@Antzzz</strong> (India), <strong>@Just.coode</strong> (Nigeria), and <strong>@Wiggles</strong> (Norway). Their complementary skills and diverse strengths ensure the steady and reliable operation of Delta’s development, operations, and services.</p>
          
          <p>Of course, this unprecedented and dramatic surge in user registrations and progress met a plethora of obstacles. When the total platform registrations reached approximately 38,000, some Deltans encountered account data anomalies. Statistics showed that about 0.5% of users were affected. After the issue emerged, the core developer repeatedly reviewed the relevant code logic but was initially unable to identify the root cause. As more users reported similar problems, we felt confused and discouraged.</p>
          
          <p>Fortunately, thanks to the understanding, patience, and trust of the broader Delta community, the developers were given the time needed to research and debug the issues thoroughly. Eventually, the root cause was identified and completely resolved. <strong>(The issue stemmed from the data consistency handling strategy for multiple Canister writes on ICP. Under non-concurrent conditions, the strategy worked flawlessly. However, under high-concurrency scenarios (high number of concurrent users), it occasionally caused misalignment in data associations.)</strong></p>
          
          <p>In the first few months after Delta’s release, our <strong>Google Play developer account was suspended</strong> due to an automated review error by Google’s backend AI systems, preventing us from publishing the Delta app normally. This created a barrage of mixed emotions within the community; some questioned the situation, some expressed understanding, and others stood shoulder-to-shoulder with the Delta core team to resolve the issue.</p>
          
          <p>After numerous attempts and persistent efforts, <strong>@Antzzz</strong> and a group of passionate Delta pioneers found a solution that ultimately triggered a manual review by Google Play, successfully restoring the account. This is a challenge that even commercial-scale software companies and publishers often struggle to overcome, as mentioned across multiple subreddits. Yet as a fully open community, we relied on the unity and strength of Deltans to conquer it together. It was a remarkable victory that fully demonstrated the resilience and vitality of the Delta community.</p>
          
          <p>Over the past year, we have resolved numerous issues, both the trivial and convoluted ones. At the same time, we have developed several decentralized ecosystem applications, including <strong>“ICP Crowdfunding,” “Roadmap,” “Socio,” “1Pass,” “dNews,” and “KYC Pre.”</strong> These applications form the foundational infrastructure of the Delta ecosystem, each playing a distinct and essential role. They have strongly helped Delta position beyond just a mining app project and have ensured operational reliability and fuel supply for the platform. In the past few months, these dApps have strengthened community engagement and interaction substantially, providing practical tools for users, and enabling value distribution.</p>
          
          <p>These features represent only the foundational layout. In the coming year, in the path of maintaining and optimizing our existing systems and functionalities, we have planned to roll out more features and sub-applications, emphasizing openness, tradability, and creativity. Currently planned applications include <strong>“API.doc,” “Lucky Bit,” and “Smart Trading Contract.”</strong></p>

          <h3 class="text-xl font-bold mt-10 text-slate-900 dark:text-white">Expanding the Ecosystem</h3>
          
          <p><strong>“API.doc”</strong> will serve as a foundational application that publicly displays all Delta system interfaces, usage tutorials, and functional demonstrations. Over the last two months, we have witnessed a surge in the number of technically-gifted Deltans who’d like to contribute to the Delta ecosystem by creating new dApps. Therefore, any developer interested in contributing to the Delta ecosystem will be able to explore and learn the technical details of Delta dApp development through API.doc. With the openness of “API.doc,” more technically capable Deltans will be able to rapidly build ecosystem applications. This will play a crucial role in the future growth of the Delta ecosystem and the expression of DTC’s value. This also marks a crucial step in expanding transparency and progress toward the open-source approach highlighted in the Delta whitepaper.</p>
          
          <p><strong>“Lucky Bit”</strong> is planned as a decentralized lottery system built on Bitcoin block hash values. Its operational model will be completely open; anyone can participate as a player or as a banker. Players can invest small amounts for the chance to win substantial rewards through luck, while bankers can lock larger amounts of capital to provide payout guarantees and earn stable odds spreads. Our intention in developing this application is not to encourage gambling behavior, but to enrich community entertainment, attract traditional lottery participants into the Delta ecosystem, and quickly establish tradability within Delta.</p>
          
          <p>In most countries, government-issued (or authorized) lotteries offer payout rates at around 50%, and there may also be risks of manipulated draw results. Our application will eliminate these issues entirely —</p>
          <ul class="list-disc pl-6 space-y-2">
            <li><strong>First</strong>, the payout rate will be set at a minimum of 90%;</li>
            <li><strong>Second</strong>, winning numbers will be generated entirely by Bitcoin as a third-party system, which means there’s no room for rigging and there will be complete transparency when the results are disclosed; and</li>
            <li><strong>Third</strong>, payouts will be guaranteed by high-capital participants within the Delta Kim ecosystem.</li>
          </ul>
          
          <p>This model will be transparent, fair, and secure for all participants, with no systemic risk. Leveraging these advantages, the platform can effectively attract traditional lottery participants worldwide to join the Delta ecosystem, engage in daily mining activities, and provide economic support for Delta’s tradability.</p>

          <h3 class="text-xl font-bold mt-10 text-slate-900 dark:text-white">Smart Trading Contract: A Breakthrough Innovation</h3>
          
          <p><strong>“Smart Trading Contract”</strong> will be a major focus of development over the next year. We believe this feature represents a breakthrough innovation. Ethereum’s “smart contracts” made blockchains more capable and truly expanded the scope of blockchain engineering, but using them requires solid programming knowledge, and the major bottlenecks behind development on those architectures include slow execution and high costs. The “Smart Trading Contract” solution aims to address these issues.</p>
          
          <p>First, it will focus specifically on trading scenarios. Any user, regardless of the technical expertise, will be able to visually design various transaction processes through preset <strong>“trading instructions,”</strong> ultimately forming a complete trading contract. This will allow users to easily customize workflows for different transaction scenarios. Use cases include instant trades, escrow trades, purchase requests, virtual goods transactions, physical goods transactions, and more. Users will also be able to configure parameters including transaction currency, pricing, automated execution timing, and security strategies. In essence, users will be able to implement these functionalities without having to write a single line of code.</p>
          
          <p>As users publish goods and services under various transaction types, the platform will gradually form a vast and diversified free marketplace. Buyers and sellers will be able to conveniently find the products or services they need through categorization and search.</p>
          
          <p>To deeply serve niche markets, we will also support binding individual dApps to specific “Smart Trading Contracts.” In this model, the dApp will act as the frontend interface, providing service displays and operational entry points for users, while the Smart Trading Contract serves as the backend environment, managing processes and persisting critical data. Under this structure, regardless of the type of service or transaction provided by the developer, systemic risks can be effectively avoided, and transaction funds can remain secure.</p>
          
          <p>Since the funds used in Smart Trading Contracts remain locked within the contract itself, they are never controlled or temporarily held by the dApp developer, nor solely by the buyer or seller. Only upon completion of the transaction will the contract executor release and settle the funds according to the agreed rules.</p>
          
          <p>Through this model, developers will be able to quickly build trustworthy decentralized applications for various trading scenarios, such as <strong>service marketplaces similar to Fiverr, C2C e-commerce platforms similar to eBay, and virtual goods or NFT marketplaces similar to G2A or OpenSea.</strong> Our vision is that Smart Trading Contracts can be configured to support virtually all trading workflows.</p>

          <h3 class="text-xl font-bold mt-10 text-slate-900 dark:text-white">Forward Together</h3>
          
          <p>The future and our ideals form an exciting prospectus, but bringing these plans to life requires significant time and patience from the technical standpoint. From the very beginning of Delta’s design and development, we were mentally and materially prepared for this journey. As developers, our original intention remains simple: <strong>as long as there are users using Delta, we will continue building.</strong></p>
          
          <p>Of course, developers’ efforts alone are not enough. Delta’s vision is both revolutionary and challenging, yet it is also a goal that ordinary people everywhere hope to see realized. To achieve it, every Deltan must exercise strong conviction, perseverance, and take continuous action. Only through unity can we transform ideals into reality.</p>
          
          <p>Although some members who once joined Delta have abandoned for various reasons, we believe such departures are temporary. Many developers and Deltans remain passionately involved in community building and active participation. As the Delta ecosystem continues to improve and its value becomes increasingly evident, those who left will eventually return, and many new participants who have yet to join will be drawn in.</p>
          
          <p>Finally, we wish all Deltans a happy Delta Day. May the coming year bring you good health, prosperity, fulfilled dreams, and peace.</p>
          
          <p class="mt-8">Thank you.</p>
          <p class="font-bold">— Haida, on behalf of the Delta Core Team</p>
        </div>
      `,
        },
    };

    $: slug = $page.params.slug;
    // @ts-ignore
    $: post = blogPosts[slug] || {
        title: "Article Not Found",
        date: "",
        category: "",
        excerpt: "The article you are looking for does not exist.",
        content: "<p>The article you are looking for does not exist.</p>",
    };
</script>

<SEO
    title="{$t('title_prefix')} - {post.title}"
    description={post.excerpt || post.title}
    lang={data.lang}
    article={true}
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

    <div class="container mx-auto px-6 py-20 lg:py-32 relative z-10 max-w-4xl">
        <a
            href="/{$page.params.lang}/blog"
            class="inline-flex items-center gap-2 text-primary hover:text-secondary font-medium transition-colors mb-12 animate-fade-in"
        >
            <i class="fa-solid fa-arrow-left"></i>
            Back to Blog
        </a>

        <header class="mb-12 animate-fade-in">
            <h1
                class="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 drop-shadow-sm transition-colors duration-300"
            >
                {post.title}
            </h1>
            {#if post.date}
                <div
                    class="text-sm text-slate-500 mb-8 flex items-center gap-2"
                >
                    <i class="fa-regular fa-calendar"></i>
                    <span>{post.date}</span>
                    {#if post.category}
                        <span class="mx-2">&bull;</span>
                        <span
                            class="bg-primary/10 text-primary px-3 py-1 rounded-full font-medium"
                            >{post.category}</span
                        >
                    {/if}
                </div>
            {/if}
        </header>

        <div
            class="bg-white dark:bg-slate-800 rounded-[2.5rem] p-8 md:p-14 shadow-xl border border-slate-100 dark:border-slate-700 content-wrapper transition-colors duration-300 animate-fade-in"
            style="animation-delay: 0.2s; animation-fill-mode: both;"
        >
            <article
                class="prose prose-lg dark:prose-invert max-w-none prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-headings:font-bold prose-headings:text-slate-900 dark:prose-headings:text-white"
            >
                {@html post.content}
            </article>
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
