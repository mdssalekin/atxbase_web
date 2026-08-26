import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

/** Brand tokens — mirror Header.jsx / Home.jsx / Footer.jsx */
const INK = "#0a0f24";
const INK_2 = "#111a36";
const BLUE = "#2e6ff2";
const TEAL = "#17c3a2";
const GRADIENT = `linear-gradient(115deg, ${BLUE}, ${TEAL})`;

/* ---------------------------------------------------------------- */
/*  Shared helpers (same pattern as Home.jsx)                        */
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

// Portrait with a graceful fallback: if no photo is supplied yet, show a
// brand-gradient initials plate instead of a broken image.
const Portrait = ({ name, photo, size = 220 }) => {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className="relative shrink-0 rounded-[26px] overflow-hidden border border-black/5 shadow-xl"
      style={{ width: size, height: size }}
    >
      {photo ? (
        <img src={photo} alt={name} className="h-full w-full object-cover" />
      ) : (
        <div
          className="h-full w-full flex items-center justify-center"
          style={{ background: `linear-gradient(155deg, ${INK} 0%, ${INK_2} 100%)` }}
        >
          <span
            className="text-transparent bg-clip-text font-bold"
            style={{ backgroundImage: GRADIENT, fontSize: size * 0.32 }}
          >
            {initials}
          </span>
        </div>
      )}
    </div>
  );
};

/* ---------------------------------------------------------------- */
/*  Content — replace with real names, titles, photos, and quotes    */
/* ---------------------------------------------------------------- */

const CHAIRMAN = {
  name: "Chairman Name",
  role: "Chairman",
  photo: null, // e.g. import chairmanPhoto from "./assets/chairman.jpg";
  quote:
    "ATX Base was built on a simple idea: technology should be a solid base a business can stand on, not a moving target it constantly chases. Every decision we make, from the projects we take on to the people we hire, is measured against that idea.",
  message:
    "When we started this company, we weren't trying to be the biggest name in the industry — we were trying to be the most dependable one. That focus hasn't changed. I'm proud of the standard our team holds itself to, and grateful to every client who has trusted us with their technology. As we grow, that trust remains the thing we protect most carefully.",
};

const CEO = {
  name: "CEO Name",
  role: "Chief Executive Officer",
  photo: null, // e.g. import ceoPhoto from "./assets/ceo.jpg";
  quote:
    "Good technology should disappear into the background of a business, not sit in the way of it. That's the standard our team is held to on every project, every time.",
  message:
    "We built ATX Base around a single principle: put design, engineering, and marketing under one roof so our clients never have to manage the gaps between agencies themselves. Day to day, that means shorter feedback loops, fewer handoffs, and work our team can stand behind long after launch. I'm proud of what this team ships, and even prouder of how they treat the people they build it for.",
};

const VALUES = [
  {
    title: "Craftsmanship",
    desc: "We treat every build like it has our name on it — because it does. Clean code, considered design, no shortcuts that show up later.",
  },
  {
    title: "Transparency",
    desc: "Realistic timelines, honest status updates, and no scope surprises halfway through a project.",
  },
  {
    title: "Partnership",
    desc: "We work alongside your team, not at arm's length from it. Your goals set the brief, not our template.",
  },
  {
    title: "Momentum",
    desc: "We'd rather ship something real and iterate than polish a plan that never leaves the deck.",
  },
];

/* ---------------------------------------------------------------- */
/*  Page                                                              */
/* ---------------------------------------------------------------- */

