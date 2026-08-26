import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "./assets/hero 1.png";

/** Brand tokens — mirror Header.jsx / Home.jsx / Footer.jsx / AboutUs.jsx / ContactUs.jsx */
const INK = "#0a0f24";
const INK_2 = "#111a36";
const BLUE = "#2e6ff2";
const TEAL = "#17c3a2";
const GRADIENT = `linear-gradient(115deg, ${BLUE}, ${TEAL})`;

/* ---------------------------------------------------------------- */
/*  Shared helpers (same pattern as the other pages)                 */
/* ---------------------------------------------------------------- */

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.unobserve(el);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, visible];
}

const Reveal = ({ as: Tag = "div", className = "", children, ...rest }) => {
  const [ref, visible] = useReveal();
  return (
    <Tag
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
};

const Eyebrow = ({ children, tone = "light", center = false }) => (
  <div
    className={`inline-flex items-center gap-2.5 font-mono text-[12px] font-medium tracking-[0.18em] uppercase ${
      center ? "justify-center" : ""
    }`}
    style={{ color: tone === "dark" ? "#8fb4ff" : BLUE }}
  >
    <span className="h-px w-5" style={{ background: GRADIENT }} />
    {children}
  </div>
);

const PixelTrail = ({ sizes = [22, 17, 12, 9], className = "" }) => (
  <div className={`pointer-events-none flex flex-col items-end gap-2 ${className}`}>
    {sizes.map((s, i) => (
      <span
        key={i}
        style={{
          width: s,
          height: s,
          marginRight: i * 12,
          borderRadius: 4,
          background: GRADIENT,
          opacity: 1 - i * 0.16,
        }}
      />
    ))}
  </div>
);

const Check = () => (
  <svg viewBox="0 0 20 20" className="h-[18px] w-[18px] shrink-0 mt-0.5" fill="none">
    <circle cx="10" cy="10" r="10" fill={TEAL} opacity="0.15" />
    <path d="M6 10.2 8.6 13 14 7.5" stroke={TEAL} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ---------------------------------------------------------------- */
/*  Per-service icon glyphs — plain inline SVG, no icon library      */
/* ---------------------------------------------------------------- */

const ICONS = {
  web: (
    <g fill="none" stroke="white" strokeWidth="1.6">
      <rect x="4" y="5" width="24" height="22" rx="3" />
      <path d="M4 10.5h24" />
      <circle cx="7.3" cy="7.7" r="0.9" fill="white" stroke="none" />
      <circle cx="10" cy="7.7" r="0.9" fill="white" stroke="none" />
    </g>
  ),
  webapp: (
    <g fill="none" stroke="white" strokeWidth="1.6">
      <rect x="4" y="4" width="24" height="24" rx="3" />
      <path d="M4 12h24M12 12v16" />
    </g>
  ),
  android: (
    <g fill="none" stroke="white" strokeWidth="1.6">
      <rect x="9" y="3" width="14" height="26" rx="3.5" />
      <path d="M9 8h14M9 24h14" />
      <circle cx="16" cy="26.3" r="0.9" fill="white" stroke="none" />
    </g>
  ),
  windows: (
    <g fill="none" stroke="white" strokeWidth="1.6">
      <rect x="4" y="4" width="24" height="24" rx="3" />
      <path d="M16 4v24M4 16h24" />
    </g>
  ),
  marketing: (
    <g fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 18v-4a2 2 0 0 1 2-2h3l9-5v18l-9-5H7a2 2 0 0 1-2-2Z" />
      <path d="M21 12.5c1.2 1 1.2 3 0 4" />
      <path d="M24 10c2.2 2 2.2 6 0 8" />
    </g>
  ),
  design: (
    <g fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 5c6 0 11 4.5 11 10 0 3.5-2.5 5-5 5h-2.2c-1 0-1.6 1.2-1 2 .5.7.2 2-1 2C10.5 24 6 20 6 15 6 9.5 10.5 5 16 5Z" />
      <circle cx="11.5" cy="14" r="1.1" fill="white" stroke="none" />
      <circle cx="16" cy="10.5" r="1.1" fill="white" stroke="none" />
      <circle cx="20.5" cy="14" r="1.1" fill="white" stroke="none" />
    </g>
  ),
};

const ServiceVisual = ({ kind }) => (
  <div
    className="relative w-full max-w-[380px] aspect-[4/3] rounded-[26px] border border-white/10 flex items-center justify-center overflow-hidden shadow-xl"
    style={{ background: `linear-gradient(155deg, ${INK} 0%, ${INK_2} 100%)` }}
  >
    <div
      className="absolute -top-10 -right-10 h-40 w-40 rounded-full blur-2xl opacity-40"
      style={{ background: GRADIENT }}
    />
    <div
      className="relative h-20 w-20 rounded-2xl flex items-center justify-center"
      style={{ background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.12)" }}
    >
      <svg viewBox="0 0 32 32" className="h-10 w-10">
        {ICONS[kind]}
      </svg>
    </div>
  </div>
);

/* ---------------------------------------------------------------- */
/*  Service content — edit copy, features, and tooling per service   */
/* ---------------------------------------------------------------- */

const SERVICES = [
  {
    slug: "website-development",
    tag: "WEB",
    kind: "web",
    title: "Website Development",
    tagline: "Marketing sites, e-commerce, and content platforms that load fast and stay easy to run.",
    description:
      "We design and build websites that hold up under real traffic and real content updates — not just a launch-day demo. Every site is built responsive-first, optimized for search from day one, and handed over with documentation your team can actually use.",
    features: [
      "Custom responsive design, not a locked-down template",
      "SEO-friendly structure, performance, and accessibility built in",
      "CMS setup so your team can update content without a developer",
      "E-commerce, booking, or membership functionality where needed",
    ],
    stack: ["React / Next.js", "WordPress", "Shopify", "Webflow"],
  },
  {
    slug: "web-application-development",
    tag: "APP",
    kind: "webapp",
    title: "Web Application Development",
    tagline: "Dashboards, portals, and SaaS products built with the architecture to scale.",
    description:
      "When a project outgrows a website, we build a proper application — authentication, role-based access, data pipelines, and an interface your users won't need a manual for. We architect for the traffic and team size you'll have in two years, not just at launch.",
    features: [
      "Custom dashboards, admin panels, and internal tools",
      "API design and integration with the systems you already use",
      "Authentication, permissions, and multi-tenant architecture",
      "Cloud deployment, monitoring, and handover documentation",
    ],
    stack: ["React", "Node.js", "PostgreSQL", "AWS / GCP"],
  },
  {
    slug: "android-app-development",
    tag: "AND",
    kind: "android",
    title: "Android App Development",
    tagline: "Native and cross-platform apps tuned for performance on real devices.",
    description:
      "We build Android apps that feel native because, where it matters, they are — smooth animations, proper offline handling, and performance testing across device tiers, not just the latest flagship phone.",
    features: [
      "Native (Kotlin) or cross-platform builds, matched to your budget and timeline",
      "Play Store submission, versioning, and release management",
      "Push notifications, in-app purchases, and third-party integrations",
      "Performance testing across a real spread of devices",
    ],
    stack: ["Kotlin", "Jetpack Compose", "React Native", "Firebase"],
  },
  {
    slug: "windows-app-development",
    tag: "WIN",
    kind: "windows",
    title: "Windows App Development",
    tagline: "Desktop software and internal tools for teams that live outside the browser.",
    description:
      "Some workflows still belong on the desktop — point-of-sale systems, internal operations tools, or software that needs direct access to local hardware and files. We build and package Windows applications that are stable, easy to deploy, and simple to update.",
    features: [
      "Custom desktop applications for internal or customer-facing use",
      "Integration with local hardware, printers, and file systems",
      "Installer packaging and update/versioning workflows",
      "Migration support for teams moving off legacy software",
    ],
    stack: [".NET / C#", "WPF", "Electron", "SQL Server"],
  },
  {
    slug: "digital-marketing",
    tag: "MKT",
    kind: "marketing",
    title: "Digital Marketing",
    tagline: "SEO, paid campaigns, and content strategy that turn traffic into pipeline.",
    description:
      "A great product still needs to be found. We run search, social, and content strategy the same way we build software — with clear goals, visible reporting, and no vanity metrics dressed up as results.",
    features: [
      "SEO audits and ongoing on-page / technical optimization",
      "Paid campaigns across Google, Meta, and LinkedIn",
      "Content strategy and editorial calendars",
      "Monthly reporting tied to leads and conversions, not just clicks",
    ],
    stack: ["Google Ads", "Meta Ads", "Google Analytics", "SEMrush"],
  },
  {
    slug: "graphic-design",
    tag: "DES",
    kind: "design",
    title: "Graphic Design",
    tagline: "Brand identity, UI design, and visual systems that hold together at any size.",
    description:
      "From a first logo to a full design system, we build visual identities that stay consistent across your website, app, and print materials — with source files and guidelines you actually own.",
    features: [
      "Brand identity: logo, color, typography, and usage guidelines",
      "UI/UX design for web and mobile products",
      "Marketing collateral: social templates, decks, print",
      "Full design systems and component libraries for product teams",
    ],
    stack: ["Figma", "Adobe Illustrator", "Adobe Photoshop", "After Effects"],
  },
];

/* ---------------------------------------------------------------- */
/*  Sticky sub-navigation with scroll-spy + deep-linkable hashes     */
/* ---------------------------------------------------------------- */

const SubNav = ({ activeSlug, onNavigate }) => (
  <div className="sticky top-[70px] z-30 bg-white/90 backdrop-blur-md border-b border-black/5">
    <div className="mx-auto max-w-7xl px-4 md:px-10">
      <div className="flex gap-1 overflow-x-auto no-scrollbar py-3">
        {SERVICES.map((s) => (
          <button
            key={s.slug}
            onClick={() => onNavigate(s.slug)}
            className="shrink-0 rounded-full px-4 py-2 text-[13px] font-medium whitespace-nowrap transition-colors"
            style={
              activeSlug === s.slug
                ? { background: GRADIENT, color: "#fff" }
                : { color: "#4b5468", background: "transparent" }
            }
          >
            {s.title}
          </button>
        ))}
      </div>
    </div>
  </div>
);

/* ---------------------------------------------------------------- */
/*  Page                                                              */
/* ---------------------------------------------------------------- */

export default function Services() {
  const [activeSlug, setActiveSlug] = useState(SERVICES[0].slug);
  const sectionRefs = useRef({});
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll-spy: highlight whichever section is currently in view.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSlug(entry.target.id);
        });
      },
      { rootMargin: "-160px 0px -55% 0px", threshold: 0 }
    );
    Object.values(sectionRefs.current).forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  // Deep link support: /services#android-app-development scrolls straight there.
  useEffect(() => {
    const slug = location.hash?.replace("#", "");
    if (slug && sectionRefs.current[slug]) {
      setTimeout(() => {
        sectionRefs.current[slug].scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    }
  }, [location.hash]);

  const goTo = (slug) => {
    navigate(`#${slug}`, { replace: false });
    sectionRefs.current[slug]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="w-full overflow-x-hidden">
      <style>{`.no-scrollbar::-webkit-scrollbar{display:none} .no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}`}</style>

      {/* ============= HERO ============= */}
      <section
        className="relative overflow-hidden"
        style={{
          background: `radial-gradient(1000px 480px at 85% -10%, rgba(46,111,242,.22), transparent 60%),
                       radial-gradient(800px 420px at 5% 110%, rgba(23,195,162,.14), transparent 55%),
                       linear-gradient(180deg, ${INK} 0%, ${INK_2} 100%)`,
        }}
      >
        <PixelTrail className="absolute top-10 right-10 hidden md:flex" />
        <div className="mx-auto max-w-3xl px-6 md:px-10 py-20 md:py-28 text-center" style={{ backgroundImage: "url('assets/hero 1.png')", backgroundSize: "cover" }}>
          <Reveal>
            <div className="flex justify-center">
              <Eyebrow tone="dark">What we build</Eyebrow>
            </div>
            <h1 className="mt-5 text-white font-bold leading-[1.1] text-[32px] sm:text-[42px] md:text-[48px]">
              Six disciplines,{" "}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: GRADIENT }}>
                one team
              </span>
              .
            </h1>
            <p className="mt-5 text-white/70 text-[16.5px] leading-relaxed max-w-[52ch] mx-auto">
              Every service below is handled in-house — no outsourcing to a third agency halfway through your project. Jump to any service, or scroll through all six.
            </p>
          </Reveal>
          {/* <img
            src={logo}
            alt="ATX Base"
            className=" h-auto w-auto object-contain"
            
          /> */}
        </div>
      </section>

      {/* ============= STICKY SUB-NAV ============= */}
      <SubNav activeSlug={activeSlug} onNavigate={goTo} />

      {/* ============= SERVICE SECTIONS ============= */}
      {SERVICES.map((s, i) => {
        const flip = i % 2 === 1;
        return (
          <section
            key={s.slug}
            id={s.slug}
            ref={(el) => (sectionRefs.current[s.slug] = el)}
            className="scroll-mt-[132px] py-20 md:py-24 border-b border-black/5"
            style={{ background: i % 2 === 0 ? "#ffffff" : "#f5f7fb" }}
          >
            <div className="mx-auto max-w-6xl px-6 md:px-10">
              <div className={`grid lg:grid-cols-2 gap-12 items-center ${flip ? "lg:[&>*:first-child]:order-2" : ""}`}>
                <Reveal className="flex justify-center lg:justify-start">
                  <ServiceVisual kind={s.kind} />
                </Reveal>

                <Reveal style={{ transitionDelay: "80ms" }}>
                  <span
                    className="inline-block rounded-md px-2.5 py-1 font-mono text-[12px] font-semibold tracking-[0.12em]"
                    style={{ color: BLUE, background: "linear-gradient(115deg, rgba(46,111,242,.14), rgba(23,195,162,.14))" }}
                  >
                    {s.tag}
                  </span>
                  <h2 className="mt-4 text-[26px] md:text-[32px] font-bold leading-tight" style={{ color: INK }}>
                    {s.title}
                  </h2>
                  <p className="mt-2 text-[15.5px] font-medium" style={{ color: BLUE }}>
                    {s.tagline}
                  </p>
                  <p className="mt-4 text-[15px] text-[#5b6478] leading-relaxed">{s.description}</p>

                  <ul className="mt-6 space-y-3">
                    {s.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <Check />
                        <span className="text-[14.5px] text-[#3a4258] leading-relaxed">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {s.stack.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border px-3 py-1.5 text-[12.5px] text-[#4b5468]"
                        style={{ borderColor: "rgba(10,15,36,.1)" }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <Link
                    to="/contact-us"
                    className="mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-[14px] font-semibold text-white shadow-md transition-transform hover:-translate-y-0.5"
                    style={{ background: GRADIENT }}
                  >
                    Talk about {s.title.split(" ")[0]}
                  </Link>
                </Reveal>
              </div>
            </div>
          </section>
        );
      })}

      {/* ============= CTA ============= */}
      <section
        className="relative overflow-hidden py-24 text-center"
        style={{ background: `linear-gradient(155deg, ${INK} 0%, ${INK_2} 100%)` }}
      >
        <PixelTrail className="absolute bottom-8 right-8" />
        <Reveal className="mx-auto max-w-xl px-6">
          <h2 className="text-white font-bold text-[26px] md:text-[36px] leading-tight">
            Not sure which service you need?
          </h2>
          <p className="mt-4 text-white/65 text-[15.5px] leading-relaxed">
            Tell us what you&rsquo;re trying to build — we&rsquo;ll tell you which of these actually applies.
          </p>
          <Link
            to="/contact-us"
            className="mt-8 inline-flex items-center justify-center rounded-full px-7 py-3.5 text-[14.5px] font-semibold text-white shadow-[0_12px_24px_-10px_rgba(23,195,162,.45)] transition-transform hover:-translate-y-0.5"
            style={{ background: GRADIENT }}
          >
            Get in touch
          </Link>
        </Reveal>
      </section>
    </div>
  );
}