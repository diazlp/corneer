# SEO, page titles, and brand assets

## Public search surface

The homepage, supplier directory, representative product discovery, and seven
fictional company profiles have descriptive server-rendered titles, descriptions,
and individual canonical URLs. Directory filters canonicalize to the directory.
`lib/seo.ts` supplies shared metadata without making every page canonical to
the homepage.

`app/sitemap.ts` includes public pages only, without invented modification dates.
`app/robots.ts` allows crawling and advertises the sitemap. Buyer, supplier,
messaging, and admin workspaces send `noindex` metadata and stay out of the
sitemap. Crawlers must be able to fetch a page to read `noindex`; this is not an
access control. Vercel preview deployments also use `noindex` metadata.

Every route has a distinct tab title. Company and seeded request titles include
their names; buyer and supplier views have different labels. Temporary previews
and selected conversations update their tab titles from session state. Server
metadata remains generic when the server cannot read session data.
Briefs and conversations own their title through React's native `<title>`
element, so late navigation metadata cannot replace the active session title.

The homepage includes `WebSite` structured data for Corneer's site name. Company
profiles include breadcrumbs. Fictional companies are not marked up as real
businesses; representative products have no offers, ratings, or checkout schema.
JSON-LD escapes `<` before rendering.

## Sharing previews and logo

Every page supplies its own Open Graph and Twitter title and description, with
the same branded **1200 × 630 PNG** at `/share-card.png`. `summary_large_image`
requests a large preview. The image is public and requires no sign-in or
JavaScript. Sharing services control their preview layouts and caching.

`app/icon.svg` is the source logo used directly in the header. It also generates
the ICO containing 16, 32, 48, 64, and 256px images, a 64px PNG browser icon, a
180px Apple icon, and a 512px logo. Next.js emits icon links from file conventions.

Regenerate committed assets after changing the source:

```powershell
npm run assets:brand
```

The generator uses Sharp bundled with the pinned Next.js dependency.

## Canonical host and checks

`NEXT_PUBLIC_SITE_URL` defaults to `https://corneer.vercel.app`. Set it to the
production origin when moving to a custom domain, then rebuild and submit the
new sitemap. `.env.example` contains the current value. Canonicals, social image
URLs, structured data, and the sitemap all use this origin.

`npm run check` builds the app, then runs `npm run test:seo`. The SEO check starts
an isolated production server and verifies distinct titles, descriptions,
canonical scope, indexing rules, structured data, sitemap membership, icon links,
image dimensions, and HTML delivered to Twitter and Facebook sharing crawlers.
The server stops when the check finishes.

## Remaining limits

The initial HTML and metadata remain English. Bahasa Indonesia uses the existing
client demo language adapter. No fabricated `hreflang` alternatives are emitted.
A production bilingual search release needs server-rendered locale routes, real
company content, and Search Console monitoring. Ranking, indexing, real-traffic
Core Web Vitals, and third-party preview caching require production observation.
Marketplace state remains frontend-only and resets on reload.

## References

- [Google's developer SEO guide](https://developers.google.com/search/docs/fundamentals/get-started-developers)
- [JavaScript SEO](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)
- [Favicon requirements](https://developers.google.com/search/docs/appearance/favicon-in-search)
- [Site names](https://developers.google.com/search/docs/appearance/site-names)
- [React document titles](https://react.dev/reference/react-dom/components/title)
- Installed Next.js metadata, icon, robots, sitemap, and JSON-LD guides in
  `node_modules/next/dist/docs/`.
