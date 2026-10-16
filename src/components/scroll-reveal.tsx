import * as React from "react";

const LazyMotionDiv = React.lazy(() =>
  import("./scroll-reveal-motion").then((m) => ({
    default: m.ScrollRevealMotion,
  })),
);

function reducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    !!window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

// Static div until framer-motion loads (async chunk) — content never gated on JS anim.
export function ScrollReveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  if (reducedMotion()) return <div className={className}>{children}</div>;
  return (
    <React.Suspense fallback={<div className={className}>{children}</div>}>
      <LazyMotionDiv className={className}>{children}</LazyMotionDiv>
    </React.Suspense>
  );
}
