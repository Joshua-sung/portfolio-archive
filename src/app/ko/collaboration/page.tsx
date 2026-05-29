import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { collaborationPracticesKo } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "협업 방식",
  description: "운영 근거를 명확한 기술 협업과 의사결정 단위로 바꾸는 방식.",
};

export default function KoreanCollaborationPage() {
  return (
    <Container>
      <PageHeader
        eyebrow="협업 방식"
        title="운영 근거를 개발자가 바로 다룰 수 있는 일로 바꿉니다."
        description="근거, 제약 조건, 명확한 의사결정 범위로 개발자, 운영자, 고객사, 이해관계자와 협업하는 방식입니다."
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
        <h2 className="text-xl font-semibold text-neutral-950">일하는 방식</h2>
        <p className="mt-3 leading-7 text-neutral-700">
          이 사이트에 적용한 구조화 습관은 Jira식 이슈 작성, Notion 운영 문서, GitHub 검토 맥락, 대시보드 리포팅에도 이어집니다. 결정사항, 담당자, 다음 액션, 근거가 흐름 안에서 계속 보이도록 관리합니다.
        </p>
      </section>
    </Container>
  );
}
