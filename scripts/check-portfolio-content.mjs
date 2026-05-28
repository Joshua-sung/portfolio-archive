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
}

for (const [slug, expectedCount] of expectedCompanyCounts) {
  assert.equal(counts.get(slug), expectedCount, `${slug} should have ${expectedCount} work entries`);
}

console.log(`content ok: ${entries.length} entries across ${counts.size} company groups`);
