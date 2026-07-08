import Link from "next/link";
import { tagToSlug } from "@/lib/content";
import { defaultLocale, localizePath, type Locale } from "@/lib/i18n";

export function TagChip({
  tag,
  locale = defaultLocale,
  variant = "light",
}: {
  tag: string;
  locale?: Locale;
  variant?: "light" | "dark";
}) {
  return (
    <Link
      href={localizePath(`/tags/${tagToSlug(tag)}`, locale)}
      className={[
        "inline-flex rounded-md border px-2.5 py-1 text-xs font-medium leading-4 transition",
        variant === "dark"
          ? "border-white/10 bg-white/5 text-neutral-300 hover:border-brand-green hover:text-white"
          : "border-neutral-200 bg-white text-neutral-700 hover:border-brand-green hover:text-brand-green-deep",
      ].join(" ")}
    >
      #{tag}
    </Link>
  );
}
