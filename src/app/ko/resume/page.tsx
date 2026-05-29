import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { getWorkEntries } from "@/lib/content";
import { resumeHighlightsKo } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "경력 요약",
  description: "Growth PM, Operations PM, Data PM 역할을 위한 경력 요약.",
};

export default function KoreanResumePage() {
  const entries = getWorkEntries("ko");
  const metrics = entries.flatMap((entry) => entry.metrics);

  return (
    <Container>
      <PageHeader
        eyebrow="경력 요약"
        title="성과 중심으로 정리한 경력 스냅샷."
        description="역할, 성과, 운영 범위, 구축한 시스템을 압축해서 보여주는 경력 요약입니다."
      />
      <div className="grid gap-8 pb-16 lg:grid-cols-[0.85fr_1.15fr]">
        <section className="rounded-lg border border-neutral-200 bg-brand-bg p-5">
          <h2 className="font-semibold text-neutral-950">프로필 요약</h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-neutral-700">
            {resumeHighlightsKo.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-neutral-950">선택된 정량 성과</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {metrics.map((metric) => (
              <div key={`${metric.label}-${metric.value}`} className="rounded-lg border border-neutral-200 p-4">
                <p className="text-sm font-medium text-neutral-500">{metric.label}</p>
                <p className="mt-2 text-2xl font-semibold text-neutral-950">{metric.value}</p>
                {metric.detail ? <p className="mt-1 text-sm leading-6 text-neutral-600">{metric.detail}</p> : null}
              </div>
            ))}
          </div>
        </section>
      </div>
    </Container>
  );
}
