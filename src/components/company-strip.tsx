import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { CompanyGroup } from "@/lib/content";
import { getCompanyBrand } from "@/lib/brand-assets";
import { defaultLocale, localizePath, type Locale } from "@/lib/i18n";
import { CompanyLogo } from "@/components/company-logo";

const stripCopy = {
  en: {
    eyebrow: "Project Experience",
    title: "Operating environments behind the results",
    description: "Each company group shows the setting, constraints, and operating scale behind the case studies.",
    view: "Open",
    source: "Logo source",
    anonymized: "Anonymized",
  },
  ko: {
    eyebrow: "업무 성과 사례",
    title: "성과가 만들어진 운영 환경",
    description: "각 회사 그룹은 케이스 스터디가 나온 업무 환경, 제약 조건, 운영 규모를 먼저 보여줍니다.",
    view: "열기",
    source: "로고 출처",
    anonymized: "익명화",
  },
};

export function CompanyStrip({
  companies,
  locale = defaultLocale,
}: {
  companies: CompanyGroup[];
  locale?: Locale;
}) {
  const copy = stripCopy[locale];

  return (
    <section className="border-y border-neutral-200 bg-white py-10">
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase text-brand-green">{copy.eyebrow}</p>
          <h2 className="mt-2 text-2xl font-semibold text-neutral-950">{copy.title}</h2>
        </div>
        <p className="max-w-2xl text-sm leading-6 text-neutral-600">{copy.description}</p>
      </div>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {companies.map((company) => {
          const brand = getCompanyBrand(company.slug);
          const companyHref = localizePath(`/companies/${company.slug}`, locale);

          return (
            <Link
              key={company.slug}
              href={companyHref}
              className="group flex min-w-0 flex-col gap-3 rounded-2xl border border-neutral-200 bg-brand-bg px-3 py-3 transition hover:border-brand-blue hover:bg-white hover:shadow-sm hover:shadow-neutral-950/[0.04]"
            >
              <div className="flex w-full items-center justify-between gap-3">
                <CompanyLogo slug={company.slug} size="md" />
                <span
                  data-company-arrow-direction="toward-latest"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-500 transition group-hover:border-brand-blue group-hover:text-brand-blue"
                >
                  <ArrowLeft size={14} aria-hidden="true" />
                  <span className="sr-only">{copy.view}</span>
                </span>
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-neutral-950">{company.name}</p>
                <p className="mt-0.5 text-xs text-neutral-500">
                  {company.entries.length} {locale === "ko" ? "케이스" : "cases"}
                </p>
                <p className="mt-1 truncate text-xs text-neutral-400">
                  {brand.sourceUrl ? copy.source : copy.anonymized}: {brand.sourceLabel}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
