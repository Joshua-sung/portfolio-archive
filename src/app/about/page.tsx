import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { capabilityMap } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "About",
  description: "About the operational PM profile behind the portfolio archive.",
};

export default function AboutPage() {
  return (
    <Container>
      <PageHeader
        eyebrow="About"
        title="A PM profile built around operational execution and technical translation."
        description="This archive focuses on the work behind outcomes: diagnosing operating constraints, coordinating people, turning messy signals into data, and collaborating with technical teams on practical systems."
      />
      <div className="grid gap-8 pb-16 lg:grid-cols-[0.75fr_1.25fr]">
        <aside className="rounded-lg border border-neutral-200 bg-brand-bg p-5">
          <h2 className="font-semibold text-neutral-950">Positioning</h2>
          <p className="mt-3 text-sm leading-6 text-neutral-700">
            Growth PM / Operations PM / Data PM candidate with a bias toward measurable execution,
            workflow design, and communication between operators, stakeholders, and developers.
          </p>
        </aside>
        <div className="space-y-6 text-base leading-8 text-neutral-700">
          <p>
            My work often starts in unclear operating environments: field teams, freelancer networks,
            physical service points, data collection processes, or cross-company proposal work. I focus on
            finding the real constraint, defining a measurable target, and creating a process that other
            people can repeat.
          </p>
          <p>
            The common thread is technical communication. I do not need to be the engineer implementing
            every change, but I do need to understand enough about APIs, dashboards, data structures,
            automation tradeoffs, and system behavior to give developers clear context and make sound
            business decisions.
          </p>
          <p>
            This site is intentionally structured as an archive. New work can be added over time as
            markdown case studies, preserving how a problem was framed, what actions were taken, which
            tools were involved, and what changed as a result.
          </p>
        </div>
      </div>
      <div className="grid gap-4 pb-20 md:grid-cols-2 lg:grid-cols-3">
        {capabilityMap.map((capability) => {
          const Icon = capability.icon;
          return (
            <div key={capability.title} className="rounded-lg border border-neutral-200 p-5">
              <Icon size={22} className="text-brand-green" aria-hidden="true" />
              <h3 className="mt-4 font-semibold text-neutral-950">{capability.title}</h3>
              <p className="mt-2 text-sm leading-6 text-neutral-600">{capability.description}</p>
            </div>
          );
        })}
      </div>
    </Container>
  );
}

