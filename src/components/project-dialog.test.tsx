import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectDialog } from "./project-dialog";
import { projects } from "../content/projects";

describe("ProjectDialog", () => {
  it("opens with project title", () => {
    const project = projects.find((p) => p.dialog);
    if (!project) throw new Error("no dialog project");
    render(<ProjectDialog project={project} onClose={vi.fn()} />);
    expect(screen.getByText(project.title)).toBeInTheDocument();
  });
});
