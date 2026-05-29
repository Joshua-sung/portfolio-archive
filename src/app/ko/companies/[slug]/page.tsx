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
  return getCompanyGroups("ko").map((company) => ({ slug: company.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const company = getCompanyGroupBySlug(slug, "ko");

  if (!company) {
    return {};
  }

  return {
    title: `${company.name} 업무 성과 사례`,
    description: company.context ?? `${company.name} 운영 맥락`,
  };
}

export default async function KoreanCompanyPage({ params }: PageProps) {
  const locale = "ko";
  const { slug } = await params;
  const company = getCompanyGroupBySlug(slug, locale);

  if (!company) {
    notFound();
  }

  return (
    <Container>
      <article className="py-10">
        <Link
          href="/ko/companies"
          className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-neutral-950"
        >
          <ArrowLeft size={15} aria-hidden="true" />
          회사 목록으로
        </Link>
        <div className="mt-8 grid gap-8 border-b border-neutral-200 pb-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
          <header className="max-w-4xl">
            <p className="text-sm font-semibold uppercase text-brand-green">업무 성과 사례</p>
            <h1 className="mt-4 max-w-[13ch] break-words text-3xl font-semibold leading-tight text-neutral-950 sm:max-w-4xl sm:text-5xl">
              {company.name}
            </h1>
            {company.role ? <p className="mt-4 text-lg font-medium text-neutral-700">{company.role}</p> : null}
            {company.context ? <p className="mt-5 max-w-3xl text-lg leading-8 text-neutral-700">{company.context}</p> : null}
          </header>
          <dl className="grid gap-5 border-t border-neutral-200 pt-6 text-sm sm:grid-cols-3 lg:grid-cols-1 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <div>
              <dt className="text-neutral-500">공개 케이스</dt>
              <dd className="mt-1 text-2xl font-semibold text-neutral-950">{company.entries.length}</dd>
            </div>
            <div>
              <dt className="text-neutral-500">주요 역할</dt>
              <dd className="mt-1 font-semibold text-neutral-950">{company.role ?? "Operations / PM"}</dd>
            </div>
            <div>
              <dt className="text-neutral-500">근거 보기</dt>
              <dd className="mt-1 font-semibold text-neutral-950">회사별 케이스 스터디</dd>
            </div>
          </dl>
        </div>
        <section className="mt-8">
          <MetricStrip metrics={company.metrics.slice(0, 6)} />
        </section>
        <section className="mt-6 flex flex-wrap gap-2">
          {company.tags.map((tag) => (
            <TagChip key={tag} tag={tag} locale={locale} />
          ))}
        </section>
        <section className="grid min-w-0 gap-5 py-10 lg:grid-cols-2">
          {company.entries.map((entry) => (
            <WorkCard key={entry.slug} entry={entry} locale={locale} />
          ))}
        </section>
      </article>
    </Container>
  );
}
