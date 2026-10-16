import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, statSync, unlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { projects } from "../src/content/projects";

const VIEWPORT_W = 1280;
const VIEWPORT_H = 800;
const NAV_TIMEOUT_MS = 60000;
const SETTLE_MS = 4000;
const WEBP_QUALITY = "82";
const STATUS_LIVE = "LIVE-CAPTURED";

// Captures hero screenshots (1280x800) of the 5 live URLs into
// public/previews/<id>-hero.webp via Playwright chromium, plus
// public/previews/previews.json with per-preview refresh dates
// (read by the tile «ανανεώθηκε {date}» label).
// CI-only: run with `npm run capture-previews` (monthly workflow).
// Playwright is a devDependency and never imported by runtime code.
// Playwright screenshots PNG; `magick` (libwebp) converts to WebP.
async function main(): Promise<void> {
  // Dynamic import: playwright is dev-only and may be absent (fallback to
  // /usr/bin/chromium below), so a static import cannot work here.
  const { chromium } = await import("playwright");
  const today = new Date().toISOString().slice(0, 10);
  mkdirSync("public/previews", { recursive: true });
  const meta: Record<string, unknown> = {
    generated: new Date().toISOString(),
    viewport: `${VIEWPORT_W}x${VIEWPORT_H}`,
  };
  let prevMeta: Record<string, unknown> = {};
  try {
    prevMeta = JSON.parse(
      readFileSync("public/previews/previews.json", "utf8"),
    ) as Record<string, unknown>;
  } catch {
    // first run: no prior file
  }
  let browser;
  try {
    browser = await chromium.launch({
      args: ["--no-sandbox", "--disable-dev-shm-usage"],
    });
  } catch {
    browser = await chromium.launch({
      executablePath: "/usr/bin/chromium",
      args: ["--no-sandbox", "--disable-dev-shm-usage"],
    });
  }
  try {
    for (const p of projects) {
      const page = await browser.newPage({
        viewport: { width: VIEWPORT_W, height: VIEWPORT_H },
      });
      const out = `public/previews/${p.id}-hero.webp`;
      try {
        await page.goto(p.liveUrl, { waitUntil: "domcontentloaded", timeout: NAV_TIMEOUT_MS });
        await page.waitForTimeout(SETTLE_MS);
        const tmp = join(tmpdir(), `preview-${p.id}.png`);
        await page.screenshot({ path: tmp, type: "png" });
        execFileSync("magick", [tmp, "-quality", WEBP_QUALITY, out]);
        try {
          unlinkSync(tmp);
        } catch {
          // best-effort tmp cleanup
        }
        const bytes = statSync(out).size;
        meta[p.id] = {
          updated: today,
          status: STATUS_LIVE,
          source: p.liveUrl,
          bytes,
        };
        console.log(`${STATUS_LIVE} ${p.id} (${bytes} bytes)`);
      } catch (err) {
        try {
          unlinkSync(join(tmpdir(), `preview-${p.id}.png`));
        } catch {
          // best-effort tmp cleanup
        }
        const prev = prevMeta[p.id] as { updated?: unknown } | undefined;
        meta[p.id] = {
          updated: typeof prev?.updated === "string" ? prev.updated : today,
          status: `SKIPPED: ${String(err).slice(0, 160)}`,
          source: p.liveUrl,
        };
        console.error(`SKIPPED ${p.id}: ${String(err).slice(0, 300)}`);
      } finally {
        await page.close();
      }
    }
  } finally {
    await browser.close();
  }
  writeFileSync("public/previews/previews.json", `${JSON.stringify(meta, null, 2)}\n`);
  console.log("wrote public/previews/previews.json");
}

void main();
