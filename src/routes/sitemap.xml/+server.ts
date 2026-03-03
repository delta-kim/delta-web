import { langs } from '$lib/i18n/langs';

export const GET = async () => {
    const domain = 'https://delta.kim';
    const langKeys = Object.keys(langs);

    // List of static pages to include for each language
    const staticPages = [
        'home',
        'explore',
        'ledger',
        'roadmap',
        'whitepaper',
        'blog',
        'support',
        'DSMSAccessTerminal',
        'canister-status',
        'privacy_policy',
        'terms_of_service',
        'download',
        'communities',
        'faq'
    ];

    // Mock blog posts (mirroring the one in blog routes)
    const blogPosts = [
        'safety-circle',
        'open-letter-delta-day-2026'
    ];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${langKeys.map(lang =>
        staticPages.map(page => `
    <url>
      <loc>${domain}/${lang}/${page}</loc>
      <changefreq>weekly</changefreq>
      <priority>${page === 'home' ? '1.0' : '0.8'}</priority>
    </url>`).join('')
    ).join('')}
  ${langKeys.map(lang =>
        blogPosts.map(slug => `
    <url>
      <loc>${domain}/${lang}/blog/${slug}</loc>
      <changefreq>monthly</changefreq>
      <priority>0.7</priority>
    </url>`).join('')
    ).join('')}
</urlset>`;

    return new Response(sitemap, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'max-age=0, s-maxage=3600'
        }
    });
};
