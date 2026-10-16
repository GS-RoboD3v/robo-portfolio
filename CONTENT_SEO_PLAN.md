# Portfolio — Content + SEO/GEO + Verification Plan (DRAFT)
Status: draft strings. Anything marked [VERIFY] must be confirmed before publish. No fake numbers, no fake agent cases.

## 0. Non-negotiables (from main site / lab pattern)
- EL-first copy. EN later, not now.
- No cookies / no tracking / no analytics. No consent banner needed if nothing is stored.
- Single email CTA + floating mobile CTA. One contact path only.
- Cross-link automations/agents → robod3v.com (reserved slot, no invented case studies).
- Share pages noindex (lab pattern).

## 1. EL COPY KIT (draft strings)

### 1.1 Hero
- H1: `Έργα που δουλεύουν σε παραγωγή — όχι mockups.`
- Sub: `Web εφαρμογές, εκπαιδευτικές πλατφόρμες και εργαλεία ανάλυσης, σχεδιασμένα και υλοποιημένα από τη RoboD3v στην Ελλάδα. Ζωντανά, μετρήσιμα, χωρίς cookies και χωρίς tracking.`
- Primary CTA: `Επικοινωνία` → `mailto:info@robod3v.com?subject=Ερώτηση%20για%20έργο`
- Secondary CTA: `Δείτε τα έργα` → `#projects`

### 1.2 Status bar (under hero, 3 items, plain text + dot)
- `Διαθέσιμος για νέα έργα`
- `Απάντηση εντός 48 ωρών`
- `Βάση: Ελλάδα · Εργασία: απομακρυσμένα / υβριδικά`

### 1.3 Proof strip (labels only — numbers are ranges until verified)
- `Ζωντανές εφαρμογές σε παραγωγή: [VERIFY — μετρήστε τα live URLs, αλλιώς γράψτε «5+» μόνο αν ισχύει]`
- `Εκπαιδευτικές διαδρομές (roboschool): [VERIFY — τρέξτε getPublishedTracks().length, μην αντιγράψετε το 47 (ακατέργαστα slugs)]`
- `Quiz/test modes: 3 (lab: nonverbal 25 ερωτήσεις · full 32 · timed 45/20') — VERIFIED από lab/app/page.tsx`
- `E-shop με live πληρωμές: [VERIFY — ΔΕΝ ΒΡΕΘΗΚΕ απόδειξη. Το exodus είναι backtesting engine χωρίς broker/payments. ΜΗΝ το ισχυριστείτε μέχρι να υπάρξει live URL + Stripe/Medusa απόδειξη]`
- `Cookies / tracking: 0`

### 1.4 Projects (1-liner + 3 outcome bullets each — all verifiable from repo)

**P1 — robod3v.com · Εταιρικό site με GEO-first αρχιτεκτονική**
1-liner: `Το εταιρικό site της RoboD3v: prerendered Vite+React, δομημένα δεδομένα ανά διαδρομή και πλήρες LLM context.`
- Prerendered routes με canonical + sitemap από single manifest (`scripts/prerender-ssr.ts`)
- JSON-LD ανά διαδρομή (Organization, WebSite, WebPage, Service, FAQPage, BreadcrumbList) + KeyTakeaways blocks για GEO
- `llms.txt` / `llms-full.txt`, IndexNow submit, robots crawler matrix, `security.txt`, zero cookies

