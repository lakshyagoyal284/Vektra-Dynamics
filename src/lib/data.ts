import {
  Code2,
  Cpu,
  Database,
  Gauge,
  Globe2,
  Layers,
  LineChart,
  Lock,
  Palette,
  Server,
  Workflow,
  type LucideIcon,
} from "lucide-react";

/* ---------------------------------- nav ---------------------------------- */

export interface NavLink {
  readonly label: string;
  readonly href: string;
}

export const NAV_LINKS: readonly NavLink[] = [
  { label: "Services", href: "#services" },
  { label: "Architecture", href: "#architecture" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Insights", href: "#insights" },
  { label: "Contact", href: "#contact" },
];

/* -------------------------------- services -------------------------------- */

export interface Service {
  readonly id: string;
  readonly icon: LucideIcon;
  readonly title: string;
  readonly tagline: string;
  readonly description: string;
  readonly deliverables: readonly string[];
  readonly status: "LIVE" | "ROADMAP";
  readonly accent: "cyan" | "indigo";
}

export const SERVICES: readonly Service[] = [
  {
    id: "web-engineering",
    icon: Code2,
    title: "Web Engineering & Architecture",
    tagline: "Next.js, Micro-frontends, PWA, Edge APIs",
    description:
      "High-performance web platforms engineered on modern frameworks — server components, edge rendering, and modular frontends that scale with your product surface.",
    deliverables: [
      "Next.js App Router platforms",
      "Micro-frontend orchestration",
      "Progressive Web Apps",
      "Edge API routes & middleware",
    ],
    status: "LIVE",
    accent: "cyan",
  },
  {
    id: "custom-software",
    icon: Server,
    title: "Custom Software & Systems",
    tagline: "Scalable backend API architecture, database optimization",
    description:
      "Purpose-built software and resilient backend systems — typed API layers, event-driven services, and data models tuned for read/write throughput at scale.",
    deliverables: [
      "Scalable REST & GraphQL APIs",
      "Database schema optimization",
      "Event-driven service design",
      "Zero-downtime migration plans",
    ],
    status: "LIVE",
    accent: "cyan",
  },
  {
    id: "ai-integration",
    icon: Cpu,
    title: "Intelligent Automation & AI Integration",
    tagline: "LLM workflows, custom AI pipelines, data pipelines",
    description:
      "Production-grade AI systems woven into your operations — LLM orchestration, retrieval pipelines, and custom models shipped with evaluation and guardrails.",
    deliverables: [
      "LLM workflow orchestration",
      "RAG & vector search pipelines",
      "Custom AI data pipelines",
      "Evaluation & safety guardrails",
    ],
    status: "ROADMAP",
    accent: "indigo",
  },
  {
    id: "design-systems",
    icon: Palette,
    title: "UI/UX Design Systems",
    tagline: "Design-to-code precision, responsive interface systems",
    description:
      "Interface systems engineered for consistency — tokenized design systems, motion-aware components, and pixel-accurate design-to-code translation.",
    deliverables: [
      "Tokenized design systems",
      "Responsive component libraries",
      "Motion & interaction specs",
      "Accessibility-first audits",
    ],
    status: "LIVE",
    accent: "cyan",
  },
];

/* --------------------------------- stack ---------------------------------- */

export interface StackGroup {
  readonly id: string;
  readonly title: string;
  readonly icon: LucideIcon;
  readonly items: readonly string[];
}

export const STACK_GROUPS: readonly StackGroup[] = [
  {
    id: "frontend",
    title: "Frontend",
    icon: Layers,
    items: ["Next.js 14", "React 18", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    id: "backend",
    title: "Backend",
    icon: Database,
    items: ["Node.js", "tRPC / GraphQL", "PostgreSQL", "Redis", "Prisma"],
  },
  {
    id: "cloud",
    title: "Cloud",
    icon: Globe2,
    items: ["Vercel Edge", "Docker", "Kubernetes", "CI/CD Pipelines", "Observability"],
  },
  {
    id: "ai",
    title: "AI",
    icon: Cpu,
    items: ["OpenAI / LLMs", "LangChain", "Vector DBs", "Python Pipelines", "Evals"],
  },
];

export interface Highlight {
  readonly id: string;
  readonly icon: LucideIcon;
  readonly metric: string;
  readonly label: string;
}

export const HIGHLIGHTS: readonly Highlight[] = [
  { id: "perf", icon: Gauge, metric: "100/100", label: "Performance Budget" },
  { id: "types", icon: Code2, metric: "100%", label: "Type-Safe Architecture" },
  { id: "security", icon: Lock, metric: "Zero-Trust", label: "Security Model" },
  { id: "a11y", icon: LineChart, metric: "WCAG 2.2", label: "Accessibility Target" },
];

/* ------------------------------- estimator -------------------------------- */

export type ServiceType = "web" | "saas" | "ai" | "custom";
export type TimelineOption = "express" | "standard" | "enterprise";
export type ScaleOption = "local" | "high-traffic" | "global";

export interface EstimatorChoice<T extends string> {
  readonly id: T;
  readonly label: string;
  readonly meta: string;
  readonly weight: number;
}

export const SERVICE_TYPES: readonly EstimatorChoice<ServiceType>[] = [
  { id: "web", label: "Web Application", meta: "Marketing site, portal, or PWA", weight: 1 },
  { id: "saas", label: "Full-Stack SaaS", meta: "Multi-tenant product with billing", weight: 2.2 },
  { id: "ai", label: "AI Integration", meta: "LLM workflows & data pipelines", weight: 1.9 },
  { id: "custom", label: "Custom System", meta: "Bespoke platform or internal tooling", weight: 2.6 },
];

export const TIMELINES: readonly EstimatorChoice<TimelineOption>[] = [
  { id: "express", label: "Express — 2 Weeks", meta: "MVP sprint, scoped surface", weight: 1 },
  { id: "standard", label: "Standard — 4–6 Weeks", meta: "Full build with QA cycles", weight: 1.15 },
  { id: "enterprise", label: "Enterprise Quarter", meta: "Multi-phase, dedicated squad", weight: 1.6 },
];

export const SCALE_NEEDS: readonly EstimatorChoice<ScaleOption>[] = [
  { id: "local", label: "Local Business", meta: "Single region, moderate traffic", weight: 1 },
  { id: "high-traffic", label: "High-Traffic Cloud", meta: "Autoscaling, CDN, caching", weight: 1.5 },
  { id: "global", label: "Global Infrastructure", meta: "Multi-region, edge-first, 99.99%", weight: 2.2 },
];

// Base in INR — entry combination (Web App + Express + Local) prices at this figure.
export const BASE_ESTIMATE = 35000;

/* ------------------------------- packages -------------------------------- */
// Fixed-scope service packages offered for instant order on /instant-buy.
// Prices are "from" figures in INR — final scope is confirmed on the discovery call.

export interface Package {
  readonly id: string;
  readonly name: string;
  readonly tagline: string;
  readonly priceFrom: number;
  readonly priceLabel: string;
  readonly timeline: string;
  readonly summary: string;
  readonly includes: readonly string[];
  readonly popular: boolean;
}

export const PACKAGES: readonly Package[] = [
  {
    id: "starter-website",
    name: "Starter Website",
    tagline: "Marketing site, shipped fast",
    priceFrom: 35000,
    priceLabel: "₹35,000",
    timeline: "2 weeks",
    summary:
      "A fast, mobile-first site for a new business or a rebrand — the right foundation without the full build.",
    includes: [
      "Up to 6 pages, mobile-first",
      "Next.js + TypeScript build",
      "Contact form wired to your inbox",
      "Basic on-page SEO & analytics",
      "One round of revisions",
    ],
    popular: false,
  },
  {
    id: "business-platform",
    name: "Business Platform",
    tagline: "Portals, dashboards, real product surface",
    priceFrom: 85000,
    priceLabel: "₹85,000",
    timeline: "4–6 weeks",
    summary:
      "A multi-page platform with authentication and data — built for teams whose work now lives in the product.",
    includes: [
      "Everything in Starter",
      "Auth & role-based access",
      "Admin dashboard",
      "Database schema & API layer",
      "Testing & deployment pipeline",
    ],
    popular: true,
  },
  {
    id: "ai-integration",
    name: "AI Integration",
    tagline: "LLM workflows, grounded in your data",
    priceFrom: 150000,
    priceLabel: "₹1,50,000",
    timeline: "4–6 weeks",
    summary:
      "Production-grade AI inside your operations — retrieval, orchestration, and guardrails, not a demo.",
    includes: [
      "LLM workflow orchestration",
      "Retrieval over your documents",
      "Guardrails & fallback paths",
      "Evaluation harness",
      "Usage & cost monitoring",
    ],
    popular: false,
  },
  {
    id: "custom-system",
    name: "Custom System",
    tagline: "Bespoke platform or internal tooling",
    priceFrom: 250000,
    priceLabel: "₹2,50,000",
    timeline: "Enterprise quarter",
    summary:
      "A system designed around how your organisation actually works — phased delivery with a dedicated squad.",
    includes: [
      "Architecture & discovery phase",
      "Dedicated engineering squad",
      "Multi-phase delivery plan",
      "Infrastructure & observability",
      "Documentation & handover",
    ],
    popular: false,
  },
];

export const ORDER_SOURCES = [
  { id: "web-app", label: "Web Application" },
  { id: "full-stack-saas", label: "Full-Stack SaaS" },
  { id: "ai-integration", label: "AI Integration" },
  { id: "custom-system", label: "Custom System" },
] as const;

/* ------------------------------ case studies ------------------------------ */

export type CaseTag = "web" | "aiml" | "cloud";

export interface CaseStudy {
  readonly id: string;
  readonly title: string;
  readonly client: string;
  readonly summary: string;
  readonly metric: string;
  readonly metricLabel: string;
  readonly tags: readonly CaseTag[];
  readonly stack: readonly string[];
  /* Screenshots shown in the expanded viewer. The first entry is also the
     card's thumbnail. Omit for cases with no artwork — the card then stays
     non-interactive and shows its placeholder. */
  readonly gallery?: readonly string[];
}

export const CASE_TAGS: readonly { id: CaseTag | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "web", label: "Web App" },
  { id: "aiml", label: "AI/ML" },
  { id: "cloud", label: "Cloud Systems" },
];

export const CASE_STUDIES: readonly CaseStudy[] = [
  {
    id: "diptis",
    title: "DIPTIS Fitness Website",
    client: "Fitness · Coaching",
    summary:
      "A fast, mobile-first website for her fitness coaching business — program pages, schedule, and a simple inquiry flow that turns visitors into clients.",
    metric: "+85%",
    metricLabel: "Online inquiries",
    tags: ["web"],
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    gallery: ["/work/case-diptis.png"],
  },
  {
    id: "helios",
    title: "Helios Commerce Replatform",
    client: "Retail · Enterprise",
    summary:
      "Rebuilt a monolithic storefront into an edge-rendered Next.js platform with ISR and granular caching.",
    metric: "+240%",
    metricLabel: "Speed Increase",
    tags: ["web", "cloud"],
    stack: ["Next.js", "Edge Functions", "PostgreSQL"],
    gallery: ["/work/case-helios.png"],
  },
  {
    id: "atlas",
    title: "Atlas Ops Copilot",
    client: "Logistics · AI/ML",
    summary:
      "LLM operations copilot with retrieval over 2M shipment records, human-in-the-loop approvals, and evals.",
    metric: "63%",
    metricLabel: "Faster Resolution",
    tags: ["aiml", "cloud"],
    stack: ["LLM Orchestration", "Vector DB", "Python"],
    gallery: ["/work/case-atlas.png"],
  },
  {
    id: "nordwind",
    title: "Nordwind Booking Engine",
    client: "Travel · Web App",
    summary:
      "High-concurrency reservation system with optimistic locking and a design-system-driven frontend.",
    metric: "99.99%",
    metricLabel: "Uptime SLA",
    tags: ["web"],
    stack: ["React", "Node.js", "Redis"],
    gallery: ["/work/case-nordwind.png"],
  },
  {
    id: "quantum",
    title: "Quantum Metrics Platform",
    client: "Fintech · Cloud Systems",
    summary:
      "Event-driven analytics pipeline ingesting 40k events/min with modular API design and schema registry.",
    metric: "40k/min",
    metricLabel: "Event Throughput",
    tags: ["cloud", "web"],
    stack: ["Kubernetes", "Kafka", "TypeScript"],
  },
  {
    id: "lumen",
    title: "Lumen Health Portal",
    client: "Healthcare · Web App",
    summary:
      "HIPAA-conscious patient portal with zero-trust auth flows and WCAG 2.2 AA compliant interfaces.",
    metric: "4.9/5",
    metricLabel: "Patient Satisfaction",
    tags: ["web", "aiml"],
    stack: ["Next.js", "tRPC", "Prisma"],
  },
  {
    id: "vector",
    title: "Vector Grid Auto-Scaler",
    client: "SaaS · Cloud Systems",
    summary:
      "Predictive auto-scaling layer using ML forecasts to pre-warm capacity ahead of demand spikes.",
    metric: "-38%",
    metricLabel: "Infra Cost",
    tags: ["cloud", "aiml"],
    stack: ["Python", "K8s", "Time-Series ML"],
  },
];

/* ------------------------------ architecture ------------------------------ */

export interface Layer {
  readonly id: string;
  readonly tag: string;
  readonly title: string;
  readonly meta: string;
  readonly detail: string;
}

export const LAYERS: readonly Layer[] = [
  {
    id: "edge",
    tag: "L0",
    title: "Edge",
    meta: "CDN · Middleware · WAF",
    detail: "Request shaping, auth gates, and geo-routing across 34 regions.",
  },
  {
    id: "app",
    tag: "L1",
    title: "Application",
    meta: "RSC · API Routes · tRPC",
    detail: "Server components and typed contracts — data travels once, compressed.",
  },
  {
    id: "data",
    tag: "L2",
    title: "Data",
    meta: "PostgreSQL · Redis · Queues",
    detail: "Schemas tuned for read/write throughput, caches with explicit invalidation.",
  },
  {
    id: "ai",
    tag: "L3",
    title: "AI",
    meta: "LLM · Vector · Evals",
    detail: "Retrieval and orchestration layers — designed now, activated when you're ready.",
  },
];

/* --------------------------------- about ---------------------------------- */

export const FOUNDER = {
  name: "Lakshya Goyal",
  role: "Founder & CEO",
  photo: "/founder.png" as string | null, // file lives in /public
  bio: [
    "I started Vektra Dynamics to give growing businesses the kind of engineering partner I wished existed — one that ships fast, documents everything, and treats your product like its own.",
    "Ten projects in, that hasn't changed. Every engagement still gets senior attention from day one, and every codebase is built to be handed over, not held hostage.",
  ],
  location: "Remote-first · India",
} as const;

export const ABOUT_VALUES: readonly { title: string; detail: string }[] = [
  {
    title: "Senior work, every time",
    detail:
      "No bait-and-switch staffing. The people you meet on the first call are the people writing your code.",
  },
  {
    title: "Built to be handed over",
    detail:
      "Clean architecture, real documentation, no lock-in. Your codebase is yours — we make sure you could take it anywhere.",
  },
  {
    title: "Small on purpose",
    detail:
      "A compact studio means fast decisions, direct communication, and no layers between you and the people building.",
  },
  {
    title: "Honest scoping",
    detail:
      "Fixed proposals, clear timelines, and a rough-number tool on this site so you can qualify your budget before we ever talk.",
  },
];

/* -------------------------------- contact --------------------------------- */

export const PROJECT_TYPES: readonly { id: string; label: string }[] = [
  { id: "web-app", label: "Web Application" },
  { id: "full-stack-saas", label: "Full-Stack SaaS" },
  { id: "ai-integration", label: "AI Integration" },
  { id: "custom-system", label: "Custom System" },
];

export const BUDGET_RANGES: readonly { id: string; label: string }[] = [
  { id: "lt-5l", label: "< ₹5 Lakh" },
  { id: "5-15l", label: "₹5 – ₹15 Lakh" },
  { id: "15-40l", label: "₹15 – ₹40 Lakh" },
  { id: "gt-40l", label: "₹40 Lakh+" },
];

export const FOOTER_TECH_SPECS: readonly { label: string; value: string }[] = [
  { label: "Framework", value: "Next.js 14" },
  { label: "Language", value: "TypeScript 5.6" },
  { label: "Runtime", value: "Edge / Node 20" },
  { label: "Rendering", value: "RSC + ISR" },
  { label: "Monitoring", value: "24/7 Observability" },
];

export const FOOTER_LINKS: readonly NavLink[] = [
  { label: "Services", href: "#services" },
  { label: "Architecture", href: "#architecture" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Estimator", href: "#estimator" },
  { label: "Case Studies", href: "#insights" },
  { label: "Contact", href: "#contact" },
];

export { Workflow };
