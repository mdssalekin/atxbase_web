
import scalingSystemsCover from "./assets/designing-systems-that-scale.png";
import aiHelpsCover from "./assets/where-ai-actually-helps.png";
import brandIdentityCover from "./assets/brand-identity-beyond-the-logo.png";
import seoBasicsCover from "./assets/seo-basics-that-still-matter.png";
import dashboardReadingCover from "./assets/reading-a-dashboard-without-a-data-team.png";
import newTeamCover from "./assets/atx-base-welcomes-new-team-members.png";
// import nativeVsCrossCover from "./assets/choosing-native-vs-cross-platform.png";

export const CATEGORIES = ["All", "Web Development", "AI & Automation", "Design", "Marketing", "Company News"];

export const POSTS = [
  {
    slug: "designing-systems-that-scale",
    category: "Web Development",
    title: "Designing systems that scale before you need them to",
    excerpt:
      "Why the architecture decisions you make in week one are the ones you'll live with for years — and how we approach them differently.",
    date: "2026-08-12",
    readMins: 6,
    author: "ATX Base Team",
    featured: true,
    cover: scalingSystemsCover,
    body: [
      "Most architecture problems don't show up on day one. They show up eighteen months later, when the thing that was supposed to be a quick internal tool is now handling real customer traffic, and every change feels riskier than the last.",
      "The decisions that matter most — how services talk to each other, where state lives, what's allowed to be tightly coupled and what isn't — get made early, often under time pressure, and rarely get revisited until something breaks.",
      "Our approach is to spend real time on this upfront, even on smaller projects: sketch the system before writing the first line of production code, name the parts that are likely to change, and build in the seams that make future changes possible instead of painful.",
      "It doesn't mean over-engineering a five-page website like it's a bank. It means asking, honestly, what this system needs to survive its own success — and building for that, not for a hypothetical worst case that never arrives.",
    ],
  },
  {
    slug: "where-ai-actually-helps",
    category: "AI & Automation",
    title: "Where AI actually helps in a normal business (and where it doesn't)",
    excerpt: "Not every workflow needs a model. A practical look at which processes are worth automating first.",
    date: "2026-07-28",
    readMins: 5,
    author: "ATX Base Team",
    cover: aiHelpsCover,
    body: [
      "There's a lot of pressure right now to bolt AI onto everything, whether or not it actually fits the problem. Some of that pressure produces genuinely useful automation. A lot of it produces a chatbot nobody asked for.",
      "The workflows worth automating first tend to share a few traits: they're repetitive, they're high-volume, and the cost of an occasional mistake is low and easy to catch. Ticket triage, data entry, first-pass document review — these are strong candidates.",
      "The workflows worth leaving alone, at least for now, are usually the opposite: low-volume, high-stakes, or dependent on judgment that's hard to specify in advance. Automating those too early tends to create more cleanup work than it saves.",
      "Our starting question with any client is never 'where can we use AI.' It's 'where is your team spending time on something repetitive and low-risk' — and then we figure out whether automation is actually the right tool for that specific problem.",
    ],
  },
  {
    slug: "brand-identity-beyond-the-logo",
    category: "Design",
    title: "Brand identity is more than a logo file",
    excerpt: "What actually goes into a design system that holds up across a website, an app, and a stack of print materials.",
    date: "2026-07-15",
    readMins: 4,
    author: "ATX Base Team",
    cover: brandIdentityCover,
    body: [
      "A logo is the easy part. The hard part is everything that has to work consistently around it — color usage across light and dark backgrounds, type scales that hold up on a phone screen and a banner ad, spacing rules that keep a design from feeling cramped or hollow.",
      "Most of the brand problems we get called in to fix aren't 'the logo looks dated.' They're 'nothing matches anymore,' because five different people made five reasonable-looking decisions with no shared system to check them against.",
      "A real design system solves this by documenting the decisions once, clearly enough that someone without a design background can apply them correctly. That's the actual deliverable — not just a set of files, but a set of rules a small team can run without a designer in the room.",
    ],
  },
  {
    slug: "seo-basics-that-still-matter",
    category: "Marketing",
    title: "The SEO fundamentals that still matter in 2026",
    excerpt: "Search has changed a lot. These basics, somehow, haven't.",
    date: "2026-06-30",
    readMins: 7,
    author: "ATX Base Team",
    cover: seoBasicsCover,
    body: [
      "Search algorithms change constantly, and it's easy to treat SEO as a moving target not worth chasing. In practice, the fundamentals that mattered five years ago mostly still matter: fast pages, clear structure, content that actually answers the question someone typed in.",
      "What's changed is how forgiving search engines are of skipping those fundamentals. There's less tolerance now for slow pages, thin content, and structure that exists to game rankings rather than help a reader.",
      "Our audits start in the same place every time: can this page actually be crawled and understood, does it load fast on a real connection, and does it answer the query it's trying to rank for. Everything else is secondary to getting those three right.",
    ],
  },
  {
    slug: "reading-a-dashboard-without-a-data-team",
    category: "AI & Automation",
    title: "How to read a data dashboard without a data science degree",
    excerpt: "A short guide to the metrics that actually predict where your business is headed.",
    date: "2026-06-18",
    readMins: 5,
    author: "ATX Base Team",
    cover: dashboardReadingCover,
    body: [
      "A dashboard full of charts isn't the same thing as a dashboard full of useful information. It's easy to end up staring at a dozen metrics without a clear sense of which ones actually predict trouble or opportunity ahead of time.",
      "The most useful metrics tend to be leading indicators, not lagging ones — signals that move before revenue does, not after. Cart abandonment ahead of a sales dip. Support ticket volume ahead of a churn spike.",
      "When we build dashboards for clients, the goal isn't maximum data density. It's a small number of numbers someone can glance at and actually act on, with everything else one click away for when it's needed.",
    ],
  },
  {
    slug: "atx-base-welcomes-new-team-members",
    category: "Company News",
    title: "A few new faces on the ATX Base team",
    excerpt: "Introducing the newest additions to our engineering and design team.",
    date: "2026-06-02",
    readMins: 2,
    author: "ATX Base Team",
    cover: newTeamCover,
    body: [
      "As our project load has grown, so has the team behind it. Over the past quarter we've added new engineers and designers across web, mobile, and design — all people who care about the same thing we do: shipping work we're willing to put our name on.",
      "Replace this post with real introductions once you're ready — names, roles, a line or two about what each person is working on. Company update posts like this one are some of the easiest to keep current, and readers tend to like seeing the humans behind the work.",
    ],
  },
  {
    slug: "choosing-native-vs-cross-platform",
    category: "Web Development",
    title: "Native vs. cross-platform: how we actually decide",
    excerpt: "The honest trade-offs behind choosing Kotlin, React Native, or something else entirely for your next app.",
    date: "2026-05-21",
    readMins: 6,
    author: "ATX Base Team",
    cover: null, // swap to `nativeVsCrossCover` once imported above
    body: [
      "This question comes up on almost every mobile project, and the honest answer is that there's no universally correct choice — it depends on the app, the timeline, and what happens after launch.",
      "Native tends to win when performance is central to the product, or when the app needs deep access to platform-specific features that cross-platform frameworks handle awkwardly. Cross-platform tends to win when speed to market matters more, or when the team maintaining the app afterward is small.",
      "We walk through this trade-off explicitly with every client rather than defaulting to one answer — because the wrong choice here doesn't show up at launch, it shows up eighteen months later when the app needs to do something the original framework wasn't built for.",
    ],
  },
];

export const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

export const getPostBySlug = (slug) => POSTS.find((p) => p.slug === slug);

export const getRelatedPosts = (slug, limit = 3) => {
  const current = getPostBySlug(slug);
  if (!current) return POSTS.slice(0, limit);
  const sameCategory = POSTS.filter((p) => p.slug !== slug && p.category === current.category);
  const others = POSTS.filter((p) => p.slug !== slug && p.category !== current.category);
  return [...sameCategory, ...others].slice(0, limit);
};

