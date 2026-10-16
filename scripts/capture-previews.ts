import { execFileSync } from "node:child_process";
import { mkdirSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { projects } from "../src/content/projects";

// Captures hero screenshots (1280x800) of the 5 live URLs into
// public/previews/<id>-hero.webp via Playwright chromium, plus
// public/previews/previews.json with per-preview refresh dates
// (read by the tile «ανανεώθηκε {date}» label).
// CI-only: run with `npm run capture-previews` (monthly workflow).
// Playwright is a devDependency and never imported by runtime code.
// Playwright screenshots PNG; `magick` (libwebp) converts to WebP.
async function main(): Promise<void> {
  const { chromium } = await import("playwright");
  const today = new Date().toISOString().slice(0, 10);
  mkdirSync("public/previews", { recursive: true });
  const meta: Record<string, unknown> = {
    generated: new Date().toISOString(),
    viewport: "1280x800",
  };
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
        viewport: { width: 1280, height: 800 },
      });
      const out = `public/previews/${p.id}-hero.webp`;
      try {
        await page.goto(p.liveUrl, { waitUntil: "domcontentloaded", timeout: 60000 });
        await page.waitForTimeout(4000);
        const tmp = join(tmpdir(), `preview-${p.id}.png`);
        await page.screenshot({ path: tmp, type: "png" });
        execFileSync("magick", [tmp, "-quality", "82", out]);
        const bytes = statSync(out).size;
        meta[p.id] = {
          updated: today,
          status: "LIVE-CAPTURED",
          source: p.liveUrl,
          bytes,
        };
        console.log(`LIVE-CAPTURED ${p.id} (${bytes} bytes)`);
      } catch (err) {
        meta[p.id] = {
          updated: today,
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
