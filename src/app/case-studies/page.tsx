import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { WorkCard } from "@/components/work-card";
import { getFeaturedEntries } from "@/lib/content";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "Selected STAR+T case studies with measurable operational outcomes.",
};

export default function CaseStudiesPage() {
  const entries = getFeaturedEntries();

  return (
    <Container>
      <PageHeader
        eyebrow="Case Studies"
        title="Deep dives into operational problems, technical collaboration, and measurable outcomes."
        description="These are the primary public cases for recruiting conversations. Each one shows the situation, task, actions, results, tools, collaboration pattern, and reusable lessons."
      />
      <div className="grid gap-5 pb-16 lg:grid-cols-3">
        {entries.map((entry) => (
          <WorkCard key={entry.slug} entry={entry} />
        ))}
      </div>
    </Container>
  );
}

