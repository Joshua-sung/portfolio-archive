import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { WorkEntry } from "@/lib/content";
import { TagChip } from "@/components/tag-chip";
import { defaultLocale, localizePath, type Locale } from "@/lib/i18n";
import { CompanyLogo } from "@/components/company-logo";

const workCardCopy = {
  en: {
    action: "Action",
    context: "Context",
    problem: "Problem",
    readCase: "Read case",
    result: "Result",
    role: "Role",
    usedPrefix: "Used",
  },
  ko: {
    action: "실행",
    context: "맥락",
    problem: "문제",
    readCase: "케이스 보기",
    result: "결과",
    role: "역할",
    usedPrefix: "활용",
  },
};

export function WorkCard({ entry, locale = defaultLocale }: { entry: WorkEntry; locale?: Locale }) {
  const copy = workCardCopy[locale];
  const companyHref = localizePath(`/companies/${entry.company.slug}`, locale);
  const entryHref = localizePath(`/work-archive/${entry.slug}`, locale);
  const leadMetric = entry.metrics[0];
  const actionTools = entry.tools.slice(0, 3).join(" / ");

  return (
    <article
      data-case-card
      className="flex min-w-0 flex-col rounded-md border border-neutral-200 bg-white p-5 transition hover:border-neutral-400"
    >
      <div className="flex h-full flex-col gap-5">
        <div data-case-card-section="context">
          <Link
            href={companyHref}
            className="mb-3 inline-flex w-fit items-center gap-2 rounded-md border border-neutral-200 bg-neutral-50 py-1 pl-1 pr-2.5 text-xs font-medium leading-4 text-neutral-700 transition hover:border-emerald-700 hover:bg-white hover:text-emerald-700"
          >
            <CompanyLogo slug={entry.company.slug} size="sm" className="h-7 w-9 rounded" />
            {entry.company.name}
          </Link>
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase text-neutral-500">
            <span>{entry.category}</span>
            <span aria-hidden="true">/</span>
            <span>{entry.outcomeType}</span>
          </div>
          <h2 className="mt-3 text-lg font-semibold leading-snug text-neutral-950">
            <Link href={entryHref}>{entry.title}</Link>
          </h2>
        </div>

        <dl className="grid gap-4 text-sm">
          <div data-case-card-section="problem">
            <dt className="text-xs font-semibold uppercase tracking-normal text-neutral-500">{copy.problem}</dt>
            <dd className="mt-1 break-keep leading-6 text-neutral-700">{entry.summary}</dd>
          </div>
          <div data-case-card-section="action">
            <dt className="text-xs font-semibold uppercase tracking-normal text-neutral-500">{copy.action}</dt>
            <dd className="mt-1 break-keep leading-6 text-neutral-700">
              {actionTools ? `${copy.usedPrefix}: ${actionTools}` : entry.tags.slice(0, 3).join(" / ")}
            </dd>
          </div>
          <div data-case-card-section="result" className="rounded-md border border-neutral-200 bg-neutral-50 p-3">
            <dt className="text-xs font-semibold uppercase tracking-normal text-neutral-500">{copy.result}</dt>
            {leadMetric ? (
              <dd className="mt-1">
                <span className="break-words text-2xl font-semibold leading-tight text-neutral-950">
                  {leadMetric.value}
                </span>
                <span className="mt-1 block break-keep text-xs leading-5 text-neutral-600">
                  {leadMetric.label}
                  {leadMetric.detail ? ` · ${leadMetric.detail}` : ""}
                </span>
              </dd>
            ) : null}
          </div>
          <div data-case-card-section="role">
            <dt className="text-xs font-semibold uppercase tracking-normal text-neutral-500">{copy.role}</dt>
            <dd className="mt-1 break-keep font-medium leading-6 text-neutral-800">{entry.role}</dd>
          </div>
        </dl>

        <div className="flex flex-wrap gap-2">
          {entry.tags.slice(0, 5).map((tag) => (
            <TagChip key={tag} tag={tag} locale={locale} />
          ))}
        </div>
        <Link
          href={entryHref}
          className="inline-flex w-fit items-center gap-2 rounded-md border border-neutral-300 px-3 py-2 text-sm font-medium text-neutral-900 transition hover:border-neutral-950"
        >
          {copy.readCase}
          <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
