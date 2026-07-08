import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { CasePager } from "@/components/case-pager";
import { Container } from "@/components/container";
import { KpiCharts } from "@/components/kpi-charts";
import { MarkdownBody } from "@/components/markdown-body";
import { MetricStrip } from "@/components/metric-strip";
import { TagChip } from "@/components/tag-chip";
import { getWorkEntries, getWorkEntryBySlug } from "@/lib/content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getWorkEntries("ko").map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getWorkEntryBySlug(slug, "ko");

  if (!entry) {
    return {};
  }

  return {
    title: entry.title,
    description: entry.summary,
  };
}

export default async function KoreanWorkEntryPage({ params }: PageProps) {
  const locale = "ko";
  const { slug } = await params;
  const entry = getWorkEntryBySlug(slug, locale);

  if (!entry) {
    notFound();
  }

  const entries = getWorkEntries(locale);
  const entryIndex = entries.findIndex((item) => item.slug === entry.slug);
  const previousEntry = entryIndex > 0 ? entries[entryIndex - 1] : undefined;
  const nextEntry = entryIndex < entries.length - 1 ? entries[entryIndex + 1] : undefined;

  return (
    <Container>
      <article className="py-10">
        <Link
          href="/ko/work-archive"
          className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-neutral-950"
        >
          <ArrowLeft size={15} aria-hidden="true" />
          케이스 목록으로
        </Link>
        <header className="mt-8 max-w-4xl">
          <div className="flex flex-wrap gap-2 text-sm font-medium text-neutral-500">
            <Link href={`/ko/companies/${entry.company.slug}`} className="text-brand-green hover:text-brand-green">
              {entry.company.name}
            </Link>
            <span aria-hidden="true">/</span>
            <span>{entry.category}</span>
            <span aria-hidden="true">/</span>
            <span>{entry.outcomeType}</span>
            <span aria-hidden="true">/</span>
            <span>{entry.role}</span>
            {entry.performedPeriod ? (
              <>
                <span aria-hidden="true">/</span>
                <span>{entry.performedPeriod}</span>
              </>
            ) : null}
          </div>
          <h1 className="mt-4 max-w-[13ch] break-words text-3xl font-semibold leading-tight text-neutral-950 sm:max-w-4xl sm:text-5xl">
            {entry.title}
          </h1>
          <p className="mt-5 max-w-[32ch] text-lg leading-8 text-neutral-700 sm:max-w-none">{entry.summary}</p>
          <p className="mt-4 max-w-[34ch] text-sm text-neutral-500 sm:max-w-none">{entry.sensitive}</p>
        </header>
        <div className="mt-8">
          <MetricStrip metrics={entry.metrics} />
        </div>
        <KpiCharts charts={entry.charts} locale={locale} />
        <div className="mt-6 flex flex-wrap gap-2">
          {entry.tags.map((tag) => (
            <TagChip key={tag} tag={tag} locale={locale} />
          ))}
        </div>
        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="min-w-0">
            <MarkdownBody content={entry.content} />
          </div>
          <aside className="h-fit rounded-md border border-neutral-200 bg-brand-bg p-5 lg:sticky lg:top-24">
            <h2 className="font-semibold text-neutral-950">회사/조직 맥락</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="text-neutral-500">회사 / 조직</dt>
                <dd className="font-medium text-neutral-900">
                  <Link href={`/ko/companies/${entry.company.slug}`} className="hover:text-brand-green">
                    {entry.company.name}
                  </Link>
                </dd>
              </div>
              {entry.company.role ? (
                <div>
                  <dt className="text-neutral-500">역할 맥락</dt>
                  <dd className="font-medium text-neutral-900">{entry.company.role}</dd>
                </div>
              ) : null}
              {entry.performedPeriod ? (
                <div>
                  <dt className="text-neutral-500">수행 시기</dt>
                  <dd className="font-medium text-neutral-900">{entry.performedPeriod}</dd>
                </div>
              ) : null}
            </dl>
            <h2 className="mt-6 border-t border-neutral-200 pt-5 font-semibold text-neutral-950">도구와 시스템</h2>
            <ul className="mt-4 space-y-2 text-sm text-neutral-700">
              {entry.tools.map((tool) => (
                <li key={tool}>{tool}</li>
              ))}
            </ul>
          </aside>
        </div>
        <CasePager prev={previousEntry} next={nextEntry} locale={locale} />
      </article>
    </Container>
  );
}
