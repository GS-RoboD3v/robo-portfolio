export type Axis = "Money" | "Brains" | "Beauty" | "Platform" | "Viral";

export interface CaseProof {
  label: string;
  href: string;
  kind: "live" | "checkout" | "demo" | "share";
}

export interface CaseStep {
  t: string;
  what: string;
}

export interface CaseData {
  problem: string;
  build: string[];
  proof: CaseProof[];
  arch: string[];
  timeline: CaseStep[];
}

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
  caseData?: CaseData;
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
    caseData: {
      problem:
        "Χειροκίνητες παραγγελίες — χωρίς κατάλογο, χωρίς online πληρωμή. Κάθε πώληση ήθελε τηλέφωνο ή μήνυμα.",
      build: [
        "Κατάλογος με καλάθι και checkout — 19 σελίδες διαδρομών",
        "Διπλή πληρωμή: κάρτα Piraeus + αντικαταβολή",
        "Παραγγελίες και συγχρονισμός μέσω Medusa v2, με 20+ backend tests",
      ],
      proof: [
        { label: "Ζωντανό κατάστημα", href: "https://terragousto.gr", kind: "live" },
        {
          label: "Checkout με κάρτα + αντικαταβολή",
          href: "https://terragousto.gr",
          kind: "checkout",
        },
      ],
      arch: ["React 18 + Vite 7", "Medusa v2", "VPS + Caddy"],
      timeline: [
        { t: "Κατάλογος", what: "Προϊόντα, καλάθι, checkout" },
        { t: "Πληρωμές", what: "Κάρτα Piraeus + αντικαταβολή σε παραγωγή" },
        { t: "Παραγωγή", what: "Ζωντανό κατάστημα — sitemap 117 γραμμών, OG" },
      ],
    },
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
    caseData: {
      problem:
        "Έλλειψη δωρεάν ελληνικού τεστ IQ με διαφανή, προσαρμοστική βαθμολόγηση — τα περισσότερα κρύβουν τον αλγόριθμο.",
      build: [
        "Μηχανή IRT 3PL CAT με όριο έκθεσης 0.15",
        "3 modes — 25/32/45 ερωτήσεις, χρονόμετρο 20 λεπτών",
        "Ανώνυμα share links 30 ημερών, χωρίς λογαριασμό",
      ],
      proof: [
        { label: "Ζωντανό demo", href: "https://greek-iq-app.vercel.app", kind: "demo" },
        {
          label: "Κοινοποιήσιμο αποτέλεσμα",
          href: "https://greek-iq-app.vercel.app",
          kind: "share",
        },
      ],
      arch: ["Next.js 16 + React 19", "Neon + Upstash Redis", "Serwist PWA offline"],
      timeline: [
        { t: "Μηχανή", what: "IRT engine + τράπεζα 21 θεμάτων" },
        { t: "Modes", what: "3 modes με έντιμη βαθμολόγηση" },
        { t: "Δημοσίευση", what: "Demo + share links, WCAG AA" },
      ],
    },
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
