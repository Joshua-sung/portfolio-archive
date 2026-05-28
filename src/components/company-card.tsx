import Link from "next/link";
import { ArrowRight, Building2 } from "lucide-react";
import type { CompanyGroup } from "@/lib/content";
import { MetricStrip } from "@/components/metric-strip";
import { TagChip } from "@/components/tag-chip";
import { defaultLocale, localizePath, type Locale } from "@/lib/i18n";

const companyCardCopy = {
  en: {
    publishedCases: "Published cases",
    portfolioUnit: "Portfolio unit",
    companyGroup: "Company group",
    viewPortfolio: "View company portfolio",
  },
  ko: {
    publishedCases: "공개 케이스",
    portfolioUnit: "포트폴리오 단위",
    companyGroup: "회사별 그룹",
    viewPortfolio: "회사별 포트폴리오 보기",
  },
};

export function CompanyCard({ company, locale = defaultLocale }: { company: CompanyGroup; locale?: Locale }) {
  const copy = companyCardCopy[locale];
  const companyHref = localizePath(`/companies/${company.slug}`, locale);

  return (
    <article className="flex min-w-0 flex-col rounded-md border border-neutral-200 bg-white p-5 transition hover:border-neutral-400">
      <div className="flex items-start gap-4">
        <div className="mt-0.5 rounded-md bg-emerald-50 p-2 text-emerald-800 ring-1 ring-emerald-100">
          <Building2 size={18} aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-lg font-semibold leading-snug text-neutral-950">
            <Link href={companyHref}>{company.name}</Link>
          </h2>
          <p className="mt-1 text-sm font-medium text-neutral-600">{company.role}</p>
          {company.context ? <p className="mt-2 break-words text-sm leading-6 text-neutral-700">{company.context}</p> : null}
        </div>
      </div>
      <dl className="mt-5 grid gap-x-6 gap-y-3 border-t border-neutral-200 pt-4 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-neutral-500">{copy.publishedCases}</dt>
          <dd className="mt-1 font-semibold text-neutral-950">{company.entries.length}</dd>
        </div>
        <div>
          <dt className="text-neutral-500">{copy.portfolioUnit}</dt>
          <dd className="mt-1 font-semibold text-neutral-950">{copy.companyGroup}</dd>
        </div>
      </dl>
      <div className="mt-5">
        <MetricStrip metrics={company.metrics.slice(0, 3)} variant="compact" />
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {company.tags.slice(0, 5).map((tag) => (
          <TagChip key={tag} tag={tag} locale={locale} />
        ))}
      </div>
      <Link
        href={companyHref}
        className="mt-5 inline-flex w-fit items-center gap-2 rounded-md border border-neutral-300 px-3 py-2 text-sm font-medium text-neutral-900 transition hover:border-neutral-950"
      >
        {copy.viewPortfolio}
        <ArrowRight size={15} aria-hidden="true" />
      </Link>
    </article>
  );
}
