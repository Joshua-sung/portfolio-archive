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
  return getAllTags("ko").map((tag) => ({ tag: tag.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { tag } = await params;
  const tagInfo = getAllTags("ko").find((item) => item.slug === tag);

  return {
    title: tagInfo ? `#${tagInfo.label}` : "태그",
    description: tagInfo ? `${tagInfo.label} 역량과 연결된 케이스 스터디.` : "태그별 케이스 스터디.",
  };
}

export default async function KoreanTagPage({ params }: PageProps) {
  const locale = "ko";
  const { tag } = await params;
  const tagInfo = getAllTags(locale).find((item) => item.slug === tag);
  const entries = getEntriesByTagSlug(tag, locale);

  if (!tagInfo || entries.length === 0) {
    notFound();
  }

  return (
    <Container>
      <div className="py-10">
        <Link
          href="/ko/work-archive"
          className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-neutral-950"
        >
          <ArrowLeft size={15} aria-hidden="true" />
          케이스 목록으로
        </Link>
        <header className="mt-8 max-w-3xl">
          <p className="text-sm font-semibold uppercase text-brand-green">태그</p>
          <h1 className="mt-3 text-4xl font-semibold text-neutral-950">#{tagInfo.label}</h1>
          <p className="mt-4 text-lg leading-8 text-neutral-700">
            이 역량과 연결된 케이스 {entries.length}개입니다.
          </p>
        </header>
        <div className="grid gap-5 py-10 lg:grid-cols-2">
          {entries.map((entry) => (
            <WorkCard key={entry.slug} entry={entry} locale={locale} />
          ))}
        </div>
      </div>
    </Container>
  );
}
