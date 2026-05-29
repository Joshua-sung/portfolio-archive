import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { WorkCard } from "@/components/work-card";
import { getAllTags, getCompanyGroups, getWorkEntries } from "@/lib/content";

export const metadata: Metadata = {
  title: "작업 아카이브",
  description: "운영, 데이터, 자동화, PM 작업을 구조화한 한국어 케이스 스터디 라이브러리.",
};

export default function KoreanWorkArchivePage() {
  const locale = "ko";
  const entries = getWorkEntries(locale);
  const tags = getAllTags(locale);
  const companies = getCompanyGroups(locale);

  return (
    <Container>
      <PageHeader
        eyebrow="작업 아카이브"
        title="운영 실행과 비즈니스 임팩트를 구조화한 케이스 스터디 모음."
        description="모든 항목은 STAR+T 구조로 문제 맥락, 오너십, 협업 방식, 도구, 실행 내용, 결과, 배운 점을 정리합니다."
      />
      <section className="grid gap-4 border-y border-neutral-200 py-6 lg:grid-cols-[160px_1fr] lg:items-start">
        <h2 className="pt-2 text-sm font-semibold uppercase text-neutral-500">회사</h2>
        <div className="flex flex-wrap gap-2">
          {companies.map((company) => (
            <Link
              key={company.slug}
              href={`/ko/companies/${company.slug}`}
              className="rounded-md border border-neutral-200 px-3 py-2 text-sm leading-5 text-neutral-700 transition hover:border-brand-green hover:text-brand-green"
            >
              {company.name} <span className="text-neutral-400">{company.entries.length}</span>
            </Link>
          ))}
        </div>
      </section>
      <section className="grid gap-4 border-b border-neutral-200 py-6 lg:grid-cols-[160px_1fr] lg:items-start">
        <h2 className="pt-2 text-sm font-semibold uppercase text-neutral-500">태그</h2>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link
              key={tag.slug}
              href={`/ko/tags/${tag.slug}`}
              className="rounded-md border border-neutral-200 px-3 py-2 text-sm leading-5 text-neutral-700 transition hover:border-brand-green hover:text-brand-green"
            >
              #{tag.label} <span className="text-neutral-400">{tag.count}</span>
            </Link>
          ))}
        </div>
      </section>
      <section className="grid gap-5 py-10 lg:grid-cols-2">
        {entries.map((entry) => (
          <WorkCard key={entry.slug} entry={entry} locale={locale} />
        ))}
      </section>
    </Container>
  );
}
