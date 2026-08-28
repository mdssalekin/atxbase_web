import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

// TODO: once you have real photos/screenshots for each section, import them
// here and pass as the `image` prop on the matching <ServiceSection>, e.g.:
//   import webAppPhoto from "./assets/web-application-development.jpg";
//   <ServiceSection ... image={webAppPhoto} />
// Leaving `image` unset (as below) renders a labeled placeholder instead
// of a broken <img>, so the page looks finished either way.

/** Brand tokens — mirror Header.jsx / Home.jsx / Services.jsx / Footer.jsx */
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
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
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

// Image slot: pass a real `src` once you have one; until then it renders a
// clearly-labeled placeholder instead of a broken <img>.
const ImageSlot = ({ src, alt, icon }) => (
  <div className="relative w-full aspect-[4/3] rounded-[26px] overflow-hidden border border-black/5 shadow-xl">
    {src ? (
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    ) : (
      <div
        className="w-full h-full flex flex-col items-center justify-center gap-3 text-center px-8"
        style={{ background: `linear-gradient(155deg, ${INK} 0%, ${INK_2} 100%)` }}
      >
        <div
          className="h-16 w-16 rounded-2xl flex items-center justify-center"
          style={{ background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.14)" }}
        >
          <svg viewBox="0 0 32 32" className="h-8 w-8" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d={icon} />
          </svg>
        </div>
        <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-white/35">Photo goes here</p>
        <p className="text-white/55 text-[13px] leading-relaxed max-w-[26ch]">{alt}</p>
      </div>
    )}
  </div>
);

/* ---------------------------------------------------------------- */
/*  Content                                                           */
/* ---------------------------------------------------------------- */

const SECTIONS = [
  {
    id: "web-application",
    tag: "WEB",
    title: "Web Application Development",
    tagline: "Dashboards, portals, and SaaS products that run in the browser, on any device.",
    description:
      "We build web applications for teams that need more than a website — real authentication, real data, and an interface people use every day. Built to run in any modern browser, with no install required for your users.",
    features: [
      "Custom dashboards, admin panels, and customer portals",
      "API design and integration with your existing systems",
      "Role-based access and multi-tenant architecture where needed",
      "Cloud deployment with monitoring built in from day one",
    ],
    icon: "M4 4h24v24H4zM4 12h24M12 12v16",
    imgAlt: "Web application dashboard screenshot",
  },
  {
    id: "computer-application",
    tag: "DESKTOP",
    title: "Computer Application Development",
    tagline: "Desktop software for teams and workflows that live outside the browser.",
    description:
      "Some tools belong on the desktop — point-of-sale systems, internal operations software, or anything that needs direct access to local files and hardware. We build Windows (and where needed, cross-platform) desktop applications that are stable, easy to install, and simple to update.",
    features: [
      "Custom desktop software for internal or customer-facing use",
      "Integration with local hardware, printers, and file systems",
      "Installer packaging and update/versioning workflows",
      "Migration support for teams replacing legacy desktop tools",
    ],
    icon: "M4 5h24v16H4zM12 26h8M16 21v5",
    imgAlt: "Desktop application interface screenshot",
  },
  {
    id: "mobile-application",
    tag: "MOBILE",
    title: "Mobile Application Development",
    tagline: "Native and cross-platform apps built for real devices, not just demos.",
    description:
      "We design and build mobile apps for Android and iOS — native when performance matters most, cross-platform when speed to market does. Every app is tested across a real spread of devices, not just the newest flagship phone.",
    features: [
      "Native (Kotlin / Swift) or cross-platform builds, matched to your budget",
      "App Store and Play Store submission and release management",
      "Push notifications, in-app purchases, and third-party integrations",
      "Offline support and performance testing across device tiers",
    ],
    icon: "M11 3h10v26H11zM16 25.5h.01",
    imgAlt: "Mobile application screens on a phone",
  },
];

/* ---------------------------------------------------------------- */
/*  Page                                                              */
/* ---------------------------------------------------------------- */

export default function AppDev() {
  return (
    <div className="w-full overflow-x-hidden">
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
        <div className="mx-auto max-w-3xl px-6 md:px-10 py-20 md:py-28 text-center">
          <Reveal>
            <div className="flex justify-center">
              <Eyebrow tone="dark">Application Development</Eyebrow>
            </div>
            <h1 className="mt-5 text-white font-bold leading-[1.1] text-[32px] sm:text-[42px] md:text-[48px]">
              One team, every{" "}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: GRADIENT }}>
                screen
              </span>
              .
            </h1>
            <p className="mt-5 text-white/70 text-[16.5px] leading-relaxed max-w-[52ch] mx-auto">
              Whether it runs in a browser, on a desktop, or in someone's pocket, we design and build applications with the architecture to scale and the polish to actually get used.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============= SECTIONS ============= */}
      {SECTIONS.map((s, i) => {
        const flip = i % 2 === 1;
        return (
          <section
            key={s.id}
            id={s.id}
            className="scroll-mt-[100px] py-20 md:py-24 border-b border-black/5"
            style={{ background: i % 2 === 0 ? "#ffffff" : "#f5f7fb" }}
          >
            <div className="mx-auto max-w-6xl px-6 md:px-10">
              <div className={`grid lg:grid-cols-2 gap-12 items-center ${flip ? "lg:[&>*:first-child]:order-2" : ""}`}>
                <Reveal>
                  <ImageSlot alt={s.imgAlt} icon={s.icon} />
                </Reveal>

                <Reveal style={{ transitionDelay: "80ms" }}>
                  <span
                    className="inline-block rounded-md px-2.5 py-1 font-mono text-[12px] font-semibold tracking-[0.12em]"
                    style={{ color: BLUE, background: "linear-gradient(115deg, rgba(46,111,242,.14), rgba(23,195,162,.14))" }}
                  >
                    {s.tag}
                  </span>
                  <h2 className="mt-4 text-[24px] md:text-[30px] font-bold leading-tight" style={{ color: INK }}>
                    {s.title}
                  </h2>
                  <p className="mt-2 text-[15px] font-medium" style={{ color: BLUE }}>
                    {s.tagline}
                  </p>
                  <p className="mt-4 text-[14.5px] text-[#5b6478] leading-relaxed">{s.description}</p>

                  <ul className="mt-6 space-y-3">
                    {s.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <Check />
                        <span className="text-[14px] text-[#3a4258] leading-relaxed">{f}</span>
                      </li>
                    ))}
                  </ul>
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
          <Eyebrow tone="dark" center>
            Not sure which fits?
          </Eyebrow>
          <h2 className="mt-5 text-white font-bold text-[26px] md:text-[36px] leading-tight">
            Tell us what you&rsquo;re building.
          </h2>
          <p className="mt-4 text-white/65 text-[15.5px] leading-relaxed">
            Web, desktop, or mobile — we&rsquo;ll help you figure out which one actually fits the problem.
          </p>
          <Link
            to="/contact-us"
            className="mt-8 inline-flex items-center justify-center rounded-full px-7 py-3.5 text-[14.5px] font-semibold text-white shadow-[0_12px_24px_-10px_rgba(23,195,162,.45)] transition-transform hover:-translate-y-0.5"
            style={{ background: GRADIENT }}
          >
            Start a Project
          </Link>
        </Reveal>
      </section>
    </div>
  );
}