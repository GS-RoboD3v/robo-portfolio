import { writeFileSync } from "node:fs";
import { projects } from "../src/content/projects";
import { site } from "../src/content/site";

// Builds public/llms-full.txt from the same data the page renders —
// project rows stay in sync by construction. Only proofStrip/llms.txt
// service blurbs are manual-sync: verify quarterly.
const lines = [
  "# RoboD3v Portfolio (full context)",
  `> ${site.heroSub}`,
  "",
  "## Projects",
  ...projects.flatMap((p) => [
    `### ${p.title} [${p.axis}]`,
    p.oneLiner,
    `Live: ${p.liveUrl}`,
    `Stack: ${p.stack.join(", ")}`,
    "",
  ]),
  "## Contact",
  `Email: ${site.email}`,
  `Automations/AI agents: ${site.services.automations}, ${site.services.aiAgents}`,
];
writeFileSync("public/llms-full.txt", `${lines.join("\n")}\n`);
console.log(`llms-full.txt: ${projects.length} projects`);
