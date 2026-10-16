import { site } from "../content/site";

export function ProofStrip() {
  return (
    <ul
      aria-label="Αποδείξεις έργου"
      className="grid grid-cols-2 gap-2 md:grid-cols-3"
    >
      {site.proofStrip.map((item) => (
        <li
          key={item}
          className="rounded-xl border border-border bg-card px-3 py-2 text-sm text-muted-foreground"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
