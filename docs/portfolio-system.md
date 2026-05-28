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
    night-fire-training-stakeholder-alignment.mdx
    public-proposal-consortium-presentation.mdx
    pub-service-flow-redesign.mdx
    robot-delivery-promotion-orders.mdx
    robot-delivery-pickup-ux.mdx
    travel-data-build-automation.mdx
    weather-requirement-renegotiation.mdx
docs/
  portfolio-system.md
  superpowers/
    plans/
src/
  app/
    about/
    case-studies/
    collaboration/
    companies/
    resume/
    systems-built/
    tags/[tag]/
    work-archive/
    writing/
  components/
  lib/
```

## Content Architecture

Each work entry is one MDX file in `content/work`. Frontmatter powers archive cards, company pages, tag pages, metrics, metadata, and case-study routing. The body uses STAR+T:

- Situation / Task
- Action
- Result
- Tools & Tech
- Collaboration
- Lessons

The content loader in `src/lib/content.ts` reads local files with `gray-matter`, sorts entries by date, generates company groups and tag data, and exposes helpers for static routes.

Each entry must include a `company` block:

```yaml
company:
  name: "Company or organization name"
  slug: "company-slug"
  context: "Public-safe description of the operating context."
  role: "Primary role context"
  order: 99
```

## Current Published Case Studies

- Travel data build automation: 14.8% labor cost reduction and 19.1% automated prefill.
- Weather requirement renegotiation: reconstructed field/weather evidence and adjusted unrealistic collection criteria.
- Drone data collection standardization: 15% collection volume improvement and milestone compliance.
- Robot delivery promotion: 7% average daily order increase through always-on simulation runs.
- Robot delivery pickup UX improvement: NPS +4.6%p through POI and stop-angle changes.
- Pub service flow redesign: 8% sales increase and faster service time through station redesign.
- Night training stakeholder alignment: zero civil complaints through repeated public communication.
- Public-sector consortium proposal: four-company PMO-style proposal alignment through final PT.

## Current Company Groups

- 우아한형제들: robot delivery growth operations and pickup UX.
- 크라우드웍스: AI data operations, field data collection, weather requirement negotiation, and automation-assisted delivery.
- Dublin Pub Operations: service flow redesign and hospitality operations.
- Republic of Korea Army: field leadership and stakeholder risk communication.
- Public-sector Consortium: RFP interpretation, PMO coordination, and proposal presentation.

## Deployment Workflow

### GitHub Integration Path

1. Open Vercel and create a new project.
2. Import `https://github.com/Joshua-sung/portfolio-archive`.
3. Keep the framework preset as Next.js.
4. Use the default commands:
   - Install: `npm install`
   - Build: `npm run build`
   - Output: Next.js default
5. Deploy the `main` branch.
6. Future publishing is automatic: commit content changes, push to GitHub, and Vercel deploys the new build.

### CLI Path

Use this path after local Vercel authentication is available.

```bash
npx vercel login
npx vercel deploy --prod --yes
```

### Per-Change Workflow

1. Work locally.
2. Run `npm run lint`.
3. Run `npm run build`.
4. Commit changes to Git.
5. Push to GitHub.
6. Vercel deploys from the connected repository or from the CLI command.
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
   - `company`
   - `category`
   - `outcomeType`
   - `tags`
   - `tools`
   - `metrics`
   - `featured`
   - `sensitive`
4. Write the STAR+T body.
5. Run `npm run test:content`.
6. Run lint and build.
7. Commit and push.

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
- Add company timeline metadata only after each company has multiple dated entries.
- Add downloadable PDF/PPT assets under `public/resume` when finalized.
- Consider static Open Graph images after the first public release.

## Risks And Maintenance Considerations

- Sensitive data risk: avoid internal URLs, customer identifiers, raw dashboards, or unapproved metrics.
- Content drift risk: keep metrics, role labels, and case narratives consistent with resume/PDF claims.
- Over-complexity risk: avoid a CMS or backend until markdown files become a clear bottleneck.
- Design drift risk: keep new pages aligned with the documentation-style UX.
- Build risk: every content change should still pass `npm run build`, because bad frontmatter can break generated routes.
- Dependency risk: `npm audit` currently reports a moderate `postcss` advisory through Next.js 16.2.6's nested dependency. Do not run the suggested `npm audit fix --force` if it downgrades Next.js. Recheck after Next.js publishes an upstream fix.
