const items = [
  "React 19",
  "Next.js 16",
  "Medusa v2",
  "Supabase",
  "Stripe",
  "Tailwind v4",
  "Vite 8",
  "TypeScript",
];

// Static wrap on mobile / reduced-motion; scrolls on desktop, pauses on hover.
export function TechMarquee() {
  return (
    <div className="tech-marquee mt-8" aria-label="Τεχνολογίες">
      <div className="tech-marquee-track text-sm text-muted-foreground">
        {[...items, ...items].map((t, i) => (
          <span key={i} aria-hidden={i >= items.length || undefined}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
