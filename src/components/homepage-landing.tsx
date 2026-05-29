import Link from "next/link";
import { ArrowRight, ArrowUpRight, CheckCircle2, GitBranch, Target } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { CompanyStrip } from "@/components/company-strip";
import { Container } from "@/components/container";
import { WorkCard } from "@/components/work-card";
import { githubUrl } from "@/lib/brand-assets";
import type { CompanyGroup, WorkEntry } from "@/lib/content";
import { defaultLocale, localizePath, type Locale } from "@/lib/i18n";

type Capability = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const homeCopy = {
  en: {
    eyebrow: "Growth PM / Operations PM / Data PM",
    title: "I turn messy operations into measurable growth systems.",
    subtitle: "운영 문제를 수익, 비용, 시간 절감 지표로 바꾸는 PM 포트폴리오.",
    description:
      "A hiring-focused portfolio of field-tested PM work across robotics delivery, data operations, growth programs, dashboards, automation, and developer collaboration.",
    primaryCta: "View case studies",
    secondaryCta: "Resume snapshot",
    proofCta: "GitHub proof",
    fitTitle: "Best fit for teams that need",
    fitItems: [
      "PM ownership across ambiguous field, data, and partner operations",
      "Revenue, cost, time, and customer-experience metrics tied to execution",
      "Clear translation between operators, developers, stakeholders, and dashboards",
    ],
    publishedLabel: "public cases",
    contextLabel: "operating contexts",
    impactEyebrow: "Measurable outcomes",
    impactTitle: "The first signals a hiring manager should see",
    casesEyebrow: "Representative cases",
    casesTitle: "Projects that show problem solving, execution, and measurable result",
    casesDescription:
      "Each card follows the same structure so the role, operating context, problem, action, and result are scannable before opening the full STAR+T write-up.",
    capabilitiesEyebrow: "Operating range",
    capabilitiesTitle: "What the portfolio proves beyond visual presentation",
    companiesEyebrow: "Operating contexts",
    companiesTitle: "Company and organization environments",
  },
  ko: {
    eyebrow: "Growth PM / Operations PM / Data PM",
    title: "운영 문제를 수익, 비용, 시간 절감 지표로 바꾸는 PM.",
    subtitle: "Growth PM / Operations PM 채용 관점에서 보는 실행형 포트폴리오.",
    description:
      "로봇배달, 데이터 구축, 성장 프로그램, 대시보드, 자동화, 개발 협업 경험을 실제 성과 중심으로 정리했습니다.",
    primaryCta: "케이스 스터디 보기",
    secondaryCta: "경력 요약",
    proofCta: "GitHub 증거",
    fitTitle: "이런 팀에 맞는 후보",
    fitItems: [
      "모호한 현장, 데이터, 파트너 운영을 끝까지 책임지는 PM",
      "수익, 비용, 시간, 고객경험 지표를 실행 결과와 연결하는 사람",
      "운영자, 개발자, 이해관계자, 대시보드 사이를 명확히 번역하는 사람",
    ],
    publishedLabel: "공개 케이스",
    contextLabel: "운영 맥락",
    impactEyebrow: "측정 가능한 성과",
    impactTitle: "채용자가 먼저 봐야 하는 핵심 지표",
    casesEyebrow: "대표 케이스",
    casesTitle: "문제 해결, 실행, 측정 결과가 드러나는 프로젝트",
    casesDescription:
      "각 카드는 같은 구조로 정리했습니다. 전체 STAR+T 문서를 열기 전에 역할, 운영 맥락, 문제, 실행, 결과를 먼저 스캔할 수 있습니다.",
    capabilitiesEyebrow: "운영 범위",
    capabilitiesTitle: "시각적 포트폴리오를 넘어 증명하려는 역량",
    companiesEyebrow: "운영 맥락",
    companiesTitle: "회사와 조직별 실행 환경",
  },
} satisfies Record<Locale, Record<string, string | string[]>>;

