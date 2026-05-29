import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import matter from "gray-matter";

const root = process.cwd();
const locales = [
  { locale: "en", directory: path.join(root, "content", "work") },
  { locale: "ko", directory: path.join(root, "content", "ko", "work") },
];

function readEntries(directory) {
  assert.ok(fs.existsSync(directory), `${directory} should exist`);

  return fs
    .readdirSync(directory)
    .filter((fileName) => /\.mdx?$/.test(fileName))
    .map((fileName) => {
      const raw = fs.readFileSync(path.join(directory, fileName), "utf8");
      const { data, content } = matter(raw);
      return {
        fileName,
        slug: String(data.slug ?? fileName.replace(/\.mdx?$/, "")),
        title: String(data.title ?? ""),
        summary: String(data.summary ?? ""),
        companyName: String(data.company?.name ?? ""),
        companySlug: String(data.company?.slug ?? ""),
        metrics: Array.isArray(data.metrics) ? data.metrics : [],
        charts: Array.isArray(data.charts) ? data.charts : [],
        content,
      };
    });
}

const [english, korean] = locales.map(({ directory }) => readEntries(directory));

assert.equal(english.length, 12, "English archive should publish 12 work entries");
assert.equal(korean.length, 12, "Korean archive should publish 12 work entries");

const englishSlugs = english.map((entry) => entry.slug).sort();
const koreanSlugs = korean.map((entry) => entry.slug).sort();
assert.deepEqual(koreanSlugs, englishSlugs, "Korean work slugs should match English work slugs");

const expectedKoreanEodingPrimaryKpis = new Map([
  ["growth-program-conversion-diagnosis", "78.6x"],
  ["performance-reporting-automation", "252h/year"],
  ["qa-error-response-recommendation-tool", "4.21x"],
  ["notion-slack-task-operating-system", "3.25h"],
]);

const expectedKoreanChartValues = new Map([
  ...expectedKoreanEodingPrimaryKpis,
  ["drone-data-collection-standardization", "+15%"],
  ["night-fire-training-stakeholder-alignment", "0건"],
  ["pub-service-flow-redesign", "+8%"],
  ["public-proposal-consortium-presentation", "4개사"],
  ["robot-delivery-pickup-ux", "+4.6%p"],
  ["robot-delivery-promotion-orders", "+7%"],
  ["travel-data-build-automation", "3.27M KRW"],
  ["weather-requirement-renegotiation", "82%"],
]);

const expectedEnglishCompanyNames = new Map([
  ["eoding", "Eoding"],
  ["woowa-brothers", "Woowa Brothers"],
  ["crowdworks", "CrowdWorks"],
  ["dublin-pub-operations", "Dublin Pub Operations"],
  ["republic-of-korea-army", "Republic of Korea Army"],
]);

const allowedVisualTypes = new Set(["comparison", "reduction", "composition", "milestones", "evidence"]);

for (const entry of english) {
  assert.ok(!/[가-힣]/.test(entry.companyName), `${entry.fileName} should use an English company name`);
  assert.equal(
    entry.companyName,
    expectedEnglishCompanyNames.get(entry.companySlug),
    `${entry.fileName} should use the expected English company label`,
  );
}

for (const entry of korean) {
  assert.ok(/[가-힣]/.test(entry.title), `${entry.fileName} should have a Korean title`);
  assert.ok(/[가-힣]/.test(entry.summary), `${entry.fileName} should have a Korean summary`);
  assert.ok(entry.content.includes("## 상황 / 과제"), `${entry.fileName} should include Korean STAR+T sections`);
  assert.ok(entry.content.includes("## 실행"), `${entry.fileName} should include Korean Action section`);
  assert.ok(entry.content.includes("## 결과"), `${entry.fileName} should include Korean Result section`);
  assert.ok(entry.content.includes("## 도구와 기술"), `${entry.fileName} should include Korean Tools section`);

  const expectedKpiValue = expectedKoreanEodingPrimaryKpis.get(entry.slug);
  if (expectedKpiValue) {
    assert.equal(entry.metrics?.[0]?.value, expectedKpiValue, `${entry.fileName} should lead with the strongest Korean KPI value`);
    assert.ok(entry.content.includes("## KPI 판단"), `${entry.fileName} should explain Korean KPI prioritization`);
  }

  const expectedChartValue = expectedKoreanChartValues.get(entry.slug);
  if (expectedChartValue) {
    assert.ok(entry.charts.length > 0, `${entry.fileName} should include Korean chart data`);
    assert.equal(entry.charts[0]?.metricValue, expectedChartValue, `${entry.fileName} should chart the expected Korean KPI`);
    assert.ok(
      allowedVisualTypes.has(entry.charts[0]?.visualType),
      `${entry.fileName} should choose a Korean visualization type`,
    );
    assert.ok(/[가-힣]/.test(entry.charts[0]?.title ?? ""), `${entry.fileName} should have a Korean chart title`);
  }
}

const requiredFiles = [
  "src/lib/i18n.ts",
  "src/app/ko/page.tsx",
  "src/app/ko/companies/page.tsx",
  "src/app/ko/companies/[slug]/page.tsx",
  "src/app/ko/work-archive/page.tsx",
  "src/app/ko/work-archive/[slug]/page.tsx",
];

for (const filePath of requiredFiles) {
  assert.ok(fs.existsSync(path.join(root, filePath)), `${filePath} should exist`);
}

const header = fs.readFileSync(path.join(root, "src", "components", "site-header.tsx"), "utf8");
assert.ok(header.includes('data-layout="language-switcher"'), "Header should expose a visible language switcher");

console.log(`i18n ok: ${english.length} English entries and ${korean.length} Korean entries`);
