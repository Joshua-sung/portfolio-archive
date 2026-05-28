import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { WorkCard } from "@/components/work-card";
import { getAllTags, getCompanyGroups, getWorkEntries } from "@/lib/content";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Work Archive",
  description: "Markdown-based archive of operational, data, automation, and PM case studies.",
};

export default function WorkArchivePage() {
  const entries = getWorkEntries();
  const tags = getAllTags();
  const companies = getCompanyGroups();

  return (
    <Container>
      <PageHeader
        eyebrow="Work Archive"
        title="Operational case studies built to accumulate over time."
        description="Every entry follows a STAR+T format and captures problem context, ownership, collaboration, tools, execution details, outcomes, and lessons."
      />
      <section className="border-y border-neutral-200 py-6">
        <h2 className="text-sm font-semibold uppercase text-neutral-500">Browse by company</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {companies.map((company) => (
            <Link
              key={company.slug}
              href={`/companies/${company.slug}`}
              className="rounded-md border border-neutral-200 px-3 py-2 text-sm text-neutral-700 transition hover:border-emerald-700 hover:text-emerald-700"
            >
              {company.name} <span className="text-neutral-400">{company.entries.length}</span>
            </Link>
          ))}
        </div>
      </section>
      <section className="border-b border-neutral-200 py-6">
        <h2 className="text-sm font-semibold uppercase text-neutral-500">Browse by tag</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link
              key={tag.slug}
              href={`/tags/${tag.slug}`}
              className="rounded-md border border-neutral-200 px-3 py-2 text-sm text-neutral-700 transition hover:border-emerald-700 hover:text-emerald-700"
            >
              #{tag.label} <span className="text-neutral-400">{tag.count}</span>
            </Link>
          ))}
        </div>
      </section>
      <section className="grid gap-5 py-10 lg:grid-cols-2">
        {entries.map((entry) => (
          <WorkCard key={entry.slug} entry={entry} />
        ))}
      </section>
    </Container>
  );
}
