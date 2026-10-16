import * as React from "react";
import { ExternalLink } from "lucide-react";
import {
  projects,
  filterProjects,
  type Axis,
  type Project,
} from "../content/projects";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { LiveDot } from "./live-dot";

export type AxisFilter = Axis | "All";

const filters: { value: AxisFilter; label: string }[] = [
  { value: "All", label: "Όλα" },
  { value: "Money", label: "Money" },
  { value: "Brains", label: "Brains" },
  { value: "Beauty", label: "Beauty" },
];

const glowClass: Record<string, string> = {
  Money: "tile-glow-money",
  Brains: "tile-glow-brains",
  Beauty: "tile-glow-beauty",
};

export function ProjectGrid({
  onOpen,
}: {
  onOpen: (p: Project) => void;
}) {
  const [filter, setFilter] = React.useState<AxisFilter>("All");
  const visible = filterProjects(projects, filter);

  return (
    <Tabs
      value={filter}
      onValueChange={(v) => setFilter(v as AxisFilter)}
    >
      <TabsList aria-label="Φίλτρο άξονα" className="mb-4">
        {filters.map((f) => (
          <TabsTrigger key={f.value} value={f.value}>
            {f.label}
          </TabsTrigger>
        ))}
      </TabsList>
      <div className="grid gap-4 md:grid-cols-3 md:gap-6">
        {visible.map((p) => (
          <Card key={p.id} className={glowClass[p.axis] ?? ""}>
            <CardHeader>
              <div className="mb-2 flex items-center gap-2">
                <Badge variant="secondary">{p.axis}</Badge>
                <Badge variant="live">
                  <LiveDot />
                  LIVE
                </Badge>
              </div>
              <img
                src={p.screenshot}
                alt={`Στιγμιότυπο ${p.title}`}
                loading="lazy"
                width={640}
                height={400}
                className="aspect-[16/10] w-full rounded-xl object-cover"
              />
              <CardTitle className="mt-3">{p.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{p.oneLiner}</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {p.stack.map((s) => (
                  <Badge key={s} variant="outline">
                    {s}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <span className="text-xs text-muted-foreground">{p.status} ·</span>
              {p.dialog ? (
                <button
                  onClick={() => onOpen(p)}
                  className="inline-flex min-h-[44px] items-center gap-1 text-sm font-medium text-primary"
                >
                  άνοιγμα <ExternalLink size={14} aria-hidden="true" />
                </button>
              ) : (
                <a
                  href={p.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center gap-1 text-sm font-medium text-primary"
                >
                  άνοιγμα live <ExternalLink size={14} aria-hidden="true" />
                </a>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </Tabs>
  );
}
