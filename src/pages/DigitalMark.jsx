import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import poster from "./assets/digital-marketing.png";
// TODO: once you have the real Digital Marketing creative, drop it in
// ./assets/ and swap the <PosterPlaceholder /> usage below for:
//   import poster from "./assets/digital-marketing-poster.png";
//   <img src={poster} alt="ATX Base — Digital Marketing" className="w-full h-full object-cover" />

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


/* ---------------------------------------------------------------- */
/*  Content                                                           */
/* ---------------------------------------------------------------- */

const OFFERINGS = [
  {
    title: "SEO & Search Visibility",
    desc: "Technical audits, on-page optimization, and content structure that gets you found before a competitor does.",
  },
  {
    title: "Paid Campaigns & Ad Design",
    desc: "Google, Meta, and LinkedIn campaigns built around a real budget and a real conversion goal — not just impressions.",
  },
  {
    title: "Social Media & Content",
    desc: "Editorial calendars, post design, and copy that sounds like your brand instead of a template.",
  },
  {
    title: "Reporting & Analytics",
    desc: "Monthly reporting tied to leads and revenue, so you always know what's working and what isn't.",
  },
];

const WHY_US = [
  { title: "Data-Driven", icon: "M4 20V10M11 20V4M18 20v-7" },
  { title: "Multi-Channel", icon: "M6 6h12v12H6zM3 12h3M18 12h3M12 3v3M12 18v3" },
  { title: "Targeted Results", icon: "M12 3v4M12 17v4M3 12h4M17 12h4M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" },
  { title: "On-Time Delivery", icon: "M12 7v5l3 3M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" },
  { title: "Transparent Reporting", icon: "M6 3h9l5 5v13H6zM14 3v5h5M9 13h6M9 17h6" },
];

/* ---------------------------------------------------------------- */
/*  Page                                                              */
/* ---------------------------------------------------------------- */

export default function DigitalMarketing() {
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
              <Eyebrow tone="dark">Digital Marketing</Eyebrow>
            </div>
            <h1 className="mt-5 text-white font-bold leading-[1.1] text-[32px] sm:text-[42px] md:text-[48px]">
              Creativity meets{" "}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: GRADIENT }}>
                strategy
              </span>
              .
            </h1>
            <p className="mt-5 text-white/70 text-[16.5px] leading-relaxed max-w-[52ch] mx-auto">
              SEO, paid campaigns, and content strategy built to turn traffic into pipeline — with reporting that ties back to leads, not just clicks.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============= WHAT WE OFFER ============= */}
      <section className="py-20 md:py-28 bg-white">
        <div className="mx-auto max-w-6xl px-6 md:px-10 grid lg:grid-cols-2 gap-14 items-center">
          <Reveal className="flex justify-center lg:justify-start">
             <img src={poster} alt="ATX Base — Digital Marketing" className="w-full h-full object-cover" />
          </Reveal>

          <Reveal style={{ transitionDelay: "80ms" }}>
            <Eyebrow>What we offer</Eyebrow>
            <h2 className="mt-4 text-[26px] md:text-[34px] font-bold leading-tight" style={{ color: INK }}>
              Marketing that&rsquo;s measured, not guessed at.
            </h2>
            <p className="mt-4 text-[15px] text-[#5b6478] leading-relaxed">
              We run digital marketing the same way we build software — clear goals, visible progress, and no vanity metrics dressed up as results.
            </p>

            <div className="mt-8 grid sm:grid-cols-2 gap-6">
              {OFFERINGS.map((o) => (
                <div key={o.title}>
                  <div className="flex items-start gap-3">
                    <Check />
                    <div>
                      <h3 className="text-[15.5px] font-semibold" style={{ color: INK }}>
                        {o.title}
                      </h3>
                      <p className="mt-1.5 text-[13.5px] text-[#5b6478] leading-relaxed">{o.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============= WHY US STRIP ============= */}
      <section className="py-14" style={{ background: INK }}>
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-8">
            {WHY_US.map((w) => (
              <Reveal key={w.title} className="flex flex-col items-center text-center gap-3">
                <div
                  className="h-12 w-12 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.14)" }}
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d={w.icon} />
                  </svg>
                </div>
                <p className="text-[12.5px] font-medium tracking-wide text-white/75 uppercase">{w.title}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============= CTA ============= */}
      <section className="relative overflow-hidden py-24 text-center bg-[#f5f7fb]">
        <Reveal className="mx-auto max-w-xl px-6">
          <Eyebrow center>Bring your vision to life</Eyebrow>
          <h2 className="mt-5 font-bold text-[26px] md:text-[36px] leading-tight" style={{ color: INK }}>
            Ready to grow your reach?
          </h2>
          <p className="mt-4 text-[15.5px] text-[#5b6478] leading-relaxed">
            Tell us about your goals and budget — we&rsquo;ll come back with a channel plan, not just a proposal.
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