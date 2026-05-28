import Link from "next/link";
import { ArrowRight, Building2 } from "lucide-react";
import type { WorkEntry } from "@/lib/content";
import { MetricStrip } from "@/components/metric-strip";
import { TagChip } from "@/components/tag-chip";
import { defaultLocale, localizePath, type Locale } from "@/lib/i18n";

const workCardCopy = {
  en: {
    readCase: "Read case",
  },
  ko: {
    readCase: "케이스 보기",
  },
};

export function WorkCard({ entry, locale = defaultLocale }: { entry: WorkEntry; locale?: Locale }) {
  const copy = workCardCopy[locale];
  const companyHref = localizePath(`/companies/${entry.company.slug}`, locale);
  const entryHref = localizePath(`/work-archive/${entry.slug}`, locale);

  return (
    <article className="flex min-w-0 flex-col rounded-md border border-neutral-200 bg-white p-5 transition hover:border-neutral-400">
      <div className="flex h-full flex-col gap-4">
        <div>
          <Link
            href={companyHref}
            className="mb-3 inline-flex w-fit items-center gap-2 rounded-md border border-neutral-200 px-2.5 py-1.5 text-xs font-medium leading-4 text-neutral-700 transition hover:border-emerald-700 hover:text-emerald-700"
          >
            <Building2 size={13} aria-hidden="true" />
            {entry.company.name}
          </Link>
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase text-neutral-500">
            <span>{entry.category}</span>
            <span aria-hidden="true">/</span>
            <span>{entry.outcomeType}</span>
          </div>
          <h2 className="mt-3 text-lg font-semibold leading-snug text-neutral-950">
            <Link href={entryHref}>{entry.title}</Link>
          </h2>
          <p className="mt-3 text-sm leading-6 text-neutral-700">{entry.summary}</p>
          <p className="mt-3 text-sm font-medium text-neutral-700">{entry.role}</p>
        </div>
        <MetricStrip metrics={entry.metrics.slice(0, 3)} variant="compact" />
        <div className="flex flex-wrap gap-2">
          {entry.tags.slice(0, 5).map((tag) => (
            <TagChip key={tag} tag={tag} locale={locale} />
          ))}
        </div>
        <Link
          href={entryHref}
          className="inline-flex w-fit items-center gap-2 rounded-md border border-neutral-300 px-3 py-2 text-sm font-medium text-neutral-900 transition hover:border-neutral-950"
        >
          {copy.readCase}
          <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
