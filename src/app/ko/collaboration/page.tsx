import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { collaborationPracticesKo } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "협업 방식",
  description: "운영 근거를 기술 협업 흐름으로 번역하는 방식.",
};

export default function KoreanCollaborationPage() {
  return (
    <Container>
      <PageHeader
        eyebrow="협업 방식"
        title="운영 근거를 개발자가 바로 다룰 수 있는 일로 바꿉니다."
        description="이 아카이브는 엔지니어, 운영자, 클라이언트, 이해관계자와 어떻게 근거, 제약, 명확한 의사결정 단위로 소통하는지 보여주도록 설계했습니다."
      />
      <div className="grid gap-5 pb-10 md:grid-cols-3">
        {collaborationPracticesKo.map((practice) => {
          const Icon = practice.icon;
          return (
            <article key={practice.title} className="rounded-lg border border-neutral-200 bg-white p-5">
              <Icon size={22} className="text-brand-blue" aria-hidden="true" />
              <h2 className="mt-4 text-lg font-semibold text-neutral-950">{practice.title}</h2>
              <p className="mt-3 text-sm leading-6 text-neutral-700">{practice.description}</p>
            </article>
          );
        })}
      </div>
      <section className="mb-16 rounded-lg border border-neutral-200 bg-brand-bg p-6">
        <h2 className="text-xl font-semibold text-neutral-950">워크플로우 친숙도</h2>
        <p className="mt-3 leading-7 text-neutral-700">
          이 포트폴리오 자체도 구조화된 markdown 콘텐츠, GitHub 소스 관리, Vercel 배포, 재사용 가능한 템플릿, 반복 발행 흐름으로 운영됩니다. 같은 습관은 Jira식 이슈 작성, Notion 운영 문서, GitHub 기반 검토 맥락, 대시보드 리포팅에도 적용됩니다.
        </p>
      </section>
    </Container>
  );
}
