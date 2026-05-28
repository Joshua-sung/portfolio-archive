import Link from "next/link";
import { ArrowRight, Building2 } from "lucide-react";
import type { WorkEntry } from "@/lib/content";
import { MetricStrip } from "@/components/metric-strip";
import { TagChip } from "@/components/tag-chip";

export function WorkCard({ entry }: { entry: WorkEntry }) {
  return (
    <article className="rounded-lg border border-neutral-200 bg-white p-5 transition hover:border-neutral-400">
      <div className="flex flex-col gap-4">
        <div>
          <Link
            href={`/companies/${entry.company.slug}`}
            className="mb-3 inline-flex w-fit items-center gap-2 rounded-md border border-neutral-200 px-2.5 py-1.5 text-xs font-medium text-neutral-700 transition hover:border-emerald-700 hover:text-emerald-700"
          >
            <Building2 size={13} aria-hidden="true" />
            {entry.company.name}
          </Link>
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase text-neutral-500">
            <span>{entry.category}</span>
            <span aria-hidden="true">/</span>
            <span>{entry.outcomeType}</span>
          </div>
          <h2 className="mt-3 text-xl font-semibold leading-snug text-neutral-950">
            <Link href={`/work-archive/${entry.slug}`}>{entry.title}</Link>
          </h2>
          <p className="mt-3 text-sm leading-6 text-neutral-700">{entry.summary}</p>
          <p className="mt-3 text-sm font-medium text-neutral-700">{entry.role}</p>
        </div>
        <MetricStrip metrics={entry.metrics.slice(0, 3)} />
        <div className="flex flex-wrap gap-2">
          {entry.tags.slice(0, 5).map((tag) => (
            <TagChip key={tag} tag={tag} />
          ))}
        </div>
        <Link
          href={`/work-archive/${entry.slug}`}
          className="inline-flex w-fit items-center gap-2 rounded-md border border-neutral-300 px-3 py-2 text-sm font-medium text-neutral-900 transition hover:border-neutral-950"
        >
          Read case
          <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
