import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/container";
import { MarkdownBody } from "@/components/markdown-body";
import { MetricStrip } from "@/components/metric-strip";
import { TagChip } from "@/components/tag-chip";
import { getWorkEntries, getWorkEntryBySlug } from "@/lib/content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getWorkEntries().map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getWorkEntryBySlug(slug);

  if (!entry) {
    return {};
  }

  return {
    title: entry.title,
    description: entry.summary,
  };
}

export default async function WorkEntryPage({ params }: PageProps) {
  const { slug } = await params;
  const entry = getWorkEntryBySlug(slug);

  if (!entry) {
    notFound();
  }

  return (
    <Container>
      <article className="py-10">
        <Link
          href="/work-archive"
          className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-neutral-950"
        >
          <ArrowLeft size={15} aria-hidden="true" />
          Back to archive
        </Link>
        <header className="mt-8 max-w-4xl">
          <div className="flex flex-wrap gap-2 text-sm font-medium text-neutral-500">
            <span>{entry.category}</span>
            <span aria-hidden="true">/</span>
            <span>{entry.outcomeType}</span>
            <span aria-hidden="true">/</span>
            <span>{entry.role}</span>
          </div>
          <h1 className="mt-4 max-w-[12ch] break-words text-3xl font-semibold leading-tight text-neutral-950 sm:max-w-4xl sm:text-5xl">
            {entry.title}
          </h1>
          <p className="mt-5 max-w-[32ch] text-lg leading-8 text-neutral-700 sm:max-w-none">{entry.summary}</p>
          <p className="mt-4 max-w-[34ch] text-sm text-neutral-500 sm:max-w-none">{entry.sensitive}</p>
        </header>
        <div className="mt-8">
          <MetricStrip metrics={entry.metrics} />
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {entry.tags.map((tag) => (
            <TagChip key={tag} tag={tag} />
          ))}
        </div>
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_280px]">
          <div className="min-w-0">
            <MarkdownBody content={entry.content} />
          </div>
          <aside className="h-fit rounded-lg border border-neutral-200 bg-neutral-50 p-5">
            <h2 className="font-semibold text-neutral-950">Tools & systems</h2>
            <ul className="mt-4 space-y-2 text-sm text-neutral-700">
              {entry.tools.map((tool) => (
                <li key={tool}>{tool}</li>
              ))}
            </ul>
          </aside>
        </div>
      </article>
    </Container>
  );
}
