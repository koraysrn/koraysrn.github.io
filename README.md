# Koray Sirin — Portfolio

Personal portfolio website of Koray Sirin, an Agentic AI Developer focused on artificial intelligence, machine learning and multi-agent systems.

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- MDX

## Getting Started

Prerequisites: Node.js 18.18+ (20+ recommended).

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build & Deploy (GitHub Pages)

The project is configured for static export.

```bash
npm run build
```

The static site is generated in the `out` directory. Pushing to the `main` branch triggers the GitHub Actions workflow in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which builds and publishes the site to GitHub Pages.

## Configuration

Content is configured in `src/config/`:

- `About.tsx` — about section and skills
- `Experience.tsx` — work experience
- `Projects.tsx` — projects
- `Contact.tsx` — contact details
- `Hero.tsx` — hero section
- `Meta.tsx` — SEO metadata
- `Navbar.tsx` — navigation
- `Resume.ts` — resume PDF path
- `Journey.tsx` — journey links

## License

MIT
