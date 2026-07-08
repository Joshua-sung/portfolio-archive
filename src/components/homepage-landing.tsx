import Link from "next/link";
import { ArrowRight, ArrowUpRight, CheckCircle2, GitBranch, Mail, Target } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { CompanyStrip } from "@/components/company-strip";
import { Container } from "@/components/container";
import { WorkCard } from "@/components/work-card";
import { contactUrl, githubUrl } from "@/lib/brand-assets";
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
    title: "I connect operational execution to measurable business impact.",
    subtitle: "A PM portfolio built around revenue, cost, time, and customer-experience outcomes.",
    description:
      "Field-tested work across robotics delivery, data operations, and growth programs — plus automation I build and run myself: reporting pipelines, QA tooling, and AI-agent workflows.",
    primaryCta: "View case studies",
    contactCta: "Contact me",
    secondaryCta: "Career description",
    proofCta: "GitHub profile",
    fitTitle: "Built for roles that need",
    fitItems: [
      "Ownership across field, data, partner, and product operations",
      "Revenue, cost, time, and customer-experience outcomes tied to real execution",
      "Clear translation between operators, developers, stakeholders, and reporting systems",
    ],
    publishedLabel: "case studies",
    contextLabel: "{n} organizations behind the work",
    impactEyebrow: "Measurable outcomes",
    impactTitle: "Business impact",
    casesEyebrow: "Selected proof points",
    casesTitle: "Problem, solution, execution results",
    casesDescription:
      "Each card is structured for quick review: problem diagnosis, solution approach, execution evidence, measurable result, and ownership before the full STAR+T write-up.",
    capabilitiesEyebrow: "Operating range",
    capabilitiesTitle: "Operating strengths behind the outcomes",
    companiesEyebrow: "Project Experience",
    companiesTitle: "Companies and roles behind the work",
    startHereTitle: "If you only review 3 cases",
  },
  ko: {
    eyebrow: "Growth PM / Operations PM / Data PM",
    title: "운영 성과를 비즈니스 임팩트로 연결하는 PM.",
    subtitle: "Growth PM / Operations PM 역할에 맞춰 수익, 비용, 시간, 고객 경험 지표로 실행력을 보여줍니다.",
    description:
      "로봇배달, 데이터 구축, 성장 프로그램 경험과 함께 리포팅 파이프라인, 검수 도구, AI 에이전트 워크플로우 등 직접 만들어 운영하는 자동화 사례를 성과 중심으로 정리했습니다.",
    primaryCta: "케이스 스터디 보기",
    contactCta: "Contact me",
    secondaryCta: "경력기술서",
    proofCta: "GitHub 프로필",
    fitTitle: "강점을 발휘하는 역할",
    fitItems: [
      "현장, 데이터, 파트너, 제품 운영을 끝까지 책임지는 PM",
      "수익, 비용, 시간, 고객 경험 지표를 실제 실행 결과와 연결하는 사람",
      "운영자, 개발자, 이해관계자, 리포팅 시스템 사이를 명확히 연결하는 사람",
    ],
    publishedLabel: "케이스 스터디",
    contextLabel: "{n}개 조직에서의 경험",
    impactEyebrow: "측정 가능한 성과",
    impactTitle: "비즈니스 임팩트",
    casesEyebrow: "대표 성과 사례",
    casesTitle: "문제 파악, 해결 방법, 실행 결과",
    casesDescription:
      "각 카드는 빠른 검토가 가능하도록 문제 진단, 해결 방향, 실행 근거, 측정 결과, 오너십 순서로 정리했습니다.",
    capabilitiesEyebrow: "운영 범위",
    capabilitiesTitle: "성과 뒤에 있는 운영 강점",
    companiesEyebrow: "업무 성과 사례",
    companiesTitle: "회사별 경력과 대표 성과",
    startHereTitle: "3개만 본다면 이 케이스부터",
  },
} satisfies Record<Locale, Record<string, string | string[]>>;

