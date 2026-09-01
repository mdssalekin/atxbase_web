import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import homeFirst from "./assets/home-1.png";
import homeSecond from "./assets/atx-base-process.png";
/**
 * Shared brand tokens — mirror the values used in Header.jsx.
 * Worth lifting into a single `theme.js` once more pages use them.
 */
const INK = "#0a0f24";
const INK_2 = "#111a36";
const BLUE = "#2e6ff2";
const TEAL = "#17c3a2";
const GRADIENT = `linear-gradient(115deg, ${BLUE}, ${TEAL})`;

/* ---------------------------------------------------------------- */
/*  Small helpers                                                    */
/* ---------------------------------------------------------------- */

// Fades + lifts a section in once it enters the viewport.
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

const Eyebrow = ({ children, tone = "light" }) => (
  <div
    className="inline-flex items-center gap-2.5 font-mono text-[12px] font-medium tracking-[0.18em] uppercase"
    style={{ color: tone === "dark" ? "#8fb4ff" : BLUE }}
  >
    <span className="h-px w-5" style={{ background: GRADIENT }} />
    {children}
  </div>
);

// The dissolving pixel-block trail from the mark, reused as a signature motif.
const PixelTrail = ({ sizes = [26, 20, 15, 11, 8], className = "" }) => (
  <div className={`pointer-events-none flex flex-col items-end gap-2 ${className}`}>
    {sizes.map((s, i) => (
      <span
        key={i}
        style={{
          width: s,
          height: s,
          marginRight: i * 14,
          borderRadius: 4,
          background: GRADIENT,
          opacity: 1 - i * 0.15,
        }}
      />
    ))}
  </div>
);

/* ---------------------------------------------------------------- */
/*  Content                                                          */
/* ---------------------------------------------------------------- */

const CAPABILITIES = [
  "Web Development",
  "Application Development",
  "System Design",
  "AI & Automation",
  "Data Science",
  "Digital Marketing",
  "Graphic Design",
];

const SERVICES = [
  {
    tag: "WEB",
    title: "Web & Application Development",
    desc: "Modern websites and scalable applications built for speed, accessibility, performance, and seamless growth across web, mobile, and desktop.",
  },
  {
    tag: "SYS",
    title: "System Design",
    desc: "Robust system architectures designed for reliability, maintainability, security, and seamless growth as your requirements evolve.",
  },
  {
    tag: "AI",
    title: "AI & Automation",
    desc: "AI-powered solutions and workflow automation that reduce repetitive work, improve efficiency, and unlock new possibilities.",
  },
  {
    tag: "DATA",
    title: "Data Science",
    desc: "Data analysis, predictive modeling, and intelligent insights that help transform complex data into better business decisions.",
  },
  {
    tag: "MKT",
    title: "Digital Marketing",
    desc: "SEO, paid campaigns, social media, and content strategies designed to increase visibility, engagement, and qualified leads.",
  },
  {
    tag: "DES",
    title: "Graphic Design",
    desc: "Brand identity, UI design, marketing materials, and visual systems that create a consistent and memorable presence.",
  },
];

const PROCESS = [
  { n: "01", when: "Week 1", title: "Discover", desc: "We start with your goals, your users, and the constraints that matter — budget, timeline, and what \u201cdone\u201d actually looks like." },
  { n: "02", when: "Week 2–3", title: "Design", desc: "Information architecture, UI design, and technical planning, reviewed with you before a single line of production code is written." },
  { n: "03", when: "Sprints", title: "Build", desc: "Development in short, visible sprints across web, mobile, or desktop — with staging environments you can check in on any time." },
  { n: "04", when: "Go-live", title: "Launch", desc: "QA across devices, performance checks, and a deployment plan that avoids surprises on release day." },
  { n: "05", when: "Ongoing", title: "Grow", desc: "Marketing, support, and iteration once real users are in the product — because launch is the start, not the finish." },
];

const APPROACH = [
  { accent: INK, title: "One team, every layer", desc: "The people who design your product are the same people who build it and market it — so nothing gets rewritten in translation between agencies." },
  { accent: BLUE, title: "Built to be maintained", desc: "Clean, documented code and a handover you can actually read. Your product stays yours, not a black box only we understand." },
  { accent: TEAL, title: "Straight answers", desc: "Realistic timelines, plain-language updates, and no scope surprises halfway through a build." },
];

/* ---------------------------------------------------------------- */
/*  Page                                                              */
/* ---------------------------------------------------------------- */

