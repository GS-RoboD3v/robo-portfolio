import { readFileSync, writeFileSync } from "node:fs";
import { createElement } from "react";
import { renderToString } from "react-dom/server";

// Single-route prerender: renders App to string and injects into dist/index.html.
async function main(): Promise<void> {
  const { default: App } = await import("../src/App");
  const html = renderToString(createElement(App));
  const distHtml = "dist/index.html";
  const template = readFileSync(distHtml, "utf8");
  const out = template.replace(
    '<div id="root"></div>',
    `<div id="root">${html}</div>`,
  );
  writeFileSync(distHtml, out);
  console.log(`prerendered ${html.length} chars into ${distHtml}`);
}

void main();
