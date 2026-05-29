import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { systemsBuilt } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Systems Built",
  description: "Operational systems, dashboards, automation workflows, and process standards.",
};

export default function SystemsBuiltPage() {
  return (
    <Container>
      <PageHeader
        eyebrow="Systems Built"
        title="Work that became repeatable operating systems."
        description="These systems show how work becomes repeatable: data intake, QA loops, reporting cadence, field standards, and developer-ready problem packets."
      />
      <div className="grid gap-5 pb-16 md:grid-cols-2">
        {systemsBuilt.map((system) => (
          <article key={system.name} className="rounded-lg border border-neutral-200 bg-white p-5">
            <p className="text-sm font-semibold uppercase text-brand-green">{system.type}</p>
            <h2 className="mt-3 text-xl font-semibold text-neutral-950">{system.name}</h2>
            <p className="mt-3 leading-7 text-neutral-700">{system.description}</p>
          </article>
        ))}
      </div>
    </Container>
  );
}
