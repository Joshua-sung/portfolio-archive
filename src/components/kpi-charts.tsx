import type { WorkChart } from "@/lib/content";
import { defaultLocale, type Locale } from "@/lib/i18n";

const copy = {
  en: {
    eyebrow: "Impact evidence",
    actual: "Measured",
    directional: "Normalized / directional",
    beforeAfter: "Before / after comparison",
    reduction: "Workload reduction",
    composition: "Evidence composition",
    milestones: "Execution path",
    evidence: "Supporting evidence",
    measuredPoint: "Measured",
    indexedPoint: "Indexed / normalized",
    measuredEvidence: "Measured evidence",
    directionalSupport: "Directional support",
  },
  ko: {
    eyebrow: "성과 근거 시각화",
    actual: "실측",
    directional: "정규화 / 경향",
    beforeAfter: "전후 비교",
    reduction: "공수 절감",
    composition: "근거 구성비",
    milestones: "실행 흐름",
    evidence: "보조 근거",
    measuredPoint: "실측",
    indexedPoint: "정규화 / 기준선",
    measuredEvidence: "실측 근거",
    directionalSupport: "방향성 근거",
  },
};

function maxPointValue(chart: WorkChart) {
  return Math.max(...chart.points.map((point) => point.value), 1);
}

function pointWidth(value: number, maxValue: number) {
  return `${Math.max(6, (value / maxValue) * 100)}%`;
}

function pointTone(kind: WorkChart["points"][number]["kind"], isImpact = false) {
  if (isImpact) {
    return "bg-brand-orange text-white";
  }

  return kind === "actual" ? "bg-brand-green text-white" : "bg-neutral-200 text-neutral-800";
}

function typeLabel(chart: WorkChart, locale: Locale) {
  const labels = copy[locale];

  if (chart.visualType === "reduction") return labels.reduction;
  if (chart.visualType === "composition") return labels.composition;
  if (chart.visualType === "milestones") return labels.milestones;
  if (chart.visualType === "evidence") return labels.evidence;
  return labels.beforeAfter;
}

