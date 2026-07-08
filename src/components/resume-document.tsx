import type { Locale } from "@/lib/i18n";
import { contactEmail, contactUrl, githubUrl, siteUrl } from "@/lib/brand-assets";
import { getTotalExperienceLabel, resumeDocuments, type ResumeEntry } from "@/lib/resume-data";

function ResumeRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid sm:grid-cols-[112px_minmax(0,1fr)]">
      <div
        data-resume-row-label
        className="border-b border-neutral-200 bg-neutral-100 px-4 py-3 text-sm font-semibold text-neutral-700 sm:border-b-0 sm:border-r"
      >
        {label}
      </div>
      <div className="min-w-0 px-4 py-3 text-sm leading-6 text-neutral-800 [word-break:keep-all] sm:text-[15px]">
        {children}
      </div>
    </div>
  );
}

function CareerEntry({
  entry,
  labels,
}: {
  entry: ResumeEntry;
  labels: {
    project: string;
    period: string;
    outcome: string;
    role: string;
    tools: string;
  };
}) {
  return (
    <article
      data-resume-project
      className="overflow-hidden rounded-md border border-neutral-300 bg-white shadow-sm shadow-neutral-950/5"
    >
      <div className="bg-brand-blue px-4 py-3 text-white">
        <h2 className="text-base font-semibold leading-7 [word-break:keep-all] sm:text-lg">
          <span data-resume-row-label className="font-medium text-white/90">
            {labels.project}
          </span>
          <span className="font-medium text-white/90">: </span>
          {entry.project}
        </h2>
      </div>
      <div className="divide-y divide-neutral-200">
        <ResumeRow label={labels.period}>{entry.period}</ResumeRow>
        <ResumeRow label={labels.outcome}>
          <strong className="font-semibold text-neutral-950">{entry.outcome}</strong>
        </ResumeRow>
        <ResumeRow label={labels.role}>
          <ul className="space-y-1.5">
            {entry.role.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-[0.65em] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-green" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </ResumeRow>
        <ResumeRow label={labels.tools}>{entry.tools}</ResumeRow>
      </div>
    </article>
  );
}

export function ResumeDocument({ locale }: { locale: Locale }) {
  const copy = resumeDocuments[locale];
  const totalExperience = getTotalExperienceLabel(locale);

  const labels = {
    project: copy.projectLabel,
    period: copy.periodLabel,
    outcome: copy.outcomeLabel,
    role: copy.roleLabel,
    tools: copy.toolsLabel,
  };

  return (
    <section data-resume-document className="py-10 sm:py-14">
      <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm shadow-neutral-950/5 sm:p-8">
        <div className="border-b border-neutral-200 pb-6">
          <p className="text-sm font-semibold text-brand-blue">{totalExperience}</p>
          <h1 className="mt-2 text-3xl font-semibold leading-tight text-neutral-950 sm:text-5xl">{copy.title}</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-neutral-700 [word-break:keep-all] sm:text-lg">
            {copy.subtitle}
          </p>
          <p className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm font-medium">
            <a href={contactUrl} className="text-brand-blue hover:text-brand-green-deep">
              {contactEmail}
            </a>
            <a href={githubUrl} target="_blank" rel="noreferrer" className="text-brand-blue hover:text-brand-green-deep">
              github.com/Joshua-sung
            </a>
            <a href={siteUrl} className="text-brand-blue hover:text-brand-green-deep">
              {siteUrl.replace("https://", "")}
            </a>
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-md border border-neutral-200 bg-brand-bg px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-green-deep">{copy.focusLabel}</p>
              <p className="mt-1 text-sm font-semibold text-neutral-950">{copy.focusValue}</p>
            </div>
            <div className="rounded-md border border-neutral-200 bg-brand-bg px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-green-deep">{copy.scopeLabel}</p>
              <p className="mt-1 text-sm font-semibold leading-6 text-neutral-950 [word-break:keep-all]">
                {copy.scopeValue}
              </p>
            </div>
          </div>
          <p className="mt-4 text-xs leading-5 text-neutral-500 [word-break:keep-all]">{copy.sourceNote}</p>
        </div>
        <div className="mt-8 space-y-8">
          {copy.entries.map((entry) => (
            <CareerEntry key={entry.project} entry={entry} labels={labels} />
          ))}
        </div>
      </div>
    </section>
  );
}
