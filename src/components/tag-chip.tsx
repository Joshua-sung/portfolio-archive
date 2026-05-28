import Link from "next/link";
import { tagToSlug } from "@/lib/content";

export function TagChip({ tag }: { tag: string }) {
  return (
    <Link
      href={`/tags/${tagToSlug(tag)}`}
      className="inline-flex rounded-md border border-neutral-200 bg-white px-2.5 py-1 text-xs font-medium leading-4 text-neutral-700 transition hover:border-emerald-600 hover:text-emerald-700"
    >
      #{tag}
    </Link>
  );
}