export default function AboutUs() {
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
        <div className="mx-auto max-w-4xl px-6 md:px-10 py-24 md:py-32 text-center">
          <Reveal>
            <div className="flex justify-center">
              <Eyebrow tone="dark">About ATX Base</Eyebrow>
            </div>
            <h1 className="mt-5 text-white font-bold leading-[1.1] text-[34px] sm:text-[42px] md:text-[52px]">
              Built by people who&rsquo;d rather{" "}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: GRADIENT }}>
                ship
              </span>{" "}
              than talk about shipping.
            </h1>
            <p className="mt-6 text-white/70 text-[17px] md:text-[18px] leading-relaxed max-w-[58ch] mx-auto">
              ATX Base is an advanced technology exchange — a team of developers, designers, and marketers who build the websites, applications, and digital presence that growing companies run on. We started this company to close the gap between a good idea and a working product.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============= WHO WE ARE ============= */}
      <section className="py-24 md:py-28 bg-[#f5f7fb]">
        <div className="mx-auto max-w-5xl px-6 md:px-10 grid md:grid-cols-2 gap-12">
          <Reveal>
            <Eyebrow>Who we are</Eyebrow>
            <h2 className="mt-4 text-[26px] md:text-[32px] font-bold leading-tight" style={{ color: INK }}>
              A full-stack team, under one roof.
            </h2>
          </Reveal>
          <Reveal style={{ transitionDelay: "80ms" }}>
            <p className="text-[15.5px] text-[#5b6478] leading-relaxed">
              Most companies end up stitching together a web agency, an app developer, a marketing consultant, and a freelance designer — and spend as much time managing the handoffs as the actual work. ATX Base exists to remove that overhead. Our engineers, designers, and marketers work from the same brief, the same timeline, and the same standard, across website development, web and mobile applications, and the design and marketing that bring them to the people who use them.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============= CHAIRMAN'S MESSAGE ============= */}
      <section className="py-24 md:py-28 bg-white">
        <div className="mx-auto max-w-5xl px-6 md:px-10">
          <Reveal className="grid md:grid-cols-[220px_1fr] gap-10 md:gap-14 items-start">
            <Portrait name={CHAIRMAN.name} photo={CHAIRMAN.photo} />
            <div>
              <Eyebrow>Chairman&rsquo;s Message</Eyebrow>
              <p
                className="mt-6 text-[19px] md:text-[22px] leading-relaxed font-medium"
                style={{ color: INK }}
              >
                &ldquo;{CHAIRMAN.quote}&rdquo;
              </p>
              <p className="mt-6 text-[15px] text-[#5b6478] leading-relaxed">{CHAIRMAN.message}</p>
              <div className="mt-7">
                <p className="font-semibold" style={{ color: INK }}>
                  {CHAIRMAN.name}
                </p>
                <p className="text-[13.5px] text-[#5b6478]">{CHAIRMAN.role}, ATX Base</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============= CEO'S MESSAGE ============= */}
      <section className="py-24 md:py-28" style={{ background: "#f5f7fb" }}>
        <div className="mx-auto max-w-5xl px-6 md:px-10">
          <Reveal className="grid md:grid-cols-[1fr_220px] gap-10 md:gap-14 items-start">
            <div className="md:order-1 order-2">
              <Eyebrow>CEO&rsquo;s Message</Eyebrow>
              <p
                className="mt-6 text-[19px] md:text-[22px] leading-relaxed font-medium"
                style={{ color: INK }}
              >
                &ldquo;{CEO.quote}&rdquo;
              </p>
              <p className="mt-6 text-[15px] text-[#5b6478] leading-relaxed">{CEO.message}</p>
              <div className="mt-7">
                <p className="font-semibold" style={{ color: INK }}>
                  {CEO.name}
                </p>
                <p className="text-[13.5px] text-[#5b6478]">{CEO.role}, ATX Base</p>
              </div>
            </div>
            <div className="md:order-2 order-1">
              <Portrait name={CEO.name} photo={CEO.photo} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============= MISSION & VISION ============= */}
      <section className="py-24 md:py-28 bg-white">
        <div className="mx-auto max-w-6xl px-6 md:px-10 grid md:grid-cols-2 gap-8">
          <Reveal
            className="rounded-[22px] p-10 border"
            style={{ borderColor: "rgba(10,15,36,.08)" }}
          >
            <span
              className="inline-block h-10 w-10 rounded-xl"
              style={{ background: GRADIENT }}
            />
            <h3 className="mt-6 text-[20px] font-semibold" style={{ color: INK }}>
              Our Mission
            </h3>
            <p className="mt-3 text-[15px] text-[#5b6478] leading-relaxed">
              To give growing businesses the same quality of technology, design, and marketing that only large companies could once afford — delivered by one accountable team instead of a chain of vendors.
            </p>
          </Reveal>

          <Reveal
            className="rounded-[22px] p-10 text-white"
            style={{ background: `linear-gradient(155deg, ${INK} 0%, ${INK_2} 100%)`, transitionDelay: "100ms" }}
          >
            <span className="inline-block h-10 w-10 rounded-xl border border-white/20" style={{ background: "rgba(255,255,255,.06)" }} />
            <h3 className="mt-6 text-[20px] font-semibold text-white">Our Vision</h3>
            <p className="mt-3 text-[15px] text-white/65 leading-relaxed">
              To be the technology partner ambitious companies call first — known as much for how we work as for what we build.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============= VALUES ============= */}
      <section className="py-24 md:py-28 bg-[#f5f7fb]">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <Reveal className="max-w-xl mb-14">
            <Eyebrow>What we stand for</Eyebrow>
            <h2 className="mt-4 text-[26px] md:text-[36px] font-bold leading-tight" style={{ color: INK }}>
              The standard behind every project.
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v, i) => (
              <Reveal
                key={v.title}
                className="bg-white rounded-2xl p-7 border border-black/5"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <span
                  className="font-mono text-[12px] font-semibold tracking-[0.1em]"
                  style={{ color: BLUE }}
                >
                  0{i + 1}
                </span>
                <h3 className="mt-4 text-[17px] font-semibold" style={{ color: INK }}>
                  {v.title}
                </h3>
                <p className="mt-2.5 text-[14px] text-[#5b6478] leading-relaxed">{v.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============= CTA ============= */}
      <section
        className="relative overflow-hidden py-24 text-center"
        style={{ background: `linear-gradient(155deg, ${INK} 0%, ${INK_2} 100%)` }}
      >
        <PixelTrail className="absolute bottom-8 right-8" />
        <Reveal className="mx-auto max-w-xl px-6">
          <h2 className="text-white font-bold text-[26px] md:text-[36px] leading-tight">
            Want to work with our team?
          </h2>
          <p className="mt-4 text-white/65 text-[15.5px] leading-relaxed">
            Tell us what you&rsquo;re building and we&rsquo;ll come back with a plan.
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