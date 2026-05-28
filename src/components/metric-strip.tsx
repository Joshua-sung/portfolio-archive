import type { Metric } from "@/lib/content";

export function MetricStrip({ metrics, variant = "cards" }: { metrics: Metric[]; variant?: "cards" | "compact" }) {
  if (!metrics.length) {
    return null;
  }

  if (variant === "compact") {
    return (
      <dl className="grid min-w-0 gap-x-4 gap-y-3 border-y border-neutral-200 py-4 sm:grid-cols-3">
        {metrics.map((metric) => (
          <div key={`${metric.label}-${metric.value}`} className="min-w-0">
            <dt className="break-words text-[11px] font-medium uppercase leading-4 text-neutral-500">{metric.label}</dt>
            <dd className="mt-1 break-words text-lg font-semibold leading-snug text-neutral-950">{metric.value}</dd>
            {metric.detail ? <dd className="mt-1 break-words text-xs leading-5 text-neutral-600">{metric.detail}</dd> : null}
          </div>
        ))}
      </dl>
    );
  }

  return (
    <div className="grid min-w-0 gap-3 sm:grid-cols-3">
      {metrics.map((metric) => (
        <div key={`${metric.label}-${metric.value}`} className="min-w-0 rounded-md border border-neutral-200 bg-white p-4">
          <p className="break-words text-xs font-medium uppercase text-neutral-500">{metric.label}</p>
          <p className="mt-2 break-words text-2xl font-semibold text-neutral-950">{metric.value}</p>
          {metric.detail ? <p className="mt-1 break-words text-sm text-neutral-600">{metric.detail}</p> : null}
        </div>
      ))}
    </div>
  );
}
