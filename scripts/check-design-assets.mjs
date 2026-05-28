import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";

const root = process.cwd();

const requiredFiles = [
  "public/logos/woowahan-brothers.jpg",
  "public/logos/crowdworks.png",
  "public/logos/eoding.svg",
  "public/logos/republic-of-korea-army.svg",
  "src/components/company-logo.tsx",
  "src/components/company-strip.tsx",
  "src/components/kpi-charts.tsx",
  "src/lib/brand-assets.ts",
];

for (const filePath of requiredFiles) {
  assert.ok(fs.existsSync(path.join(root, filePath)), `${filePath} should exist`);
}

const header = fs.readFileSync(path.join(root, "src", "components", "site-header.tsx"), "utf8");
assert.ok(header.includes("githubUrl"), "Header should link to GitHub");
assert.ok(header.includes("GitHub"), "Header should expose a GitHub label");

const home = fs.readFileSync(path.join(root, "src", "app", "page.tsx"), "utf8");
const koreanHome = fs.readFileSync(path.join(root, "src", "app", "ko", "page.tsx"), "utf8");
const companyStrip = fs.readFileSync(path.join(root, "src", "components", "company-strip.tsx"), "utf8");
const workEntryPage = fs.readFileSync(path.join(root, "src", "app", "work-archive", "[slug]", "page.tsx"), "utf8");
const koreanWorkEntryPage = fs.readFileSync(path.join(root, "src", "app", "ko", "work-archive", "[slug]", "page.tsx"), "utf8");
assert.ok(home.includes("CompanyStrip"), "English home should include the company brand strip");
assert.ok(koreanHome.includes("CompanyStrip"), "Korean home should include the company brand strip");
assert.ok(companyStrip.includes("xl:grid-cols-6"), "Company strip should balance six company cards on wide screens");
assert.ok(workEntryPage.includes("KpiCharts"), "English work detail should render KPI charts");
assert.ok(koreanWorkEntryPage.includes("KpiCharts"), "Korean work detail should render KPI charts");

const brandAssets = fs.readFileSync(path.join(root, "src", "lib", "brand-assets.ts"), "utf8");
for (const slug of [
  "eoding",
  "woowa-brothers",
  "crowdworks",
  "dublin-pub-operations",
  "republic-of-korea-army",
  "public-sector-consortium",
]) {
  assert.ok(brandAssets.includes(slug), `${slug} should have brand metadata`);
}

console.log("design assets ok: logos, GitHub link, and company strip are present");
