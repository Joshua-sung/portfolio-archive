import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";

const root = process.cwd();

const publicCopyFiles = [
  "src/app/about/page.tsx",
  "src/app/case-studies/page.tsx",
  "src/app/collaboration/page.tsx",
  "src/app/companies/[slug]/page.tsx",
  "src/app/companies/page.tsx",
  "src/app/ko/about/page.tsx",
  "src/app/ko/case-studies/page.tsx",
  "src/app/ko/collaboration/page.tsx",
  "src/app/ko/companies/[slug]/page.tsx",
  "src/app/ko/companies/page.tsx",
  "src/app/ko/page.tsx",
  "src/app/ko/resume/page.tsx",
  "src/app/ko/systems-built/page.tsx",
  "src/app/ko/tags/[tag]/page.tsx",
  "src/app/ko/work-archive/page.tsx",
  "src/app/layout.tsx",
  "src/app/resume/page.tsx",
  "src/app/systems-built/page.tsx",
  "src/app/tags/[tag]/page.tsx",
  "src/app/work-archive/page.tsx",
  "src/components/company-card.tsx",
  "src/components/company-strip.tsx",
  "src/components/homepage-landing.tsx",
  "src/components/site-footer.tsx",
  "src/lib/site-data.ts",
];

function collectMarkdownFiles(directory) {
  return fs
    .readdirSync(directory, { withFileTypes: true })
    .flatMap((entry) => {
      const absolutePath = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        return collectMarkdownFiles(absolutePath);
      }
      return /\.mdx?$/.test(entry.name) ? [path.relative(root, absolutePath)] : [];
    });
}

const publicContentFiles = [
  ...collectMarkdownFiles(path.join(root, "content", "work")),
  ...collectMarkdownFiles(path.join(root, "content", "ko", "work")),
  ...collectMarkdownFiles(path.join(root, "content", "templates")),
];

const copy = publicCopyFiles
  .concat(publicContentFiles)
  .map((filePath) => {
    const absolutePath = path.join(root, filePath);
    assert.ok(fs.existsSync(absolutePath), `${filePath} should exist`);
    return fs.readFileSync(absolutePath, "utf8");
  })
  .join("\n");

const forbiddenPhrases = [
  "이런 팀에 맞는 후보",
  "후보자입니다",
  "GitHub 증거",
  "messy operations",
  "messy signals",
  "Best fit for teams that need",
  "The first signals a hiring manager should see",
  "What the portfolio proves beyond visual presentation",
  "Company-backed archive",
  "first-pass portfolio",
  "The archive is designed",
  "Public-safe work archive",
  "Public-safe",
  "portfolio-safe",
  "candidate with a bias",
  "작업 아카이브에 담긴 근거",
  "지저분한 신호",
  "공개 가능한 요약",
  "포트폴리오 형태",
  "execution support",
  "실행 지원",
  "revenue-adjacent",
  "매출 인접",
  "target-product payment amount",
  "대상 상품 결제금액",
  "Gmail drafts",
  "Gmail 임시보관함",
  "AI insight draft",
  "AI 인사이트 초안",
  "URL identifier matching",
  "URL 식별자 매칭",
  "함께 달성",
  "Business impact, not just activity logs",
  "업무 기록보다 먼저 보여줘야 할 비즈니스 임팩트",
  "Case studies that connect context, execution, and result",
  "맥락, 실행, 결과가 한눈에 연결되는 케이스",
  "Experience contexts",
  "Experience Context",
  "경험 맥락",
  "Days",
];

for (const phrase of forbiddenPhrases) {
  assert.ok(!copy.includes(phrase), `Public copy should not include awkward phrase: ${phrase}`);
}

const requiredPhrases = [
  "I connect operational execution to measurable business impact.",
  "운영 성과를 비즈니스 임팩트로 연결하는 PM.",
  "Built for roles that need",
  "강점을 발휘하는 역할",
  "Business impact",
  "비즈니스 임팩트",
  "Problem, solution, execution results",
  "문제 파악, 해결 방법, 실행 결과",
  "Project Experience",
  "업무 성과 사례",
  "Selected proof points",
  "대표 성과 사례",
];

for (const phrase of requiredPhrases) {
  assert.ok(copy.includes(phrase), `Public copy should include improved brand phrase: ${phrase}`);
}

console.log("brand copy ok: bilingual positioning avoids awkward candidate/archive phrasing");
