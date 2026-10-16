import * as React from "react";
import { ChevronDown } from "lucide-react";
import { site } from "./content/site";
import { projects, type Project } from "./content/projects";
import { itemListJsonLd, personJsonLd } from "./lib/jsonld";
import { HeroStatusBar } from "./components/hero-status-bar";
import { ProofStrip } from "./components/proof-strip";
import { ProjectGrid } from "./components/project-grid";
import { ProjectDialog } from "./components/project-dialog";
import { CanvasSlot } from "./components/canvas-slot";
import { ScrollReveal } from "./components/scroll-reveal";
import { TechMarquee } from "./components/tech-marquee";
import { buttonVariants } from "./components/ui/button";

const faqs: { q: string; a: React.ReactNode }[] = [
  {
    q: "Τι υπηρεσίες προσφέρετε;",
    a: (
      <>
        Web εφαρμογές και e-shops. Για αυτοματισμούς και AI coworkers δείτε το{" "}
        <a className="text-primary underline" href={site.services.automations}>
          {site.services.automationsLabel}
        </a>{" "}
        και{" "}
        <a className="text-primary underline" href={site.services.aiAgents}>
          {site.services.aiAgentsLabel}
        </a>
        .
      </>
    ),
  },
  {
    q: "Πόσο κοστίζει ένα έργο;",
    a: "Στείλτε email με 3 γραμμές περιγραφή και θα λάβετε εκτίμηση εντός 48 ωρών.",
  },
  {
    q: "Πόσο διαρκεί;",
    a: "Ενδεικτικά: landing 1–3 εβδομάδες, web apps 4–12 εβδομάδες.",
  },
  {
    q: "Πού φιλοξενούνται τα δεδομένα;",
    a: "ΕΕ/GDPR compliant φιλοξενία, με δυνατότητα on-prem κατόπιν συνεννόησης.",
  },
  {
    q: "Υπογράφετε NDA;",
    a: "Ναι — και σε ευαίσθητα έργα παρουσιάζουμε εύρη αντί ονομάτων.",
  },
  {
    q: "Πώς ξεκινάμε;",
    a: (
      <>
        Ένα email στο{" "}
        <a
          className="text-primary underline"
          href={`mailto:${site.email}`}
        >
          {site.email}
        </a>{" "}
        με 3 γραμμές για το τι θέλετε να χτίσουμε.
      </>
    ),
  },
];

const CASE_SITE = "https://portfolio.robod3v.com/";
const CASE_IDS: Record<string, true> = Object.fromEntries(
  projects.filter((p) => p.dialog).map((p) => [p.id, true as const]),
);

function setCaseHead(id: string | null): void {
  const href =
    id !== null && CASE_IDS[id] ? `${CASE_SITE}?case=${id}` : CASE_SITE;
  document
    .querySelector('link[rel="canonical"]')
    ?.setAttribute("href", href);
  document
    .querySelector('meta[property="og:url"]')
    ?.setAttribute("content", href);
}

function syncCaseInUrl(id: string | null): void {
  const url = new URL(window.location.href);
  if (id === null) {
    url.searchParams.delete("case");
  } else {
    url.searchParams.set("case", id);
  }
  window.history.pushState({}, "", url);
  setCaseHead(id);
}

function Section({
  id,
  title,
  label,
  headingClassName = "mb-6 text-2xl font-bold",
  children,
}: {
  id: string;
  title?: React.ReactNode;
  label?: string;
  headingClassName?: string;
  children: React.ReactNode;
}) {
  const headingId = `${id}-h`;
  return (
    <ScrollReveal>
      <section
        id={id}
        className="py-16 md:py-24"
        aria-labelledby={title ? headingId : undefined}
        aria-label={title ? undefined : label}
      >
        {title ? (
          <h2 id={headingId} className={headingClassName}>
            {title}
          </h2>
        ) : null}
        {children}
      </section>
    </ScrollReveal>
  );
}

