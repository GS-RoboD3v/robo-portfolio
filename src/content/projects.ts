export type Axis = "Money" | "Brains" | "Beauty" | "Platform" | "Viral";

export interface Project {
  id: string;
  axis: Axis;
  title: string;
  oneLiner: string;
  stack: [string, string, string];
  liveUrl: string;
  status: "live";
  metrics: string;
  screenshot: string;
  dialog: boolean;
}

export const axes: Axis[] = ["Money", "Brains", "Beauty", "Platform", "Viral"];

export const projects: Project[] = [
  {
    id: "terragousto",
    axis: "Money",
    title: "terragousto",
    oneLiner: "Πλήρες e-shop με κάρτα + αντικαταβολή σε Medusa v2.",
    stack: ["React 18", "Medusa v2", "Tailwind v4"],
    liveUrl: "https://terragousto.gr",
    status: "live",
    metrics: "e-shop με κάρτα + αντικαταβολή",
    screenshot: "/previews/terragousto-hero.webp",
    dialog: true,
  },
  {
    id: "lab",
    axis: "Brains",
    title: "lab",
    oneLiner: "Δωρεάν ελληνικό τεστ IQ με προσαρμοστική IRT βαθμολόγηση.",
    stack: ["Next.js 16", "React 19", "Upstash Redis"],
    liveUrl: "https://greek-iq-app.vercel.app",
    status: "live",
    metrics: "3 modes — 25/32/45 ερωτήσεις",
    screenshot: "/previews/lab-hero.webp",
    dialog: true,
  },
  {
    id: "plaisiore",
    axis: "Beauty",
    title: "plaisiore",
    oneLiner: "Portfolio 3D artist με 17 έργα και κινηματογραφικά Vimeo embeds.",
    stack: ["React 19", "Tailwind v4", "framer-motion"],
    liveUrl: "https://plasiore.netlify.app",
    status: "live",
    metrics: "17 έργα + 11 Vimeo embeds",
    screenshot: "/previews/plaisiore-hero.webp",
    dialog: false,
  },
  {
    id: "roboschool",
    axis: "Platform",
    title: "roboschool",
    oneLiner: "Πλατφόρμα 7 tracks / 65 μαθημάτων με Stripe συνδρομές.",
    stack: ["Next.js 16", "Supabase", "Stripe"],
    liveUrl: "https://school.robod3v.com",
    status: "live",
    metrics: "7 tracks / 65 μαθήματα",
    screenshot: "/previews/roboschool-hero.webp",
    dialog: false,
  },
  {
    id: "political-compass",
    axis: "Viral",
    title: "political-compass",
    oneLiner: "Ελληνικό πολιτικό τεστ 40 ερωτήσεων με κοινοποιήσιμο αποτέλεσμα.",
    stack: ["Next.js 16", "React 19", "html-to-image"],
    liveUrl: "https://robo-political-compass.vercel.app",
    status: "live",
    metrics: "40 ερωτήσεις / 12 ιδεολογίες",
    screenshot: "/previews/political-compass-hero.webp",
    dialog: false,
  },
];

export function filterProjects(list: Project[], axis: Axis | "All"): Project[] {
  if (axis === "All") return list;
  return list.filter((p) => p.axis === axis);
}
