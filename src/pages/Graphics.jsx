import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import posterImg from "./assets/graphic design.png";
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

const Check = () => (
  <svg viewBox="0 0 20 20" className="h-[18px] w-[18px] shrink-0 mt-0.5" fill="none">
    <circle cx="10" cy="10" r="10" fill={TEAL} opacity="0.15" />
    <path d="M6 10.2 8.6 13 14 7.5" stroke={TEAL} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ---------------------------------------------------------------- */
/*  Content — pulled from the poster copy                            */
/* ---------------------------------------------------------------- */

const OFFERINGS = [
  {
    title: "Brand Identity Design",
    desc: "Logo, business card, letterhead, and a complete brand guideline your team can follow consistently.",
  },
  {
    title: "Marketing & Ad Design",
    desc: "Social media posts, banners, flyers, brochures, and everything in between.",
  },
  {
    title: "Creative & Modern Designs",
    desc: "Unique, visually appealing work that actually represents your brand, not a stock template.",
  },
  {
    title: "Print & Digital Materials",
    desc: "High-quality design files ready for both print and digital platforms.",
  },
];

const BENEFITS = [
  { title: "Creative Ideas", icon: "M13 3 4 14h7l-1 7 9-11h-7l1-7Z" },
  { title: "Modern Designs", icon: "M4 5h16v10H4zM9 19h6M12 15v4" },
  { title: "Targeted Results", icon: "M12 3v4M12 17v4M3 12h4M17 12h4M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" },
  { title: "On-Time Delivery", icon: "M12 7v5l3 3M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" },
  { title: "100% Satisfaction", icon: "M12 3l2.6 5.3 5.9.8-4.3 4.1 1 5.8L12 16.9 6.8 19l1-5.8-4.3-4.1 5.9-.8L12 3Z" },
];

/* ---------------------------------------------------------------- */
/*  Page                                                              */
/* ---------------------------------------------------------------- */

export default function GraphicDesign() {
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
              <Eyebrow tone="dark">Graphic Design</Eyebrow>
            </div>
            <h1 className="mt-5 text-white font-bold leading-[1.1] text-[32px] sm:text-[42px] md:text-[48px]">
              Design that speaks.{" "}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: GRADIENT }}>
                Brands
              </span>{" "}
              that stand out.
            </h1>
            <p className="mt-5 text-white/70 text-[16.5px] leading-relaxed max-w-[52ch] mx-auto">
              We create stunning, impactful designs that capture attention, communicate your message, and elevate your brand identity. Creativity meets strategy.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============= WHAT WE OFFER + POSTER ============= */}
      <section className="py-20 md:py-28 bg-white">
        <div className="mx-auto max-w-6xl px-6 md:px-10 grid lg:grid-cols-2 gap-14 items-center">
          <Reveal className="rounded-[24px] overflow-hidden border border-black/5 shadow-xl">
            <img
              src={posterImg}
              alt="ATX Base Graphic Design — brand identity, marketing and ad design, creative and modern designs, print and digital materials"
              className="w-full h-auto block"
            />
          </Reveal>

          <Reveal style={{ transitionDelay: "80ms" }}>
            <Eyebrow>What we offer</Eyebrow>
            <h2 className="mt-4 text-[26px] md:text-[34px] font-bold leading-tight" style={{ color: INK }}>
              Visual identity that holds together everywhere it shows up.
            </h2>
            <p className="mt-4 text-[15px] text-[#5b6478] leading-relaxed">
              From a first logo to a full library of marketing materials, our design work stays consistent across every screen and print piece your brand touches.
            </p>

            <div className="mt-8 space-y-5">
              {OFFERINGS.map((o) => (
                <div key={o.title} className="flex items-start gap-3">
                  <Check />
                  <div>
                    <h3 className="text-[15.5px] font-semibold" style={{ color: INK }}>
                      {o.title}
                    </h3>
                    <p className="mt-1 text-[13.5px] text-[#5b6478] leading-relaxed">{o.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
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
      <section className="relative overflow-hidden py-24 text-center bg-[#f5f7fb]">
        <Reveal className="mx-auto max-w-xl px-6">
          <Eyebrow center>Bring your vision to life with design</Eyebrow>
          <h2 className="mt-5 font-bold text-[26px] md:text-[36px] leading-tight" style={{ color: INK }}>
            Ready to make your brand stand out?
          </h2>
          <p className="mt-4 text-[15.5px] text-[#5b6478] leading-relaxed">
            Tell us about your brand and we&rsquo;ll come back with a direction, not just a mood board.
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