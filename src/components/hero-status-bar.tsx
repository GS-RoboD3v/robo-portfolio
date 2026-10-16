import { site } from "../content/site";
import { Badge } from "./ui/badge";

export function HeroStatusBar() {
  return (
    <div className="flex flex-wrap items-center gap-2" aria-label="Κατάσταση διαθεσιμότητας">
      <Badge variant="live">
        <span
          aria-hidden="true"
          className="mr-1.5 inline-block h-2 w-2 rounded-full bg-live"
        />
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
