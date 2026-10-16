import * as React from "react";
import { useMediaQuery } from "../lib/media";
import { ExternalLink, Copy, Check } from "lucide-react";
import type { CaseProject, Project } from "../content/projects";
import { site } from "../content/site";
import { Button, buttonVariants } from "./ui/button";
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

export function CaseBody({ project }: { project: CaseProject }) {
  const [copied, setCopied] = React.useState(false);
  const c = project.caseData;

  async function onCopy() {
    const ok = await copyText(
      `**${project.title}** · ${project.stack.join(" · ")} · ${project.liveUrl} · ${site.email}`,
    );
    if (ok) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    }
  }

  const sections: { id: string; title: string; body: React.ReactNode }[] = [
    {
      id: `case-problem-${project.id}`,
      title: "Πρόβλημα",
      body: <p className="mt-1 text-sm text-muted-foreground">{c.problem}</p>,
    },
    {
      id: `case-build-${project.id}`,
      title: "Τι χτίστηκε",
      body: (
        <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          {c.build.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      ),
    },
    {
      id: `case-proof-${project.id}`,
      title: "Ζωντανή απόδειξη",
      body: (
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
      ),
    },
    {
      id: `case-arch-${project.id}`,
      title: "Αρχιτεκτονική",
      body: (
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
      ),
    },
    {
      id: `case-timeline-${project.id}`,
      title: "Χρονολόγιο",
      body: (
        <ol className="mt-1 space-y-1 text-sm text-muted-foreground">
          {c.timeline.map((s) => (
            <li key={s.title}>
              <strong className="text-foreground">{s.title}</strong> — {s.description}
            </li>
          ))}
        </ol>
      ),
    },
  ];

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
      {sections.map((s) => (
        <section key={s.id} aria-labelledby={s.id}>
          <h3 id={s.id} className="font-semibold">
            {s.title}
          </h3>
          {s.body}
        </section>
      ))}
      <div className="flex flex-wrap gap-2">
        <a
          href={`mailto:${site.email}?subject=${encodeURIComponent(`Case: ${project.id}`)}`}
          className={buttonVariants({ variant: "default" })}
        >
          Επικοινωνία
        </a>
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({ variant: "secondary" })}
        >
          Live ↗ <ExternalLink size={14} aria-hidden="true" />
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
  const desktop = useMediaQuery("(min-width: 768px)", true);
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

  const body = project?.dialog ? (
    <CaseBody key={project.id} project={project} />
  ) : null;
  if (desktop) {
    return (
      <Dialog open={open} onOpenChange={handleChange}>
        {project && (
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogTitle>{project.title}</DialogTitle>
            <DialogDescription>{project.oneLiner}</DialogDescription>
            {body}
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
          {body}
        </SheetContent>
      )}
    </Sheet>
  );
}
