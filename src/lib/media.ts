import * as React from "react";

export function useMediaQuery(query: string, fallback = false): boolean {
  const [matches, setMatches] = React.useState<boolean>(() =>
    typeof window === "undefined" || typeof window.matchMedia !== "function"
      ? fallback
      : window.matchMedia(query).matches,
  );
  React.useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function")
      return;
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}
