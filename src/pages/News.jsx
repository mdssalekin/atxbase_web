import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { CATEGORIES, POSTS, formatDate } from "./news/NewsData";

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

// Stands in for a real cover photo — a gradient plate with the category's
// initial, so cards look finished before real post images exist.
// Exported so NewsDetail.jsx can reuse the exact same visual.
export const CoverPlaceholder = ({ label, className = "" }) => (
  <div
    className={`relative w-full h-full flex items-center justify-center overflow-hidden ${className}`}
    style={{ background: `linear-gradient(150deg, ${INK} 0%, ${INK_2} 100%)` }}
  >
    <div className="absolute -top-8 -right-8 h-32 w-32 rounded-full blur-2xl opacity-40" style={{ background: GRADIENT }} />
    <span className="relative text-transparent bg-clip-text font-bold text-[34px]" style={{ backgroundImage: GRADIENT }}>
      {label.slice(0, 2).toUpperCase()}
    </span>
  </div>
);

// Renders the real cover image when a post has one, otherwise the placeholder.
const Cover = ({ post, className = "" }) =>
  post.cover ? (
    <img src={post.cover} alt={post.title} className={`w-full h-full object-cover ${className}`} />
  ) : (
    <CoverPlaceholder label={post.category} className={className} />
  );

/* ---------------------------------------------------------------- */
/*  Page                                                              */
/* ---------------------------------------------------------------- */

export default function News() {
  const [activeCategory, setActiveCategory] = useState("All");

  const featured = useMemo(() => POSTS.find((p) => p.featured) || POSTS[0], []);
  const rest = useMemo(() => POSTS.filter((p) => p.slug !== featured.slug), [featured]);
  const filtered = useMemo(
    () => (activeCategory === "All" ? rest : rest.filter((p) => p.category === activeCategory)),
    [activeCategory, rest]
  );

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
              <Eyebrow tone="dark">News &amp; Blog</Eyebrow>
            </div>
            <h1 className="mt-5 text-white font-bold leading-[1.1] text-[32px] sm:text-[42px] md:text-[48px]">
              Ideas, updates, and{" "}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: GRADIENT }}>
                things we&rsquo;ve learned
              </span>
              .
            </h1>
            <p className="mt-5 text-white/70 text-[16.5px] leading-relaxed max-w-[52ch] mx-auto">
              Notes from the team on what we&rsquo;re building, what we&rsquo;re seeing in the industry, and what's actually worth your attention.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============= FEATURED POST ============= */}
      <section className="py-16 md:py-20 bg-white">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <Reveal
            as={Link}
            to={`/news/${featured.slug}`}
            className="group grid lg:grid-cols-2 gap-0 rounded-[26px] overflow-hidden border border-black/5 shadow-sm hover:shadow-xl transition-shadow"
          >
            <div className="h-64 lg:h-full">
              <Cover post={featured} className="h-full" />
            </div>
            <div className="p-8 md:p-10 flex flex-col justify-center bg-[#f5f7fb]">
              <span
                className="w-fit rounded-md px-2.5 py-1 font-mono text-[11px] font-semibold tracking-[0.1em] uppercase"
                style={{ color: BLUE, background: "linear-gradient(115deg, rgba(46,111,242,.14), rgba(23,195,162,.14))" }}
              >
                Featured &middot; {featured.category}
              </span>
              <h2
                className="mt-4 text-[22px] md:text-[27px] font-bold leading-tight group-hover:opacity-80 transition-opacity"
                style={{ color: INK }}
              >
                {featured.title}
              </h2>
              <p className="mt-3 text-[14.5px] text-[#5b6478] leading-relaxed">{featured.excerpt}</p>
              <div className="mt-5 flex items-center gap-3 text-[12.5px] font-mono uppercase tracking-wide text-[#8891a4]">
                <span>{formatDate(featured.date)}</span>
                <span>&middot;</span>
                <span>{featured.readMins} min read</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============= CATEGORY FILTER + GRID ============= */}
      <section className="py-4 md:py-8 pb-24 bg-white">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-8">
            <style>{`.no-scrollbar::-webkit-scrollbar{display:none} .no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}`}</style>
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
            <p className="text-[14.5px] text-[#5b6478]">No posts in this category yet — check back soon.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {filtered.map((post, i) => (
                <Reveal
                  key={post.slug}
                  as={Link}
                  to={`/news/${post.slug}`}
                  className="group rounded-2xl overflow-hidden border border-black/5 hover:shadow-lg transition-shadow flex flex-col"
                  style={{ transitionDelay: `${(i % 3) * 70}ms` }}
                >
                  <div className="h-44">
                    <Cover post={post} className="h-full" />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <span
                      className="w-fit rounded-md px-2 py-0.5 font-mono text-[10.5px] font-semibold tracking-[0.08em] uppercase"
                      style={{ color: BLUE, background: "linear-gradient(115deg, rgba(46,111,242,.12), rgba(23,195,162,.12))" }}
                    >
                      {post.category}
                    </span>
                    <h3
                      className="mt-3 text-[16px] font-semibold leading-snug group-hover:opacity-80 transition-opacity"
                      style={{ color: INK }}
                    >
                      {post.title}
                    </h3>
                    <p className="mt-2 text-[13.5px] text-[#5b6478] leading-relaxed flex-1">{post.excerpt}</p>
                    <div className="mt-4 flex items-center gap-2.5 text-[11.5px] font-mono uppercase tracking-wide text-[#8891a4]">
                      <span>{formatDate(post.date)}</span>
                      <span>&middot;</span>
                      <span>{post.readMins} min read</span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ============= NEWSLETTER ============= */}
      <section className="relative overflow-hidden py-20" style={{ background: `linear-gradient(155deg, ${INK} 0%, ${INK_2} 100%)` }}>
        <PixelTrail className="absolute bottom-8 right-8" />
        <Reveal className="mx-auto max-w-xl px-6 text-center">
          <Eyebrow tone="dark" center>
            Stay in the loop
          </Eyebrow>
          <h2 className="mt-4 text-white font-bold text-[24px] md:text-[30px] leading-tight">
            Get new posts in your inbox.
          </h2>
          <p className="mt-3 text-white/60 text-[14.5px] leading-relaxed">
            No spam — just the occasional post when we have something worth sharing.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              // TODO: wire this up to your real newsletter provider
              // (Mailchimp, Beehiiv, ConvertKit, or a custom endpoint).
            }}
            className="mt-7 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              required
              placeholder="you@company.com"
              className="flex-1 rounded-full px-5 py-3 text-[14px] text-white bg-white/10 border border-white/15 placeholder:text-white/35 outline-none focus:border-white/35 transition-colors"
            />
            <button
              type="submit"
              className="rounded-full px-6 py-3 text-[14px] font-semibold text-white shrink-0"
              style={{ background: GRADIENT }}
            >
              Subscribe
            </button>
          </form>
        </Reveal>
      </section>
    </div>
  );
}