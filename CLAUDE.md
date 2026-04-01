# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
yarn dev        # Start development server (Turbopack, default in Next.js 16)
yarn build      # Production build (Turbopack)
yarn start      # Start production server
yarn lint       # Run ESLint (via ESLint CLI — not `next lint`, which is removed in v16)
```

Use `yarn` (not `npm` or `npx`) — `yarn.lock` is present.

## Stack

- **Next.js 16.2** with App Router — Turbopack is the default bundler for both `dev` and `build`
- **React 19.2** — includes View Transitions, `useEffectEvent`, Activity
- **TypeScript 5** (strict mode, path alias `@/*` → `./src/*`)
- **Tailwind CSS v4** via `@tailwindcss/postcss` — configured in `globals.css`, not `tailwind.config.*`
- **HeroUI v3** component library (styles imported in `globals.css`)
- **Supabase** (`@supabase/supabase-js` + `@supabase/ssr`) for auth and data
- **Motion** for animations
- **react-icons** for icon components
- **dayjs** for date formatting (Thai Buddhist Era: `date.year() + 543`)

## Architecture

### Supabase clients (`src/utils/supabase/`)

Three separate clients for different rendering contexts — always use the right one:

| File | Use when |
|------|----------|
| `server.ts` | Server Components, Server Actions, Route Handlers |
| `client.ts` | Client Components (`"use client"`) |
| `proxy.ts` | `proxy.ts` (formerly `middleware.ts`) |

Environment variables: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY`

### Key Next.js 16 breaking changes to know

- **`cookies()`, `headers()`, `draftMode()`, `params`, `searchParams`** are all async — must be `await`ed. No synchronous access.
- **Middleware is renamed to Proxy** — the file is `proxy.ts` (not `middleware.ts`); export a `proxy` function or default export.
- **`next lint` is removed** — use `eslint` directly (already in `package.json`).
- **`fetch` requests are not cached by default** — use the `use cache` directive or `<Suspense>` for streaming.
- **`experimental.turbopack`** config moved to top-level `turbopack` in `next.config.ts`.
- `params` in pages/layouts are `Promise<{...}>` — always destructure after `await`.

### Caching

The new `use cache` directive (opt-in via `cacheComponents: true` in `next.config.ts`) replaces the old `fetch` cache model. Not currently enabled in this project. See `node_modules/next/dist/docs/01-app/01-getting-started/08-caching.md`.

### Component conventions

- `src/app/` — App Router pages and layouts (thin Server Components — just render a container)
- `src/components/` — Reusable UI components (mirrored `admin/`, `public/`, `other/` subdirs)
- `src/containers/` — Page-level components; hold state/logic, typically `"use client"`
  - `containers/<section>/<page>/services/` — data, assets, and helper functions for that page
- Default to Server Components; add `"use client"` only for interactivity, browser APIs, or state

### Styling

Tailwind v4 theme tokens are defined in `globals.css` under `@theme`. Current palette:
- `--color-primary`: `#ff0000`
- `--color-palette1`–`palette5`: pink → dark red (`#ffadb9` → `#5a021d`)

Font: **Kanit** (Google Font, latin + Thai subsets, weights 300/400/500/700), applied globally via `--font-kanit`.
