import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { WorkCard } from "@/components/work-card";
import { getFeaturedEntries } from "@/lib/content";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "Selected STAR+T case studies with operational judgment, technical collaboration, and business impact.",
};

export default function CaseStudiesPage() {
  const entries = getFeaturedEntries();

  return (
    <Container>
      <PageHeader
        eyebrow="Case Studies"
        title="Selected cases that show operational judgment, technical collaboration, and business impact."
        description="Each case shows the situation, ownership, actions, results, tools, collaboration pattern, and reusable lessons in a structure built for fast review."
      />
      <div className="grid gap-5 pb-16 lg:grid-cols-3">
        {entries.map((entry) => (
          <WorkCard key={entry.slug} entry={entry} />
        ))}
      </div>
    </Container>
  );
}
