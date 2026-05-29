import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "글",
  description: "운영 노트와 PM 회고를 위한 공간.",
};

export default function KoreanWritingPage() {
  return (
    <Container>
      <PageHeader
        eyebrow="글"
        title="운영 노트를 쌓기 위한 가벼운 공간."
        description="첫 버전에서는 의도적으로 가볍게 유지합니다. 이후 운영, 자동화, 대시보드, PM 협업, 데이터 기반 의사결정에 대한 짧은 글을 누적할 수 있습니다."
      />
      <section className="mb-16 rounded-lg border border-neutral-200 bg-brand-bg p-6">
        <h2 className="text-xl font-semibold text-neutral-950">발행 원칙</h2>
        <p className="mt-3 leading-7 text-neutral-700">
          글은 실용적이고 근거 중심이어야 합니다. 어떤 문제가 있었고, 어떤 시스템이 도움이 되었고, 어떤 트레이드오프가 중요했으며, 운영자나 PM이 무엇을 재사용할 수 있는지를 남깁니다.
        </p>
      </section>
    </Container>
  );
}
