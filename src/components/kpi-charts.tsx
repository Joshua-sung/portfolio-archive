import type { WorkChart } from "@/lib/content";
import { defaultLocale, type Locale } from "@/lib/i18n";

const copy = {
  en: {
    eyebrow: "KPI graph",
    actual: "Actual",
    directional: "Directional",
  },
  ko: {
    eyebrow: "KPI 그래프",
    actual: "실측",
    directional: "경향",
  },
};

function toPolyline(points: WorkChart["points"], maxValue: number) {
  const left = 56;
  const top = 22;
  const width = 548;
  const height = 122;
  const denominator = Math.max(points.length - 1, 1);

  return points
    .map((point, index) => {
      const x = left + (width * index) / denominator;
      const y = top + height - (point.value / maxValue) * height;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
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
        const maxValue = Math.max(...chart.points.map((point) => point.value), 1);
        const polyline = toPolyline(chart.points, maxValue);
        const hasDirectional = chart.points.some((point) => point.kind === "directional");

        return (
          <article key={`${chart.title}-${chart.metricValue}`} className="rounded-md border border-neutral-200 bg-brand-bg p-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase text-brand-green">{labels.eyebrow}</p>
                <h2 className="mt-2 text-xl font-semibold leading-snug text-neutral-950">{chart.title}</h2>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-neutral-700">{chart.summary}</p>
              </div>
              <dl className="shrink-0 rounded-md border border-neutral-200 bg-white px-4 py-3">
                <dt className="text-xs font-medium uppercase text-neutral-500">{chart.metricLabel}</dt>
                <dd className="mt-1 text-2xl font-semibold text-brand-orange">{chart.metricValue}</dd>
              </dl>
            </div>

            <div className="mt-5 overflow-hidden rounded-md border border-neutral-200 bg-white">
              <svg className="h-auto w-full" viewBox="0 0 640 210" role="img" aria-label={chart.title}>
                <line x1="56" y1="22" x2="56" y2="144" stroke="#d4d4d4" strokeWidth="1" />
                <line x1="56" y1="144" x2="604" y2="144" stroke="#d4d4d4" strokeWidth="1" />
                {[0.25, 0.5, 0.75].map((tick) => (
                  <line
                    key={tick}
                    x1="56"
                    y1={144 - 122 * tick}
                    x2="604"
                    y2={144 - 122 * tick}
                    stroke="#e5e5e5"
                    strokeWidth="1"
                  />
                ))}
                <polyline
                  fill="none"
                  points={polyline}
                  stroke="var(--brand-green)"
                  strokeDasharray={hasDirectional ? "6 5" : undefined}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                />
                {chart.points.map((point, index) => {
                  const denominator = Math.max(chart.points.length - 1, 1);
                  const x = 56 + (548 * index) / denominator;
                  const y = 22 + 122 - (point.value / maxValue) * 122;
                  const labelY = index % 2 === 0 ? 180 : 196;

                  return (
                    <g key={`${point.label}-${point.value}`}>
                      <line x1={x} y1={144} x2={x} y2={y} stroke="#DCEBD8" strokeWidth="8" strokeLinecap="round" />
                      <circle
                        cx={x}
                        cy={y}
                        fill={point.kind === "directional" ? "var(--brand-orange)" : "var(--brand-green)"}
                        r="5.5"
                        stroke="#ffffff"
                        strokeWidth="2"
                      />
                      <text x={x} y={y - 12} textAnchor="middle" className="fill-neutral-950 text-[13px] font-semibold">
                        {point.displayValue}
                      </text>
                      <text x={x} y={labelY} textAnchor="middle" className="fill-neutral-600 text-[11px]">
                        {point.label}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            <div className="mt-4 flex flex-col gap-3 text-sm text-neutral-600 md:flex-row md:items-center md:justify-between">
              <p className="leading-6">{chart.dataQuality}</p>
              <div className="flex shrink-0 flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-md border border-neutral-200 bg-white px-2 py-1 text-xs">
                  <span className="h-2 w-2 rounded-full bg-brand-green" />
                  {labels.actual}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-md border border-neutral-200 bg-white px-2 py-1 text-xs">
                  <span className="h-2 w-2 rounded-full bg-brand-orange" />
                  {labels.directional}
                </span>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}
