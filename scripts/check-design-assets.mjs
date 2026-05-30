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
const homepageLanding = fs.readFileSync(path.join(root, "src", "components", "homepage-landing.tsx"), "utf8");
const companyStrip = fs.readFileSync(path.join(root, "src", "components", "company-strip.tsx"), "utf8");
const workEntryPage = fs.readFileSync(path.join(root, "src", "app", "work-archive", "[slug]", "page.tsx"), "utf8");
const koreanWorkEntryPage = fs.readFileSync(path.join(root, "src", "app", "ko", "work-archive", "[slug]", "page.tsx"), "utf8");
assert.ok(home.includes("HomepageLanding"), "English home should render the shared hiring homepage");
assert.ok(koreanHome.includes("HomepageLanding"), "Korean home should render the shared hiring homepage");
assert.ok(homepageLanding.includes("CompanyStrip"), "Hiring homepage should include the company brand strip");
assert.ok(companyStrip.includes("xl:grid-cols-5"), "Company strip should balance five company cards on wide screens");
assert.ok(companyStrip.includes("data-company-arrow-direction"), "Company strip should expose arrow direction semantics");
assert.ok(workEntryPage.includes("KpiCharts"), "English work detail should render KPI charts");
assert.ok(koreanWorkEntryPage.includes("KpiCharts"), "Korean work detail should render KPI charts");

const brandAssets = fs.readFileSync(path.join(root, "src", "lib", "brand-assets.ts"), "utf8");
assert.ok(brandAssets.includes('githubUrl = "https://github.com/Joshua-sung"'), "GitHub should point to the public profile");
assert.ok(brandAssets.includes('contactEmail = "krjoshua21@gmail.com"'), "Contact email should be centralized");
assert.ok(homepageLanding.includes("contactUrl"), "Hiring homepage should expose a contact CTA");
for (const slug of [
  "eoding",
  "woowa-brothers",
  "crowdworks",
  "dublin-pub-operations",
  "republic-of-korea-army",
]) {
  assert.ok(brandAssets.includes(slug), `${slug} should have brand metadata`);
}
assert.ok(brandAssets.includes('flagVariant: "ireland"'), "Dublin pub operations should use an Ireland flag mark");
assert.ok(!brandAssets.includes('initials: "PMO"'), "PMO should not appear as a separate company logo");

console.log("design assets ok: logos, GitHub link, and company strip are present");
