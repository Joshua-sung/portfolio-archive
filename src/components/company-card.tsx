import Link from "next/link";
import { ArrowRight, Building2 } from "lucide-react";
import type { CompanyGroup } from "@/lib/content";
import { MetricStrip } from "@/components/metric-strip";
import { TagChip } from "@/components/tag-chip";

export function CompanyCard({ company }: { company: CompanyGroup }) {
  return (
    <article className="flex min-w-0 flex-col rounded-md border border-neutral-200 bg-white p-5 transition hover:border-neutral-400">
      <div className="flex items-start gap-4">
        <div className="mt-0.5 rounded-md bg-emerald-50 p-2 text-emerald-800 ring-1 ring-emerald-100">
          <Building2 size={18} aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-lg font-semibold leading-snug text-neutral-950">
            <Link href={`/companies/${company.slug}`}>{company.name}</Link>
          </h2>
          <p className="mt-1 text-sm font-medium text-neutral-600">{company.role}</p>
          {company.context ? <p className="mt-2 break-words text-sm leading-6 text-neutral-700">{company.context}</p> : null}
        </div>
      </div>
      <dl className="mt-5 grid gap-x-6 gap-y-3 border-t border-neutral-200 pt-4 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-neutral-500">Published cases</dt>
          <dd className="mt-1 font-semibold text-neutral-950">{company.entries.length}</dd>
        </div>
        <div>
          <dt className="text-neutral-500">Portfolio unit</dt>
          <dd className="mt-1 font-semibold text-neutral-950">Company group</dd>
        </div>
      </dl>
      <div className="mt-5">
        <MetricStrip metrics={company.metrics.slice(0, 3)} variant="compact" />
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {company.tags.slice(0, 5).map((tag) => (
          <TagChip key={tag} tag={tag} />
        ))}
      </div>
      <Link
        href={`/companies/${company.slug}`}
        className="mt-5 inline-flex w-fit items-center gap-2 rounded-md border border-neutral-300 px-3 py-2 text-sm font-medium text-neutral-900 transition hover:border-neutral-950"
      >
        View company portfolio
        <ArrowRight size={15} aria-hidden="true" />
      </Link>
    </article>
  );
}
