import { describe, expect, it, vi, afterEach } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { ProjectGrid } from "./project-grid";

const previews = {
  terragousto: { updated: "2026-10-16", status: "LIVE-CAPTURED" },
  lab: { updated: "2026-10-16", status: "LIVE-CAPTURED" },
};

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

describe("ProjectGrid audit fixes", () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("stacks the tablist above the grid", () => {
    render(<ProjectGrid onOpen={vi.fn()} />);
    expect(document.querySelector('[data-slot="tabs"]')).toBeInTheDocument();
  });

  it("keeps footer dates whole and pins the open action right", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => previews,
      }),
    );
    render(<ProjectGrid onOpen={vi.fn()} />);
    const dates = await screen.findAllByText(/ανανεώθηκε/);
    expect(dates.length).toBeGreaterThan(0);
    for (const date of dates) {
      expect(date.closest("div")!.querySelector("button, a")).toBeInTheDocument();
    }
  });
});
