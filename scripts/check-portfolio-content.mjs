import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import matter from "gray-matter";

const workDirectory = path.join(process.cwd(), "content", "work");
const requiredSections = [
  "## Situation / Task",
  "## Action",
  "## Result",
  "## Tools & Tech",
  "## Collaboration",
  "## Lessons",
];

const expectedCompanyCounts = new Map([
  ["eoding", 4],
  ["woowa-brothers", 2],
  ["crowdworks", 3],
  ["dublin-pub-operations", 1],
  ["republic-of-korea-army", 1],
  ["public-sector-consortium", 1],
]);

const expectedEodingPrimaryKpis = new Map([
  [
    "growth-program-conversion-diagnosis",
    {
      label: "Tracked payment amount",
      value: "KRW 6.68M",
    },
  ],
  [
    "performance-reporting-automation",
    {
      label: "Annualized time saved",
      value: "252h/year",
    },
  ],
  [
    "qa-error-response-recommendation-tool",
    {
      label: "Manual review throughput",
      value: "4.21x",
    },
  ],
  [
    "notion-slack-task-operating-system",
    {
      label: "Time saved",
      value: "3.25h",
    },
  ],
]);

const expectedEodingChartKpis = new Map([
  ["growth-program-conversion-diagnosis", "KRW 6.68M"],
  ["performance-reporting-automation", "252h/year"],
  ["qa-error-response-recommendation-tool", "4.21x"],
  ["notion-slack-task-operating-system", "3.25h"],
]);

const expectedChartKpis = new Map([
  ...expectedEodingChartKpis,
  ["drone-data-collection-standardization", "+15%"],
  ["night-fire-training-stakeholder-alignment", "0 complaints"],
  ["pub-service-flow-redesign", "+8%"],
  ["public-proposal-consortium-presentation", "4 companies"],
  ["robot-delivery-pickup-ux", "+4.6%p"],
  ["robot-delivery-promotion-orders", "+7%"],
  ["travel-data-build-automation", "KRW 3.27M"],
  ["weather-requirement-renegotiation", "82%"],
]);

function readEntries() {
  return fs
    .readdirSync(workDirectory)
    .filter((fileName) => /\.mdx?$/.test(fileName))
    .map((fileName) => {
      const raw = fs.readFileSync(path.join(workDirectory, fileName), "utf8");
      const { data, content } = matter(raw);
      return { fileName, data, content };
    });
}

const entries = readEntries();
assert.equal(entries.length, 12, "portfolio should publish twelve work entries");

const counts = new Map();

for (const entry of entries) {
  assert.ok(entry.data.slug, `${entry.fileName} should have a slug`);
  assert.ok(entry.data.company, `${entry.fileName} should have company metadata`);
  assert.equal(typeof entry.data.company.name, "string", `${entry.fileName} company.name should be a string`);
  assert.equal(typeof entry.data.company.slug, "string", `${entry.fileName} company.slug should be a string`);

  counts.set(entry.data.company.slug, (counts.get(entry.data.company.slug) ?? 0) + 1);

  for (const section of requiredSections) {
    assert.ok(entry.content.includes(section), `${entry.fileName} should include ${section}`);
  }

  const expectedKpi = expectedEodingPrimaryKpis.get(entry.data.slug);
  if (expectedKpi) {
    assert.equal(entry.data.metrics?.[0]?.label, expectedKpi.label, `${entry.fileName} should lead with the strongest KPI label`);
    assert.equal(entry.data.metrics?.[0]?.value, expectedKpi.value, `${entry.fileName} should lead with the strongest KPI value`);
    assert.ok(entry.content.includes("## KPI Rationale"), `${entry.fileName} should explain KPI prioritization`);
  }

  const expectedChartKpi = expectedChartKpis.get(entry.data.slug);
  if (expectedChartKpi) {
    assert.ok(Array.isArray(entry.data.charts), `${entry.fileName} should define KPI chart data`);
    assert.ok(entry.data.charts.length > 0, `${entry.fileName} should have at least one KPI chart`);
    assert.equal(entry.data.charts[0]?.metricValue, expectedChartKpi, `${entry.fileName} should chart the strongest KPI`);
    assert.ok(entry.data.charts[0]?.dataQuality, `${entry.fileName} should explain chart data quality`);
    assert.ok(entry.data.charts[0]?.points?.length >= 2, `${entry.fileName} chart should include at least two points`);
    assert.ok(
      entry.data.charts[0].points.every((point) => ["actual", "directional"].includes(point.kind)),
      `${entry.fileName} chart points should identify actual vs directional data`,
    );
  }
}

for (const [slug, expectedCount] of expectedCompanyCounts) {
  assert.equal(counts.get(slug), expectedCount, `${slug} should have ${expectedCount} work entries`);
}

console.log(`content ok: ${entries.length} entries across ${counts.size} company groups`);
