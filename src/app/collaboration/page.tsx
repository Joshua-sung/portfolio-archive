import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { collaborationPractices } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Collaboration",
  description: "How operational evidence becomes clear technical collaboration and scoped decisions.",
};

export default function CollaborationPage() {
  return (
    <Container>
      <PageHeader
        eyebrow="Collaboration"
        title="Operational evidence translated into developer-ready work."
        description="How I communicate with engineers, operators, clients, and stakeholders using evidence, constraints, and clearly scoped decisions."
      />
      <div className="grid gap-5 pb-10 md:grid-cols-3">
        {collaborationPractices.map((practice) => {
          const Icon = practice.icon;
          return (
            <article key={practice.title} className="rounded-lg border border-neutral-200 bg-white p-5">
              <Icon size={22} className="text-brand-blue" aria-hidden="true" />
              <h2 className="mt-4 text-lg font-semibold text-neutral-950">{practice.title}</h2>
              <p className="mt-3 text-sm leading-6 text-neutral-700">{practice.description}</p>
            </article>
          );
        })}
      </div>
      <section className="mb-16 rounded-lg border border-neutral-200 bg-brand-bg p-6">
        <h2 className="text-xl font-semibold text-neutral-950">Ways of working</h2>
        <p className="mt-3 leading-7 text-neutral-700">
          The same habits behind this site carry into Jira-style issue writing, Notion operating docs,
          GitHub review context, and dashboard reporting: decisions, owners, next actions, and evidence
          stay visible.
        </p>
      </section>
    </Container>
  );
}
