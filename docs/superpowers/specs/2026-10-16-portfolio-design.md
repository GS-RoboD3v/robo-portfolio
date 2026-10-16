# Robo Portfolio — Design Spec + Build Plan
Date: 2026-10-16 | Status: approved-direction, pre-scaffold | Dir: `/home/robod3v/Projects/robod3v/robo_portfolio/` (empty, greenfield)
Stack: React 19 + Vite + Tailwind v4 + shadcn (base-nova). EL-first. No cookies/tracking.

## 0. Goal / non-goals
- Goal: single-page portfolio proving RoboD3v ships live webapps. Credibility (everything clickable-live) + prestige (dark futuristic, award-level polish) + awareness (shareable screenshots/OG, share links).
- Non-goals: no agent/automation case studies (none shippable yet — reserved cross-link slot only), no EN version, no CMS/i18n lib, no per-project routes, no fake metrics, no second e-shop claim beyond terragousto.

## 1. Final five (all verified HTTP 200 on 2026-10-16 via curl)
| # | Project | Live | Type | Stack | Proof (verifiable, no invention) | Sensitivity |
|---|---------|------|------|-------|----------------------------------|-------------|
| 1 | terragousto (Money) | https://terragousto.gr | Client e-shop | React 18 + Vite 7 + Tailwind v4 + React-Router 7 + TanStack Query + Medusa v2, VPS/Caddy | 19 route pages; dual payments Piraeus card + COD (`src/lib/payment-availability.ts`, `VITE_PIRAEUS_CARD_ENABLED`/`VITE_COD_ENABLED`); 20+ backend test files; sitemap 117 lines; `public/og-image.webp`; cards-live record 2026-10-09 in client file | CLIENT — tile + live link OK; full case/screenshots need owner sign-off. LICENSE MIT vs package.json ISC mismatch — confirm. |
| 2 | lab (Brains) | https://greek-iq-app.vercel.app | Personal IQ test | Next.js 16 + React 19 + Neon + Upstash Redis + Serwist PWA | 3 modes 25/32/45q, 20-min timed (`lib/runner-config.ts`); IRT 3PL CAT engine exposure cap 0.15; 21-stem v0 bank; anonymous share links 30-day 122-bit IDs; Greek WCAG AA + PWA offline | Personal, no LICENSE — add MIT before showcase. |
| 3 | plaisiore (Beauty) | https://plasiore.netlify.app | Client artist portfolio | React 19 + Vite 8 + Tailwind v4 + shadcn base-nova + framer-motion + React-Router 7 | 17 projects/17 slugs; 11 Vimeo embeds; ~25 local media files; strict CSP+HSTS (`netlify.toml`); route code-splitting; Vitest suite | CLIENT (artist Orestis Panagopoulos, MIT ©2024 him) — tile + link OK; deep case needs artist permission. STACK TWIN — copy its patterns verbatim. |
| 4 | roboschool (Platform) | https://school.robod3v.com | Personal learning platform | Next.js 16 + React 19 + Supabase + Stripe | 7 tracks / 27 modules / 65 lessons / 990 min (README); server-side Pro gating; ~20 test files; Stripe webhooks + coupons; Hostinger VPS + Caddy | Personal MIT — safe. Published count must come from `getPublishedTracks()`, not raw slug count. |
| 5 | political-compass (Viral) | https://robo-political-compass.vercel.app | Personal quiz | Next.js 16 + React 19 + next-intl + html-to-image | 40 questions / 12 ideologies (JSON len verified); 6 locale routes; dynamic OG route + PNG share export | Personal, no LICENSE — add MIT. Tile-only. |

## 1b. Domain: portfolio.robod3v.com (confirmed 2026-10-16). Canonical `https://portfolio.robod3v.com/`, sitemap/robots/OG/llms.txt all use it.

