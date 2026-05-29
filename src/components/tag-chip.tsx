import Link from "next/link";
import { tagToSlug } from "@/lib/content";
import { defaultLocale, localizePath, type Locale } from "@/lib/i18n";

export function TagChip({ tag, locale = defaultLocale }: { tag: string; locale?: Locale }) {
  return (
    <Link
      href={localizePath(`/tags/${tagToSlug(tag)}`, locale)}
      className="inline-flex rounded-md border border-neutral-200 bg-white px-2.5 py-1 text-xs font-medium leading-4 text-neutral-700 transition hover:border-brand-green hover:text-brand-green"
    >
      #{tag}
    </Link>
  );
}
