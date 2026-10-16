import * as React from "react";
import { useMediaQuery } from "../lib/media";

const LazyMotionDiv = React.lazy(() =>
  import("./scroll-reveal-motion").then((m) => ({
    default: m.ScrollRevealMotion,
  })),
);

// Static div until framer-motion loads (async chunk) — content never gated on JS anim.
export function ScrollReveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)", false);
  if (reduceMotion) return <div className={className}>{children}</div>;
  return (
    <React.Suspense fallback={<div className={className}>{children}</div>}>
      <LazyMotionDiv className={className}>{children}</LazyMotionDiv>
    </React.Suspense>
  );
}
