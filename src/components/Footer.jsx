

import React from "react";
import { Link } from "react-router-dom";
import logo from "./assets/ATX BASE white bg transparent.png";

/** Brand tokens — mirror Header.jsx / Home.jsx */
const INK = "#0a0f24";
const INK_2 = "#111a36";
const BLUE = "#2e6ff2";
const TEAL = "#17c3a2";
const GRADIENT = `linear-gradient(115deg, ${BLUE}, ${TEAL})`;

/** Route where Services.jsx is mounted — update this one line if that ever changes. */
const SERVICES_ROUTE = "/services/";

const SERVICE_LINKS = [
  { label: "Application Development", slug: "app-development" },
  { label: "System Design", slug: "system-design" },
  { label: "AI & Automation", slug: "ai-&-automation" },
  { label: "Data Science", slug: "data-science" },
  { label: "Digital Marketing", slug: "digital-marketing" },
  { label: "Graphic Design", slug: "graphic-design" },
];

const COMPANY_LINKS = [
  { label: "Home", path: "/home" },
  { label: "About Us", path: "/about-us" },
  { label: "Products", path: "/products" },
  { label: "Works", path: "/works" },
  { label: "News", path: "/news" },
  { label: "Contact Us", path: "/contact-us" },
];

const SOCIALS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/atxbase",
    path: "M6.94 8.5H4.06V19H6.94V8.5ZM5.5 7.25A1.65 1.65 0 1 0 5.5 4a1.65 1.65 0 0 0 0 3.25ZM19.94 19H17.1v-5.6c0-1.34-.03-3.06-1.87-3.06-1.87 0-2.16 1.46-2.16 2.96V19H10.2V8.5h2.72v1.43h.04c.38-.72 1.3-1.48 2.68-1.48 2.87 0 3.3 1.89 3.3 4.34V19Z",
  },
  {
    label: "X",
    href: "https://www.x.com/atxbase",
    path: "M4 4l7.2 9.3L4.3 20h1.9l6.1-6.6 4.7 6.6H20l-7.5-9.9L19.1 4h-1.9l-5.6 6.1L8.4 4H4Zm2.8 1.5h2l8.4 11.9h-2L6.8 5.5Z",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/atxbase",
    path: "M13.5 20v-6.9h2.3l.35-2.7h-2.65V8.7c0-.78.22-1.32 1.34-1.32h1.43V5a19 19 0 0 0-2.08-.1c-2.06 0-3.47 1.26-3.47 3.56v1.98H8.4v2.7h2.35V20h2.75Z",
  },
];

const Footer = () => {
  return (
    <footer className="relative overflow-hidden" style={{ background: `linear-gradient(160deg, ${INK} 0%, ${INK_2} 100%)` }} id="footer">
      {/* top hairline accent, echoes the header's gradient underline */}
      <div className="h-px w-full" style={{ background: GRADIENT, opacity: 0.5 }} />

      <div className="mx-auto max-w-7xl px-6 md:px-10 pt-14 sm:pt-20 pb-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-[1.4fr_.8fr_.8fr_1fr] gap-10 lg:gap-12 pb-12 sm:pb-14 border-b border-white/10">
          {/* brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <img src={logo} style={{ height: 150, width: 150}} alt="ATX Base" className="mt-[-50px] h-auto w-auto object-contain brightness-0 invert" />
            <p className="mt-5 text-[14px] leading-relaxed text-white/80 max-w-[36ch] sm:max-w-[32ch]">
              ATX Base is an advanced technology exchange — websites, applications, and the design and marketing that bring them to your customers.
            </p>

            <div className="mt-6 flex items-center gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="h-9 w-9 rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:text-white hover:border-white/35 transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* services */}
          <div>
            <h4 className="font-mono text-[11px] tracking-[0.14em] uppercase text-white/60 mb-5">Services</h4>
            <ul className="space-y-3">
              {SERVICE_LINKS.map((s) => (
                <li key={s.slug}>
                  <Link
                    to={`${SERVICES_ROUTE}${s.slug}`}
                    className="text-[14.5px] text-white/70 hover:text-white transition-colors"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* company */}
          <div>
            <h4 className="font-mono text-[11px] tracking-[0.14em] uppercase text-white/60 mb-5">Company</h4>
            <ul className="space-y-3">
              {COMPANY_LINKS.map((c) => (
                <li key={c.path}>
                  <Link to={c.path} className="text-[14.5px] text-white/70 hover:text-white transition-colors">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* contact */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h4 className="font-mono text-[11px] tracking-[0.14em] uppercase text-white/60 mb-5">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:atxbaselimited@gmail.com" className="text-[14.5px] text-white/70 hover:text-white transition-colors break-all">
                  atxbaselimited@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+8801301930846" className="text-[14.5px] text-white/70 hover:text-white transition-colors">
                  +88 0130 1930 846
                </a>
              </li>
              <li className="text-[14.5px] text-white/70">Bashundhara R/A, Dhaka, Bangladesh</li>
            </ul>

            <Link
              to="/contact-us"
              className="mt-6 inline-flex items-center justify-center rounded-full px-5 py-2.5 text-[13.5px] font-semibold text-white shadow-md transition-transform hover:-translate-y-0.5"
              style={{ background: GRADIENT }}
            >
              Start a Project
            </Link>
          </div>
        </div>

        {/* bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-8 text-[13px] text-white/80 text-center sm:text-left">
          <span className="text-white/80">© {new Date().getFullYear()} ATX Base. All rights reserved.</span>
          <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-white/80">
            Advanced Technology Exchange
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;