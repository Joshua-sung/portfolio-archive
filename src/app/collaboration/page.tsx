import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { collaborationPractices } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Collaboration",
  description: "How operational evidence is translated into technical collaboration workflows.",
};

export default function CollaborationPage() {
  return (
    <Container>
      <PageHeader
        eyebrow="Collaboration"
        title="Operational evidence translated into developer-ready work."
        description="The archive is designed to show how I communicate with engineers, operators, clients, and stakeholders using evidence, constraints, and clearly scoped decisions."
      />
      <div className="grid gap-5 pb-10 md:grid-cols-3">
        {collaborationPractices.map((practice) => {
          const Icon = practice.icon;
          return (
            <article key={practice.title} className="rounded-lg border border-neutral-200 bg-white p-5">
              <Icon size={22} className="text-cyan-700" aria-hidden="true" />
              <h2 className="mt-4 text-lg font-semibold text-neutral-950">{practice.title}</h2>
              <p className="mt-3 text-sm leading-6 text-neutral-700">{practice.description}</p>
            </article>
          );
        })}
      </div>
      <section className="mb-16 rounded-lg border border-neutral-200 bg-neutral-50 p-6">
        <h2 className="text-xl font-semibold text-neutral-950">Workflow familiarity</h2>
        <p className="mt-3 leading-7 text-neutral-700">
          This portfolio itself follows the workflow it claims: structured markdown content, GitHub source
          control, Vercel deployment, reusable templates, and iterative publishing. The same habit applies
          to Jira-style issue writing, Notion operating docs, GitHub-based review context, and dashboard
          reporting.
        </p>
      </section>
    </Container>
  );
}

