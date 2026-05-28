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
        content,
      };
    });
}

const [english, korean] = locales.map(({ directory }) => readEntries(directory));

assert.equal(english.length, 8, "English archive should publish 8 work entries");
assert.equal(korean.length, 8, "Korean archive should publish 8 work entries");

const englishSlugs = english.map((entry) => entry.slug).sort();
const koreanSlugs = korean.map((entry) => entry.slug).sort();
assert.deepEqual(koreanSlugs, englishSlugs, "Korean work slugs should match English work slugs");

for (const entry of korean) {
  assert.ok(/[가-힣]/.test(entry.title), `${entry.fileName} should have a Korean title`);
  assert.ok(/[가-힣]/.test(entry.summary), `${entry.fileName} should have a Korean summary`);
  assert.ok(entry.content.includes("## 상황 / 과제"), `${entry.fileName} should include Korean STAR+T sections`);
  assert.ok(entry.content.includes("## 실행"), `${entry.fileName} should include Korean Action section`);
  assert.ok(entry.content.includes("## 결과"), `${entry.fileName} should include Korean Result section`);
  assert.ok(entry.content.includes("## 도구와 기술"), `${entry.fileName} should include Korean Tools section`);
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
