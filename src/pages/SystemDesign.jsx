import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import architectureDiagram from "./assets/system-design.png";
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
/*  Content                                                           */
/* ---------------------------------------------------------------- */

const PILLARS = [
  {
    title: "Scalable Architecture",
    desc: "Systems designed to grow with your business, not systems you outgrow in a year.",
    icon: "M12 3l3 3-3 3-3-3 3-3ZM5 12l3-3 3 3-3 3-3-3ZM19 12l-3-3-3 3 3 3 3-3ZM12 21l-3-3 3-3 3 3-3 3Z",
  },
  {
    title: "Security by Design",
    desc: "Built with security, reliability, and industry best practices from the first diagram, not bolted on after.",
    icon: "M12 3 4 6v6c0 5 3.4 8.4 8 9 4.6-.6 8-4 8-9V6l-8-3Z",
  },
  {
    title: "High Performance",
    desc: "Optimized for speed, efficiency, and a seamless experience under real load.",
    icon: "M12 12l5-5M4 13a8 8 0 1 1 16 0",
  },
  {
    title: "Cloud Ready",
    desc: "Modern, cloud-native designs built for flexibility, resilience, and easy scaling.",
    icon: "M7 18a4 4 0 0 1-1-7.87A5.5 5.5 0 0 1 16.6 9 4.5 4.5 0 0 1 17 18H7Z",
  },
  {
    title: "Technology Agnostic",
    desc: "We choose the right tools and technologies for your problem, not our comfort zone.",
    icon: "M9 6 3 12l6 6M15 6l6 6-6 6",
  },
];

const BENEFITS = [
  { title: "Reliable Systems", icon: "M9 12l2 2 4-4M12 3l8 3v6c0 5-3.4 8.4-8 9-4.6-.6-8-4-8-9V6l8-3Z" },
  { title: "Lower Risk", icon: "M4 5h16M8 5v4l-4 10h16L16 9V5" },
  { title: "Faster Time to Market", icon: "M13 3 4 14h7l-1 7 9-11h-7l1-7Z" },
  { title: "Cost Efficient", icon: "M12 3v18M7 7.5c0-1.7 2-3 5-3s5 1.3 5 3-2 3-5 3-5 1.3-5 3 2 3 5 3 5-1.3 5-3" },
  { title: "Future Ready", icon: "M7 17 17 7M9 7h8v8" },
];

/* ---------------------------------------------------------------- */
/*  Page                                                              */
/* ---------------------------------------------------------------- */

export default function SystemDesign() {
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
              <Eyebrow tone="dark">System Design</Eyebrow>
            </div>
            <h1 className="mt-5 text-white font-bold leading-[1.1] text-[32px] sm:text-[42px] md:text-[48px]">
              Architect today.{" "}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: GRADIENT }}>
                Scale
              </span>{" "}
              tomorrow.
            </h1>
            <p className="mt-5 text-white/70 text-[16.5px] leading-relaxed max-w-[52ch] mx-auto">
              We design robust, scalable, and secure systems that power your business and drive innovation — architecture that's built to handle growth, not just today's traffic.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============= PILLARS ============= */}
      <section className="py-20 md:py-24 bg-white">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <Reveal className="max-w-xl mb-14">
            <Eyebrow>Our approach</Eyebrow>
            <h2 className="mt-4 text-[26px] md:text-[36px] font-bold leading-tight" style={{ color: INK }}>
              Five principles behind every architecture.
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {PILLARS.map((p, i) => (
              <Reveal
                key={p.title}
                className="rounded-2xl border border-black/5 p-6 bg-[#f5f7fb]"
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <div
                  className="h-11 w-11 rounded-xl flex items-center justify-center"
                  style={{ background: "linear-gradient(115deg, rgba(46,111,242,.14), rgba(23,195,162,.14))" }}
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke={BLUE} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d={p.icon} />
                  </svg>
                </div>
                <h3 className="mt-4 text-[15px] font-semibold" style={{ color: INK }}>
                  {p.title}
                </h3>
                <p className="mt-2 text-[13.5px] text-[#5b6478] leading-relaxed">{p.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============= ARCHITECTURE DIAGRAM ============= */}
      <section className="py-20 md:py-24" style={{ background: INK }}>
        <div className="mx-auto max-w-5xl px-6 md:px-10">
          <Reveal className="text-center max-w-2xl mx-auto mb-12">
            <Eyebrow tone="dark" center>
              How it fits together
            </Eyebrow>
            <h2 className="mt-4 text-[24px] md:text-[32px] font-bold leading-tight text-white">
              Clients to data layer, mapped end to end.
            </h2>
            <p className="mt-4 text-[15px] text-white/60 leading-relaxed">
              Requests move from web, mobile, desktop, and third-party clients through a load balancer into a pool of application servers, out to focused services — users, orders, payments, notifications — and down into the data layer, with a CI/CD pipeline and monitoring running underneath the whole system.
            </p>
          </Reveal>

          <Reveal className="rounded-[24px] overflow-hidden border border-white/10 shadow-2xl">
            <img
              src={architectureDiagram}
              alt="ATX Base system design architecture: clients, load balancer, application servers, microservices, data layer, CI/CD pipeline, and monitoring"
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
            Great systems are not just built, they are{" "}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: GRADIENT }}>
              designed with purpose
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
          <Eyebrow center>Designing systems. Delivering success.</Eyebrow>
          <h2 className="mt-5 font-bold text-[26px] md:text-[36px] leading-tight" style={{ color: INK }}>
            Have a system that needs to scale?
          </h2>
          <p className="mt-4 text-[15.5px] text-[#5b6478] leading-relaxed">
            Tell us what you&rsquo;re running into — we&rsquo;ll come back with an architecture plan, not just an opinion.
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