import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { capabilityMapKo } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "소개",
  description: "운영 실행과 기술 번역 역량을 중심으로 한 PM 프로필 소개.",
};

export default function KoreanAboutPage() {
  return (
    <Container>
      <PageHeader
        eyebrow="소개"
        title="운영 실행과 기술 번역을 중심으로 쌓아온 PM 프로필."
        description="이 포트폴리오는 운영 제약을 진단하고, 사람과 프로세스를 정렬하고, 흩어진 신호를 의사결정으로 바꾸고, 기술팀과 실용적인 시스템을 만드는 방식을 보여줍니다."
      />
      <div className="grid gap-8 pb-16 lg:grid-cols-[0.75fr_1.25fr]">
        <aside className="rounded-lg border border-neutral-200 bg-brand-bg p-5">
          <h2 className="font-semibold text-neutral-950">포지셔닝</h2>
          <p className="mt-3 text-sm leading-6 text-neutral-700">
            측정 가능한 실행, 워크플로우 설계, 운영자와 이해관계자, 개발자 사이의 명확한 커뮤니케이션에 강점이 있는 Growth PM / Operations PM / Data PM 프로필입니다.
          </p>
        </aside>
        <div className="space-y-6 text-base leading-8 text-neutral-700">
          <p>
            제 업무는 현장팀, 외부 작업자 네트워크, 물리적 서비스 지점, 데이터 수집 프로세스, 여러 회사가 함께 움직이는 제안 업무처럼 불명확한 운영 환경에서 시작되는 경우가 많았습니다. 핵심 제약을 찾고, 측정 가능한 목표를 정의하고, 다른 사람이 반복할 수 있는 프로세스로 만드는 데 집중합니다.
          </p>
          <p>
            공통점은 기술 커뮤니케이션입니다. 모든 변경을 직접 개발하는 엔지니어일 필요는 없지만, API, 대시보드, 데이터 구조, 자동화 트레이드오프, 시스템 동작을 충분히 이해해야 개발자에게 명확한 맥락을 전달하고 사업적으로 맞는 결정을 내릴 수 있습니다.
          </p>
          <p>
            이 포트폴리오는 시간이 지나며 더 강한 근거를 쌓을 수 있도록 설계했습니다. 각 케이스는 맥락, 의사결정, 지표, 도구, 배운 점을 더 선명하게 확장하면서도 원래의 운영 스토리를 잃지 않도록 구성했습니다.
          </p>
        </div>
      </div>
      <div className="grid gap-4 pb-20 md:grid-cols-2 lg:grid-cols-3">
        {capabilityMapKo.map((capability) => {
          const Icon = capability.icon;
          return (
            <div key={capability.title} className="rounded-lg border border-neutral-200 p-5">
              <Icon size={22} className="text-brand-green" aria-hidden="true" />
              <h3 className="mt-4 font-semibold text-neutral-950">{capability.title}</h3>
              <p className="mt-2 text-sm leading-6 text-neutral-600">{capability.description}</p>
            </div>
          );
        })}
      </div>
    </Container>
  );
}
