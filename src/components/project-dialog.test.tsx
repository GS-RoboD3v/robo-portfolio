import { afterEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import App from "../App";

function stubMatchMedia(matches: boolean) {
  window.matchMedia = vi.fn().mockImplementation(
    () =>
      ({
        matches,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }) as unknown as MediaQueryList,
  );
}

describe("case dialog (?case= deep-link)", () => {
  afterEach(() => {
    window.history.pushState({}, "", "/");
    vi.restoreAllMocks();
  });

  it("opens terragousto via ?case=, shows Problem + Live href, closes on ESC", async () => {
    stubMatchMedia(true);
    window.history.pushState({}, "", "/?case=terragousto");
    render(<App />);

    const dialog = await screen.findByRole("dialog");
    expect(
      within(dialog).getByRole("heading", { name: "Πρόβλημα" }),
    ).toBeInTheDocument();
    expect(
      within(dialog).getByRole("link", { name: /live/i }),
    ).toHaveAttribute("href", "https://terragousto.gr");

    fireEvent.keyDown(dialog, { key: "Escape", code: "Escape", keyCode: 27 });
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
  });
});
