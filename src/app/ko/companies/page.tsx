import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { CompanyCard } from "@/components/company-card";
import { getCompanyGroups } from "@/lib/content";

export const metadata: Metadata = {
  title: "회사",
  description: "Growth PM과 Operations PM 성과가 만들어진 회사별 업무 사례.",
};

export default function KoreanCompaniesPage() {
  const locale = "ko";
  const companies = getCompanyGroups(locale);
  const caseCount = companies.reduce((total, company) => total + company.entries.length, 0);

  return (
    <Container>
      <div className="grid gap-8 border-b border-neutral-200 py-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end lg:py-16">
        <PageHeader
          eyebrow="회사"
          title="업무 성과 사례"
          description="회사와 조직 단위로 맡았던 역할, 업무 맥락, 측정 가능한 결과를 먼저 소개합니다."
        />
        <dl className="grid gap-5 border-t border-neutral-200 pt-6 text-sm sm:grid-cols-3 lg:grid-cols-1 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <div>
            <dt className="text-neutral-500">회사/조직 그룹</dt>
            <dd className="mt-1 text-2xl font-semibold text-neutral-950">{companies.length}</dd>
          </div>
          <div>
            <dt className="text-neutral-500">공개 작업 항목</dt>
            <dd className="mt-1 text-2xl font-semibold text-neutral-950">{caseCount}</dd>
          </div>
          <div>
            <dt className="text-neutral-500">발행 방식</dt>
            <dd className="mt-1 text-2xl font-semibold text-neutral-950">MDX</dd>
          </div>
        </dl>
      </div>
      <section className="grid min-w-0 gap-5 py-10 lg:grid-cols-2">
        {companies.map((company) => (
          <CompanyCard key={company.slug} company={company} locale={locale} />
        ))}
      </section>
    </Container>
  );
}
