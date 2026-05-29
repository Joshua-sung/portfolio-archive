import type { Metadata } from "next";
import { HomepageLanding } from "@/components/homepage-landing";
import { capabilityMapKo } from "@/lib/site-data";
import { getCompanyGroups, getFeaturedEntries, getWorkEntries } from "@/lib/content";

export const metadata: Metadata = {
  title: "Joshua Portfolio",
  description: "성장, 운영, 데이터 PM 실행 경험을 비즈니스 임팩트 중심으로 정리한 한국어 포트폴리오.",
};

export default function KoreanHome() {
  const locale = "ko";
  const featuredEntries = getFeaturedEntries(locale);
  const allEntries = getWorkEntries(locale);
  const companies = getCompanyGroups(locale);

  return (
    <HomepageLanding
      locale={locale}
      featuredEntries={featuredEntries}
      allEntries={allEntries}
      companies={companies}
      capabilities={capabilityMapKo}
    />
  );
}
