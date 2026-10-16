import { readFileSync, writeFileSync } from "node:fs";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import App from "../src/App";

// Single-route prerender: renders App to string and injects into dist/index.html.
async function main(): Promise<void> {
  const html = renderToString(createElement(App));
  if (html.length === 0) throw new Error("prerender: rendered html is empty");
  const distHtml = "dist/index.html";
  const template = readFileSync(distHtml, "utf8");
  const marker = '<div id="root"></div>';
  if (!template.includes(marker))
    throw new Error(`prerender: ${marker} missing in ${distHtml}`);
  const out = template.replace(marker, `<div id="root">${html}</div>`);
  if (out === template) throw new Error("prerender: injection no-op");
  if (!out.includes("application/ld+json"))
    throw new Error("prerender: JSON-LD missing from output");
  writeFileSync(distHtml, out);
  console.log(`prerendered ${html.length} chars into ${distHtml}`);
}

void main();
