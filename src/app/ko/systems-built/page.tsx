import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { systemsBuiltKo } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "구축 시스템",
  description: "운영 시스템, 대시보드, 자동화 흐름, 프로세스 표준.",
};

export default function KoreanSystemsBuiltPage() {
  return (
    <Container>
      <PageHeader
        eyebrow="구축 시스템"
        title="반복 가능한 운영 시스템으로 남긴 작업들."
        description="데이터 수집, QA 루프, 리포팅 리듬, 현장 표준, 개발자가 바로 이해할 수 있는 문제 패킷처럼 업무가 반복 가능한 구조로 바뀐 사례를 보여줍니다."
      />
      <div className="grid gap-5 pb-16 md:grid-cols-2">
        {systemsBuiltKo.map((system) => (
          <article key={system.name} className="rounded-lg border border-neutral-200 bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-green-deep">{system.type}</p>
            <h2 className="mt-3 text-xl font-semibold text-neutral-950">{system.name}</h2>
            <p className="mt-3 leading-7 text-neutral-700">{system.description}</p>
          </article>
        ))}
      </div>
    </Container>
  );
}
