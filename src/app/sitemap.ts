import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/brand-assets";
import { getCompanyGroups, getWorkEntries } from "@/lib/content";
import { localizePath, locales } from "@/lib/i18n";

const staticPaths = [
  "/",
  "/case-studies",
  "/companies",
  "/work-archive",
  "/resume",
  "/about",
  "/collaboration",
  "/systems-built",
  "/writing",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = new Set<string>(staticPaths);

  for (const entry of getWorkEntries()) {
    paths.add(`/work-archive/${entry.slug}`);
  }

  for (const company of getCompanyGroups()) {
    paths.add(`/companies/${company.slug}`);
  }

  return [...paths].flatMap((path) =>
    locales.map((locale) => ({
      url: `${siteUrl}${localizePath(path, locale)}`,
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : 0.7,
    }))
  );
}
