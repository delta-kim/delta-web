<script lang="ts">
    import { page } from "$app/stores";
    import { langs } from "$lib/i18n/langs";

    export let title: string;
    export let description: string;
    export let lang: string = "en";
    export let image: string = "/img/delta.logo.png"; // Default image
    export let article: boolean = false;
    export let author: string = "Delta Team";
    export let keywords: string =
        "Delta, ICP, Blockchain, Crypto, Keyless, Mobile Miner, Web3";

    const siteName = "Delta Kim";
    const twitterHandle = "@TheDeltaKim";
    const domain = "delta.kim"; // Update this with actual domain if different
    const siteUrl = `https://${domain}`;

    $: canonicalUrl = `${siteUrl}${$page.url.pathname}`;
    $: ogType = article ? "article" : "website";
    $: fullImageUrl = image.startsWith("http") ? image : `${siteUrl}${image}`;

    // Multi-language support (hreflang)
    const langKeys = Object.keys(langs);
</script>

<svelte:head>
    <!-- Basic Meta Tags -->
    <title>{title} | {siteName}</title>
    <meta name="description" content={description} />
    <meta name="keywords" content={keywords} />
    <link rel="canonical" href={canonicalUrl} />

    <!-- Hreflang Tags -->
    {#each langKeys as langKey}
        <link
            rel="alternate"
            hreflang={langKey}
            href="{siteUrl}/{langKey}${$page.url.pathname.substring(3)}"
        />
    {/each}
    <link
        rel="alternate"
        hreflang="x-default"
        href="{siteUrl}/en{$page.url.pathname.substring(3)}"
    />

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content={ogType} />
    <meta property="og:url" content={canonicalUrl} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={fullImageUrl} />
    <meta property="og:site_name" content={siteName} />
    <meta property="og:locale" content={lang} />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content={canonicalUrl} />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={fullImageUrl} />
    <meta name="twitter:site" content={twitterHandle} />
    <meta name="twitter:creator" content={twitterHandle} />

    {#if article}
        <meta property="article:author" content={author} />
        <!-- Add more article specific tags if needed like published_time -->
    {/if}
</svelte:head>
