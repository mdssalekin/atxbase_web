import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import hubDiagramImg from "./assets/ai-automation.png";

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

/* ---------------------------------------------------------------- */
/*  Content — pulled from the poster copy                            */
/* ---------------------------------------------------------------- */

const CAPABILITIES = [
  {
    title: "Process Automation",
    desc: "Automate repetitive tasks and boost operational efficiency across your team.",
    icon: "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4",
  },
  {
    title: "AI-Powered Insights",
    desc: "Turn raw data into intelligent insights that lead to better decisions.",
    icon: "M4 20V10M11 20V4M18 20v-7",
  },
  {
    title: "Smart Integration",
    desc: "Seamless integration with the systems and tools you already run on.",
    icon: "M9 3h6v6H9zM9 15h6v6H9zM4 9v6h5M15 12h5",
  },
  {
    title: "Scalable Solutions",
    desc: "Built to scale with your business and its future needs, not just today's.",
    icon: "M13 3 4 14h7l-1 7 9-11h-7l1-7Z",
  },
];

// The five nodes around the "AI" core in the diagram.
const HUB_NODES = [
  "Data Analytics",
  "Intelligent Workflows",
  "Robotic Process Automation",
  "Smart Integration",
  "Machine Learning",
];

const BENEFITS = [
  { title: "Increase Productivity", icon: "M13 3 4 14h7l-1 7 9-11h-7l1-7Z" },
  { title: "Reduce Costs", icon: "M12 3v18M7 7.5c0-1.7 2-3 5-3s5 1.3 5 3-2 3-5 3-5 1.3-5 3 2 3 5 3 5-1.3 5-3" },
  { title: "Improve Accuracy", icon: "M12 3v4M12 17v4M3 12h4M17 12h4M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" },
  { title: "Drive Growth", icon: "M4 20V10M11 20V4M18 20v-7" },
];

/* ---------------------------------------------------------------- */
/*  Page                                                              */
/* ---------------------------------------------------------------- */

export default function AiAutomation() {
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
              <Eyebrow tone="dark">AI &amp; Automation</Eyebrow>
            </div>
            <h1 className="mt-5 text-white font-bold leading-[1.1] text-[32px] sm:text-[42px] md:text-[48px]">
              Intelligent solutions.{" "}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: GRADIENT }}>
                Smarter
              </span>{" "}
              future.
            </h1>
            <p className="mt-5 text-white/70 text-[16.5px] leading-relaxed max-w-[52ch] mx-auto">
              We combine AI and automation to streamline processes, reduce costs, and drive innovation across your business.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============= CAPABILITIES ============= */}
      <section className="py-20 md:py-24 bg-white">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <Reveal className="max-w-xl mb-14">
            <Eyebrow>What we do</Eyebrow>
            <h2 className="mt-4 text-[26px] md:text-[36px] font-bold leading-tight" style={{ color: INK }}>
              Automation that removes work, not jobs.
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CAPABILITIES.map((c, i) => (
              <Reveal
                key={c.title}
                className="rounded-2xl border border-black/5 p-6 bg-[#f5f7fb]"
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <div
                  className="h-11 w-11 rounded-xl flex items-center justify-center"
                  style={{ background: "linear-gradient(115deg, rgba(46,111,242,.14), rgba(23,195,162,.14))" }}
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke={BLUE} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d={c.icon} />
                  </svg>
                </div>
                <h3 className="mt-4 text-[15px] font-semibold" style={{ color: INK }}>
                  {c.title}
                </h3>
                <p className="mt-2 text-[13.5px] text-[#5b6478] leading-relaxed">{c.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============= HUB DIAGRAM ============= */}
      <section className="py-20 md:py-24" style={{ background: INK }}>
        <div className="mx-auto max-w-5xl px-6 md:px-10">
          <Reveal className="text-center max-w-2xl mx-auto mb-12">
            <Eyebrow tone="dark" center>
              Where AI plugs in
            </Eyebrow>
            <h2 className="mt-4 text-[24px] md:text-[32px] font-bold leading-tight text-white">
              One core, five connected capabilities.
            </h2>
            <p className="mt-4 text-[15px] text-white/60 leading-relaxed">
              {HUB_NODES.join(", ")} — all built around a central AI engine so each piece strengthens the others instead of running in isolation.
            </p>
          </Reveal>

          <Reveal className="rounded-[24px] overflow-hidden border border-white/10 shadow-2xl">
            <img
              src={hubDiagramImg}
              alt="ATX Base AI & Automation: data analytics, intelligent workflows, robotic process automation, smart integration, and machine learning connected around a central AI core"
              className="w-full h-auto block"
            />
          </Reveal>
        </div>
      </section>

      {/* ============= QUOTE ============= */}
      <section className="py-20 bg-[#f5f7fb]">
        <Reveal className="mx-auto max-w-2xl px-6 text-center">
          <span className="text-[40px] leading-none font-serif" style={{ color: BLUE }}>
            &ldquo;
          </span>
          <p className="mt-2 text-[20px] md:text-[24px] font-medium leading-snug" style={{ color: INK }}>
            AI and Automation are not just the future, they are the{" "}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: GRADIENT }}>
              competitive advantage
            </span>{" "}
            your business needs today.
          </p>
        </Reveal>
      </section>

      {/* ============= BENEFITS STRIP ============= */}
      <section className="py-14" style={{ background: INK }}>
        <div className="mx-auto max-w-5xl px-6 md:px-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {BENEFITS.map((b) => (
              <Reveal key={b.title} className="flex flex-col items-center text-center gap-3">
                <div
                  className="h-12 w-12 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.14)" }}
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d={b.icon} />
                  </svg>
                </div>
                <p className="text-[12.5px] font-medium tracking-wide text-white/75 uppercase">{b.title}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============= CTA ============= */}
      <section className="relative overflow-hidden py-24 text-center bg-white">
        <Reveal className="mx-auto max-w-xl px-6">
          <Eyebrow center>Let&rsquo;s automate today</Eyebrow>
          <h2 className="mt-5 font-bold text-[26px] md:text-[36px] leading-tight" style={{ color: INK }}>
            Ready to lead tomorrow?
          </h2>
          <p className="mt-4 text-[15.5px] text-[#5b6478] leading-relaxed">
            Tell us what&rsquo;s eating your team&rsquo;s time — we&rsquo;ll tell you what&rsquo;s actually worth automating.
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