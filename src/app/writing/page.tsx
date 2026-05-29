import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Writing",
  description: "Future operating notes and PM reflections.",
};

export default function WritingPage() {
  return (
    <Container>
      <PageHeader
        eyebrow="Writing"
        title="A future space for operating notes."
        description="This section is intentionally lightweight for the first version. It can later hold short notes on operations, automation, dashboarding, PM collaboration, and data-driven decision making."
      />
      <section className="mb-16 rounded-lg border border-neutral-200 bg-brand-bg p-6">
        <h2 className="text-xl font-semibold text-neutral-950">Publishing rule</h2>
        <p className="mt-3 leading-7 text-neutral-700">
          Writing should stay practical and evidence-based: what problem appeared, what system helped,
          what tradeoff mattered, and what an operator or PM could reuse.
        </p>
      </section>
    </Container>
  );
}