const impactMetrics = {
  en: [
    {
      value: "78.6x increase",
      label: "Weekly view lift",
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
      value: "4.21x increase",
      label: "Manual QA throughput",
      detail: "QA response recommendation tool",
      href: "/work-archive/qa-error-response-recommendation-tool",
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
      value: "78.6배 증가",
      label: "주간 조회수 증가",
      detail: "성장 프로그램 전환 진단",
      href: "/work-archive/growth-program-conversion-diagnosis",
    },
    {
      value: "연 252시간",
      label: "연간 환산 절감 시간",
      detail: "주간 리포팅 자동화",
      href: "/work-archive/performance-reporting-automation",
    },
    {
      value: "4.21배 증가",
      label: "수동 검수 처리량",
      detail: "검수 응답 추천 도구",
      href: "/work-archive/qa-error-response-recommendation-tool",
    },
    {
      value: "-14.8%",
      label: "인건비 절감",
      detail: "여행 데이터 선택적 자동화",
      href: "/work-archive/travel-data-build-automation",
    },
    {
      value: "+4.6%포인트",
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

const startHereCases = {
  en: [
    {
      title: "Weekly reporting automation",
      reason: "Execution speed in the current role",
      href: "/work-archive/performance-reporting-automation",
    },
    {
      title: "Selective travel-data automation",
      reason: "Cost-aware automation judgment",
      href: "/work-archive/travel-data-build-automation",
    },
    {
      title: "Robot delivery pickup UX",
      reason: "Technical communication with developers",
      href: "/work-archive/robot-delivery-pickup-ux",
    },
  ],
  ko: [
    {
      title: "주간 리포팅 자동화",
      reason: "현직에서 보여준 실행 속도",
      href: "/work-archive/performance-reporting-automation",
    },
    {
      title: "여행 데이터 선택적 자동화",
      reason: "비용까지 계산한 자동화 판단",
      href: "/work-archive/travel-data-build-automation",
    },
    {
      title: "로봇배달 픽업 UX",
      reason: "개발팀과의 기술 커뮤니케이션",
      href: "/work-archive/robot-delivery-pickup-ux",
    },
  ],
} satisfies Record<Locale, { title: string; reason: string; href: string }[]>;

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
  const localizedStartHere = startHereCases[locale];

  return (
    <>
      <section
        data-homepage="hiring-hero"
        className="relative isolate overflow-hidden border-b border-white/10 bg-portfolio-canvas text-white"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_78%_0%,rgba(106,76,245,0.22),transparent_70%),radial-gradient(ellipse_50%_40%_at_10%_100%,rgba(254,91,44,0.07),transparent_70%)]"
        />
        <Container>
          <div className="grid gap-8 py-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-center lg:py-14">
            <div className="min-w-0">
              <div className="flex max-w-full flex-col items-start gap-2 sm:flex-row sm:flex-wrap sm:items-center">
                <p
                  data-homepage="hero-eyebrow"
                  className="max-w-full break-words rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold uppercase text-neutral-200"
                >
                  {copy.eyebrow}
                </p>
                <p
                  data-homepage="hero-count"
                  className="max-w-full break-words rounded-full border border-brand-blue/60 bg-brand-blue/15 px-3 py-1.5 text-xs font-semibold text-white"
                >
                  {allEntries.length} {copy.publishedLabel}
                </p>
              </div>
              <h1
                data-homepage="hero-title"
                className="mt-5 max-w-[22rem] break-keep text-4xl font-semibold leading-[1.02] tracking-tight text-white sm:max-w-4xl sm:text-6xl"
              >
                {copy.title}
              </h1>
              <p
                data-homepage="hero-subtitle"
                className="mt-4 max-w-[22rem] break-keep text-xl font-medium leading-8 text-neutral-200 sm:max-w-3xl"
              >
                {copy.subtitle}
              </p>
              <p
                data-homepage="hero-description"
                className="mt-4 max-w-[22rem] break-keep text-base leading-8 text-neutral-400 sm:max-w-2xl sm:text-lg"
              >
                {copy.description}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  data-homepage="primary-cta"
                  href={localizePath("/case-studies", locale)}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-neutral-200"
                >
                  {copy.primaryCta}
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
                <Link
                  data-homepage="contact-cta"
                  href={contactUrl}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-brand-green px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-green/85"
                >
                  <Mail size={16} aria-hidden="true" />
                  {copy.contactCta}
                </Link>
                <Link
                  href={localizePath("/resume", locale)}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-neutral-200 transition hover:border-white/40 hover:bg-white/10 hover:text-white"
                >
                  {copy.secondaryCta}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
                <Link
                  href={githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-neutral-200 transition hover:border-white/40 hover:bg-white/10 hover:text-white"
                >
                  <GitBranch size={16} aria-hidden="true" />
                  {copy.proofCta}
                </Link>
              </div>
            </div>

            <aside
              data-homepage="fit-panel"
              className="min-w-0 max-w-[22rem] rounded-3xl border border-white/10 bg-portfolio-surface p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] lg:max-w-none"
            >
              <div
                data-homepage="spotlight-card"
                className="mb-5 rounded-[1.75rem] bg-[radial-gradient(circle_at_20%_10%,#FE5B2C_0%,rgba(254,91,44,0)_32%),linear-gradient(135deg,#262DA9_0%,#6a4cf5_48%,#468E36_100%)] p-5 text-white"
              >
                <p className="text-xs font-semibold uppercase text-white/80">{copy.impactEyebrow}</p>
                <p className="mt-3 max-w-[16rem] break-keep text-2xl font-semibold leading-tight">
                  {locale === "ko" ? "연 252시간" : "252h/yr"}
                </p>
                <p className="mt-2 break-keep text-sm leading-6 text-white/85">
                  {locale === "ko"
                    ? "반복 리포트 자동화로 매년 팀에 돌려주는 운영 시간입니다."
                    : "Recurring reporting automated — capacity returned to the team every year."}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-white p-2 text-brand-blue ring-1 ring-white/10">
                  <Target size={20} aria-hidden="true" />
                </div>
                <div>
                  <h2 className="font-semibold text-white">{copy.startHereTitle}</h2>
                  <p className="mt-1 text-sm text-neutral-400">
                    {(copy.contextLabel as string).replace("{n}", String(companies.length))}
                  </p>
                </div>
              </div>
              <ol className="mt-4 space-y-2">
                {localizedStartHere.map((item, index) => (
                  <li key={item.href}>
                    <Link
                      data-homepage="start-here-case"
                      href={localizePath(item.href, locale)}
                      className="group flex min-h-11 items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 transition hover:border-brand-orange/70 hover:bg-white/[0.07]"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-semibold text-neutral-200 transition group-hover:bg-brand-orange group-hover:text-white">
                        {index + 1}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block break-keep text-sm font-medium leading-5 text-white">{item.title}</span>
                        <span className="mt-0.5 block break-keep text-xs leading-4 text-neutral-400">{item.reason}</span>
                      </span>
                      <ArrowRight
                        size={15}
                        className="shrink-0 text-neutral-500 transition group-hover:translate-x-0.5 group-hover:text-white"
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                ))}
              </ol>
            </aside>
          </div>

          <div className="border-t border-white/10 py-7">
            <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase text-brand-orange">{copy.impactEyebrow}</p>
                <h2 className="mt-1 text-2xl font-semibold tracking-tight text-white">{copy.impactTitle}</h2>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-6">
              {localizedImpactMetrics.map((metric) => (
                <Link
                  key={`${metric.value}-${metric.label}`}
                  data-homepage="impact-metric"
                  href={localizePath(metric.href, locale)}
                  className="group min-w-0 rounded-2xl border border-white/10 bg-portfolio-surface p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition duration-200 hover:-translate-y-0.5 hover:border-brand-orange"
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="break-words text-2xl font-semibold leading-tight text-brand-orange">{metric.value}</p>
                    <ArrowUpRight
                      size={15}
                      className="mt-1 shrink-0 text-neutral-600 transition group-hover:text-brand-orange"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="mt-2 text-xs font-semibold uppercase leading-4 text-neutral-200">{metric.label}</p>
                  <p className="mt-2 break-keep text-xs leading-5 text-neutral-400">{metric.detail}</p>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-white/10 bg-portfolio-canvas py-14 text-white">
        <Container>
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase text-brand-orange">{copy.casesEyebrow}</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">{copy.casesTitle}</h2>
              <p className="mt-4 leading-7 text-neutral-400">{copy.casesDescription}</p>
            </div>
            <Link
              href={localizePath("/case-studies", locale)}
              className="inline-flex min-h-11 w-fit items-center gap-2 rounded-full border border-white/15 bg-white px-4 py-2 text-sm font-medium text-neutral-950 transition hover:bg-neutral-200"
            >
              {copy.primaryCta}
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {featuredEntries.map((entry) => (
              <WorkCard key={entry.slug} entry={entry} locale={locale} variant="dark" />
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-neutral-200 bg-brand-bg py-14">
        <Container>
          <div className="mb-8 max-w-3xl">
            <p className="text-sm font-semibold uppercase text-brand-blue">{copy.capabilitiesEyebrow}</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-950">{copy.capabilitiesTitle}</h2>
          </div>
          <div data-homepage="fit-banner" className="mb-6 rounded-2xl border border-brand-blue/15 bg-white p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-brand-blue/10 p-2 text-brand-blue">
                <Target size={20} aria-hidden="true" />
              </div>
              <h3 className="font-semibold text-neutral-950">{copy.fitTitle}</h3>
            </div>
            <ul className="mt-4 grid gap-3 sm:grid-cols-3">
              {(copy.fitItems as string[]).map((item) => (
                <li key={item} className="flex gap-2 text-sm leading-6 text-neutral-700">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" aria-hidden="true" />
                  <span className="min-w-0 break-keep">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((capability) => {
              const Icon = capability.icon;
              return (
                <div
                  key={capability.title}
                  className="rounded-2xl border border-neutral-200 bg-white p-5 transition hover:border-brand-blue/40 hover:shadow-sm"
                >
                  <div className="inline-flex rounded-lg bg-brand-blue/10 p-2 text-brand-blue">
                    <Icon size={20} aria-hidden="true" />
                  </div>
                  <h3 className="mt-3 font-semibold text-neutral-950">{capability.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-neutral-600">{capability.description}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="bg-white">
        <Container>
          <CompanyStrip companies={companies} locale={locale} />
        </Container>
      </section>
    </>
  );
}
