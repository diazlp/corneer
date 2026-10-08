import type { Metadata } from "next";

export const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL || "https://corneer.vercel.app",
).origin;

export const shareImage = {
  url: `${siteUrl}/share-card.png?v=2`,
  width: 1200,
  height: 630,
  alt: "Corneer apparel sourcing: describe your order, review companies, choose who to contact.",
};

export function pageMetadata(
  title: string,
  description: string,
  path: string,
  publicPage = true,
): Metadata {
  const fullTitle = `${title} | Corneer`;
  const index = publicPage && process.env.VERCEL_ENV !== "preview";
  return {
    title: { absolute: fullTitle },
    description,
    alternates: publicPage ? { canonical: path } : undefined,
    robots: {
      index,
      follow: publicPage,
      googleBot: { index, follow: publicPage, "max-image-preview": "large" },
    },
    openGraph: {
      type: "website",
      siteName: "Corneer",
      locale: "en_US",
      url: `${siteUrl}${path === "/" ? "" : path}`,
      title: fullTitle,
      description,
      images: [shareImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [shareImage],
    },
  };
}

export function breadcrumbData(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: new URL(item.path, siteUrl).href,
    })),
  };
}