function ProjectArticleCard({
  project: p,
  variant,
  onOpen,
}: {
  project: Project;
  variant: "case" | "live";
  onOpen?: (p: Project) => void;
}) {
  const summary = variant === "case" ? p.metrics : p.oneLiner;
  const meta =
    variant === "case"
      ? `Stack: ${p.stack.join(" · ")}`
      : `${p.metrics} · ${p.stack.join(" · ")}`;
  return (
    <article className="rounded-2xl border border-border bg-card p-4 md:p-6">
      <h3 className="text-lg font-semibold">{p.title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{summary}</p>
      <p className="mt-1 text-xs text-muted-foreground">{meta}</p>
      {variant === "case" ? (
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <button
            onClick={() => onOpen?.(p)}
            className="inline-flex min-h-[44px] items-center text-sm font-medium text-primary"
          >
            Άνοιγμα ανάλυσης →
          </button>
          <a
            href={p.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center px-3 text-sm font-medium text-primary"
          >
            Live ↗
          </a>
        </div>
      ) : (
        <a
          href={p.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex min-h-[44px] items-center text-sm font-medium text-primary"
        >
          Άνοιγμα live ↗
        </a>
      )}
    </article>
  );
}


export default function App() {
  const [active, setActive] = React.useState<Project | null>(null);

  React.useEffect(() => {
    function onPopState(): void {
      const id = new URLSearchParams(window.location.search).get("case");
      const found =
        projects.find((p) => p.id === id && CASE_IDS[p.id]) ?? null;
      setActive(found);
      setCaseHead(found?.id ?? null);
    }
    onPopState();
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  function openCase(p: Project) {
    setActive(p);
    syncCaseInUrl(p.id);
  }

  function closeCase() {
    setActive(null);
    syncCaseInUrl(null);
  }

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-primary focus:px-4 focus:py-2"
      >
        Παράλειψη στο περιεχόμενο
      </a>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([personJsonLd(), itemListJsonLd()]),
        }}
      />
      <main id="main" className="mx-auto max-w-6xl px-4">
        <section id="hero" className="py-16 md:py-24" aria-labelledby="h1">
          <h1 id="h1" className="text-3xl font-bold md:text-5xl">
            {site.heroTitle}
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">{site.heroSub}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            <a
              href={`mailto:${site.email}`}
              className={buttonVariants({ variant: "default" })}
            >
              Επικοινωνία — {site.email}
            </a>
            <a
              href="#projects"
              className={buttonVariants({ variant: "secondary" })}
            >
              Δείτε τα έργα
            </a>
          </div>
          <div className="mt-6">
            <HeroStatusBar />
          </div>
          <TechMarquee />
          <div className="mt-8">
            <CanvasSlot />
          </div>
        </section>

        <Section id="proof" label="Αποδείξεις">
          <ProofStrip />
        </Section>

        <Section id="projects" title="Έργα">
          <ProjectGrid onOpen={openCase} />
        </Section>

        <Section id="cases" title="Αναλυτικές περιπτώσεις">
          <div className="grid gap-4 md:grid-cols-2 md:gap-6">
            {projects
              .filter((p) => p.dialog)
              .map((p) => (
                <ProjectArticleCard key={p.id} project={p} variant="case" onOpen={openCase} />
              ))}
          </div>
        </Section>

        <Section id="platform" title="Πλατφόρμα + Viral">
          <div className="grid gap-4 md:grid-cols-2 md:gap-6">
            {projects
              .filter((p) => !p.dialog)
              .filter((p) => p.axis === "Platform" || p.axis === "Viral")
              .map((p) => (
                <ProjectArticleCard key={p.id} project={p} variant="live" />
              ))}
          </div>
        </Section>

        <Section id="process" title="Διαδικασία">
          <ol className="grid gap-4 md:grid-cols-3 md:gap-6">
            {[
              "30' διερεύνηση — καταλαβαίνουμε τι χρειάζεστε",
              "Πιλότος 7–14 ημερών — βλέπετε αξία γρήγορα",
              "Ένταξη + υποστήριξη — παράδοση και συνέχεια",
            ].map((step, i) => (
              <li
                key={step}
                className="rounded-2xl border border-border bg-card p-4 md:p-6"
              >
                <span className="text-sm text-muted-foreground">Βήμα {i + 1}</span>
                <p className="mt-1 font-medium">{step}</p>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="faq" title="Συχνές ερωτήσεις">
          <div className="grid gap-2">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-xl border border-border bg-card px-4 py-3"
              >
                <summary className="flex min-h-[44px] cursor-pointer list-none items-center gap-2 font-medium marker:hidden [&::-webkit-details-marker]:hidden">
                  <ChevronDown
                    size={16}
                    aria-hidden="true"
                    className="shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
                  />
                  {f.q}
                </summary>
                <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </Section>

        <Section id="contact" title={site.contactTitle} headingClassName="text-2xl font-bold">
          <p className="mt-2 text-muted-foreground">{site.contactSub}</p>
          <a
            href={`mailto:${site.email}`}
            className="mt-6 inline-flex min-h-[44px] items-center rounded-md bg-primary px-6 font-medium text-primary-foreground"
          >
            {site.email}
          </a>
          <p className="mt-8 text-sm text-muted-foreground">
            Αυτοματισμοί ή AI coworkers; →{" "}
            <a className="text-primary underline" href={site.services.automations}>
              {site.services.automationsLabel}
            </a>{" "}
            ·{" "}
            <a className="text-primary underline" href={site.services.aiAgents}>
              {site.services.aiAgentsLabel}
            </a>
          </p>
        </Section>
      </main>

      <footer className="border-t border-border py-8 pb-20 md:pb-8" aria-label="Υποσέλιδο">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 text-sm text-muted-foreground">
          <span>© RoboD3v — {new Date().getFullYear()} · Χωρίς cookies</span>
          <span className="flex flex-wrap gap-4">
            <a className="underline" href="https://robod3v.com">
              robod3v.com
            </a>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </span>
        </div>
      </footer>

      {!active && (
        <a
          href={`mailto:${site.email}`}
          aria-label={`Επικοινωνία — ${site.email}`}
          className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 inline-flex min-h-[44px] items-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground shadow-lg md:hidden"
        >
          Επικοινωνία
        </a>
      )}

      <ProjectDialog project={active} onClose={closeCase} />
    </>
  );
}
