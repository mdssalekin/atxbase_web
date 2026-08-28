/**
 * Shared data for Works.jsx (the listing/filter grid) and WorkDetail.jsx
 * (the individual project page). Keeping this in one file means both
 * pages read from the same source instead of two arrays drifting apart.
 *
 * These are example projects, not real client work — swap this array
 * for your actual case studies: real names (with permission), real
 * screenshots, real outcomes instead of the placeholder copy below.
 */

export const CATEGORIES = [
  "All",
  "Web Development",
  "Application Development",
  "Digital Marketing",
  "Graphic Design",
  "System Design",
  "AI & Automation",
  "Data Science",
];

export const PROJECTS = [
  {
    slug: "fashion-retail-storefront",
    category: "Web Development",
    title: "E-commerce storefront for a fashion retailer",
    summary:
      "A rebuilt storefront focused on page speed and checkout conversion, with a CMS the client's marketing team runs day to day.",
    year: "2026",
    client: "Fashion retail brand",
    duration: "8 weeks",
    tags: ["Next.js", "Shopify", "SEO"],
    challenge:
      "The client's existing storefront was slow, hard to update without a developer, and losing customers at checkout. Every content change meant a support ticket to their old agency.",
    approach:
      "We rebuilt the front end on Next.js for speed, moved content into a headless CMS their team could run themselves, and simplified checkout down to the fields that actually mattered.",
    results: [
      "Faster page loads across product and category pages",
      "Marketing team publishing content changes without developer help",
      "A simplified, higher-converting checkout flow",
    ],
  },
  {
    slug: "logistics-ops-dashboard",
    category: "Web Development",
    title: "Fleet operations dashboard for a logistics company",
    summary:
      "A real-time dashboard for dispatchers to track vehicles, routes, and delivery exceptions across a growing fleet.",
    year: "2026",
    client: "Logistics & delivery company",
    duration: "3 months",
    tags: ["React", "Node.js", "WebSockets"],
    challenge:
      "Dispatchers were tracking vehicles across a patchwork of spreadsheets and a GPS vendor's clunky portal, with no single view of exceptions as they happened.",
    approach:
      "We built a live operations dashboard on React and WebSockets, pulling vehicle and route data into one view with exception alerts dispatchers could act on immediately.",
    results: [
      "One live view replacing three disconnected tools",
      "Faster exception response during peak delivery windows",
      "A foundation the client's team can extend as the fleet grows",
    ],
  },
  {
    slug: "fintech-onboarding-app",
    category: "Application Development",
    title: "Customer onboarding app for a fintech startup",
    summary:
      "A native Android app that took account signup from a multi-day process down to a single guided session.",
    year: "2025",
    client: "Fintech startup",
    duration: "10 weeks",
    tags: ["Kotlin", "Jetpack Compose", "KYC integration"],
    challenge:
      "Account opening required manual document review and back-and-forth email, which meant a multi-day wait before new customers could actually use the product.",
    approach:
      "We built a native Android onboarding flow with in-app document capture and a third-party KYC integration, guiding users through verification in a single session.",
    results: [
      "Onboarding collapsed from days to a single guided session",
      "Fewer drop-offs during account verification",
      "A reusable verification flow the client now applies to other products",
    ],
  },
  {
    slug: "property-management-suite",
    category: "Application Development",
    title: "Desktop suite for a property management firm",
    summary:
      "Internal desktop software replacing a decade-old legacy tool, built to run offline-first across branch offices.",
    year: "2025",
    client: "Property management firm",
    duration: "4 months",
    tags: [".NET", "WPF", "SQL Server"],
    challenge:
      "The client's branch offices relied on a decade-old desktop tool that no longer had a vendor to support it, with no path forward as staff turned over.",
    approach:
      "We built a modern .NET/WPF replacement with the same offline-first reliability branch staff depended on, plus a migration path for their existing records.",
    results: [
      "Legacy software fully retired across all branch offices",
      "Offline reliability preserved for low-connectivity locations",
      "New hires productive without vendor-specific training",
    ],
  },
  {
    slug: "saas-growth-campaign",
    category: "Digital Marketing",
    title: "Growth campaign for a B2B SaaS product",
    summary:
      "A combined SEO and paid strategy that rebuilt organic traffic and cut cost-per-lead across three quarters.",
    year: "2026",
    client: "B2B SaaS company",
    duration: "Ongoing, 3 quarters",
    tags: ["SEO", "Google Ads", "LinkedIn Ads"],
    challenge:
      "The client's organic traffic had been flat for over a year, and their paid campaigns were generating clicks but few qualified leads.",
    approach:
      "We ran a technical SEO audit and content refresh alongside a restructured paid strategy across Google and LinkedIn, targeted at their actual buyer roles.",
    results: [
      "Organic traffic trending upward for the first time in over a year",
      "Lower cost-per-lead on paid campaigns",
      "A reporting cadence the client's team relies on for planning",
    ],
  },
  {
    slug: "nonprofit-rebrand",
    category: "Graphic Design",
    title: "Full rebrand for a regional nonprofit",
    summary:
      "New identity, print materials, and a design system built to be run by a small in-house team without a designer on staff.",
    year: "2025",
    client: "Regional nonprofit organization",
    duration: "6 weeks",
    tags: ["Brand identity", "Print", "Figma"],
    challenge:
      "The nonprofit's existing materials were inconsistent across print and digital, and they had no in-house designer to keep new materials on-brand.",
    approach:
      "We designed a full identity system — logo, color, typography, templates — documented simply enough for a non-designer to apply correctly without guessing.",
    results: [
      "One consistent identity across print and digital materials",
      "Editable templates the team maintains without outside help",
      "A brand guideline document used for every new campaign since",
    ],
  },
  {
    slug: "healthcare-platform-architecture",
    category: "System Design",
    title: "Scalable architecture for a healthcare records platform",
    summary:
      "System design for a multi-tenant platform built to meet strict data isolation and uptime requirements from day one.",
    year: "2026",
    client: "Healthcare technology company",
    duration: "5 weeks (architecture phase)",
    tags: ["Microservices", "AWS", "PostgreSQL"],
    challenge:
      "The client needed to support multiple healthcare organizations on one platform, with strict data isolation between tenants and no tolerance for downtime.",
    approach:
      "We designed a multi-tenant microservices architecture on AWS with isolated data boundaries per tenant, load-balanced application servers, and monitoring built in from the start.",
    results: [
      "An architecture blueprint the client's engineering team built directly from",
      "Data isolation requirements met by design, not patched in later",
      "A scaling plan in place before the platform needed it",
    ],
  },
  {
    slug: "support-chatbot-automation",
    category: "AI & Automation",
    title: "Support ticket automation for an e-commerce brand",
    summary:
      "An automation layer that triages and routes incoming support tickets, cutting first-response time significantly.",
    year: "2026",
    client: "E-commerce brand",
    duration: "6 weeks",
    tags: ["RPA", "NLP", "Zendesk integration"],
    challenge:
      "Support tickets were piling up in a single queue with no prioritization, so urgent issues waited behind routine ones during busy periods.",
    approach:
      "We built an automation layer that classifies incoming tickets, routes them to the right queue, and auto-resolves the most common repetitive requests.",
    results: [
      "Faster first response on urgent tickets",
      "A meaningful share of routine tickets resolved without a human touch",
      "Support staff freed up to handle complex cases",
    ],
  },
  {
    slug: "retail-demand-forecasting",
    category: "Data Science",
    title: "Demand forecasting model for a retail chain",
    summary:
      "A forecasting pipeline that helped a multi-location retailer plan inventory around seasonal demand instead of guesswork.",
    year: "2025",
    client: "Multi-location retail chain",
    duration: "8 weeks",
    tags: ["Python", "Time-series modeling", "Dashboards"],
    challenge:
      "Inventory planning was based on manager intuition and last year's numbers, leading to overstock in some locations and stockouts in others during peak seasons.",
    approach:
      "We built a time-series forecasting pipeline trained on the client's historical sales data, surfaced through a dashboard their planning team checks weekly.",
    results: [
      "Inventory planning grounded in a model instead of guesswork",
      "Fewer stockouts during peak seasonal demand",
      "A weekly forecast the planning team now builds orders around",
    ],
  },
];

export const getProjectBySlug = (slug) => PROJECTS.find((p) => p.slug === slug);

export const getRelatedProjects = (slug, limit = 3) => {
  const current = getProjectBySlug(slug);
  if (!current) return PROJECTS.slice(0, limit);
  const sameCategory = PROJECTS.filter((p) => p.slug !== slug && p.category === current.category);
  const others = PROJECTS.filter((p) => p.slug !== slug && p.category !== current.category);
  return [...sameCategory, ...others].slice(0, limit);
};