import { site } from "../content/site";
import { Badge } from "./ui/badge";
import { LiveDot } from "./live-dot";

export function HeroStatusBar() {
  return (
    <div className="flex flex-wrap items-center gap-2" aria-label="Κατάσταση διαθεσιμότητας">
      <Badge variant="live">
        <LiveDot />
        {site.statusBar[0]}
      </Badge>
      {site.statusBar.slice(1).map((s) => (
        <Badge key={s} variant="outline">
          {s}
        </Badge>
      ))}
    </div>
  );
}