**P2 — lab · Online τεστ νοημοσύνης (Next.js)**
1-liner: `Διαδικτυακό τεστ με 3 λειτουργίες, αυτόματη βαθμολόγηση και αποτελέσματα χωρίς λογαριασμό.`
- 3 modes: μη λεκτικό (~25 ερωτήσεις) · πλήρες (~32) · χρονομετρημένο (45 ερωτήσεις / 20')
- Server-side scoring (`app/api/…/score`), αποτελέσματα με share links (noindex)
- Live URL: [VERIFY]

**P3 — roboschool · Εκπαιδευτική πλατφόρμα (Next.js + Supabase)**
1-liner: `Πλατφόρμα μάθησης με διαδρομές (roadmaps), ασκήσεις, quiz και gamification.`
- Roadmap tracks με publish gating (`isTrackPublished` — αναφέρετε μόνο published count) [VERIFY αριθμό]
- Quiz parser + exercise registry + completion tracking
- Live URL: [VERIFY]

**P4 — robonews · Εφαρμογή ενημέρωσης (Next.js + SQLite)**
1-liner: `Εφαρμογή συλλογής και προβολής ειδήσεων με τοπική βάση δεδομένων.`
- [VERIFY 1–2 bullets από το repo πριν το publish — μην επινοήσετε features]
- Live URL: [VERIFY]

**P5 — exodus · Backtesting engine (Python + Rust)**
1-liner: `Τοπικό backtesting περιβάλλον για στρατηγικές ICT/IPDA με compiled Rust kernels — μόνο έρευνα, όχι live trading.`
- Causal pending-order execution, multi-timeframe analysis, FTMO risk enforcement
- DuckDB + Optuna pipeline, strategy registry (δυναμικό — χωρίς στατικούς ισχυρισμούς πλήθους)
- Ρητά: `Backtesting only — καμία live διαπραγμάτευση, κανένα broker integration`
- Repo/docs URL: [VERIFY — δεν είναι web app, link σε docs ή repo, όχι «live demo»]

### 1.5 FAQ (6 items, EL draft answers)
1. **Τι υπηρεσίες προσφέρετε;** — `Web εφαρμογές και e-shops, επιχειρησιακούς αυτοματισμούς και AI coworkers. Λεπτομέρειες στο robod3v.com — αυτό το portfolio δείχνει μόνο υλοποιημένα έργα.`
2. **Πόσο κοστίζει ένα έργο;** — `Εξαρτάται από το εύρος. Στείλτε μια παράγραφο με το τι θέλετε να πετύχετε στο info@robod3v.com και θα λάβετε εκτίμηση εντός 48 ωρών.`
3. **Πόσο διαρκεί συνήθως;** — `Landing pages: 1–3 εβδομάδες. Web εφαρμογές: 4–12 εβδομάδες ανάλογα με τις διασυνδέσεις (CRM/ERP/myDATA). [VERIFY — εύρος εκτίμηση, δηλώστε το ως ενδεικτικό]`
4. **Τα δεδομένα μένουν στην Ελλάδα / ΕΕ;** — `Ναι. On-premises ή EU VPS, zero data retention για εκπαίδευση μοντέλων, πλήρης συμμόρφωση GDPR.`
5. **Αναλαμβάνετε έργα με NDA;** — `Ναι. Γι' αυτό ορισμένα έργα εμφανίζονται με εύρος αποτελεσμάτων αντί για ακριβή νούμερα ή ονόματα πελατών.`
6. **Πώς ξεκινάμε;** — `Ένα email στο info@robod3v.com με 3 γραμμές: τι θέλετε, τι χρονοδιάγραμμα έχετε, τι budget σκέφτεστε. Απαντάμε εντός 48 ωρών.`

### 1.6 Contact + cross-link block
- Heading: `Έχετε κάτι να χτίσουμε;`
- Body: `Ένα email αρκεί. Περιγράψτε το πρόβλημα, όχι τη λύση — τη λύση θα τη βρούμε μαζί.`
- CTA (μόνο ένα + floating mobile ίδιο): `info@robod3v.com`
- Cross-link slot (reserved, μετά το contact, πριν το footer):
  `Χρειάζεστε αυτοματισμούς ή AI coworkers; → robod3v.com/services/automations · robod3v.com/services/ai-agents`
  (Κανένα case study εδώ — links μόνο.)

## 2. SEO/GEO MINIMAL SET

### 2.1 JSON-LD (reuse builders from robod3v_website `src-vite/lib/site-data.ts` — rung 2, don't rewrite)
- `/` (home): Organization + WebSite + WebPage + FAQPage (από τα 6 FAQs) + BreadcrumbList
- `/#projects` anchor: ItemList με τα 5 projects (name, url, description) — inline στο home graph
- Per-project (αν υπάρξουν ξεχωριστές σελίδες — αλλιώς skip, YAGNI): SoftwareApplication (P2, P3, P4) / SoftwareSourceCode (P5) + BreadcrumbList. WebApplication αντί SoftwareApplication αν δεν υπάρχει installable — διάλεξε ένα, όχι και τα δύο.
- ΝΕΑ σελίδα = νέο entry στο ROUTES manifest (ADR 0001 pattern από prerender-ssr.ts), αλλιώς δεν μπαίνει σε sitemap.
- Validate: https://validator.schema.org + `npx tsx scripts/check-jsonld.ts` (γράψτε το μόνο αν χρειαστεί — πρώτα manual validate).

### 2.2 llms.txt outline (short file, <100 lines) + llms-full.txt (generated)
```
# RoboD3v Portfolio
> Επιλεγμένα υλοποιημένα έργα: web apps, εκπαιδευτικές πλατφόρμες, backtesting tools.
- [Αρχική](https://portfolio.robod3v.com/)  ← [VERIFY domain]
- [Έργα](https://portfolio.robod3v.com/#projects)
## Έργα
- [P1..P5 1-liners + live URLs]
## Επικοινωνία
- info@robod3v.com · https://robod3v.com/services/...
## Πλήρες context
- [llms-full.txt](.../llms-full.txt)
```
- llms-full.txt: concatenation των 5 project descriptions + FAQ. Generate at build (10-line script), όχι χειροκίνητο.

### 2.3 Sitemap / robots / OG image
- Sitemap: generate at build from ROUTES manifest (copy pattern `prerender-ssr.ts:342`). Μόνο primary routes. Legacy → canonical, όχι sitemap. `hreflang`: EL default· EN entries μόνο όταν υπάρξει EN (όχι νωρίτερα).
- robots.txt minimal (copy matrix headers από main, όχι όλο το αρχείο):
```
User-agent: *
Allow: /
Disallow: /api/ /admin/ /private/ /drafts/
Sitemap: https://portfolio.robod3v.com/sitemap.xml  ← [VERIFY domain]
```
AI crawlers (GPTBot, CCBot κ.λπ.): κληρονομήστε τη στάση του main site — διαβάστε `robod3v_website/public/robots.txt` lines 1–99 πριν αποφασίσετε, μην εφεύρετε πολιτική.
- IndexNow: reuse `scripts/submit-indexnow.ts` στο deploy (key [VERIFY]).
- OG image: 1 αρχείο `og-image.jpg` 1200×630 (το main έχει 512 square — για portfolio φτιάξτε ένα landscape). Απόλυτα URLs σε `og:image`, `og:url` = canonical. Twitter card `summary_large_image`.
- security.txt: `/.well-known/security.txt` → contact info@robod3v.com (copy από main `public/security.txt`).

### 2.4 Noindex rules
- `noindex, nofollow`: share/result pages (lab pattern), 404, `/drafts/*`, preview deploys (`X-Robots-Tag: noindex` header), query-param duplicates (`?utm_*`, `?share=` → canonical, όχι index).
- Everything else indexable. No `nofollow` on outbound project links.

## 3. VERIFICATION GATES (exact commands, Vite+React+TS assumed — same as main site)
Run in `/home/robod3v/Projects/robod3v/robo_portfolio`.

```bash
# G0 setup (once)
npm install
# G1 typecheck
npx tsc --noEmit
# G2 lint (zero warnings on greenfield)
npx eslint src scripts --report-unused-disable-directives --max-warnings 0
# G3 build (must pass + emit sitemap, llms.txt, robots)
npm run build
test -f dist/sitemap.xml && test -f dist/llms.txt && test -f dist/robots.txt && echo G3-ARTIFACTS-OK
# G4 smoke (serve + assert 200 + canonical + JSON-LD present)
(npx serve dist -l 4173 &) && sleep 2 && \
curl -sf http://localhost:4173/ | grep -q 'rel="canonical"' && \
curl -sf http://localhost:4173/ | grep -q 'application/ld+json' && echo G4-SMOKE-OK; \
pkill -f 'serve dist'
# G5 live link-check — fill URLs, all must return 200 (homepage; project subpaths optional 200/404-documented)
for u in "https://FILL-P1" "https://FILL-P2" "https://FILL-P3" "https://FILL-P4" "https://FILL-DOCS-P5"; do curl -sfo /dev/null -w "%{http_code} $u\n" --max-time 15 "$u"; done
# G6 internal links — no dead anchors (run against source)
grep -rho 'href="#[a-z-]*"' src/ | sort -u | while read -r h; do id="${h#href=\"#}"; id="${id%\"}"; grep -rq "id=\"$id\"" src/ || echo "DEAD-ANCHOR: $h"; done; echo G6-DONE
# G7 reduced-motion + a11y static gates
grep -rq 'prefers-reduced-motion' src/ && echo MOTION-OK || echo MOTION-MISSING
grep -rq 'skip' src/ --include='*.tsx' -i | head -2
npx tsc --noEmit && echo G7-STATIC-OK
# G8 perf budget (after first build — record actuals, then enforce)
ls -S dist/assets/*.js | head -5
gzip -c dist/assets/index-*.js | wc -c   # budget: initial JS ≤ 200KB gzip (adjust down after first real build)
# Lighthouse (desktop + mobile), thresholds enforced with --preset + assert via jq
npx lighthouse http://localhost:4173/ --preset=desktop --only-categories=performance,accessibility,best-practices,seo --output=json --output-path=/tmp/lh.json --quiet && python3 -c "import json;d=json.load(open('/tmp/lh.json'));s={k:round(v['score']*100) for k,v in d['categories'].items()};print(s);assert s['performance']>=90 and s['accessibility']>=95 and s['best-practices']>=90 and s['seo']>=95, 'THRESHOLD-FAIL'"
# G9 canvas CPU (manual, once): DevTools Performance → idle < 5% CPU; canvas MUST pause when offscreen (IntersectionObserver) and fully disable on prefers-reduced-motion (static poster instead)
```

### Gate checklist (thresholds)
- [ ] G1 typecheck clean, G2 lint 0 warnings
- [ ] G3 build + sitemap/llms.txt/robots.txt emitted
- [ ] G4 smoke: canonical + JSON-LD on `/`
- [ ] G5 all 5 live URLs → 200 (or documented exception; P5 = docs link, not demo)
- [ ] G6 no dead `#` anchors
- [ ] G7 `prefers-reduced-motion` disables ALL motion incl. canvas (poster fallback); skip-link present; focus visible
- [ ] G8 initial JS ≤200KB gzip; TBT ≤200ms desktop (from Lighthouse JSON)
- [ ] G9 canvas idle <5% CPU, pauses offscreen
- [ ] Mobile: viewport meta, 360px layout no horizontal scroll, floating CTA doesn't cover content, tap targets ≥44px (spot-check, DevTools device toolbar)
- [ ] Schema.org validator pass on `/` (+ project pages if any)
- [ ] robots.txt + sitemap submitted (IndexNow) on first deploy

## Open [VERIFY] items (must clear before publish)
1. Production domain (assumed `portfolio.robod3v.com` — confirm)
2. All 5 live URLs (P5 = docs/repo link, explicitly not a demo)
3. roboschool published track count + lesson count (code: `getPublishedTracks()`)
4. P4 robonews bullets from repo (no invention)
5. E-shop live-payments claim: NO EVIDENCE FOUND — drop or prove with live URL + payment provider
6. Cost/timeline FAQ ranges (marked ενδεικτικό — confirm with owner)
7. IndexNow API key for new domain
