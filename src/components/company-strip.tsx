import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CompanyGroup } from "@/lib/content";
import { getCompanyBrand } from "@/lib/brand-assets";
import { defaultLocale, localizePath, type Locale } from "@/lib/i18n";
import { CompanyLogo } from "@/components/company-logo";

const stripCopy = {
  en: {
    eyebrow: "Company-backed archive",
    title: "Work grouped by operating context",
    description: "Each company card anchors the archive in a real operating environment, then points to the case studies produced there.",
    view: "Open",
    source: "Logo source",
    anonymized: "Anonymized",
  },
  ko: {
    eyebrow: "회사별 실행 아카이브",
    title: "운영 맥락별로 묶은 경험",
    description: "각 회사 카드는 실제 운영 환경을 먼저 보여주고, 그 안에서 만든 케이스 스터디로 연결됩니다.",
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
    <section className="border-y border-neutral-200 bg-white py-8">
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase text-emerald-700">{copy.eyebrow}</p>
          <h2 className="mt-2 text-2xl font-semibold text-neutral-950">{copy.title}</h2>
        </div>
        <p className="max-w-2xl text-sm leading-6 text-neutral-600">{copy.description}</p>
      </div>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {companies.map((company) => {
          const brand = getCompanyBrand(company.slug);
          const companyHref = localizePath(`/companies/${company.slug}`, locale);

          return (
            <Link
              key={company.slug}
              href={companyHref}
              className="group flex min-w-0 flex-col gap-3 rounded-md border border-neutral-200 bg-neutral-50 px-3 py-3 transition hover:border-neutral-400 hover:bg-white"
            >
              <div className="flex w-full items-center justify-between gap-3">
                <CompanyLogo slug={company.slug} size="md" />
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-neutral-200 bg-white text-neutral-500 transition group-hover:border-neutral-950 group-hover:text-neutral-950">
                  <ArrowRight size={14} aria-hidden="true" />
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
