import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { PRODUCTS } from "./ProductData";

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

type RevealProps = {
  as?: React.ElementType;
  className?: string;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;

const Reveal = ({ as: Tag = "div", className = "", children, ...rest }: RevealProps) => {
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

type EyebrowProps = {
  children?: React.ReactNode;
  tone?: "light" | "dark";
  center?: boolean;
};

const Eyebrow = ({ children, tone = "light", center = false }: EyebrowProps) => (
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

type PixelTrailProps = {
  sizes?: number[];
  className?: string;
};

const PixelTrail = ({ sizes = [22, 17, 12, 9], className = "" }: PixelTrailProps) => (
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

type ProductCoverProps = {
  product: {
    name: string;
    cover?: string | null;
  };
  className?: string;
};

// Product photo slot — renders the real cover when set, otherwise a
// labeled placeholder panel instead of a broken <img>.
export const ProductCover = ({ product, className = "" }: ProductCoverProps) => (
  <div className={`relative w-full aspect-[4/3] rounded-[26px] overflow-hidden border border-black/5 shadow-xl ${className}`}>
    {product.cover ? (
      <img src={product.cover} alt={product.name} className="w-full h-full object-cover" />
    ) : (
      <div
        className="w-full h-full flex flex-col items-center justify-center gap-3 text-center px-8"
        style={{ background: `linear-gradient(155deg, ${INK} 0%, ${INK_2} 100%)` }}
      >
        <div
          className="h-16 w-16 rounded-2xl flex items-center justify-center"
          style={{ background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.14)" }}
        >
          <svg viewBox="0 0 32 32" className="h-8 w-8" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 8h20v16H6zM6 20l6-6 4 4 5-5 5 5" />
            <circle cx="11" cy="12" r="1.4" fill="white" stroke="none" />
          </svg>
        </div>
        <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-white/35">Photo goes here</p>
        <p className="text-white/55 text-[13px] leading-relaxed max-w-[24ch]">{product.name}</p>
      </div>
    )}
  </div>
);

/* ---------------------------------------------------------------- */
/*  Page                                                              */
/* ---------------------------------------------------------------- */

export default function Products() {
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
              <Eyebrow tone="dark">Our Products</Eyebrow>
            </div>
            <h1 className="mt-5 text-white font-bold leading-[1.1] text-[32px] sm:text-[42px] md:text-[48px]">
              Software we{" "}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: GRADIENT }}>
                built ourselves
              </span>
              .
            </h1>
            <p className="mt-5 text-white/70 text-[16.5px] leading-relaxed max-w-[52ch] mx-auto">
              Alongside client work, we build and maintain our own products. Here's what we&rsquo;ve shipped.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============= PRODUCT SECTIONS ============= */}
      {PRODUCTS.map((product, i) => {
        const flip = i % 2 === 1;
        return (
          <section
            key={product.slug}
            id={product.slug}
            className="scroll-mt-[100px] py-20 md:py-24 border-b border-black/5"
            style={{ background: i % 2 === 0 ? "#ffffff" : "#f5f7fb" }}
          >
            <div className="mx-auto max-w-6xl px-6 md:px-10">
              <div className={`grid lg:grid-cols-2 gap-12 items-center ${flip ? "lg:[&>*:first-child]:order-2" : ""}`}>
                <Reveal>
                  <ProductCover product={product} />
                </Reveal>

                <Reveal style={{ transitionDelay: "80ms" }}>
                  <span
                    className="inline-block rounded-md px-2.5 py-1 font-mono text-[12px] font-semibold tracking-[0.12em] uppercase"
                    style={{ color: BLUE, background: "linear-gradient(115deg, rgba(46,111,242,.14), rgba(23,195,162,.14))" }}
                  >
                    {product.category}
                  </span>
                  <h2 className="mt-4 text-[24px] md:text-[30px] font-bold leading-tight" style={{ color: INK }}>
                    {product.name}
                  </h2>
                  <p className="mt-2 text-[15px] font-medium" style={{ color: BLUE }}>
                    {product.tagline}
                  </p>
                  <p className="mt-4 text-[14.5px] text-[#5b6478] leading-relaxed">{product.summary}</p>

                  <ul className="mt-6 space-y-3">
                    {product.features.slice(0, 3).map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <Check />
                        <span className="text-[14px] text-[#3a4258] leading-relaxed">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to={`/products/${product.slug}`}
                    className="mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-[14px] font-semibold text-white shadow-md transition-transform hover:-translate-y-0.5"
                    style={{ background: GRADIENT }}
                  >
                    Learn more
                    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 3l5 5-5 5" />
                    </svg>
                  </Link>
                </Reveal>
              </div>
            </div>
          </section>
        );
      })}

      {/* ============= CTA ============= */}
      <section
        className="relative overflow-hidden py-24 text-center"
        style={{ background: `linear-gradient(155deg, ${INK} 0%, ${INK_2} 100%)` }}
      >
        <PixelTrail className="absolute bottom-8 right-8" />
        <Reveal className="mx-auto max-w-xl px-6">
          <Eyebrow tone="dark" center>
            Have a use case in mind?
          </Eyebrow>
          <h2 className="mt-5 text-white font-bold text-[26px] md:text-[36px] leading-tight">
            Want to see one of these in action?
          </h2>
          <p className="mt-4 text-white/65 text-[15.5px] leading-relaxed">
            Reach out and we&rsquo;ll walk you through a demo, or talk through custom work if none of these quite fit.
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