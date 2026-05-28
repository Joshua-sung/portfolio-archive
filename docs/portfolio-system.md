# Portfolio System Documentation

## Purpose

This repository powers a public portfolio website for a Growth PM / Operations PM / Data PM profile. The site is a work archive for operational and technical execution: process improvement, automation, dashboards, data workflows, developer collaboration, and measurable business outcomes.

## Repository Structure

```text
content/
  templates/
    work-entry-template.mdx
  work/
    drone-data-collection-standardization.mdx
    robot-delivery-pickup-ux.mdx
    travel-data-build-automation.mdx
docs/
  portfolio-system.md
src/
  app/
    about/
    case-studies/
    collaboration/
    resume/
    systems-built/
    tags/[tag]/
    work-archive/
    writing/
  components/
  lib/
```

## Content Architecture

Each work entry is one MDX file in `content/work`. Frontmatter powers archive cards, tag pages, metrics, metadata, and case-study routing. The body uses STAR+T:

- Situation / Task
- Action
- Result
- Tools & Tech
- Collaboration
- Lessons

The content loader in `src/lib/content.ts` reads local files with `gray-matter`, sorts entries by date, generates tag data, and exposes helpers for static routes.

## Current Published Case Studies

- Travel data build automation: 14.8% labor cost reduction and 19.1% automated prefill.
- Drone data collection standardization: 15% collection volume improvement and milestone compliance.
- Robot delivery pickup UX improvement: NPS +4.6%p through POI and stop-angle changes.

## Deployment Workflow

1. Work locally.
2. Run `npm run lint`.
3. Run `npm run build`.
4. Commit changes to Git.
5. Push to GitHub.
6. Vercel deploys from the connected repository.
7. Verify the public deployment URL on desktop and mobile.

## Content Publishing Workflow

Adding a new entry should require one content file and no route changes.

1. Copy `content/templates/work-entry-template.mdx`.
2. Rename the copy to `content/work/<slug>.mdx`.
3. Fill required frontmatter:
   - `title`
   - `slug`
   - `summary`
   - `date`
   - `role`
   - `category`
   - `outcomeType`
   - `tags`
   - `tools`
   - `metrics`
   - `featured`
   - `sensitive`
4. Write the STAR+T body.
5. Run lint and build.
6. Commit and push.

## Reusable Template

The reusable template lives at `content/templates/work-entry-template.mdx`. Keep the same section names so all entries remain scannable and comparable.

## Design Principles

- Prioritize credibility over visual complexity.
- Use documentation-style navigation and typography.
- Make metrics visible but keep context readable.
- Avoid unnecessary animation and heavy dependencies.
- Keep every case public-safe and anonymized where needed.
- Make the GitHub/Vercel publishing workflow part of the portfolio proof.

## Future Scaling Recommendations

- Add a `content/writing` directory only when there are at least three writing entries.
- Add search only after the archive grows beyond 15-20 entries.
- Add role filters only if tags become too broad.
- Add downloadable PDF/PPT assets under `public/resume` when finalized.
- Consider static Open Graph images after the first public release.

## Risks And Maintenance Considerations

- Sensitive data risk: avoid internal URLs, customer identifiers, raw dashboards, or unapproved metrics.
- Content drift risk: keep metrics, role labels, and case narratives consistent with resume/PDF claims.
- Over-complexity risk: avoid a CMS or backend until markdown files become a clear bottleneck.
- Design drift risk: keep new pages aligned with the documentation-style UX.
- Build risk: every content change should still pass `npm run build`, because bad frontmatter can break generated routes.
- Dependency risk: `npm audit` currently reports a moderate `postcss` advisory through Next.js 16.2.6's nested dependency. Do not run the suggested `npm audit fix --force` if it downgrades Next.js. Recheck after Next.js publishes an upstream fix.
