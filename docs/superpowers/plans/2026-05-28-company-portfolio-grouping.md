# Company Portfolio Grouping Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Group the portfolio work archive by company or organization and publish the expanded experience set to Vercel.

**Architecture:** Keep the existing markdown-first architecture. Add company metadata to each work MDX file, derive company groupings in `src/lib/content.ts`, and render `/companies` plus `/companies/[slug]` pages from the same work entries.

**Tech Stack:** Next.js App Router, Tailwind CSS, MDX/Markdown frontmatter, gray-matter, GitHub-backed Vercel deployment.

---

### Task 1: Content Contract Test

**Files:**
- Create: `scripts/check-portfolio-content.mjs`
- Modify: `package.json`

- [ ] Add a Node-based content test that parses `content/work/*.mdx`, verifies company metadata, checks expected company group counts, and confirms STAR+T sections.
- [ ] Run `npm run test:content` before implementation and confirm it fails because existing entries do not yet have company metadata.

### Task 2: Content Model And Routing

**Files:**
- Modify: `src/lib/content.ts`
- Create: `src/components/company-card.tsx`
- Create: `src/app/companies/page.tsx`
- Create: `src/app/companies/[slug]/page.tsx`
- Modify: `src/lib/site-data.ts`

- [ ] Add company parsing to work entry metadata.
- [ ] Add helpers for all company groups and company detail lookup.
- [ ] Add company archive navigation.
- [ ] Build reusable company cards for archive and detail pages.

### Task 3: Work Experience Expansion

**Files:**
- Modify: existing `content/work/*.mdx`
- Create: new MDX entries for promotion, weather renegotiation, pub operations, military stakeholder coordination, and public proposal coordination.
- Modify: `content/templates/work-entry-template.mdx`

- [ ] Add company metadata to existing case studies.
- [ ] Convert the remaining approved source experiences into public-safe STAR+T entries.
- [ ] Keep sensitive client/system details generalized.

### Task 4: Documentation And Deployment

**Files:**
- Modify: `README.md`
- Modify: `docs/portfolio-system.md`

- [ ] Document company-based publishing workflow.
- [ ] Run `npm run test:content`, `npm run lint`, and `npm run build`.
- [ ] Commit and push to GitHub `main`.
- [ ] Verify Vercel production routes after GitHub deployment.
