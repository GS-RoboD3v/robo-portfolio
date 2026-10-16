# AGENTS.md

## Project Overview

RoboD3v portfolio: single-page Greek (EL-first) showcase of 5 live webapps
(terragousto e-shop, lab IQ test, plaisiore artist portfolio, roboschool
platform, political-compass quiz). React 19 + Vite 8 + Tailwind v4 + shadcn
`base-nova` + Base UI primitives, prerendered single route, deployed on
Netlify at `portfolio.robod3v.com`. No backend, no cookies, no tracking.

## Setup & Dev Commands

Toolchain: Node 24 via mise (`export
PATH="/home/robod3v/.local/share/mise/installs/node/24.20.0/bin:$PATH"`),
npm + `package-lock.json` (never switch managers).

```bash
npm install --include=dev   # shell may carry NODE_ENV=production which omits devDeps
npm run dev                 # vite dev server
npm run build               # tsc + llms-full + vite build + prerender (full chain, Netlify runs this)
npm run preview             # serve dist locally
```

## Verification Commands

```bash
npx tsc --noEmit
npm run lint                # eslint src scripts --max-warnings 0 (never bare `npx eslint`, binary quirk)
npx vitest run              # colocated *.test.ts(x), expect 4 files / 6 tests
npm run build && command grep -c 'application/ld+json' dist/index.html  # prerender check, expect ≥1
gzip -c dist/assets/index-*.js | wc -c   # budget: initial JS ≤200KB gzip
```

Single-test filter: `npx vitest run <path>`.

## Cloud Stack & External Services

- Netlify site `robo-portfolio` (team `gs-robod3v`): Git CD currently
  UNLINKED (raw-API attach has no deploy key) — production ships via
  `netlify deploy --prod --build` until someone relinks the repo in
  dashboard. Skills: `~/.agents/skills/netlify-{deploy,config,frameworks}`.
  Gotchas: `netlify.toml` wins over UI; `PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1`
  must stay set in site env; manual `--prod` deploys get replaced by the
  next CD push (desired).
- GitHub `GS-RoboD3v/robo-portfolio` (public): pushes do NOT auto-deploy
  until CD relink. Monthly preview refresh (`.github/workflows/refresh-previews.yml`)
  commits captures + fires the Netlify build hook.
- Cloudflare DNS: `CNAME portfolio → robo-portfolio.netlify.app`
  (grey-cloud until Netlify cert provisions).
- Live URLs of showcased projects live in `src/content/projects.ts` — verify
  with curl (expect 200) before claiming anything about them.

## Boundaries & Guardrails

- Never touch: `docs/superpowers/specs/*` (frozen decisions),
  `public/previews/*` + `public/og-cover.webp` (CI-generated; refresh via
  `npm run capture-previews`, never hand-edit), `.netlify/` (local only).
- Never add: router, `motion` package, i18n lib, CMS, store, charts,
  analytics, Playwright in runtime bundle (devDep-only for capture script).
- Numbers in copy must trace to `src/content/projects.ts` or the spec —
  no invented metrics, ever. Client projects (terragousto, plaisiore) need
  owner sign-off before new screenshots/deep-case edits.
- Iframes of the 5 projects are impossible (all send `X-Frame-Options:
  DENY`/`SAMEORIGIN`) — previews are screenshots by design, don't regress this.
- No secrets exist in this repo; keep it that way (nothing `VITE_*`).

## Code Style & Conventions

- EL-first copy, single CTA `mailto:info@robod3v.com`; new motion must die
  under `prefers-reduced-motion` + on touch; tap targets ≥44px;
  `ScrollReveal` (lazy) is the only animation primitive — no new ones.
- `?case=<id>` deep-link (whitelist terragousto|lab) is the only routing;
  S5 cards stay outbound-links-only, no dialogs.

## Definition of Done

`tsc` 0 errors + `lint` 0 warnings + `vitest` N>0 executed 0 failures +
`build` emits `dist/{index.html,sitemap.xml,llms.txt,llms-full.txt,robots.txt}`
with JSON-LD present + diff touches only task-owned files.
