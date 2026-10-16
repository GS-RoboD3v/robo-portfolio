import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

export function stubMatchMedia(matches: boolean): void {
  window.matchMedia = vi.fn().mockImplementation(
    () =>
      ({
        matches,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }) as unknown as MediaQueryList,
  );
}
