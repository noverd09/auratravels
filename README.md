# AURA TRAVEL

Boutique travel agency website: destination discovery, curated trips with itineraries, a journal, and a nine step "Plan your trip" questionnaire that produces a travel inquiry. Portfolio project. All content is fictional and prices are illustrative.

Stack: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, React Hook Form, Zod, Phosphor icons.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Architecture

```text
UI (app/, components/)  →  lib/<entity>/service  →  repository (interface)  →  mock-repository  →  (later) supabase-repository
```

- Supabase is **not** connected. Mock data lives in `data/` and is reached only through services. ESLint enforces the boundary.
- Domain types in `types/index.ts` mirror the future database columns.
- Inquiries are validated on the client and again on the server (`app/plan-your-trip/actions.ts`), then stored in memory only.
- See `docs/supabase-migration.md` for the migration plan and `DESIGN.md` for the design system.

## Photography

Images are from Wikimedia Commons (Creative Commons or public domain). Credits are in `data/images.ts` and shown at `/credits`. Replace a file in `public/images` and its entry to swap in final photography.
