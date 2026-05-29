# Portfolio Design Polish Design

## PDCA Status

- Plan: Use the Framer-inspired `DESIGN.md` as a visual reference layer for the hiring-focused portfolio.
- Do: Apply the visual system only to homepage/header/cards/CTAs and keep all portfolio content intact.
- Check: Run homepage, layout, responsive, content, i18n, links, lint, and build verification.
- Act: Deploy only after the public Vercel URL reflects the updated design without readability or routing regressions.

`bkit` note: local `bkit` was not installed and `npx bkit@latest status` failed because the npm package exposes no runnable binary. This document preserves the requested bkit/PDCA design workflow in the repository.

## Overview

The current portfolio is already a hiring-focused Growth PM / Operations PM / Data PM site. The design polish must strengthen first-impression credibility without replacing the existing strategy. The Framer reference from `DESIGN.md` should be adapted as a visual mood: dark canvas, confident hero hierarchy, pill CTAs, charcoal cards, sparse blue focus, and one or two contained gradient spotlight cards.

The site must remain a measurable portfolio, not a generic Framer-style marketing clone. Metrics, case study structure, company grouping, bilingual routing, public-safe anonymization, and Vercel compatibility are non-negotiable.

## Page Structure

### Homepage

1. Header
   - Keep simplified navigation: Home, Cases, Companies, Resume.
   - Make the header feel more like a dark product/navigation bar on desktop and mobile.
   - Keep the language switcher prominent and tappable.

2. Hero
   - Convert the hero band into a near-black canvas.
   - Preserve the Growth PM / Operations PM positioning and top metric visibility.
   - Use poster-like hierarchy, but do not use viewport-scaled type.
   - Keep Korean line wrapping controlled with `break-keep`.

3. Impact Metrics
   - Keep all required homepage metrics visible: `78.6x`, `252h/year`, `21h/month`, `-14.8%`, `+4.6%p`, `+7%`, while preserving `KRW 6.68M` inside the relevant case study.
   - Convert metric cards to charcoal/light-edge surfaces on the dark band.
   - Use the portfolio orange for metric values and sparse blue/green for labels/focus.

4. Case Study Cards
   - Keep the required card order: context, problem, action, result, role.
   - Shift cards toward charcoal card treatment when inside dark sections.
   - Use result panels as high-contrast evidence blocks, not decorative tags.

5. Company / Context Cards
   - Preserve logos and company grouping.
   - Apply subtle dark-card treatment where it improves hierarchy.
   - Avoid excessive gradients in company logo grids.

## Visual System

### Adapted From Framer

- Near-black canvas for the homepage hero and selected bands.
- White pill primary CTAs on dark backgrounds.
- Charcoal secondary CTAs and cards.
- High-contrast typography with large but responsive display hierarchy.
- Sparse blue accent for focus, links, and selected states.
- Contained gradient spotlight card inside the hero support panel.

### Preserved Portfolio Palette

- Main green `#468E36`: ownership/trust signal, active Korean/English switch, small success markers.
- Point orange/red `#FE5B2C`: business impact and measurable outcome values.
- Support blue `#262DA9`: links, focus, structured labels, and selected states.
- Light gray `#F5F7FC`: supporting light sections outside the dark hero/case bands.

### Explicit Non-Goals

- Do not apply full-page gradients.
- Do not introduce a heavy animation library.
- Do not use negative letter spacing because existing design constraints require letter spacing to remain normal.
- Do not convert all pages to dark mode.
- Do not remove current bilingual copy or route structure.

## Component Changes

### `src/components/site-header.tsx`

- Move header to a dark translucent surface.
- Convert navigation links to subtle charcoal hover pills.
- Keep language switcher as a compact high-contrast segmented control.
- Keep GitHub as a pill action.

### `src/components/homepage-landing.tsx`

- Convert hero and metric band to a dark canvas.
- Change hero CTAs to pill buttons:
  - primary: white pill
  - secondary: charcoal pill
  - GitHub: charcoal/outlined pill with orange or blue hover signal
- Convert the fit panel into a charcoal card with one contained gradient spotlight accent.
- Convert impact metrics into charcoal cards with subtle borders and preserved required values.
- Make selected case/capability sections visually connect to the new system without hiding content.

### `src/components/work-card.tsx`

- Add an optional `variant` prop for light/dark card contexts.
- Keep default light card styling for non-home pages.
- Use dark card styling for homepage case cards.
- Preserve `data-case-card-section` markers for homepage tests.

### `src/components/company-strip.tsx` and `src/components/company-card.tsx`

- Keep content and logos.
- Apply only light visual polish unless the component is placed in a dark band.

### `src/app/globals.css`

- Add dark design tokens as CSS variables.
- Keep existing brand tokens unchanged.
- Do not change global body background away from `#F5F7FC`.

## Responsive Behavior

- Mobile hero stays single-column.
- CTA buttons must remain at least 44px high and stay inside the viewport.
- Metrics may stack on mobile but must remain visible and readable.
- Korean titles and descriptions use `break-keep` where needed.
- No page-level horizontal overflow at common client widths.
- Desktop metrics should still fit in one row at laptop/desktop widths if practical.

## Verification Plan

Run:

- `npm run test:copy`
- `npm run test:content`
- `npm run test:i18n`
- `npm run test:design`
- `npm run test:homepage`
- `npm run test:layout`
- `npm run test:responsive`
- `npm run test:links`
- `npm run lint`
- `npm run build`

Manual checks:

- Inspect `/` desktop and mobile.
- Inspect `/ko` desktop and mobile for Korean line wrapping.
- Confirm required metrics remain visible.
- Confirm CTA buttons remain tappable.
- Confirm no horizontal overflow.
- Confirm production Vercel deployment reflects the updated design.

## Rollback

If the Framer-inspired treatment reduces clarity, rollback the dark homepage/header changes first and keep the design document plus `DESIGN.md` as references. If build or routing breaks, revert the smallest component change causing the failure.
