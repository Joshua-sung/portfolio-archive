# Refined Docs Portfolio UI Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Improve the deployed portfolio UI with a refined documentation-style visual system focused on ratio, alignment, responsive typography, and credible PM/operations presentation.

**Architecture:** Keep the existing Next.js/Tailwind/MDX architecture. Polish shared components first (`SiteHeader`, `PageHeader`, `MetricStrip`, cards), then update company/archive pages to use cleaner section rhythm and non-nested metric treatments.

**Tech Stack:** Next.js App Router, Tailwind CSS, TypeScript, Chrome DevTools Protocol layout checks, Vercel GitHub deployment.

---

### Task 1: Add Layout Regression Check

**Files:**
- Create: `scripts/check-layout.mjs`
- Modify: `package.json`

- [ ] Add a Chrome-based layout check that validates mobile page width and desktop nav wrapping.
- [ ] Run the check against the current app and confirm it fails on desktop nav wrapping.

### Task 2: Shared Visual System Cleanup

**Files:**
- Modify: `src/components/site-header.tsx`
- Modify: `src/components/page-header.tsx`
- Modify: `src/components/metric-strip.tsx`
- Modify: `src/components/company-card.tsx`
- Modify: `src/components/work-card.tsx`
- Modify: `src/components/tag-chip.tsx`

- [ ] Use shorter desktop nav labels while preserving full route structure.
- [ ] Standardize hero/header width and spacing.
- [ ] Add compact metric rendering for metrics inside repeated cards.
- [ ] Remove nested card-like UI inside company/work cards.

### Task 3: Page-Level Alignment Pass

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/companies/page.tsx`
- Modify: `src/app/companies/[slug]/page.tsx`
- Modify: `src/app/work-archive/page.tsx`
- Modify: `src/app/work-archive/[slug]/page.tsx`

- [ ] Make company and archive pages feel like refined documentation sections.
- [ ] Improve desktop grid ratios and mobile stacking.
- [ ] Keep the first screen focused on evidence, not decoration.

### Task 4: Verify And Deploy

**Files:**
- No new feature files.

- [ ] Run `npm run test:content`.
- [ ] Run `npm run test:layout` against local production build.
- [ ] Run `npm run lint`.
- [ ] Run `npm run build`.
- [ ] Push to GitHub and verify Vercel production routes.
