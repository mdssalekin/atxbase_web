import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "./assets/logo atx.png";

const menuItems = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },
  { label: "About Us", path: "/about-us" },
  { label: "News & Blog", path: "/news&blog" },
  { label: "Contact Us", path: "/contact-us" },
  { label: "Works", path: "/works" },
];

/**
 * ATX Base brand tokens (kept local so this file works even if the
 * project's tailwind.config hasn't been extended yet).
 */
const INK = "#0a0f24";
const INK_2 = "#111a36";
const BLUE = "#2e6ff2";
const TEAL = "#17c3a2";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const drawerRef = useRef(null);

  // Condense the nav into a floating capsule once the page scrolls.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll + allow Escape to close while the drawer is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    const onKey = (e) => e.key === "Escape" && setMobileOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  const goHome = () => {
    navigate("/");
    setMobileOpen(false);
  };

  return (
    <>
      {/* ============= DESKTOP / MAIN BAR ============= */}
      <header className="fixed top-0 inset-x-0 z-50 pointer-events-none">
        <div
          className={`
            pointer-events-auto mx-auto w-full max-w-7xl px-0 
            transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
            ${scrolled ? "pt-3 px-4 md:px-6" : "pt-0"}
          `}
        >
          <div
            className={`
              relative flex items-center justify-between overflow-hidden 
              transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]

              ${
                scrolled
                  ? `
                    h-[60px] px-5 rounded-full border border-black/5 bg-white/80 backdrop-blur-xl 
                    shadow-[0_10px_40px_-12px_rgba(10,15,36,0.25)] scale-[0.98]
                  `
                  : `
                    h-[76px] px-4 md:px-8 rounded-none border border-transparent 
                    bg-white/95 backdrop-blur-sm shadow-none scale-100
                  `
              }
            `}
          >
            {/* logo */}
            <button
              onClick={goHome}
              className="flex items-center gap-2 shrink-0"
              aria-label="ATX Base — home"
            >
              <img
                src={logo}
                alt="ATX Base"
                style={{ height: 200, width: 150}}
                className={`w-auto object-contain transition-all duration-500 ${
                  scrolled ? "h-7 py-10" : "h-8 md:h-9"
                }`}
              />
            </button>

            {/* desktop links */}
            <nav className="hidden min-[950px]:flex items-center gap-1">
              {menuItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end
                  className="group relative px-4 py-2 text-[13.5px] font-medium tracking-wide"
                >
                  {({ isActive }) => (
                    <>
                      <span
                        className="relative z-10 transition-colors duration-200"
                        style={{ color: isActive ? INK : "#4b5468" }}
                      >
                        {item.label}
                      </span>
                      <span
                        className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-1 h-[2.5px] rounded-full transition-all duration-300"
                        style={{
                          width: isActive ? "60%" : "0%",
                          background: `linear-gradient(90deg, ${BLUE}, ${TEAL})`,
                        }}
                      />
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* CTA + mobile trigger */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/contact-us")}
                className="hidden min-[950px]:inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13.5px] font-semibold text-white shadow-md transition-transform duration-200 hover:-translate-y-0.5"
                style={{ background: `linear-gradient(115deg, ${BLUE}, ${TEAL})` }}
              >
                Start a Project
              </button>

              {/* animated hamburger → close */}
              <button
                onClick={() => setMobileOpen(true)}
                className="min-[950px]:hidden relative h-10 w-10 flex flex-col items-center justify-center gap-[5px]"
                aria-label="Open menu"
                aria-expanded={mobileOpen}
              >
                <span className="h-[2px] w-6 rounded-full transition-all" style={{ background: INK }} />
                <span className="h-[2px] w-6 rounded-full transition-all" style={{ background: INK }} />
                <span className="h-[2px] w-4 self-end rounded-full transition-all" style={{ background: BLUE }} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* spacer so page content doesn't sit under the fixed header */}
      <div className={scrolled ? "h-[68px]" : "h-16 md:h-20"} />

      {/* ============= MOBILE DRAWER ============= */}
      <div
        className={`fixed inset-0 z-[60] transition-opacity duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />

        {/* panel */}
        <div
          ref={drawerRef}
          className={`absolute right-0 top-0 h-full w-[84%] max-w-sm flex flex-col transition-transform duration-500 ease-out ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ background: `linear-gradient(165deg, ${INK} 0%, ${INK_2} 100%)` }}
        >
          {/* decorative pixel trail, echoes the mark's dissolving corner */}
          <div className="pointer-events-none absolute top-10 right-8 flex flex-col items-end gap-1.5 opacity-70">
            {[1, 1, 1, 18, 14, 10, 7].map((s, i) => (
              <span
                key={i}
                style={{
                  width: s,
                  height: s,
                  marginRight: i * 10,
                  borderRadius: 3,
                  background: `linear-gradient(115deg, ${BLUE}, ${TEAL})`,
                  opacity: 1 - i * 0.18,
                }}
              />
            ))}
          </div>

          <div className="flex items-center justify-between h-20 px-6">
            <img src={logo} style={{height: 150, width: 150}} alt="ATX Base" className="h-full w-auto object-contain mt-10 py-4 brightness-0 invert" />
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="h-9 w-9 rounded-full border border-white/15 flex items-center justify-center font-extrabold text-white/80 hover:text-white hover:border-white/30 transition"
            >
              ✕
            </button>
          </div>

          <nav className="flex-1 px-6 mt-10 flex flex-col gap-1">
            {menuItems.map((item, i) => (
              <NavLink
                key={item.path}
                to={item.path}
                end
                onClick={() => setMobileOpen(false)}
                className="group flex items-center gap-4 py-3.5 border-b border-white/10"
                style={{
                  transitionDelay: mobileOpen ? `${i * 60}ms` : "0ms",
                  opacity: mobileOpen ? 1 : 0,
                  transform: mobileOpen ? "translateX(0)" : "translateX(24px)",
                  transition: "opacity .4s ease, transform .4s ease",
                }}
              >
                {({ isActive }) => (
                  <>
                    <span
                      className="font-mono text-[11px] tracking-widest"
                      style={{ color: isActive ? TEAL : "rgba(255,255,255,.35)" }}
                    >
                      0{i + 1}
                    </span>
                    <span
                      className="text-lg font-semibold tracking-tight transition-colors"
                      style={{ color: isActive ? "#fff" : "rgba(255,255,255,.75)" }}
                    >
                      {item.label}
                    </span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="px-6 pb-8 pt-4">
            <button
              onClick={() => {
                navigate("/contact-us");
                setMobileOpen(false);
              }}
              className="w-full rounded-full py-3.5 text-sm font-semibold text-white shadow-lg"
              style={{ background: `linear-gradient(115deg, ${BLUE}, ${TEAL})` }}
            >
              Start a Project
            </button>
            <p className="mt-4 text-center text-[12px] font-mono tracking-widest text-white/35">
              ADVANCED TECHNOLOGY EXCHANGE
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
