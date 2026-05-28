import type { Metric } from "@/lib/content";

export function MetricStrip({ metrics }: { metrics: Metric[] }) {
  if (!metrics.length) {
    return null;
  }

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {metrics.map((metric) => (
        <div key={`${metric.label}-${metric.value}`} className="rounded-lg border border-neutral-200 bg-white p-4">
          <p className="text-xs font-medium uppercase text-neutral-500">{metric.label}</p>
          <p className="mt-2 text-2xl font-semibold text-neutral-950">{metric.value}</p>
          {metric.detail ? <p className="mt-1 text-sm text-neutral-600">{metric.detail}</p> : null}
        </div>
      ))}
    </div>
  );
}