## 1c. Live preview frames (decided 2026-10-16)
- Direct iframes REJECTED (verified via response headers): terragousto `XFO: DENY + frame-ancestors 'none'`; lab `XFO: DENY`; plaisiore + school `SAMEORIGIN + frame-ancestors 'self'`; compass `XFO: DENY`. All 5 block cross-origin framing — embedding would require weakening bank-grade/privacy CSPs. Never do that for a preview.
- Approach: auto-refreshed hero screenshots. `public/previews/<id>-hero.webp` (1280×800 viewport, hero fold) shown in tile + large in dialog, each labeled «Live ↗» (outbound link, always the real thing) + «ανανεώθηκε {date}».
- Refresh: GitHub Actions scheduled workflow (monthly + manual `workflow_dispatch`), Playwright chromium capture → WebP → commit to `public/previews/` → Netlify rebuild. No local cron (desktop not always on), no third-party screenshot API (privacy + limits), zero runtime cost, zero tracking.
- Fallback per tile: preview image + prominent «Άνοιγμα live ↗» button. Never an empty/broken iframe.

## 2. Stack decision (twin-pinned to plaisiore, proven)
- Pins: Vite `^8.0.12`, React `^19.2.6`, `@types/react ^19.2.14`, `@types/react-dom ^19.2.3`, TS `~6.0.2`, Tailwind `^4.3.1` + `@tailwindcss/vite ^4.3.1`, shadcn `style: base-nova, baseColor: neutral, cssVariables: true, iconLibrary: lucide`, `@base-ui/react ^1.5.0` (dialog a11y), `framer-motion ^12.39.0` (React 19 OK — NOT the renamed `motion` pkg), `clsx ^2.1.1` + `tailwind-merge ^3.6.0` + `class-variance-authority ^0.7.1` + `lucide-react ^1.16.0`. Dev: `@vitejs/plugin-react ^6.0.1`, `tsx ^4.21.0` (prerender runner), `vitest ^4.1.6` + `jsdom ^29.1.1` + `@testing-library/react ^16.3.2` + `jest-dom ^6.9.1`, `shadcn ^4.7.0`.
- Router: NONE. Single page + dialogs + filter = `useState` + anchor scroll + optional `location.hash` deep-link (`?case=` auto-opens dialog). react-router-dom (~50KB+) unjustified for 1 route.
- Prerender: trimmed `scripts/prerender.ts` ~60 lines (`renderToString` single route), not a plugin. Port only render+inject core from `robod3v_website/scripts/prerender-ssr.ts` (434 lines, multi-page legacy — overkill).
- Styling: copy plaisiore `index.css` oklch dark block verbatim; shift `--primary/--ring` toward cyan; keep `--radius: 1rem`. Geist for latin/display only — Greek body falls back to system stack (weak Greek glyph coverage in Geist); add `@fontsource-variable/inter` only if glyph check fails.
- Headers: copy plaisiore `netlify.toml` verbatim (strict CSP `script-src 'self'`, HSTS preload, immutable `/assets/*`); drop Vimeo `frame-src` unless showreel returns.
- SEO/GEO zero-dep: `public/sitemap.xml` (1 URL + lastmod) + `public/robots.txt` + `public/llms.txt` + `index.html` OG/Twitter (`lang="el"`) + `src/lib/jsonld.ts` ~30 lines (Person + ItemList of 5 projects).
- Scaffold (15 files max): `index.html`, `public/{sitemap.xml,robots.txt,llms.txt,og-cover.webp,favicon.svg,previews/<id>-hero.webp ×5}`, `netlify.toml`, `components.json`, `vite.config.ts`, `vitest.config.ts`, `.github/workflows/refresh-previews.yml`, `scripts/capture-previews.ts`, `src/{main.tsx,App.tsx,index.css,content/{site.ts,projects.ts},components/{hero-status-bar.tsx,proof-strip.tsx,project-grid.tsx,project-dialog.tsx,canvas-slot.tsx,ui/{button,badge,card,dialog}/},lib/{utils.ts,jsonld.ts}}`, `scripts/prerender.ts`. `canvas-slot.tsx` = sole `React.lazy` island, IntersectionObserver-gated, rAF paused offscreen.
- Do-NOT-add: react-router-dom, `motion` pkg, SSG plugins, i18n lib, CMS, zustand/redux, form/zod, charts, analytics SDK, Storybook. Playwright allowed CI-only for `capture-previews.ts` (never in runtime bundle).

