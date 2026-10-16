import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import App from "./App";
import { stubMatchMedia } from "./test-setup";

describe("App audit fixes", () => {
  afterEach(() => {
    cleanup();
    window.history.pushState({}, "", "/");
    vi.restoreAllMocks();
  });

  it("links FAQ urls and email instead of plain text", () => {
    stubMatchMedia(true);
    render(<App />);
    const faq = within(document.getElementById("faq")!);
    expect(
      faq.getByRole("link", { name: "robod3v.com/services/automations" }),
    ).toHaveAttribute(
      "href",
      "https://robod3v.com/services/automations",
    );
    expect(
      faq.getByRole("link", { name: "robod3v.com/services/ai-agents" }),
    ).toHaveAttribute("href", "https://robod3v.com/services/ai-agents");
    expect(
      faq.getByRole("link", { name: "info@robod3v.com" }),
    ).toHaveAttribute("href", "mailto:info@robod3v.com");
  });

  it("hides the floating CTA while a case dialog is open", async () => {
    stubMatchMedia(true);
    window.history.pushState({}, "", "/?case=terragousto");
    render(<App />);

    const dialog = await screen.findByRole("dialog");
    expect(
      screen.queryByLabelText(`Επικοινωνία — info@robod3v.com`),
    ).not.toBeInTheDocument();

    fireEvent.keyDown(dialog, { key: "Escape", code: "Escape", keyCode: 27 });
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
    expect(
      screen.getByLabelText(`Επικοινωνία — info@robod3v.com`),
    ).toBeInTheDocument();
  });
});
