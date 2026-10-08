import type { MetadataRoute } from "next";
import { suppliers } from "@/lib/data";
import { siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "/",
    "/suppliers",
    "/products",
    ...suppliers.map((company) => `/suppliers/${company.id}`),
  ].map((path) => ({ url: new URL(path, siteUrl).href }));
}
