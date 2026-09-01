import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPostBySlug, getRelatedPosts, formatDate } from "./NewsData";
import { CoverPlaceholder } from "../News";
import atxBaseBackground from "../assets/atx-base-background.png";

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

/* ---------------------------------------------------------------- */
/*  Page                                                              */
/* ---------------------------------------------------------------- */

export default function NewsDetail() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);

  // Unknown slug — show a clear message instead of a blank page.
  if (!post) {
    return (
      <div className="w-full min-h-[60vh] flex items-center justify-center px-6 text-center">
        <div>
          <Eyebrow center>Not found</Eyebrow>
          <h1 className="mt-4 text-[26px] font-bold" style={{ color: INK }}>
            We couldn&rsquo;t find that post.
          </h1>
          <p className="mt-3 text-[14.5px] text-[#5b6478]">It may have moved, or the link is out of date.</p>
          <Link
            to="/news"
            className="mt-7 inline-flex items-center justify-center rounded-full px-6 py-3 text-[14px] font-semibold text-white"
            style={{ background: GRADIENT }}
          >
            Back to News &amp; Blog
          </Link>
        </div>
      </div>
    );
  }

  const related = getRelatedPosts(slug, 3);

  return (
    <div className="w-full overflow-x-hidden">
      {/* ============= HERO ============= */}
      <section
        className="relative overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${atxBaseBackground})`,
        }}
      >
        <div className="mx-auto max-w-3xl px-6 md:px-10 py-16 md:py-24">
          <Reveal>
            <Link to="/news" className="inline-flex items-center gap-2 text-[13px] font-medium text-white/80 hover:text-white transition-colors">
              <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12.5 15 7.5 10l5-5" />
              </svg>
              All News
            </Link>

            <div className="mt-6">
              <Eyebrow tone="dark">{post.category}</Eyebrow>
            </div>
            <h1 className="mt-4 text-white font-bold leading-[1.2] text-[26px] sm:text-[32px] md:text-[38px]">
              {post.title}
            </h1>

            <div className="mt-6 flex items-center gap-3 text-[13px] font-mono uppercase tracking-wide text-white/80">
              <span className="text-white/80">{post.author}</span>
              <span className="text-white/80">&middot;</span>
              <span className="text-white/80">{formatDate(post.date)}</span>
              <span className="text-white/80">&middot;</span>
              <span className="text-white/80">{post.readMins} min read</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============= COVER ============= */}
      <section className="bg-white py-10 md:py-14">
        <div className="mx-auto max-w-4xl px-6 md:px-10">
          <Reveal className="rounded-[24px] overflow-hidden border border-black/5 shadow-xl aspect-[16/9]">
            {post.cover ? (
              <img src={post.cover} alt={post.title} className="w-full h-full object-fit" />
            ) : (
              <CoverPlaceholder label={post.category} className="h-full" />
            )}
          </Reveal>
        </div>
      </section>

      {/* ============= BODY ============= */}
      <section className="pb-16 md:pb-20 bg-white">
        <div className="mx-auto max-w-2xl px-6 md:px-10">
          <Reveal>
            <p className="text-[17px] leading-relaxed" style={{ color: INK }}>
              {post.excerpt}
            </p>
          </Reveal>

          <div className="mt-8 space-y-5">
            {post.body.map((paragraph, i) => (
              <Reveal key={i} style={{ transitionDelay: `${i * 60}ms` }}>
                <p className="text-[15px] text-[#3a4258] leading-[1.8]">{paragraph}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============= RELATED POSTS ============= */}
      {related.length > 0 && (
        <section className="py-16 md:py-20 bg-[#f5f7fb] border-t border-black/5">
          <div className="mx-auto max-w-6xl px-6 md:px-10">
            <Reveal className="mb-10">
              <Eyebrow>Keep reading</Eyebrow>
              <h2 className="mt-3 text-[22px] md:text-[26px] font-bold" style={{ color: INK }}>
                More posts
              </h2>
            </Reveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p, i) => (
                <Reveal
                  key={p.slug}
                  as={Link}
                  to={`/news/${p.slug}`}
                  className="group rounded-2xl overflow-hidden border border-black/5 bg-white hover:shadow-lg transition-shadow flex flex-col"
                  style={{ transitionDelay: `${i * 70}ms` }}
                >
                  <div className="h-36">
                    {p.cover ? (
                      <img src={p.cover} alt={p.title} className="w-full h-full object-cover" />
                    ) : (
                      <CoverPlaceholder label={p.category} className="h-full" />
                    )}
                  </div>
                  <div className="p-5">
                    <span
                      className="w-fit rounded-md px-2 py-0.5 font-mono text-[10.5px] font-semibold tracking-[0.08em] uppercase"
                      style={{ color: BLUE, background: "linear-gradient(115deg, rgba(46,111,242,.12), rgba(23,195,162,.12))" }}
                    >
                      {p.category}
                    </span>
                    <h3 className="mt-2.5 text-[14.5px] font-semibold leading-snug group-hover:opacity-80 transition-opacity" style={{ color: INK }}>
                      {p.title}
                    </h3>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============= CTA ============= */}
      <section className="relative overflow-hidden py-20 text-center bg-white">
        <Reveal className="mx-auto max-w-xl px-6">
          <h2 className="font-bold text-[24px] md:text-[30px] leading-tight" style={{ color: INK }}>
            Want more like this?
          </h2>
          <p className="mt-3 text-[15px] text-[#5b6478] leading-relaxed">
            Subscribe for new posts, or reach out if you&rsquo;d rather talk through your project directly.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              to="/news"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 text-[14px] font-semibold border transition-colors"
              style={{ borderColor: "rgba(10,15,36,.12)", color: INK }}
            >
              All posts
            </Link>
            <Link
              to="/contact-us"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 text-[14px] font-semibold text-white shadow-[0_12px_24px_-10px_rgba(23,195,162,.45)] transition-transform hover:-translate-y-0.5"
              style={{ background: GRADIENT }}
            >
              Start a Project
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}