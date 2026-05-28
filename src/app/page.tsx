import Link from "next/link";
import { ArrowRight, FileText, GitBranch, Layers3 } from "lucide-react";
import { Container } from "@/components/container";
import { MetricStrip } from "@/components/metric-strip";
import { WorkCard } from "@/components/work-card";
import { capabilityMap } from "@/lib/site-data";
import { getCompanyGroups, getFeaturedEntries, getWorkEntries } from "@/lib/content";

export default function Home() {
  const featuredEntries = getFeaturedEntries();
  const allEntries = getWorkEntries();
  const companies = getCompanyGroups();
  const headlineMetrics = allEntries.flatMap((entry) => entry.metrics).slice(0, 3);

  return (
    <>
      <section className="border-b border-neutral-200 bg-white">
        <Container>
          <div className="grid gap-10 py-14 lg:grid-cols-[1.15fr_0.85fr] lg:py-20">
            <div className="min-w-0">
              <p className="text-sm font-semibold uppercase text-emerald-700">
                Growth PM / Operations PM / Data PM
              </p>
              <h1 className="mt-5 max-w-[11ch] break-words text-3xl font-semibold leading-tight text-neutral-950 sm:max-w-4xl sm:text-6xl">
                Operational work archive for systems, data, automation, and execution.
              </h1>
              <p className="mt-6 max-w-[32ch] text-lg leading-8 text-neutral-700 sm:max-w-2xl">
                A public portfolio built around measurable field execution: process optimization,
                developer collaboration, dashboarding, automation literacy, and data-backed decisions.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/work-archive"
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-neutral-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
                >
                  Browse work archive
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
                <Link
                  href="/resume"
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-neutral-300 px-4 py-3 text-sm font-semibold text-neutral-950 transition hover:border-neutral-950"
                >
                  View resume snapshot
                  <FileText size={16} aria-hidden="true" />
                </Link>
              </div>
            </div>
            <div className="min-w-0 rounded-lg border border-neutral-200 bg-neutral-50 p-5">
              <div className="flex items-center gap-3 border-b border-neutral-200 pb-4">
                <div className="rounded-md bg-emerald-100 p-2 text-emerald-800">
                  <Layers3 size={20} aria-hidden="true" />
                </div>
                <div>
                  <h2 className="font-semibold text-neutral-950">Archive system</h2>
                  <p className="max-w-[26ch] break-words text-sm text-neutral-600 sm:max-w-none">
                    Markdown-first, GitHub-backed, Vercel-deployed.
                  </p>
                </div>
              </div>
              <dl className="mt-5 space-y-4 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-neutral-500">Published cases</dt>
                  <dd className="font-semibold text-neutral-950">{allEntries.length}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-neutral-500">Company groups</dt>
                  <dd className="font-semibold text-neutral-950">{companies.length}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-neutral-500">Publishing unit</dt>
                  <dd className="font-semibold text-neutral-950">1 MDX file</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-neutral-500">Workflow proof</dt>
                  <dd className="inline-flex items-center gap-1 font-semibold text-neutral-950">
                    <GitBranch size={15} aria-hidden="true" />
                    Git-based
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-neutral-50 py-12">
        <Container>
          <MetricStrip metrics={headlineMetrics} />
        </Container>
      </section>

      <section className="border-y border-neutral-200 bg-white py-14">
        <Container>
          <div className="mb-8 max-w-3xl">
            <p className="text-sm font-semibold uppercase text-cyan-700">Capability map</p>
            <h2 className="mt-3 text-3xl font-semibold text-neutral-950">What the archive is designed to prove</h2>
            <p className="mt-4 leading-7 text-neutral-700">
              Each case is written to show how operational problems become systems, workflows, dashboards,
              technical requirements, or measurable process improvements.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {capabilityMap.map((capability) => {
              const Icon = capability.icon;
              return (
                <div key={capability.title} className="rounded-lg border border-neutral-200 bg-white p-5">
                  <Icon className="text-emerald-700" size={22} aria-hidden="true" />
                  <h3 className="mt-4 font-semibold text-neutral-950">{capability.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-neutral-600">{capability.description}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="bg-neutral-50 py-14">
        <Container>
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase text-amber-700">Featured case studies</p>
              <h2 className="mt-3 text-3xl font-semibold text-neutral-950">Execution with measurable outcomes</h2>
            </div>
            <Link
              href="/case-studies"
              className="inline-flex w-fit items-center gap-2 rounded-md border border-neutral-300 px-3 py-2 text-sm font-medium text-neutral-900 transition hover:border-neutral-950"
            >
              All case studies
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {featuredEntries.map((entry) => (
              <WorkCard key={entry.slug} entry={entry} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
