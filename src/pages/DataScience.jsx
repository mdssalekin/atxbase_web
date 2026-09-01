import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import dashboardImg from "./assets/data-science.png";
import atxBaseBackground from "./assets/atx-base-background.png";

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

// A genuine 4-stage sequence, so numbering it is justified.
const PROCESS = [
  { n: "01", title: "Collect", desc: "Gather data from multiple sources.", icon: "M4 7c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3Zm0 0v10c0 1.7 3.6 3 8 3s8-1.3 8-3V7M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" },
  { n: "02", title: "Analyze", desc: "Discover patterns, trends, and correlations.", icon: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14Zm10 17-5.5-5.5M8 14l2-3 2 1.5L14 8" },
  { n: "03", title: "Insight", desc: "Generate actionable insights for better decisions.", icon: "M9 18h6M10 21h4M12 3a6 6 0 0 0-3.6 10.8c.4.3.6.8.6 1.2v.5h6v-.5c0-.4.2-.9.6-1.2A6 6 0 0 0 12 3Z" },
  { n: "04", title: "Impact", desc: "Drive business growth and innovation.", icon: "M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8" },
];

const CAPABILITIES = [
  { title: "Exploratory Data Analysis", desc: "Understand your data and uncover hidden patterns before building anything on top of it." },
  { title: "Machine Learning", desc: "Predict outcomes and automate decisions with models trained on your real data." },
  { title: "Data Visualization", desc: "Turn complex data into interactive dashboards and visual stories anyone on your team can read." },
  { title: "Big Data Solutions", desc: "Process and analyze large-scale data efficiently and securely, without the infrastructure headache." },
  { title: "Statistical Modeling", desc: "Build accurate models grounded in statistics, not guesswork, to solve real business problems." },
];

const BENEFITS = [
  { title: "Data-Driven Decisions", icon: "M12 3v4M12 17v4M3 12h4M17 12h4M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" },
  { title: "Improve Efficiency", icon: "M4 20V10M11 20V4M18 20v-7" },
  { title: "Reduce Costs", icon: "M12 3v18M7 7.5c0-1.7 2-3 5-3s5 1.3 5 3-2 3-5 3-5 1.3-5 3 2 3 5 3 5-1.3 5-3" },
  { title: "Better Customer Experience", icon: "M17 20v-1a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v1M14 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM20 20v-1a4 4 0 0 0-3-3.87M16 3.13A4 4 0 0 1 16 10.87" },
  { title: "Accelerate Growth", icon: "M13 3 4 14h7l-1 7 9-11h-7l1-7Z" },
];

/* ---------------------------------------------------------------- */
/*  Page                                                              */
/* ---------------------------------------------------------------- */

export default function DataScience() {
  return (
    <div className="w-full overflow-x-hidden">
      {/* ============= HERO ============= */}
      <section
        className="relative overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${atxBaseBackground})`,
        }}
      >
        <PixelTrail className="absolute top-10 right-10 hidden md:flex" />
        <div className="mx-auto max-w-3xl px-6 md:px-10 py-20 md:py-28 text-center">
          <Reveal>
            <div className="flex justify-center">
              <Eyebrow tone="dark">Data Science</Eyebrow>
            </div>
            <h1 className="mt-5 text-white font-bold leading-[1.1] text-[32px] sm:text-[42px] md:text-[48px]">
              Turning data into{" "}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: GRADIENT }}>
                real impact
              </span>
              .
            </h1>
            <p className="mt-5 text-white/70 text-[16.5px] leading-relaxed max-w-[52ch] mx-auto">
              We transform raw data into valuable insights using advanced analytics, machine learning, and statistical modeling to help you make smarter decisions and drive growth.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============= PROCESS ============= */}
      <section className="py-16 md:py-20 bg-white border-b border-black/5">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            <div className="hidden lg:block absolute top-6 left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />
            {PROCESS.map((p) => (
              <Reveal key={p.n} className="relative flex flex-col items-center text-center gap-3">
                <div
                  className="relative z-10 h-12 w-12 rounded-full flex items-center justify-center"
                  style={{ background: "linear-gradient(115deg, rgba(46,111,242,.14), rgba(23,195,162,.14))" }}
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke={BLUE} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d={p.icon} />
                  </svg>
                </div>
                <span className="font-mono text-[11px] tracking-[0.14em] uppercase" style={{ color: TEAL }}>
                  {p.n}
                </span>
                <h3 className="text-[15.5px] font-semibold" style={{ color: INK }}>
                  {p.title}
                </h3>
                <p className="text-[13.5px] text-[#5b6478] leading-relaxed max-w-[22ch]">{p.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============= CAPABILITIES ============= */}
      <section className="py-20 md:py-24 bg-[#f5f7fb]">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <Reveal className="max-w-xl mb-14">
            <Eyebrow>What we do</Eyebrow>
            <h2 className="mt-4 text-[26px] md:text-[36px] font-bold leading-tight" style={{ color: INK }}>
              From raw data to a decision you can act on.
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {CAPABILITIES.map((c, i) => (
              <Reveal
                key={c.title}
                className="rounded-2xl bg-white border border-black/5 p-6"
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <h3 className="text-[15px] font-semibold" style={{ color: BLUE }}>
                  {c.title}
                </h3>
                <p className="mt-2 text-[13.5px] text-[#5b6478] leading-relaxed">{c.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============= DASHBOARD VISUAL ============= */}
      <section className="py-20 md:py-24" style={{ background: INK }}>
        <div className="mx-auto max-w-5xl px-6 md:px-10">
          <Reveal className="text-center max-w-2xl mx-auto mb-12">
            <Eyebrow tone="dark" center>
              See it in action
            </Eyebrow>
            <h2 className="mt-4 text-[24px] md:text-[32px] font-bold leading-tight text-white">
              Dashboards built to be read, not decoded.
            </h2>
            <p className="mt-4 text-[15px] text-white/60 leading-relaxed">
              Revenue overview, regional sales, customer segmentation, and machine learning outputs, all in one view — so decisions happen in the meeting, not three follow-up emails later.
            </p>
          </Reveal>

          <Reveal className="rounded-[24px] overflow-hidden border border-white/10 shadow-2xl">
            <img
              src={dashboardImg}
              alt="ATX Base data science dashboard: revenue overview, sales by region, customer segmentation, machine learning, and data analytics"
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
            Data is the new oil,{" "}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: GRADIENT }}>
              insight is the fuel
            </span>
            .
          </p>
        </Reveal>
      </section>

      {/* ============= BENEFITS STRIP ============= */}
      <section className="py-14" style={{ background: INK }}>
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-8">
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
          <Eyebrow center>Unleash the power of data</Eyebrow>
          <h2 className="mt-5 font-bold text-[26px] md:text-[36px] leading-tight" style={{ color: INK }}>
            Ready to shape the future with data?
          </h2>
          <p className="mt-4 text-[15.5px] text-[#5b6478] leading-relaxed">
            Tell us what you&rsquo;re trying to understand — we&rsquo;ll tell you what your data can actually show you.
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