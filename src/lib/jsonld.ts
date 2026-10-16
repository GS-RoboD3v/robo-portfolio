import { projects } from "../content/projects";
import { site } from "../content/site";

export function personJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "RoboD3v",
    url: site.url,
    email: site.email,
    homeLocation: { "@type": "Place", name: "Ελλάδα" },
  };
}

export function itemListJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: projects.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.title,
      url: p.liveUrl,
      description: p.oneLiner,
    })),
  };
}
