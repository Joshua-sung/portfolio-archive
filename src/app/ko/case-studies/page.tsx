import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { WorkCard } from "@/components/work-card";
import { getFeaturedEntries } from "@/lib/content";

export const metadata: Metadata = {
  title: "케이스 스터디",
  description: "측정 가능한 운영 성과를 중심으로 정리한 STAR+T 케이스 스터디.",
};

export default function KoreanCaseStudiesPage() {
  const locale = "ko";
  const entries = getFeaturedEntries(locale);

  return (
    <Container>
      <PageHeader
        eyebrow="케이스 스터디"
        title="운영 문제, 기술 협업, 측정 가능한 결과를 깊게 보여주는 사례."
        description="채용 대화에서 핵심 근거로 사용할 공개 케이스입니다. 각 사례는 상황, 과제, 실행, 결과, 도구, 협업 방식, 재사용 가능한 배운 점을 함께 보여줍니다."
      />
      <div className="grid gap-5 pb-16 lg:grid-cols-3">
        {entries.map((entry) => (
          <WorkCard key={entry.slug} entry={entry} locale={locale} />
        ))}
      </div>
    </Container>
  );
}
