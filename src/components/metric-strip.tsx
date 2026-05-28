import type { Metric } from "@/lib/content";

export function MetricStrip({ metrics }: { metrics: Metric[] }) {
  if (!metrics.length) {
    return null;
  }

  return (
    <div className="grid min-w-0 gap-3 sm:grid-cols-3">
      {metrics.map((metric) => (
        <div key={`${metric.label}-${metric.value}`} className="min-w-0 rounded-lg border border-neutral-200 bg-white p-4">
          <p className="break-words text-xs font-medium uppercase text-neutral-500">{metric.label}</p>
          <p className="mt-2 break-words text-2xl font-semibold text-neutral-950">{metric.value}</p>
          {metric.detail ? <p className="mt-1 break-words text-sm text-neutral-600">{metric.detail}</p> : null}
        </div>
      ))}
    </div>
  );
}