export default function Home() {
  return (
    <div className="w-full overflow-x-hidden">
      {/* marquee keyframes (scoped, no config changes needed) */}
      <style>{`
        @keyframes atxScrollX { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .atx-marquee-track { animation: atxScrollX 28s linear infinite; }
        @media (prefers-reduced-motion: reduce) { .atx-marquee-track { animation: none; } }
      `}</style>

      {/* ============= HERO ============= */}
      <section
        className="relative overflow-hidden"
        style={{
          background: `radial-gradient(1100px 520px at 82% -10%, rgba(46,111,242,.22), transparent 60%),
                       radial-gradient(900px 460px at 8% 110%, rgba(23,195,162,.14), transparent 55%),
                       linear-gradient(180deg, ${INK} 0%, ${INK_2} 100%)`,
        }}
      >
        <div className="mx-auto max-w-7xl px-6 md:px-10 py-24 md:py-32 grid lg:grid-cols-[1.1fr_.9fr] gap-16 items-center">
          <Reveal>
            <Eyebrow tone="dark">Advanced Technology Exchange</Eyebrow>
            <h1 className="mt-5 text-white font-bold leading-[1.05] text-[38px] sm:text-[46px] md:text-[58px] max-w-[15ch]">
              A solid{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: GRADIENT }}
              >
                base
              </span>{" "}
              for ambitious technology.
            </h1>
            <p className="mt-6 text-white/80 text-[17px] md:text-[18px] leading-relaxed max-w-[46ch]">
              ATX Base designs, builds, and grows the digital products companies run on — websites, applications, and the marketing and design that carry them to the people who need them.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                to="/contact-us"
                className="inline-flex items-center justify-center rounded-full px-7 py-3.5 text-[14.5px] font-semibold text-white shadow-[0_12px_24px_-10px_rgba(23,195,162,.45)] transition-transform hover:-translate-y-0.5"
                style={{ background: GRADIENT }}
              >
                Start a project
              </Link>
              <a
                href="#services"
                className="inline-flex items-center justify-center rounded-full px-7 py-3.5 text-[14.5px] font-semibold text-white border border-white/15 transition hover:border-white/35 hover:bg-white/5"
              >
                See what we do
              </a>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-3 font-mono text-[12px] tracking-[0.1em] uppercase text-white/80">
              {CAPABILITIES.map((c, i) => (
                <React.Fragment key={c}>
                  <span className="text-white/80">{c}</span>
                  {i < CAPABILITIES.length - 1 && <span className="h-[3px] w-[3px] rounded-full bg-white/80" />}
                </React.Fragment>
              ))}
            </div>
          </Reveal>

          {/* abstract product-frame visual — no external asset required */}
          <Reveal className="relative hidden lg:flex items-center justify-center">

            <div className="relative z-10 w-full max-w-[440px]">
              {/* Soft ambient glow behind the image */}
              <div
                className="absolute -inset-6 rounded-[40px] blur-3xl opacity-20"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(46,111,242,.8), rgba(23,195,162,.7))",
                }}
              />

              {/* Image frame */}
              <div
                className="relative overflow-hidden rounded-[28px] border border-white/10 p-2 shadow-2xl"
                style={{
                  background:
                    "linear-gradient(155deg, rgba(255,255,255,.09), rgba(255,255,255,.025))",
                }}
              >
                <div className="relative overflow-hidden rounded-[22px]">
                  <img
                    src={homeFirst}
                    alt="ATX Base technology environment"
                    className="block w-full h-auto aspect-[11/14] object-cover object-center"
                  />

                  {/* Subtle gradient overlay */}
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(7,16,32,0) 55%, rgba(7,16,32,.28) 100%)",
                    }}
                  />
                </div>
              </div>

              {/* Small decorative element */}
              <div
                className="absolute -bottom-5 -left-5 h-16 w-16 rounded-2xl border border-white/10 backdrop-blur-md"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(46,111,242,.22), rgba(23,195,162,.14))",
                }}
              />

              <div
                className="absolute -top-5 -right-5 h-12 w-12 rounded-full border border-white/10"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(46,111,242,.25), rgba(23,195,162,.18))",
                }}
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============= CAPABILITY MARQUEE ============= */}
      <div className="bg-[#eceff7] border-b border-black/5 py-5 overflow-hidden">
        <div className="atx-marquee-track flex w-max gap-14">
          {[...CAPABILITIES, ...CAPABILITIES, ...CAPABILITIES].map((c, i) => (
            <span key={i} className="flex items-center gap-3 font-mono text-[13px] tracking-[0.06em] uppercase text-[#5b6478] whitespace-nowrap">
              <b className="text-[#0a0f24] font-semibold">{c}</b>
              <span style={{ color: BLUE }}>·</span>
            </span>
          ))}
        </div>
      </div>

      {/* ============= SERVICES ============= */}
      <section id="services" className="py-28 md:py-32 bg-[#f5f7fb]">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <Reveal className="max-w-xl mb-16">
            <Eyebrow>What we build</Eyebrow>
            <h2 className="mt-4 text-[28px] md:text-[40px] font-bold leading-tight" style={{ color: INK }}>
              Six disciplines, one team.
            </h2>
            <p className="mt-4 text-[16.5px] text-[#5b6478] leading-relaxed">
              Most projects need more than one skill set. We keep engineering, design, and marketing under a single roof so nothing gets lost between agencies — or between departments.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px rounded-[18px] border border-black/[0.07] bg-black/[0.07] overflow-hidden">
            {SERVICES.map((s, i) => (
              <Reveal
                key={s.tag}
                as="article"
                className="group relative bg-white p-9 min-h-[220px] flex flex-col hover:bg-[#fbfcff] transition-colors"
                style={{ transitionDelay: `${(i % 3) * 80}ms` }}
              >
                <span
                  className="w-fit rounded-md px-2.5 py-1 font-mono text-[12px] font-semibold tracking-[0.12em]"
                  style={{ color: BLUE, background: "linear-gradient(115deg, rgba(46,111,242,.14), rgba(23,195,162,.14))" }}
                >
                  {s.tag}
                </span>
                <h3 className="mt-5 text-[20px] font-semibold" style={{ color: INK }}>
                  {s.title}
                </h3>
                <p className="mt-3 text-[14.5px] text-[#5b6478] leading-relaxed flex-1">{s.desc}</p>

                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <PixelTrail sizes={[14, 11, 8]} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============= PROCESS ============= */}
      <section
        id="process"
        className="py-28 md:py-32 overflow-hidden"
        style={{ background: INK }}
      >
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-16 xl:gap-24 items-start">

            {/* LEFT — PROCESS */}
            <div>
              <Reveal className="max-w-xl mb-12 md:mb-14">
                <Eyebrow tone="dark">How we work</Eyebrow>

                <h2 className="mt-4 text-[28px] md:text-[40px] font-bold leading-tight text-white">
                  From brief to launch, and beyond.
                </h2>

                <p className="mt-4 text-[16.5px] text-white/60 leading-relaxed">
                  The same five-stage path runs under every engagement, whether it&rsquo;s
                  a five-page site or a full product build.
                </p>
              </Reveal>

              <div className="relative">
                {/* Timeline line */}
                <div
                  className="absolute left-[27px] top-2 bottom-2 w-px"
                  style={{
                    background:
                      "linear-gradient(to bottom, rgba(255,255,255,.2), rgba(255,255,255,0))",
                  }}
                />

                {PROCESS.map((p) => (
                  <Reveal
                    key={p.n}
                    className="relative grid grid-cols-[56px_1fr] gap-7 py-7 border-b border-white/10 last:border-none"
                  >
                    {/* Number */}
                    <div
                      className="relative z-10 h-14 w-14 rounded-full border border-white/10 flex items-center justify-center font-mono text-sm font-semibold"
                      style={{
                        background: INK_2,
                        color: "#8fb4ff",
                        boxShadow: "0 0 0 6px rgba(7,16,32,.9)",
                      }}
                    >
                      {p.n}
                    </div>

                    {/* Content */}
                    <div className="pt-0.5">
                      <div className="flex items-baseline gap-4 flex-wrap">
                        <h3 className="text-white text-xl font-semibold">
                          {p.title}
                        </h3>

                        <span
                          className="font-mono text-[11px] tracking-[0.08em] uppercase"
                          style={{ color: TEAL }}
                        >
                          {p.when}
                        </span>
                      </div>

                      <p className="mt-2 text-[15px] text-white/60 leading-relaxed max-w-[60ch]">
                        {p.desc}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* RIGHT — IMAGE */}
            <Reveal className="relative lg:sticky lg:top-28">
              <div className="relative mx-auto w-full max-w-[380px] sm:max-w-[440px] lg:max-w-[500px] xl:max-w-[560px]">

                {/* Ambient glow */}
                <div
                  className="absolute -inset-8 rounded-[50px] blur-3xl opacity-20"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(46,111,242,.8), rgba(23,195,162,.65))",
                  }}
                />

                {/* Decorative grid */}
                <div
                  className="absolute -top-8 -right-8 h-32 w-32 opacity-30"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.12) 1px, transparent 1px)",
                    backgroundSize: "16px 16px",
                    maskImage:
                      "linear-gradient(to bottom left, black, transparent)",
                    WebkitMaskImage:
                      "linear-gradient(to bottom left, black, transparent)",
                  }}
                />

                {/* Image container */}
                <div
                  className="relative overflow-hidden rounded-[32px] border border-white/10 p-2 shadow-2xl"
                  style={{
                    background:
                      "linear-gradient(145deg, rgba(255,255,255,.09), rgba(255,255,255,.025))",
                  }}
                >
                  <div className="relative overflow-hidden rounded-[25px]">

                    <img
                      src={homeSecond}
                      alt="ATX Base technology and digital development"
                      className="block w-full h-auto aspect-[5/6] object-cover object-center"
                    />

                    {/* Dark cinematic overlay */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(7,16,32,.02) 35%, rgba(7,16,32,.55) 100%)",
                      }}
                    />

                    {/* Bottom accent */}
                    <div
                      className="absolute bottom-0 left-0 right-0 h-[3px]"
                      style={{ background: GRADIENT }}
                    />
                  </div>
                </div>

                {/* Floating accent */}
                <div
                  className="absolute -bottom-6 -left-6 h-20 w-20 rounded-2xl border border-white/10 backdrop-blur-md"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(46,111,242,.24), rgba(23,195,162,.14))",
                  }}
                >
                  <div className="flex h-full items-center justify-center">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ background: GRADIENT }}
                    />
                  </div>
                </div>

                {/* Small top-right accent */}
                <div
                  className="absolute -top-5 -right-5 h-11 w-11 rounded-full border border-white/10"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(46,111,242,.3), rgba(23,195,162,.18))",
                  }}
                />
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ============= APPROACH ============= */}
      <section id="approach" className="py-28 md:py-32 bg-[#f5f7fb]">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <Reveal className="max-w-xl mb-16">
            <Eyebrow>Why ATX Base</Eyebrow>
            <h2 className="mt-4 text-[28px] md:text-[40px] font-bold leading-tight" style={{ color: INK }}>
              Technology, without the translation layer.
            </h2>
            <p className="mt-4 text-[16.5px] text-[#5b6478] leading-relaxed">A few things we hold to on every project, no matter the size.</p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-11">
            {APPROACH.map((a) => (
              <Reveal key={a.title} className="pt-1" style={{ borderTop: `2px solid ${a.accent}` }}>
                <h3 className="mt-5 text-[19px] font-semibold" style={{ color: INK }}>
                  {a.title}
                </h3>
                <p className="mt-3 text-[15px] text-[#5b6478] leading-relaxed">{a.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============= CTA ============= */}
      <section
        className="relative overflow-hidden py-28 text-center"
        style={{ background: `linear-gradient(155deg, ${INK} 0%, ${INK_2} 100%)` }}
      >
        <PixelTrail className="absolute top-8 left-8 rotate-180" sizes={[20, 15, 11, 8]} />
        <PixelTrail className="absolute bottom-8 right-8" sizes={[20, 15, 11, 8]} />

        <Reveal className="mx-auto max-w-2xl px-6">
          <div className="flex justify-center">
            <Eyebrow tone="dark">Let&rsquo;s talk</Eyebrow>
          </div>
          <h2 className="mt-5 text-white font-bold text-[30px] md:text-[46px] leading-tight">
            Have a project in mind?
          </h2>
          <p className="mt-5 text-white/80 text-[16.5px] leading-relaxed">
            Tell us what you&rsquo;re building — a website, an application, a full product launch — and we&rsquo;ll come back with a plan, not just a quote.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <a
              href="mailto:atxbaselimited@gmail.com"
              className="inline-flex items-center justify-center rounded-full px-7 py-3.5 text-[14.5px] font-semibold text-white shadow-[0_12px_24px_-10px_rgba(23,195,162,.45)] transition-transform hover:-translate-y-0.5"
              style={{ background: GRADIENT }}
            >
              atxbaselimited@gmail.com
            </a>
            <Link
              to="/contact-us"
              className="inline-flex items-center justify-center rounded-full px-7 py-3.5 text-[14.5px] font-semibold text-white border border-white/15 transition hover:border-white/35 hover:bg-white/5"
            >
              Contact page
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}