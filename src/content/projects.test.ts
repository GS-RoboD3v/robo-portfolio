import { describe, expect, it } from "vitest";
import { projects } from "./projects";

describe("projects shape", () => {
  it("has entries with live URLs", () => {
    expect(projects.length).toBeGreaterThan(0);
    for (const p of projects) {
      expect(p.liveUrl).toMatch(/^https:\/\//);
    }
  });

  it("has the 5 expected ids", () => {
    expect(projects.map((p) => p.id).sort()).toEqual(
      ["lab", "plaisiore", "political-compass", "roboschool", "terragousto"].sort(),
    );
  });
});
