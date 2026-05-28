import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/container";
import { WorkCard } from "@/components/work-card";
import { getAllTags, getEntriesByTagSlug } from "@/lib/content";

type PageProps = {
  params: Promise<{ tag: string }>;
};

export function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag: tag.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { tag } = await params;
  const tagInfo = getAllTags().find((item) => item.slug === tag);

  return {
    title: tagInfo ? `#${tagInfo.label}` : "Tag",
    description: tagInfo ? `Work archive entries tagged ${tagInfo.label}.` : "Tagged work archive entries.",
  };
}

export default async function TagPage({ params }: PageProps) {
  const { tag } = await params;
  const tagInfo = getAllTags().find((item) => item.slug === tag);
  const entries = getEntriesByTagSlug(tag);

  if (!tagInfo || entries.length === 0) {
    notFound();
  }

  return (
    <Container>
      <div className="py-10">
        <Link
          href="/work-archive"
          className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-neutral-950"
        >
          <ArrowLeft size={15} aria-hidden="true" />
          Back to archive
        </Link>
        <header className="mt-8 max-w-3xl">
          <p className="text-sm font-semibold uppercase text-emerald-700">Tag</p>
          <h1 className="mt-3 text-4xl font-semibold text-neutral-950">#{tagInfo.label}</h1>
          <p className="mt-4 text-lg leading-8 text-neutral-700">
            {entries.length} archive {entries.length === 1 ? "entry" : "entries"} connected to this capability.
          </p>
        </header>
        <div className="grid gap-5 py-10 lg:grid-cols-2">
          {entries.map((entry) => (
            <WorkCard key={entry.slug} entry={entry} />
          ))}
        </div>
      </div>
    </Container>
  );
}