## 3. Page system (single page, EL-first, CTA = mailto info@robod3v.com only)
Order: S1 Hero + status bar → S2 proof strip → S3 bento grid (Money/Brains/Beauty + Tabs filter Όλα/Money/Brains/Beauty) → S4 deep cases ×2 (terragousto + lab teaser cards) → S5 platform+viral row (roboschool + compass half-cards, outbound links only) → S6 process mini (3 steps: 30' διερεύνηση → πιλότος 7–14μ → ένταξη+υποστήριξη) → S7 FAQ accordion (6 EL) → S8 contact SplitCTA + cross-link slot (automations/agents → robod3v.com links only, zero invented cases) → S9 footer.
- Reuse from main site (no new libs): HeroTerminal (static mode on mobile), StatsCounter layout minus count-up, TechMarquee (desktop only), BeforeAfterScenarios, ProcessTimeline compact, MasonryGrid/BentoCard, TabbedFAQ/AccordionPanel, SplitCTA, useReducedMotion + reduced-motion.css.
- Tile anatomy: `Badge(axis)` + live-dot (8px `#00FF41`, ping once desktop-only) + screenshot 16/10 lazy WebP + title + 1-liner + 3 stack chips + footer (status · άνοιγμα →). Spotlight glow opacity-only, killed on touch/reduced-motion.
- Dialog anatomy (2 deep cases only): Problem → Build → Live proof → arch mini → timeline → CTAs. shadcn Dialog desktop / Sheet bottom-sheet <md (same body). CTAs: primary mailto `?subject=Case: <id>`, secondary Live ↗, ghost «Αντιγραφή stack» (clipboard markdown, «Αντιγράφηκε» state, zero backend). Deep-link `?case=<id>` auto-opens + sets `og:url`.
- shadcn usage (only): Card (cells/tiles), Badge (axis/LIVE/stack chips), Tabs (axis filter), Dialog+Sheet (deep cases), Button (mailto + open + copy-stack), Accordion (FAQ). Nothing else.
- Motion rules: animate opacity/y≤16px in-view-once; marquee pauses on hover; content renders without JS (no `opacity-0` without fallback); no scroll-jack, no layout shift (fixed aspect), no autoplay video; focus trapped only in Dialog/Sheet. Mobile kills (<md/touch/reduced-motion): spotlight, marquee→static, terminal typing→static log, ping→dot, blur→none, whileInView→false.
- Visual tokens (deltas vs main site `#050505/#00FF41/#00D1FF/#9F79EE`): add `--color-live #00FF41`, `--color-wip #FFCC00`, `--tile-glow-money rgba(0,255,65,.14)`, `--tile-glow-brains rgba(0,209,255,.14)`, `--tile-glow-beauty rgba(159,121,238,.16)`, `--radius-tile 1rem`; rhythm `py-16 md:py-24, max-w-6xl, gap-4 md:gap-6`; borders `white/10`. No new fonts/colors beyond this.
- Shareability: per-tile lazy WebP + per-dialog screenshots; 1 page OG `og-cover.webp` 1200×630 (dark + 3 thumbs); «Steal this stack» copy button; compass/lab share-link pattern as precedent.

## 4. EL copy kit (drafts, verifiable-only)
- H1: «Έργα που δουλεύουν σε παραγωγή — όχι mockups.» Sub: «Web εφαρμογές, εκπαιδευτικές πλατφόρμες και εργαλεία ανάλυσης, σχεδιασμένα και υλοποιημένα από τη RoboD3v στην Ελλάδα. Ζωντανά, μετρήσιμα, χωρίς cookies.»
- Status bar: «Διαθέσιμος για νέα έργα» · «Απάντηση εντός 48 ωρών» · «Βάση: Ελλάδα · απομακρυσμένα/υβριδικά».
- Proof strip (ranges until verified, no fake €/%): «5 ζωντανές εφαρμογές», «e-shop με κάρτα + αντικαταβολή (terragousto)», «3 test modes — 25/32/45 ερωτήσεις (lab)», «17 έργα + 11 Vimeo embeds (plaisiore)», «7 tracks / 65 μαθήματα (roboschool, via getPublishedTracks)», «cookies/tracking: 0».
- 1-liners: terragousto «Πλήρες e-shop με κάρτα + αντικαταβολή σε Medusa v2.» · lab «Δωρεάν ελληνικό τεστ IQ με προσαρμοστική IRT βαθμολόγηση.» · plaisiore «Portfolio 3D artist με 17 έργα και κινηματογραφικά Vimeo embeds.» · roboschool «Πλατφόρμα 7 tracks / 65 μαθημάτων με Stripe συνδρομές.» · compass «Ελληνικό πολιτικό τεστ 40 ερωτήσεων με κοινοποιήσιμο αποτέλεσμα.»
- FAQ (6): υπηρεσίες (web/e-shops + link automations/AI στο robod3v.com) · κόστος (email → εκτίμηση 48h) · διάρκεια (landing 1–3 εβδ, web apps 4–12 εβδ ενδεικτικά) · δεδομένα ΕΕ/GDPR/on-prem · NDA (εύρη αντί ονομάτων) · ξεκίνημα (email 3 γραμμές).
- Contact: «Έχετε κάτι να χτίσουμε;» + «Ένα email αρκεί…» + mailto + floating mobile same. Cross-link slot after contact: «Αυτοματισμοί ή AI coworkers; → robod3v.com/services/automations · /ai-agents» (links only).

## 5. SEO/GEO minimal
- JSON-LD (reuse main-site builders): home Organization + WebSite + WebPage + FAQPage (6 FAQs) + BreadcrumbList; `/#projects` ItemList (5 projects name/url/desc). Per-project pages: SKIP (YAGNI — anchors suffice).
- `llms.txt` <100 lines (portfolio intro + 5 1-liners + live URLs + contact) + generated `llms-full.txt` (5 descs + FAQ, 10-line build script).
- Sitemap from manifest (primary routes only), robots minimal (`Allow: /`, `Disallow: /api/ /admin/ /private/ /drafts/`, AI-crawler stance inherited from main `robots.txt` — read lines 1–99 before deciding), IndexNow reuse on deploy, `/.well-known/security.txt` copy, OG absolute URLs + `summary_large_image`.
- Noindex: share/result pages, 404, drafts, preview deploys (`X-Robots-Tag`), param dupes (`?utm_*`, `?share=` → canonical). No nofollow on outbound project links.

## 6. Build plan (phases + gates)
- P0 Scaffold: init npm + Vite 8 + Tailwind v4 + TS + base-nova + pins above; 15 files; `netlify.toml`; tokens; `projects.ts` with 5 entries (fields: id/axis/title/oneLiner/stack/liveUrl/status/metrics/screenshot/dialog?).
- P1 Sections S1–S3 + S5–S9 static (no dialogs/canvas): hero+status, proof strip, bento+filter, mini row, process, FAQ, contact, footer.
- P2 Dialogs (2 deep cases) + `?case=` deep-link + copy-stack.
- P3 Canvas slot lazy + prerender script + sitemap/llms/robots/OG + JSON-LD.
- P4 Proof pass: screenshots/OG per project (lab/roboschool need generated OG — no static file today), LICENSE adds (lab, compass), client permissions (terragousto, plaisiore), counts (`getPublishedTracks`), Lighthouse + link-check.
- Gates (run in robo_portfolio): G1 `npx tsc --noEmit` · G2 `npx eslint src scripts --max-warnings 0` · G3 `npm run build` + `test -f dist/sitemap.xml && test -f dist/llms.txt && test -f dist/robots.txt` · G4 serve + assert canonical + `application/ld+json` · G5 curl loop all 5 live URLs = 200 · G6 dead-anchor grep · G7 reduced-motion grep + skip-link · G8 initial JS ≤200KB gzip + Lighthouse perf≥90/a11y≥95/BP≥90/SEO≥95 · G9 canvas idle <5% CPU + pauses offscreen + poster on reduced-motion + 360px no-scroll + 44px targets + schema.org validator + IndexNow submit.
- Budgets: LCP ≤2.5s 4G; TBT ≤200ms desktop; zero fake numbers (ranges or drop).

## 7. Open items before publish
1. Domain (assumed portfolio.robod3v.com — confirm). 2. Client sign-off: terragousto + plaisiore screenshots/deep cases; terragousto license MIT-vs-ISC. 3. Add MIT LICENSE to lab + compass. 4. Generate OG/screenshots for lab + roboschool. 5. Roboschool published count via code. 6. FAQ cost/timeline ranges confirm (marked ενδεικτικά). 7. IndexNow key for new domain.
- Correction note: subagent draft `CONTENT_SEO_PLAN.md` listed a stale lineup (robonews/exodus) + «no e-shop payments evidence» — superseded: lineup is the five above; terragousto card+COD is repo-verified + client-file «Cards live 2026-10-09». Exodus/robonews are OUT.
