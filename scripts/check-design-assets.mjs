import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";

const root = process.cwd();

const requiredFiles = [
  "public/logos/woowahan-brothers.jpg",
  "public/logos/crowdworks.png",
  "public/logos/republic-of-korea-army.svg",
  "src/components/company-logo.tsx",
  "src/components/company-strip.tsx",
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
assert.ok(home.includes("CompanyStrip"), "English home should include the company brand strip");
assert.ok(koreanHome.includes("CompanyStrip"), "Korean home should include the company brand strip");

const brandAssets = fs.readFileSync(path.join(root, "src", "lib", "brand-assets.ts"), "utf8");
for (const slug of [
  "woowa-brothers",
  "crowdworks",
  "dublin-pub-operations",
  "republic-of-korea-army",
  "public-sector-consortium",
]) {
  assert.ok(brandAssets.includes(slug), `${slug} should have brand metadata`);
}

console.log("design assets ok: logos, GitHub link, and company strip are present");
