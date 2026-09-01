import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductBySlug, getRelatedProducts } from "./ProductData";
import { ProductCover } from "./Products";
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

const Check = () => (
  <svg viewBox="0 0 20 20" className="h-[18px] w-[18px] shrink-0 mt-0.5" fill="none">
    <circle cx="10" cy="10" r="10" fill={TEAL} opacity="0.15" />
    <path d="M6 10.2 8.6 13 14 7.5" stroke={TEAL} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ---------------------------------------------------------------- */
/*  Page                                                              */
/* ---------------------------------------------------------------- */

export default function ProductDetails() {
  const { slug } = useParams();
  const product = getProductBySlug(slug);

  // Unknown slug — show a clear message instead of a blank page.
  if (!product) {
    return (
      <div className="w-full min-h-[60vh] flex items-center justify-center px-6 text-center">
        <div>
          <Eyebrow center>Not found</Eyebrow>
          <h1 className="mt-4 text-[26px] font-bold" style={{ color: INK }}>
            We couldn&rsquo;t find that product.
          </h1>
          <p className="mt-3 text-[14.5px] text-[#5b6478]">It may have moved, or the link is out of date.</p>
          <Link
            to="/products"
            className="mt-7 inline-flex items-center justify-center rounded-full px-6 py-3 text-[14px] font-semibold text-white"
            style={{ background: GRADIENT }}
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const related = getRelatedProducts(slug, 2);

  return (
    <div className="w-full overflow-x-hidden">
      {/* ============= HERO ============= */}
      <section
        className="relative overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${atxBaseBackground})`,
        }}
      >
        <div className="mx-auto max-w-4xl px-6 md:px-10 py-16 md:py-24">
          <Reveal>
            <Link to="/products" className="inline-flex items-center gap-2 text-[13px] font-medium text-white/80 hover:text-white transition-colors">
              <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12.5 15 7.5 10l5-5" />
              </svg>
              All products
            </Link>

            <div className="mt-6">
              <Eyebrow tone="dark">{product.category}</Eyebrow>
            </div>
            <h1 className="mt-4 text-white font-bold leading-[1.15] text-[30px] sm:text-[38px] md:text-[44px]">
              {product.name}
            </h1>
            <p className="mt-4 text-white/80 text-[16px] leading-relaxed max-w-[54ch]">{product.tagline}</p>
          </Reveal>
        </div>
      </section>

      {/* ============= COVER ============= */}
      <section className="bg-white py-10 md:py-14">
        <div className="mx-auto max-w-5xl px-6 md:px-10">
          <Reveal>
            <ProductCover product={product} className="aspect-[16/9]" />
          </Reveal>
        </div>
      </section>

      {/* ============= OVERVIEW + FEATURES ============= */}
      <section className="pb-16 md:pb-20 bg-white">
        <div className="mx-auto max-w-3xl px-6 md:px-10">
          <Reveal>
            <p className="text-[17px] leading-relaxed" style={{ color: INK }}>
              {product.summary}
            </p>
          </Reveal>

          <Reveal className="mt-8" style={{ transitionDelay: "60ms" }}>
            <p className="text-[15px] text-[#5b6478] leading-relaxed">{product.description}</p>
          </Reveal>

          <Reveal className="mt-10" style={{ transitionDelay: "100ms" }}>
            <Eyebrow>What it does</Eyebrow>
            <ul className="mt-4 space-y-3">
              {product.features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <Check />
                  <span className="text-[14.5px] text-[#3a4258] leading-relaxed">{f}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ============= OTHER PRODUCTS ============= */}
      {related.length > 0 && (
        <section className="py-16 md:py-20 bg-[#f5f7fb] border-t border-black/5">
          <div className="mx-auto max-w-5xl px-6 md:px-10">
            <Reveal className="mb-10">
              <Eyebrow>Keep exploring</Eyebrow>
              <h2 className="mt-3 text-[22px] md:text-[26px] font-bold" style={{ color: INK }}>
                Other products
              </h2>
            </Reveal>

            <div className="grid sm:grid-cols-2 gap-6">
              {related.map((p, i) => (
                <Reveal
                  key={p.slug}
                  as={Link}
                  to={`/products/${p.slug}`}
                  className="group rounded-2xl overflow-hidden border border-black/5 bg-white hover:shadow-lg transition-shadow flex flex-col"
                  style={{ transitionDelay: `${i * 70}ms` }}
                >
                  <div className="h-40">
                    <ProductCover product={p} className="h-full aspect-auto rounded-none border-0" />
                  </div>
                  <div className="p-5">
                    <span
                      className="w-fit rounded-md px-2 py-0.5 font-mono text-[10.5px] font-semibold tracking-[0.08em] uppercase"
                      style={{ color: BLUE, background: "linear-gradient(115deg, rgba(46,111,242,.12), rgba(23,195,162,.12))" }}
                    >
                      {p.category}
                    </span>
                    <h3 className="mt-2.5 text-[15px] font-semibold leading-snug group-hover:opacity-80 transition-opacity" style={{ color: INK }}>
                      {p.name}
                    </h3>
                    <p className="mt-1.5 text-[13px] text-[#5b6478] leading-relaxed">{p.tagline}</p>
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
            Want to see {product.name} in action?
          </h2>
          <p className="mt-3 text-[15px] text-[#5b6478] leading-relaxed">
            Reach out and we&rsquo;ll walk you through it.
          </p>
          <Link
            to="/contact-us"
            className="mt-7 inline-flex items-center justify-center rounded-full px-7 py-3.5 text-[14.5px] font-semibold text-white shadow-[0_12px_24px_-10px_rgba(23,195,162,.45)] transition-transform hover:-translate-y-0.5"
            style={{ background: GRADIENT }}
          >
            Start a Project
          </Link>
        </Reveal>
      </section>
    </div>
  );
}