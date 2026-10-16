import { writeFileSync } from "node:fs";
import { projects } from "../src/content/projects";
import { site } from "../src/content/site";

// Builds public/llms-full.txt from the same data the page renders —
// counts stay in sync by construction. Roboschool track/lesson counts
// are manual-sync: verify quarterly via getPublishedTracks().
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
  "Automations/AI agents: https://robod3v.com/services/automations, https://robod3v.com/services/ai-agents",
];
writeFileSync("public/llms-full.txt", lines.join("\n"));
console.log(`llms-full.txt: ${projects.length} projects`);
