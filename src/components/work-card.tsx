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

export function WorkCard({
  entry,
  locale = defaultLocale,
  variant = "light",
}: {
  entry: WorkEntry;
  locale?: Locale;
  variant?: "light" | "dark";
}) {
  const copy = workCardCopy[locale];
  const companyHref = localizePath(`/companies/${entry.company.slug}`, locale);
  const entryHref = localizePath(`/work-archive/${entry.slug}`, locale);
  const leadMetric = entry.metrics[0];
  const actionTools = entry.tools.slice(0, 3).join(" / ");
  const isDark = variant === "dark";

  return (
    <article
      data-case-card
      className={[
        "flex min-w-0 flex-col rounded-2xl border p-5 transition duration-200 hover:-translate-y-0.5",
        isDark
          ? "border-white/10 bg-portfolio-surface text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] hover:border-brand-blue hover:shadow-lg hover:shadow-black/30"
          : "border-neutral-200 bg-white text-neutral-950 hover:border-brand-green hover:shadow-lg hover:shadow-neutral-950/5",
      ].join(" ")}
    >
      <div className="flex h-full flex-col gap-5">
        <div data-case-card-section="context">
          <Link
            href={companyHref}
            className={[
              "mb-3 inline-flex w-fit items-center gap-2 rounded-full border py-1 pl-1 pr-2.5 text-xs font-medium leading-4 transition",
              isDark
                ? "border-white/10 bg-white/5 text-neutral-200 hover:border-brand-blue hover:text-white"
                : "border-neutral-200 bg-brand-bg text-neutral-700 hover:border-brand-green hover:bg-white hover:text-brand-green",
            ].join(" ")}
          >
            <CompanyLogo slug={entry.company.slug} size="sm" className="h-7 w-9 rounded" />
            {entry.company.name}
          </Link>
          <div
            className={[
              "flex flex-wrap items-center gap-2 text-xs font-medium uppercase",
              isDark ? "text-neutral-400" : "text-neutral-500",
            ].join(" ")}
          >
            <span>{entry.category}</span>
            <span aria-hidden="true">/</span>
            <span>{entry.outcomeType}</span>
          </div>
          <h2 className={["mt-3 text-lg font-semibold leading-snug", isDark ? "text-white" : "text-neutral-950"].join(" ")}>
            <Link
              href={entryHref}
              className="transition hover:underline hover:decoration-brand-orange/70 hover:decoration-2 hover:underline-offset-4"
            >
              {entry.title}
            </Link>
          </h2>
        </div>

        <dl className="grid gap-4 text-sm">
          <div data-case-card-section="problem">
            <dt
              className={[
                "text-xs font-semibold uppercase tracking-normal",
                isDark ? "text-neutral-400" : "text-neutral-500",
              ].join(" ")}
            >
              {copy.problem}
            </dt>
            <dd className={["mt-1 break-keep leading-6", isDark ? "text-neutral-300" : "text-neutral-700"].join(" ")}>
              {entry.summary}
            </dd>
          </div>
          <div data-case-card-section="action">
            <dt
              className={[
                "text-xs font-semibold uppercase tracking-normal",
                isDark ? "text-neutral-400" : "text-neutral-500",
              ].join(" ")}
            >
              {copy.action}
            </dt>
            <dd className={["mt-1 break-keep leading-6", isDark ? "text-neutral-300" : "text-neutral-700"].join(" ")}>
              {actionTools ? `${copy.usedPrefix}: ${actionTools}` : entry.tags.slice(0, 3).join(" / ")}
            </dd>
          </div>
          <div
            data-case-card-section="result"
            className={[
              "rounded-xl border p-3",
              isDark ? "border-brand-orange/50 bg-white text-neutral-950" : "border-brand-orange bg-brand-bg",
            ].join(" ")}
          >
            <dt className="text-xs font-semibold uppercase tracking-normal text-brand-blue">{copy.result}</dt>
            {leadMetric ? (
              <dd className="mt-1">
                <span className="break-words text-2xl font-semibold leading-tight text-brand-orange">
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
            <dt
              className={[
                "text-xs font-semibold uppercase tracking-normal",
                isDark ? "text-neutral-400" : "text-neutral-500",
              ].join(" ")}
            >
              {copy.role}
            </dt>
            <dd className={["mt-1 break-keep font-medium leading-6", isDark ? "text-neutral-200" : "text-neutral-800"].join(" ")}>
              {entry.role}
            </dd>
          </div>
        </dl>

        <div className="mt-auto flex flex-wrap gap-2">
          {entry.tags.slice(0, 5).map((tag) => (
            <TagChip key={tag} tag={tag} locale={locale} variant={variant} />
          ))}
        </div>
        <Link
          href={entryHref}
          className={[
            "inline-flex w-fit items-center gap-2 rounded-full border px-3 py-2 text-sm font-medium transition",
            isDark
              ? "border-white/15 bg-white/5 text-neutral-100 hover:border-white hover:bg-white hover:text-neutral-950"
              : "border-neutral-300 text-neutral-900 hover:border-brand-green hover:text-brand-green",
          ].join(" ")}
        >
          {copy.readCase}
          <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
