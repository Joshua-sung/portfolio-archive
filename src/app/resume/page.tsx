import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { getWorkEntries } from "@/lib/content";
import { resumeHighlights } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Resume",
  description: "Resume snapshot for Growth PM, Operations PM, and Data PM roles.",
};

export default function ResumePage() {
  const entries = getWorkEntries();
  const metrics = entries.flatMap((entry) => entry.metrics);

  return (
    <Container>
      <PageHeader
        eyebrow="Resume"
        title="Performance-centered resume snapshot."
        description="A concise view of the roles, outcomes, operating range, and systems behind the portfolio."
      />
      <div className="grid gap-8 pb-16 lg:grid-cols-[0.85fr_1.15fr]">
        <section className="rounded-lg border border-neutral-200 bg-brand-bg p-5">
          <h2 className="font-semibold text-neutral-950">Profile summary</h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-neutral-700">
            {resumeHighlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-neutral-950">Selected quantified outcomes</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {metrics.map((metric) => (
              <div key={`${metric.label}-${metric.value}`} className="rounded-lg border border-neutral-200 p-4">
                <p className="text-sm font-medium text-neutral-500">{metric.label}</p>
                <p className="mt-2 text-2xl font-semibold text-neutral-950">{metric.value}</p>
                {metric.detail ? <p className="mt-1 text-sm leading-6 text-neutral-600">{metric.detail}</p> : null}
              </div>
            ))}
          </div>
        </section>
      </div>
    </Container>
  );
}
