# Portfolio Archive

Personal portfolio website for a Growth PM / Operations PM / Data PM profile.

The site is designed as a public-facing work archive, not a visual-only portfolio. It emphasizes operational ownership, developer collaboration, automation literacy, dashboarding, technical communication, and data-driven process improvement.

English is the default public experience. Korean pages are available under `/ko` through the visible `EN / 한글` switcher in the header.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Markdown/MDX content files
- GitHub source control
- Vercel deployment

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Verification

```bash
npm run test:content
npm run test:i18n
npm run test:layout
npm run lint
npm run build
```

## Publishing New Work Entries

1. Copy `content/templates/work-entry-template.mdx`.
2. Save it as `content/work/<new-slug>.mdx`.
3. Save the Korean mirror as `content/ko/work/<same-slug>.mdx`.
   - Use `content/templates/work-entry-template.ko.mdx` for Korean entries.
4. Fill the frontmatter and STAR+T sections.
   - Include the `company` block so the entry appears under `/companies`.
   - Keep the same `slug` in both language files so the language switcher maps to the matching case.
5. Commit and push.
6. Vercel deploys automatically from GitHub.

See [docs/portfolio-system.md](docs/portfolio-system.md) for structure, deployment workflow, scaling guidance, and maintenance notes.

## Deployment

The repository is ready for Vercel. Import `Joshua-sung/portfolio-archive` in Vercel, or authenticate locally with `npx vercel login` and run:

```bash
npx vercel deploy --prod --yes
```
