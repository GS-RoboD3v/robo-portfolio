import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { ProjectGrid } from "./project-grid";

describe("ProjectGrid Tabs filter", () => {
  it("switches visible tiles when changing tabs", () => {
    render(<ProjectGrid onOpen={vi.fn()} />);
    expect(screen.getByText("terragousto")).toBeInTheDocument();
    expect(screen.getByText("lab")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("tab", { name: "Money" }));
    expect(screen.getByText("terragousto")).toBeInTheDocument();
    expect(screen.queryByText("lab")).not.toBeInTheDocument();
    expect(screen.queryByText("plaisiore")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("tab", { name: "Όλα" }));
    expect(screen.getByText("lab")).toBeInTheDocument();
    expect(screen.getByText("roboschool")).toBeInTheDocument();
  });
});
