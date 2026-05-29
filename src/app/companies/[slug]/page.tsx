import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/container";
import { MetricStrip } from "@/components/metric-strip";
import { TagChip } from "@/components/tag-chip";
import { WorkCard } from "@/components/work-card";
import { getCompanyGroupBySlug, getCompanyGroups } from "@/lib/content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getCompanyGroups().map((company) => ({ slug: company.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const company = getCompanyGroupBySlug(slug);

  if (!company) {
    return {};
  }

  return {
    title: `${company.name} Experience Context`,
    description: company.context ?? `${company.name} operating context`,
  };
}

export default async function CompanyPage({ params }: PageProps) {
  const { slug } = await params;
  const company = getCompanyGroupBySlug(slug);

  if (!company) {
    notFound();
  }

  return (
    <Container>
      <article className="py-10">
        <Link
          href="/companies"
          className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-neutral-950"
        >
          <ArrowLeft size={15} aria-hidden="true" />
          Back to companies
        </Link>
        <div className="mt-8 grid gap-8 border-b border-neutral-200 pb-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
          <header className="max-w-4xl">
            <p className="text-sm font-semibold uppercase text-brand-green">Experience Context</p>
            <h1 className="mt-4 max-w-[13ch] break-words text-3xl font-semibold leading-tight text-neutral-950 sm:max-w-4xl sm:text-5xl">
              {company.name}
            </h1>
            {company.role ? <p className="mt-4 text-lg font-medium text-neutral-700">{company.role}</p> : null}
            {company.context ? <p className="mt-5 max-w-3xl text-lg leading-8 text-neutral-700">{company.context}</p> : null}
          </header>
          <dl className="grid gap-5 border-t border-neutral-200 pt-6 text-sm sm:grid-cols-3 lg:grid-cols-1 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <div>
              <dt className="text-neutral-500">Published cases</dt>
              <dd className="mt-1 text-2xl font-semibold text-neutral-950">{company.entries.length}</dd>
            </div>
            <div>
              <dt className="text-neutral-500">Primary role</dt>
              <dd className="mt-1 font-semibold text-neutral-950">{company.role ?? "Operations / PM"}</dd>
            </div>
            <div>
              <dt className="text-neutral-500">Evidence view</dt>
              <dd className="mt-1 font-semibold text-neutral-950">Company-grouped case studies</dd>
            </div>
          </dl>
        </div>
        <section className="mt-8">
          <MetricStrip metrics={company.metrics.slice(0, 6)} />
        </section>
        <section className="mt-6 flex flex-wrap gap-2">
          {company.tags.map((tag) => (
            <TagChip key={tag} tag={tag} />
          ))}
        </section>
        <section className="grid min-w-0 gap-5 py-10 lg:grid-cols-2">
          {company.entries.map((entry) => (
            <WorkCard key={entry.slug} entry={entry} />
          ))}
        </section>
      </article>
    </Container>
  );
}
