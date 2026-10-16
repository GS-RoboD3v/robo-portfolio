import * as React from "react";
import { ExternalLink, Copy, Check } from "lucide-react";
import type { Project } from "../content/projects";
import { site } from "../content/site";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "./ui/dialog";

export function ProjectDialog({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    setCopied(false);
  }, [project?.id]);

  async function copyStack() {
    if (!project) return;
    const md = `## ${project.title}\n- Live: ${project.liveUrl}\n- Stack: ${project.stack.join(", ")}\n- ${project.oneLiner}`;
    try {
      await navigator.clipboard.writeText(md);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <Dialog
      open={project !== null}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      {project && (
        <DialogContent aria-describedby={undefined}>
          <DialogTitle>{project.title}</DialogTitle>
          <DialogDescription>{project.oneLiner}</DialogDescription>
          <img
            src={project.screenshot}
            alt={`Στιγμιότυπο ${project.title}`}
            loading="lazy"
            width={640}
            height={400}
            className="aspect-[16/10] w-full rounded-xl object-cover"
          />
          <p className="text-sm text-muted-foreground">
            Stack: {project.stack.join(" · ")}
          </p>
          <div className="flex flex-wrap gap-2">
            <a
              href={`mailto:${site.email}?subject=${encodeURIComponent(`Case: ${project.id}`)}`}
            >
              <Button>Επικοινωνία</Button>
            </a>
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="secondary">
                Live <ExternalLink size={14} aria-hidden="true" />
              </Button>
            </a>
            <Button variant="ghost" onClick={copyStack}>
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
        </DialogContent>
      )}
    </Dialog>
  );
}