const impactMetrics = {
  en: [
    {
      value: "KRW 6.68M",
      label: "Tracked payment amount",
      detail: "Growth-program conversion diagnosis",
      href: "/work-archive/growth-program-conversion-diagnosis",
    },
    {
      value: "252h/year",
      label: "Annualized time saved",
      detail: "Weekly reporting automation",
      href: "/work-archive/performance-reporting-automation",
    },
    {
      value: "21h/month",
      label: "Monthly reporting time saved",
      detail: "Manual reporting flow reduced",
      href: "/work-archive/performance-reporting-automation",
    },
    {
      value: "-14.8%",
      label: "Labor cost reduction",
      detail: "Selective travel-data automation",
      href: "/work-archive/travel-data-build-automation",
    },
    {
      value: "+4.6%p",
      label: "NPS improvement",
      detail: "Robot pickup UX friction removed",
      href: "/work-archive/robot-delivery-pickup-ux",
    },
    {
      value: "+7%",
      label: "Daily order lift",
      detail: "Robot visibility without paid marketing",
      href: "/work-archive/robot-delivery-promotion-orders",
    },
  ],
  ko: [
    {
      value: "KRW 6.68M",
      label: "추적 결제금액",
      detail: "성장 프로그램 전환 진단",
      href: "/work-archive/growth-program-conversion-diagnosis",
    },
    {
      value: "252h/year",
      label: "연간 환산 절감 시간",
      detail: "주간 리포팅 자동화",
      href: "/work-archive/performance-reporting-automation",
    },
    {
      value: "21h/month",
      label: "월간 리포팅 절감 시간",
      detail: "수작업 리포팅 흐름 축소",
      href: "/work-archive/performance-reporting-automation",
    },
    {
      value: "-14.8%",
      label: "인건비 절감",
      detail: "여행 데이터 선택적 자동화",
      href: "/work-archive/travel-data-build-automation",
    },
    {
      value: "+4.6%p",
      label: "NPS 개선",
      detail: "로봇 픽업 UX 마찰 제거",
      href: "/work-archive/robot-delivery-pickup-ux",
    },
    {
      value: "+7%",
      label: "일 주문 증가",
      detail: "유료 마케팅 없는 로봇 노출 개선",
      href: "/work-archive/robot-delivery-promotion-orders",
    },
  ],
} satisfies Record<Locale, { value: string; label: string; detail: string; href: string }[]>;

