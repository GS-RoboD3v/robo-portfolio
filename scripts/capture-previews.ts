import { mkdirSync } from "node:fs";
import { projects } from "../src/content/projects";

// Captures hero screenshots (1280x800) of the 5 live URLs into
// public/previews/<id>-hero.webp via Playwright chromium.
// CI-only: run with `npm run capture-previews` (monthly workflow).
// Playwright is a devDependency and never imported by runtime code.
async function main(): Promise<void> {
  const { chromium } = await import("playwright");
  mkdirSync("public/previews", { recursive: true });
  const browser = await chromium.launch();
  try {
    for (const p of projects) {
      const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
      try {
        await page.goto(p.liveUrl, { waitUntil: "networkidle", timeout: 60000 });
        await page.waitForTimeout(2000);
        await page.screenshot({ path: `public/previews/${p.id}-hero.webp` });
        console.log(`captured ${p.id}`);
      } catch (err) {
        console.error(`FAILED ${p.id}: ${String(err)}`);
      } finally {
        await page.close();
      }
    }
  } finally {
    await browser.close();
  }
}

void main();
