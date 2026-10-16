import * as React from "react";
import { ExternalLink, Copy, Check } from "lucide-react";
import type { CaseData, Project } from "../content/projects";
import { site } from "../content/site";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "./ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "./ui/sheet";

function useIsDesktop(): boolean {
  const [desktop, setDesktop] = React.useState<boolean>(() =>
    typeof window === "undefined" || typeof window.matchMedia !== "function"
      ? true
      : window.matchMedia("(min-width: 768px)").matches,
  );
  React.useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function")
      return;
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => setDesktop(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return desktop;
}

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      ta.remove();
      return ok;
    } catch {
      return false;
    }
  }
}

export function CaseBody({ project }: { project: Project }) {
  const [copied, setCopied] = React.useState(false);
  const c: CaseData = project.caseData ?? {
    problem: project.oneLiner,
    build: [],
    proof: [],
    arch: [],
    timeline: [],
  };

  async function onCopy() {
    const ok = await copyText(
      `**${project.title}** · ${project.stack.join(" · ")} · ${project.liveUrl} · ${site.email}`,
    );
    if (ok) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <div className="grid gap-5">
      <img
        src={project.screenshot}
        alt={`Στιγμιότυπο ${project.title}`}
        loading="lazy"
        width={1280}
        height={800}
        className="aspect-[16/10] w-full rounded-xl object-cover"
      />
      <section aria-labelledby={`case-problem-${project.id}`}>
        <h3 id={`case-problem-${project.id}`} className="font-semibold">
          Πρόβλημα
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">{c.problem}</p>
      </section>
      <section aria-labelledby={`case-build-${project.id}`}>
        <h3 id={`case-build-${project.id}`} className="font-semibold">
          Τι χτίστηκε
        </h3>
        <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          {c.build.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </section>
      <section aria-labelledby={`case-proof-${project.id}`}>
        <h3 id={`case-proof-${project.id}`} className="font-semibold">
          Ζωντανή απόδειξη
        </h3>
        <ul className="mt-1 space-y-1 text-sm">
          {c.proof.map((p) => (
            <li key={p.label}>
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-1 font-medium text-primary"
              >
                {p.label} <ExternalLink size={14} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </section>
      <section aria-labelledby={`case-arch-${project.id}`}>
        <h3 id={`case-arch-${project.id}`} className="font-semibold">
          Αρχιτεκτονική
        </h3>
        <ul className="mt-1 flex flex-wrap gap-1.5 text-xs">
          {c.arch.map((a) => (
            <li
              key={a}
              className="rounded-md border border-border px-2 py-1 font-mono text-muted-foreground"
            >
              {a}
            </li>
          ))}
        </ul>
      </section>
      <section aria-labelledby={`case-timeline-${project.id}`}>
        <h3 id={`case-timeline-${project.id}`} className="font-semibold">
          Χρονολόγιο
        </h3>
        <ol className="mt-1 space-y-1 text-sm text-muted-foreground">
          {c.timeline.map((s) => (
            <li key={s.t}>
              <strong className="text-foreground">{s.t}</strong> — {s.what}
            </li>
          ))}
        </ol>
      </section>
      <div className="flex flex-wrap gap-2">
        <a
          href={`mailto:${site.email}?subject=${encodeURIComponent(`Case: ${project.id}`)}`}
        >
          <Button>Επικοινωνία</Button>
        </a>
        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
          <Button variant="secondary">
            Live ↗ <ExternalLink size={14} aria-hidden="true" />
          </Button>
        </a>
        <Button variant="ghost" onClick={onCopy}>
          {copied ? (
            <>
              <Check size={14} aria-hidden="true" /> Αντιγράφηκε
            </>
          ) : (
            <>
              <Copy size={14} aria-hidden="true" /> Αντιγραφή stack
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

export function ProjectDialog({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const desktop = useIsDesktop();
  const open = project !== null;

  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open ]);

  const handleChange = (next: boolean) => {
    if (!next) onClose();
  };

  if (desktop) {
    return (
      <Dialog open={open} onOpenChange={handleChange}>
        {project && (
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogTitle>{project.title}</DialogTitle>
            <DialogDescription>{project.oneLiner}</DialogDescription>
            <CaseBody key={project.id} project={project} />
          </DialogContent>
        )}
      </Dialog>
    );
  }

  return (
    <Sheet open={open} onOpenChange={handleChange}>
      {project && (
        <SheetContent
          side="bottom"
          className="max-h-[90vh] overflow-y-auto rounded-t-2xl"
        >
          <SheetTitle>{project.title}</SheetTitle>
          <SheetDescription>{project.oneLiner}</SheetDescription>
          <CaseBody key={project.id} project={project} />
        </SheetContent>
      )}
    </Sheet>
  );
}
