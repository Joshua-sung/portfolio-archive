import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { WorkCard } from "@/components/work-card";
import { getFeaturedEntries } from "@/lib/content";

export const metadata: Metadata = {
  title: "케이스",
  description: "운영 판단, 기술 협업, 비즈니스 임팩트를 중심으로 정리한 STAR+T 케이스 스터디.",
};

export default function KoreanCaseStudiesPage() {
  const locale = "ko";
  const entries = getFeaturedEntries(locale);

  return (
    <Container>
      <PageHeader
        eyebrow="케이스"
        title="운영 판단, 기술 협업, 비즈니스 임팩트가 드러나는 대표 케이스."
        description="각 사례는 빠른 검토가 가능하도록 상황, 오너십, 실행, 결과, 도구, 협업 방식, 재사용 가능한 배운 점을 함께 보여줍니다."
      />
      <div className="grid gap-5 pb-16 lg:grid-cols-3">
        {entries.map((entry) => (
          <WorkCard key={entry.slug} entry={entry} locale={locale} />
        ))}
      </div>
    </Container>
  );
}