export function HomepageLanding({
  locale = defaultLocale,
  featuredEntries,
  allEntries,
  companies,
  capabilities,
}: {
  locale?: Locale;
  featuredEntries: WorkEntry[];
  allEntries: WorkEntry[];
  companies: CompanyGroup[];
  capabilities: Capability[];
}) {
  const copy = homeCopy[locale];
  const localizedImpactMetrics = impactMetrics[locale];

  return (
    <>
      <section data-homepage="hiring-hero" className="border-b border-neutral-200 bg-white">
        <Container>
          <div className="grid gap-8 py-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-center lg:py-14">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <p className="rounded-md border border-emerald-200 bg-emerald-50 px-2.5 py-1.5 text-xs font-semibold uppercase text-emerald-800">
                  {copy.eyebrow}
                </p>
                <p className="rounded-md border border-neutral-200 bg-neutral-50 px-2.5 py-1.5 text-xs font-semibold text-neutral-700">
                  {allEntries.length} {copy.publishedLabel}
                </p>
              </div>
              <h1 className="mt-5 max-w-[13ch] break-keep text-4xl font-semibold leading-[1.04] text-neutral-950 sm:max-w-4xl sm:text-6xl">
                {copy.title}
              </h1>
              <p className="mt-4 max-w-3xl break-keep text-xl font-medium leading-8 text-neutral-900">
                {copy.subtitle}
              </p>
              <p className="mt-4 max-w-2xl break-keep text-base leading-8 text-neutral-700 sm:text-lg">
                {copy.description}
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={localizePath("/case-studies", locale)}
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-neutral-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
                >
                  {copy.primaryCta}
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
                <Link
                  href={localizePath("/resume", locale)}
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-neutral-300 px-4 py-3 text-sm font-semibold text-neutral-950 transition hover:border-neutral-950"
                >
                  {copy.secondaryCta}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
                <Link
                  href={githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-neutral-300 px-4 py-3 text-sm font-semibold text-neutral-950 transition hover:border-neutral-950"
                >
                  <GitBranch size={16} aria-hidden="true" />
                  {copy.proofCta}
                </Link>
              </div>
            </div>

            <aside className="min-w-0 rounded-md border border-neutral-200 bg-neutral-50 p-5">
              <div className="flex items-start gap-3">
                <div className="rounded-md bg-white p-2 text-emerald-800 ring-1 ring-neutral-200">
                  <Target size={20} aria-hidden="true" />
                </div>
                <div>
                  <h2 className="font-semibold text-neutral-950">{copy.fitTitle}</h2>
                  <p className="mt-1 text-sm text-neutral-500">
                    {companies.length} {copy.contextLabel}
                  </p>
                </div>
              </div>
              <ul className="mt-5 space-y-3 text-sm leading-6 text-neutral-700">
                {(copy.fitItems as string[]).map((item) => (
                  <li key={item} className="flex gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>

          <div className="border-t border-neutral-200 py-7">
            <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase text-emerald-700">{copy.impactEyebrow}</p>
                <h2 className="mt-1 text-2xl font-semibold text-neutral-950">{copy.impactTitle}</h2>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
              {localizedImpactMetrics.map((metric) => (
                <Link
                  key={`${metric.value}-${metric.label}`}
                  data-homepage="impact-metric"
                  href={localizePath(metric.href, locale)}
                  className="group min-w-0 rounded-md border border-neutral-200 bg-neutral-50 p-4 transition hover:border-emerald-700 hover:bg-white"
                >
                  <p className="break-words text-2xl font-semibold leading-tight text-neutral-950">{metric.value}</p>
                  <p className="mt-2 text-xs font-semibold uppercase leading-4 text-neutral-500">{metric.label}</p>
                  <p className="mt-2 break-keep text-xs leading-5 text-neutral-600">{metric.detail}</p>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-neutral-50 py-14">
        <Container>
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase text-amber-700">{copy.casesEyebrow}</p>
              <h2 className="mt-3 text-3xl font-semibold text-neutral-950">{copy.casesTitle}</h2>
              <p className="mt-4 leading-7 text-neutral-700">{copy.casesDescription}</p>
            </div>
            <Link
              href={localizePath("/case-studies", locale)}
              className="inline-flex w-fit items-center gap-2 rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm font-medium text-neutral-900 transition hover:border-neutral-950"
            >
              {copy.primaryCta}
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {featuredEntries.map((entry) => (
              <WorkCard key={entry.slug} entry={entry} locale={locale} />
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-neutral-200 bg-white py-14">
        <Container>
          <div className="mb-8 max-w-3xl">
            <p className="text-sm font-semibold uppercase text-cyan-700">{copy.capabilitiesEyebrow}</p>
            <h2 className="mt-3 text-3xl font-semibold text-neutral-950">{copy.capabilitiesTitle}</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((capability) => {
              const Icon = capability.icon;
              return (
                <div key={capability.title} className="rounded-md border border-neutral-200 bg-white p-5">
                  <Icon className="text-emerald-700" size={22} aria-hidden="true" />
                  <h3 className="mt-4 font-semibold text-neutral-950">{capability.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-neutral-600">{capability.description}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="bg-neutral-50">
        <Container>
          <CompanyStrip companies={companies} locale={locale} />
        </Container>
      </section>
    </>
  );
}
