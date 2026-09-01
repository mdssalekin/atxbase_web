import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { CATEGORIES, PROJECTS } from "./projects/Worksdata";
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

// Stands in for a real project screenshot — a gradient plate with the
// category's initials, so cards look finished before real cover images exist.
export const CoverPlaceholder = ({ label, className = "" }) => (
  <div
    className={`relative w-full h-full flex items-center justify-center overflow-hidden ${className}`}
    style={{ background: `linear-gradient(150deg, ${INK} 0%, ${INK_2} 100%)` }}
  >
    <div className="absolute -top-8 -right-8 h-32 w-32 rounded-full blur-2xl opacity-40" style={{ background: GRADIENT }} />
    <span className="relative text-transparent bg-clip-text font-bold text-[30px]" style={{ backgroundImage: GRADIENT }}>
      {label.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase()}
    </span>
  </div>
);

/* ---------------------------------------------------------------- */
/*  Page                                                              */
/* ---------------------------------------------------------------- */

export default function Works() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = useMemo(
    () => (activeCategory === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === activeCategory)),
    [activeCategory]
  );

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
              <Eyebrow tone="dark">Our Work</Eyebrow>
            </div>
            <h1 className="mt-5 text-white font-bold leading-[1.1] text-[32px] sm:text-[42px] md:text-[48px]">
              Work worth{" "}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: GRADIENT }}>
                pointing to
              </span>
              .
            </h1>
            <p className="mt-5 text-white/70 text-[16.5px] leading-relaxed max-w-[52ch] mx-auto">
              A look at what we&rsquo;ve built across websites, applications, systems, and campaigns — organized by the kind of work it was.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============= FILTER + GRID ============= */}
      <section className="py-16 md:py-20 bg-white">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <style>{`.no-scrollbar::-webkit-scrollbar{display:none} .no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}`}</style>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-10">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="shrink-0 rounded-full px-4 py-2 text-[13px] font-medium whitespace-nowrap transition-colors"
                style={
                  activeCategory === cat
                    ? { background: GRADIENT, color: "#fff" }
                    : { color: "#4b5468", background: "#f5f7fb" }
                }
              >
                {cat}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <p className="text-[14.5px] text-[#5b6478]">No projects in this category yet — check back soon.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {filtered.map((project, i) => (
                <Reveal
                  key={project.slug}
                  as={Link}
                  to={`/works/${project.slug}`}
                  className="group rounded-2xl overflow-hidden border border-black/5 hover:shadow-lg transition-shadow flex flex-col"
                  style={{ transitionDelay: `${(i % 3) * 70}ms` }}
                >
                  <div className="h-44">
                    {project.cover ? (
                      <img src={project.cover} alt={project.title} className="w-full h-full object-contain" />
                    ) : (
                      <CoverPlaceholder label={project.category} className="h-full" />
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className="w-fit rounded-md px-2 py-0.5 font-mono text-[10.5px] font-semibold tracking-[0.08em] uppercase"
                        style={{ color: BLUE, background: "linear-gradient(115deg, rgba(46,111,242,.12), rgba(23,195,162,.12))" }}
                      >
                        {project.category}
                      </span>
                      <span className="text-[12px] font-mono text-[#8891a4]">{project.year}</span>
                    </div>

                    <h3
                      className="mt-3 text-[16px] font-semibold leading-snug group-hover:opacity-80 transition-opacity"
                      style={{ color: INK }}
                    >
                      {project.title}
                    </h3>
                    <p className="mt-2 text-[13.5px] text-[#5b6478] leading-relaxed flex-1">{project.summary}</p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border px-2.5 py-1 text-[11px] text-[#4b5468]"
                          style={{ borderColor: "rgba(10,15,36,.1)" }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ============= CTA ============= */}
      <section className="relative overflow-hidden py-24 text-center" style={{ background: `linear-gradient(155deg, ${INK} 0%, ${INK_2} 100%)` }}>
        <PixelTrail className="absolute bottom-8 right-8" />
        <Reveal className="mx-auto max-w-xl px-6">
          <Eyebrow tone="dark" center>
            Start your project
          </Eyebrow>
          <h2 className="mt-5 text-white font-bold text-[26px] md:text-[36px] leading-tight">
            Want to see your work in this list?
          </h2>
          <p className="mt-4 text-white/80 text-[15.5px] leading-relaxed">
            Tell us what you&rsquo;re building — we&rsquo;ll tell you how we&rsquo;d approach it.
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