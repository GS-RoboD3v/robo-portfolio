import { describe, expect, it } from "vitest";
import { filterProjects, projects } from "./projects";

describe("filterProjects", () => {
  it("returns all on All", () => {
    expect(filterProjects(projects, "All")).toHaveLength(5);
  });

  it("filters by axis", () => {
    expect(filterProjects(projects, "Money").map((p) => p.id)).toEqual([
      "terragousto",
    ]);
    expect(filterProjects(projects, "Viral").map((p) => p.id)).toEqual([
      "political-compass",
    ]);
  });
});