function ComparisonBars({ chart, locale }: { chart: WorkChart; locale: Locale }) {
  const maxValue = maxPointValue(chart);
  const labels = copy[locale];

  return (
    <div className="space-y-4 rounded-md border border-neutral-200 bg-white p-4">
      {chart.points.map((point, index) => {
        const isImpact = index === chart.points.length - 1 && chart.points.length > 1;

        return (
          <div key={`${point.label}-${point.displayValue}`} className="grid gap-2 sm:grid-cols-[150px_1fr] sm:items-center">
            <div className="min-w-0">
              <p className="break-keep text-sm font-semibold text-neutral-950">{point.label}</p>
              <p className="text-xs text-neutral-500">
                {point.kind === "actual" ? labels.measuredPoint : labels.indexedPoint}
              </p>
            </div>
            <div className="min-w-0">
              <div className="h-9 overflow-hidden rounded-md bg-brand-bg">
                <div
                  className={`flex h-full min-w-fit items-center justify-end rounded-md px-3 text-sm font-semibold ${pointTone(
                    point.kind,
                    isImpact,
                  )}`}
                  style={{ width: pointWidth(point.value, maxValue) }}
                >
                  {point.displayValue}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ReductionBars({ chart }: { chart: WorkChart }) {
  const maxValue = maxPointValue(chart);

  return (
    <div className="grid gap-3 rounded-md border border-neutral-200 bg-white p-4 md:grid-cols-3">
      {chart.points.map((point, index) => {
        const isSaved = /saved|절감/i.test(point.label) || index === chart.points.length - 1;

        return (
          <div key={`${point.label}-${point.displayValue}`} className="rounded-md border border-neutral-200 p-4">
            <p className="text-sm font-semibold text-neutral-950">{point.label}</p>
            <p className={`mt-2 text-3xl font-semibold ${isSaved ? "text-brand-orange" : "text-brand-blue"}`}>
              {point.displayValue}
            </p>
            <div className="mt-4 h-2 rounded-full bg-brand-bg">
              <div
                className={`h-2 rounded-full ${isSaved ? "bg-brand-orange" : "bg-brand-blue"}`}
                style={{ width: pointWidth(point.value, maxValue) }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function CompositionBar({ chart }: { chart: WorkChart }) {
  const total = chart.points.reduce((sum, point) => sum + point.value, 0) || 1;

  return (
    <div className="rounded-md border border-neutral-200 bg-white p-4">
      <div className="flex h-10 overflow-hidden rounded-md bg-brand-bg">
        {chart.points.map((point, index) => (
          <div
            key={`${point.label}-${point.displayValue}`}
            className={`flex min-w-fit items-center justify-center px-3 text-xs font-semibold ${
              index === 0 ? "bg-brand-green text-white" : "bg-brand-orange text-white"
            }`}
            style={{ width: `${Math.max(8, (point.value / total) * 100)}%` }}
          >
            {point.displayValue}
          </div>
        ))}
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {chart.points.map((point, index) => (
          <div key={`${point.label}-legend`} className="flex items-center justify-between rounded-md border border-neutral-200 px-3 py-2">
            <span className="flex min-w-0 items-center gap-2 text-sm text-neutral-700">
              <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${index === 0 ? "bg-brand-green" : "bg-brand-orange"}`} />
              <span className="break-keep">{point.label}</span>
            </span>
            <span className="shrink-0 text-sm font-semibold text-neutral-950">{point.displayValue}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MilestonePath({ chart }: { chart: WorkChart }) {
  return (
    <div className="rounded-md border border-neutral-200 bg-white p-4">
      <div className="grid gap-3 md:grid-cols-3">
        {chart.points.map((point, index) => (
          <div key={`${point.label}-${point.displayValue}`} className="relative rounded-md border border-neutral-200 p-4">
            <p className="flex h-7 w-7 items-center justify-center rounded-md bg-brand-blue text-sm font-semibold text-white">
              {index + 1}
            </p>
            <p className="mt-4 break-keep text-sm font-semibold text-neutral-950">{point.label}</p>
            <p className="mt-2 text-2xl font-semibold text-brand-green">{point.displayValue}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function EvidenceTiles({ chart, locale }: { chart: WorkChart; locale: Locale }) {
  const labels = copy[locale];

  return (
    <div className="grid gap-3 rounded-md border border-neutral-200 bg-white p-4 sm:grid-cols-3">
      {chart.points.map((point, index) => (
        <div key={`${point.label}-${point.displayValue}`} className="rounded-md border border-neutral-200 p-4">
          <p className="break-keep text-sm font-semibold text-neutral-950">{point.label}</p>
          <p className={`mt-2 text-3xl font-semibold ${index === 0 ? "text-brand-orange" : "text-brand-blue"}`}>
            {point.displayValue}
          </p>
          <p className="mt-2 text-xs uppercase text-neutral-500">
            {point.kind === "actual" ? labels.measuredEvidence : labels.directionalSupport}
          </p>
        </div>
      ))}
    </div>
  );
}

function ChartVisual({ chart, locale }: { chart: WorkChart; locale: Locale }) {
  if (chart.visualType === "reduction") {
    return <ReductionBars chart={chart} />;
  }

  if (chart.visualType === "composition") {
    return <CompositionBar chart={chart} />;
  }

  if (chart.visualType === "milestones") {
    return <MilestonePath chart={chart} />;
  }

  if (chart.visualType === "evidence") {
    return <EvidenceTiles chart={chart} locale={locale} />;
  }

  return <ComparisonBars chart={chart} locale={locale} />;
}

export function KpiCharts({
  charts,
  locale = defaultLocale,
}: {
  charts: WorkChart[];
  locale?: Locale;
}) {
  if (!charts.length) {
    return null;
  }

  const labels = copy[locale];

  return (
    <section className="mt-8 grid gap-4" aria-label={labels.eyebrow}>
      {charts.map((chart) => {
        const hasDirectional = chart.points.some((point) => point.kind === "directional");

        return (
          <article key={`${chart.title}-${chart.metricValue}`} className="rounded-md border border-neutral-200 bg-brand-bg p-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wide text-brand-green-deep">{labels.eyebrow}</p>
                <h2 className="mt-2 text-xl font-semibold leading-snug text-neutral-950">{chart.title}</h2>
                <p className="mt-2 max-w-3xl break-keep text-sm leading-6 text-neutral-700">{chart.summary}</p>
              </div>
              <dl className="shrink-0 rounded-md border border-neutral-200 bg-white px-4 py-3">
                <dt className="text-xs font-medium uppercase text-neutral-500">{chart.metricLabel}</dt>
                <dd className="mt-1 break-words text-2xl font-semibold text-brand-orange">{chart.metricValue}</dd>
              </dl>
            </div>

            <div className="mt-5">
              <ChartVisual chart={chart} locale={locale} />
            </div>

            <div className="mt-4 flex flex-col gap-3 text-sm text-neutral-600 md:flex-row md:items-center md:justify-between">
              <p className="break-keep leading-6">{chart.dataQuality}</p>
              <div className="flex shrink-0 flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-md border border-neutral-200 bg-white px-2 py-1 text-xs">
                  <span className="h-2 w-2 rounded-full bg-brand-green" />
                  {labels.actual}
                </span>
                {hasDirectional ? (
                  <span className="inline-flex items-center gap-1.5 rounded-md border border-neutral-200 bg-white px-2 py-1 text-xs">
                    <span className="h-2 w-2 rounded-full bg-neutral-300" />
                    {labels.directional}
                  </span>
                ) : null}
                <span className="inline-flex items-center gap-1.5 rounded-md border border-neutral-200 bg-white px-2 py-1 text-xs">
                  {typeLabel(chart, locale)}
                </span>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}
