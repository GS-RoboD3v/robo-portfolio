// 8px #00FF41 dot; ping runs once, desktop + hover-capable + motion-OK only (see index.css).
export function LiveDot() {
  return (
    <span aria-hidden="true" className="relative mr-1.5 inline-flex h-2 w-2">
      <span className="live-ping absolute inline-flex h-full w-full rounded-full bg-live" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-live" />
    </span>
  );
}
