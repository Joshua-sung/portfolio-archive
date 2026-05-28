# Bilingual Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Keep the existing English portfolio as the default experience and add a Korean version accessible through a visible language switcher.

**Architecture:** Preserve existing English routes. Add Korean mirror routes under `/ko`, locale-aware content loading, locale-aware UI copy, and a client-side language switcher that maps the current URL to the matching language route.

**Tech Stack:** Next.js App Router, Tailwind CSS, MDX/Markdown content, gray-matter, TypeScript, Vercel GitHub deployment.

---

### Task 1: i18n Contract Test

**Files:**
- Create: `scripts/check-i18n.mjs`
- Modify: `package.json`

- [x] Add a test that requires 8 English work entries and 8 Korean work entries with matching slugs.
- [x] Add checks for `/ko`, `/ko/companies`, `/ko/work-archive`, and matching localized work routes after build.

### Task 2: Locale-Aware Data And UI Copy

**Files:**
- Modify: `src/lib/content.ts`
- Create: `src/lib/i18n.ts`
- Modify: shared components to accept `locale`.

- [x] Add `Locale` support to content loading.
- [x] Add localized path helpers and dictionaries.
- [x] Add visible `EN / 한글` language switcher in the header.

### Task 3: Korean Routes And Content

**Files:**
- Create: `content/ko/work/*.mdx`
- Create: `src/app/ko/**` route mirrors.

- [x] Translate all eight case studies into Korean STAR+T pages.
- [x] Add Korean home, companies, company detail, archive, and work detail pages.
- [x] Keep English URLs unchanged.

### Task 4: Verify And Deploy

**Files:**
- Modify: README and docs as needed.

- [x] Run `npm run test:i18n`.
- [x] Run `npm run test:content`.
- [x] Run `npm run test:layout`.
- [x] Run `npm run lint`.
- [x] Run `npm run build`.
- [ ] Push to GitHub and verify Vercel production.
