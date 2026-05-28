import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileText, GitBranch, Layers3 } from "lucide-react";
import { Container } from "@/components/container";
import { CompanyStrip } from "@/components/company-strip";
import { MetricStrip } from "@/components/metric-strip";
import { WorkCard } from "@/components/work-card";
import { githubUrl } from "@/lib/brand-assets";
import { capabilityMapKo } from "@/lib/site-data";
import { getCompanyGroups, getFeaturedEntries, getWorkEntries } from "@/lib/content";

export const metadata: Metadata = {
  title: "Joshua Portfolio",
  description: "운영, 데이터, 자동화, PM 실행 경험을 정리한 한국어 포트폴리오.",
};

export default function KoreanHome() {
  const locale = "ko";
  const featuredEntries = getFeaturedEntries(locale);
  const allEntries = getWorkEntries(locale);
  const companies = getCompanyGroups(locale);
  const headlineMetrics = allEntries.flatMap((entry) => entry.metrics).slice(0, 3);

  return (
    <>
      <section className="border-b border-neutral-200 bg-neutral-50">
        <Container>
          <div className="grid gap-10 py-14 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-end lg:py-20">
            <div className="min-w-0">
              <div className="flex flex-col items-start gap-2 sm:flex-row sm:flex-wrap sm:items-center">
                <p className="rounded-md border border-emerald-200 bg-white px-2.5 py-1.5 text-xs font-semibold uppercase text-emerald-700">
                  Growth PM / Operations PM / Data PM
                </p>
                <Link
                  href={githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md border border-neutral-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-neutral-700 transition hover:border-neutral-950 hover:text-neutral-950"
                >
                  <GitBranch size={13} aria-hidden="true" />
                  GitHub 기반
                </Link>
              </div>
              <h1 className="mt-5 max-w-[13ch] break-keep text-4xl font-semibold leading-[1.08] text-neutral-950 sm:max-w-4xl sm:text-6xl">
                시스템, 데이터, 자동화, 실행을 증명하는 운영 포트폴리오.
              </h1>
              <p className="mt-6 max-w-[34ch] text-lg leading-8 text-neutral-700 sm:max-w-2xl">
                프로세스 최적화, 개발 협업, 대시보드, 자동화 이해, 데이터 기반 의사결정을 실제 실행 사례로 보여주는 공개 포트폴리오입니다.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/ko/work-archive"
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-neutral-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
                >
                  작업 아카이브 보기
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
                <Link
                  href="/ko/resume"
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-neutral-300 px-4 py-3 text-sm font-semibold text-neutral-950 transition hover:border-neutral-950"
                >
                  경력 요약 보기
                  <FileText size={16} aria-hidden="true" />
                </Link>
              </div>
            </div>
            <aside className="min-w-0 rounded-md border border-neutral-200 bg-white p-5 shadow-sm shadow-neutral-950/[0.03]">
              <div className="flex items-center gap-3 border-b border-neutral-200 pb-4">
                <div className="rounded-md bg-emerald-100 p-2 text-emerald-800">
                  <Layers3 size={20} aria-hidden="true" />
                </div>
                <div>
                  <h2 className="font-semibold text-neutral-950">아카이브 시스템</h2>
                  <p className="max-w-[26ch] break-words text-sm text-neutral-600 sm:max-w-none">
                    Markdown 기반, GitHub 관리, Vercel 배포.
                  </p>
                </div>
              </div>
              <dl className="mt-5 space-y-4 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-neutral-500">공개 케이스</dt>
                  <dd className="font-semibold text-neutral-950">{allEntries.length}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-neutral-500">회사/조직 그룹</dt>
                  <dd className="font-semibold text-neutral-950">{companies.length}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-neutral-500">발행 단위</dt>
                  <dd className="font-semibold text-neutral-950">MDX 1개</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-neutral-500">워크플로우 증거</dt>
                  <dd className="inline-flex items-center gap-1 font-semibold text-neutral-950">
                    <GitBranch size={15} aria-hidden="true" />
                    Git 기반
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-neutral-500">소스</dt>
                  <dd>
                    <Link
                      href={githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 font-semibold text-neutral-950 hover:text-emerald-700"
                    >
                      <GitBranch size={15} aria-hidden="true" />
                      Repository
                    </Link>
                  </dd>
                </div>
              </dl>
            </aside>
          </div>
          <CompanyStrip companies={companies} locale={locale} />
        </Container>
      </section>

      <section className="bg-neutral-50 py-12">
        <Container>
          <MetricStrip metrics={headlineMetrics} />
        </Container>
      </section>

      <section className="border-y border-neutral-200 bg-white py-14">
        <Container>
          <div className="mb-8 max-w-3xl">
            <p className="text-sm font-semibold uppercase text-cyan-700">Capability map</p>
            <h2 className="mt-3 text-3xl font-semibold text-neutral-950">이 아카이브가 증명하려는 역량</h2>
            <p className="mt-4 leading-7 text-neutral-700">
              각 케이스는 운영 문제가 어떻게 시스템, 워크플로우, 대시보드, 기술 요구사항, 측정 가능한 개선으로 바뀌었는지 보여주도록 작성했습니다.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {capabilityMapKo.map((capability) => {
              const Icon = capability.icon;
              return (
                <div key={capability.title} className="rounded-lg border border-neutral-200 bg-white p-5">
                  <Icon className="text-emerald-700" size={22} aria-hidden="true" />
                  <h3 className="mt-4 font-semibold text-neutral-950">{capability.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-neutral-600">{capability.description}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="bg-neutral-50 py-14">
        <Container>
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase text-amber-700">Featured case studies</p>
              <h2 className="mt-3 text-3xl font-semibold text-neutral-950">측정 가능한 결과로 설명되는 실행 경험</h2>
            </div>
            <Link
              href="/ko/case-studies"
              className="inline-flex w-fit items-center gap-2 rounded-md border border-neutral-300 px-3 py-2 text-sm font-medium text-neutral-900 transition hover:border-neutral-950"
            >
              전체 케이스 보기
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
    </>
  );
}
