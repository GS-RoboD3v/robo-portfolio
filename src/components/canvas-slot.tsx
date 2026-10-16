import * as React from "react";

const Canvas = React.lazy(() =>
  Promise.resolve({
    default: function Canvas() {
      const ref = React.useRef<HTMLCanvasElement>(null);
      React.useEffect(() => {
        const canvas = ref.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        let raf = 0;
        let visible = true;
        const io = new IntersectionObserver(([entry]) => {
          visible = entry.isIntersecting;
          if (visible) tick();
          else cancelAnimationFrame(raf);
        });
        io.observe(canvas);
        let t = 0;
        function tick() {
          if (!visible) return;
          t += 0.02;
          ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
          ctx!.fillStyle = "#00D1FF";
          for (let i = 0; i < 40; i++) {
            const x =
              (Math.sin(t + i * 0.7) * 0.5 + 0.5) * canvas!.width;
            const y =
              (Math.cos(t * 0.8 + i * 1.3) * 0.5 + 0.5) * canvas!.height;
            ctx!.fillRect(x, y, 2, 2);
          }
          raf = requestAnimationFrame(tick);
        }
        tick();
        return () => {
          io.disconnect();
          cancelAnimationFrame(raf);
        };
      }, []);
      return <canvas ref={ref} width={640} height={240} className="w-full" aria-hidden="true" />;
    },
  }),
);

export function CanvasSlot() {
  const [show, setShow] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  const staticMode =
    typeof window === "undefined" ||
    !window.matchMedia ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    window.matchMedia("(max-width: 767px)").matches;

  React.useEffect(() => {
    const el = ref.current;
    if (!el || staticMode) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [staticMode]);

  return (
    <div ref={ref}>
      {show && !staticMode ? (
        <React.Suspense fallback={null}>
          <Canvas />
        </React.Suspense>
      ) : (
        <div
          role="img"
          aria-label="Διακοσμητικό φόντο"
          className="h-[240px] w-full rounded-2xl border border-border bg-card"
        />
      )}
    </div>
  );
}
