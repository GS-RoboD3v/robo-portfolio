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
import { Button } from "./components/ui/button";

const faqs: { q: string; a: React.ReactNode }[] = [
  {
    q: "Τι υπηρεσίες προσφέρετε;",
    a: (
      <>
        Web εφαρμογές και e-shops. Για αυτοματισμούς και AI coworkers δείτε το{" "}
        <a
          className="text-primary underline"
          href="https://robod3v.com/services/automations"
        >
          robod3v.com/services/automations
        </a>{" "}
        και{" "}
        <a
          className="text-primary underline"
          href="https://robod3v.com/ai-agents"
        >
          /ai-agents
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
const CASE_IDS = new Set(["terragousto", "lab"]);

function setCaseHead(id: string | null): void {
  const href =
    id !== null && CASE_IDS.has(id) ? `${CASE_SITE}?case=${id}` : CASE_SITE;
  document
    .querySelector('link[rel="canonical"]')
    ?.setAttribute("href", href);
  document
    .querySelector('meta[property="og:url"]')
    ?.setAttribute("content", href);
}

export default function App() {
  const [active, setActive] = React.useState<Project | null>(null);

  React.useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("case");
    const found = projects.find(
      (p) => p.id === id && p.dialog && CASE_IDS.has(p.id),
    );
    if (found) {
      setActive(found);
      setCaseHead(found.id);
    } else {
      setCaseHead(null);
    }
  }, []);

  function openCase(p: Project) {
    setActive(p);
    const url = new URL(window.location.href);
    url.searchParams.set("case", p.id);
    window.history.pushState({}, "", url);
    setCaseHead(p.id);
  }

  function closeCase() {
    setActive(null);
    const url = new URL(window.location.href);
    url.searchParams.delete("case");
    window.history.pushState({}, "", url);
    setCaseHead(null);
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
            <a href={`mailto:${site.email}`}>
              <Button>Επικοινωνία — {site.email}</Button>
            </a>
            <a href="#projects">
              <Button variant="secondary">Δείτε τα έργα</Button>
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

        <ScrollReveal>
          <section id="proof" className="py-16 md:py-24" aria-label="Αποδείξεις">
            <ProofStrip />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="projects" className="py-16 md:py-24" aria-labelledby="projects-h">
            <h2 id="projects-h" className="mb-6 text-2xl font-bold">
              Έργα
            </h2>
            <ProjectGrid onOpen={openCase} />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="cases" className="py-16 md:py-24" aria-labelledby="cases-h">
            <h2 id="cases-h" className="mb-6 text-2xl font-bold">
              Αναλυτικές περιπτώσεις
            </h2>
            <div className="grid gap-4 md:grid-cols-2 md:gap-6">
              {projects
                .filter((p) => p.dialog)
                .map((p) => (
                  <article
                    key={p.id}
                    className="rounded-2xl border border-border bg-card p-4 md:p-6"
                  >
                    <h3 className="text-lg font-semibold">{p.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{p.metrics}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Stack: {p.stack.join(" · ")}
                    </p>
                    <div className="mt-4 flex flex-wrap items-center gap-4">
                      <button
                        onClick={() => openCase(p)}
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
                  </article>
                ))}
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="platform" className="py-16 md:py-24" aria-labelledby="platform-h">
            <h2 id="platform-h" className="mb-6 text-2xl font-bold">
              Πλατφόρμα + Viral
            </h2>
            <div className="grid gap-4 md:grid-cols-2 md:gap-6">
              {projects
                .filter((p) => !p.dialog)
                .filter((p) => p.axis === "Platform" || p.axis === "Viral")
                .map((p) => (
                  <article
                    key={p.id}
                    className="rounded-2xl border border-border bg-card p-4 md:p-6"
                  >
                    <h3 className="text-lg font-semibold">{p.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{p.oneLiner}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {p.metrics} · {p.stack.join(" · ")}
                    </p>
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex min-h-[44px] items-center text-sm font-medium text-primary"
                    >
                      Άνοιγμα live ↗
                    </a>
                  </article>
                ))}
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="process" className="py-16 md:py-24" aria-labelledby="process-h">
            <h2 id="process-h" className="mb-6 text-2xl font-bold">
              Διαδικασία
            </h2>
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
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="faq" className="py-16 md:py-24" aria-labelledby="faq-h">
            <h2 id="faq-h" className="mb-6 text-2xl font-bold">
              Συχνές ερωτήσεις
            </h2>
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
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="contact" className="py-16 md:py-24" aria-labelledby="contact-h">
            <h2 id="contact-h" className="text-2xl font-bold">{site.contactTitle}</h2>
            <p className="mt-2 text-muted-foreground">{site.contactSub}</p>
            <a
              href={`mailto:${site.email}`}
              className="mt-6 inline-flex min-h-[44px] items-center rounded-md bg-primary px-6 font-medium text-primary-foreground"
            >
              {site.email}
            </a>
            <p className="mt-8 text-sm text-muted-foreground">
              Αυτοματισμοί ή AI coworkers; →{" "}
              <a
                className="text-primary underline"
                href="https://robod3v.com/services/automations"
              >
                robod3v.com/services/automations
              </a>{" "}
              ·{" "}
              <a className="text-primary underline" href="https://robod3v.com/ai-agents">
                /ai-agents
              </a>
            </p>
          </section>
        </ScrollReveal>
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
