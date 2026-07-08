import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { WorkEntry } from "@/lib/content";
import { defaultLocale, localizePath, type Locale } from "@/lib/i18n";

const pagerCopy: Record<Locale, { prev: string; next: string; all: string }> = {
  en: { prev: "Previous case", next: "Next case", all: "View all cases" },
  ko: { prev: "이전 케이스", next: "다음 케이스", all: "전체 케이스 보기" },
};

export function CasePager({
  prev,
  next,
  locale = defaultLocale,
}: {
  prev?: WorkEntry;
  next?: WorkEntry;
  locale?: Locale;
}) {
  const copy = pagerCopy[locale];

  return (
    <nav aria-label={copy.all} className="mt-12 border-t border-neutral-200 pt-8">
      <div className="grid gap-3 sm:grid-cols-2">
        {prev ? (
          <Link
            href={localizePath(`/work-archive/${prev.slug}`, locale)}
            className="group min-w-0 rounded-md border border-neutral-200 bg-white p-4 transition hover:border-brand-blue"
          >
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase text-neutral-500">
              <ArrowLeft size={13} aria-hidden="true" />
              {copy.prev}
            </p>
            <p className="mt-2 text-sm font-semibold leading-6 text-neutral-950 [word-break:keep-all] group-hover:text-brand-blue">
              {prev.title}
            </p>
          </Link>
        ) : (
          <div className="hidden sm:block" aria-hidden="true" />
        )}
        {next ? (
          <Link
            href={localizePath(`/work-archive/${next.slug}`, locale)}
            className="group min-w-0 rounded-md border border-neutral-200 bg-white p-4 transition hover:border-brand-blue sm:text-right"
          >
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase text-neutral-500 sm:justify-end">
              {copy.next}
              <ArrowRight size={13} aria-hidden="true" />
            </p>
            <p className="mt-2 text-sm font-semibold leading-6 text-neutral-950 [word-break:keep-all] group-hover:text-brand-blue">
              {next.title}
            </p>
          </Link>
        ) : null}
      </div>
      <div className="mt-5 text-center">
        <Link
          href={localizePath("/work-archive", locale)}
          className="text-sm font-medium text-brand-blue hover:text-brand-green-deep"
        >
          {copy.all}
        </Link>
      </div>
    </nav>
  );
}
