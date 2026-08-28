import React, { useEffect, useRef, useState } from "react";

/** Brand tokens — mirror Header.jsx / Home.jsx / Footer.jsx / AboutUs.jsx */
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

const SOCIALS = [
  {
    label: "LinkedIn",
    href: "#",
    path: "M6.94 8.5H4.06V19H6.94V8.5ZM5.5 7.25A1.65 1.65 0 1 0 5.5 4a1.65 1.65 0 0 0 0 3.25ZM19.94 19H17.1v-5.6c0-1.34-.03-3.06-1.87-3.06-1.87 0-2.16 1.46-2.16 2.96V19H10.2V8.5h2.72v1.43h.04c.38-.72 1.3-1.48 2.68-1.48 2.87 0 3.3 1.89 3.3 4.34V19Z",
  },
  {
    label: "X",
    href: "#",
    path: "M4 4l7.2 9.3L4.3 20h1.9l6.1-6.6 4.7 6.6H20l-7.5-9.9L19.1 4h-1.9l-5.6 6.1L8.4 4H4Zm2.8 1.5h2l8.4 11.9h-2L6.8 5.5Z",
  },
  {
    label: "Facebook",
    href: "#",
    path: "M13.5 20v-6.9h2.3l.35-2.7h-2.65V8.7c0-.78.22-1.32 1.34-1.32h1.43V5a19 19 0 0 0-2.08-.1c-2.06 0-3.47 1.26-3.47 3.56v1.98H8.4v2.7h2.35V20h2.75Z",
  },
];

const SERVICE_OPTIONS = [
  "Web Development",
  "Application Development",
  "Digital Marketing",
  "Graphic Design",
  "System Design",
  "AI & Automation",
  "Data Science",
  "Something else",
];

/* ---------------------------------------------------------------- */
/*  Small input primitives, styled once, reused everywhere below     */
/* ---------------------------------------------------------------- */

const fieldBase =
  "w-full rounded-xl border bg-white px-4 py-3 text-[14.5px] text-[#0a0f24] placeholder:text-[#9aa2b4] outline-none transition-colors focus:border-transparent";

const Field = ({ label, ...props }) => (
  <label className="block">
    <span className="mb-2 block text-[13px] font-medium text-[#3a4258]">{label}</span>
    <input
      {...props}
      className={fieldBase}
      style={{ borderColor: "rgba(10,15,36,.12)" }}
      onFocus={(e) => (e.target.style.boxShadow = `0 0 0 3px rgba(46,111,242,.18)`)}
      onBlur={(e) => (e.target.style.boxShadow = "none")}
    />
  </label>
);

/* ---------------------------------------------------------------- */
/*  Page                                                              */
/* ---------------------------------------------------------------- */

export default function ContactUs() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: SERVICE_OPTIONS[0],
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      // TODO: wire this up to your real backend / email service, e.g.:
      // await fetch("/api/contact", { method: "POST", body: JSON.stringify(form) });
      // or a service like Formspree / EmailJS.
      await new Promise((res) => setTimeout(res, 700));
      setStatus("sent");
      setForm({ name: "", email: "", phone: "", service: SERVICE_OPTIONS[0], message: "" });
    } catch (err) {
      setStatus("error");
    }
  };

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
              <Eyebrow tone="dark">Contact Us</Eyebrow>
            </div>
            <h1 className="mt-5 text-white font-bold leading-[1.1] text-[32px] sm:text-[42px] md:text-[48px]">
              Let&rsquo;s build something{" "}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: GRADIENT }}>
                worth shipping
              </span>
              .
            </h1>
            <p className="mt-5 text-white/70 text-[16.5px] leading-relaxed max-w-[52ch] mx-auto">
              Tell us about your project and we&rsquo;ll get back to you within one business day with next steps — not a sales script.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============= FORM + INFO ============= */}
      <section className="py-20 md:py-28 bg-[#f5f7fb]">
        <div className="mx-auto max-w-6xl px-6 md:px-10 grid lg:grid-cols-[1.2fr_.8fr] gap-10">
          {/* form card */}
          <Reveal className="bg-white rounded-[22px] border border-black/5 p-7 md:p-10 shadow-sm">
            <h2 className="text-[22px] font-semibold" style={{ color: INK }}>
              Start a conversation
            </h2>
            <p className="mt-2 text-[14.5px] text-[#5b6478]">
              Fill this out with as much or as little detail as you have — we&rsquo;ll follow up with the right questions.
            </p>

            {status === "sent" ? (
              <div
                className="mt-8 rounded-2xl border p-6 text-center"
                style={{ borderColor: "rgba(23,195,162,.3)", background: "rgba(23,195,162,.06)" }}
              >
                <p className="font-semibold" style={{ color: INK }}>
                  Message sent — thank you.
                </p>
                <p className="mt-1 text-[14px] text-[#5b6478]">
                  We&rsquo;ll be in touch within one business day.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="mt-8 space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field
                    label="Full name"
                    name="name"
                    type="text"
                    placeholder="Jamie Chowdhury"
                    required
                    value={form.name}
                    onChange={onChange}
                  />
                  <Field
                    label="Email address"
                    name="email"
                    type="email"
                    placeholder="jamie@company.com"
                    required
                    value={form.email}
                    onChange={onChange}
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <Field
                    label="Phone (optional)"
                    name="phone"
                    type="tel"
                    placeholder="+880 00 0000 0000"
                    value={form.phone}
                    onChange={onChange}
                  />
                  <label className="block">
                    <span className="mb-2 block text-[13px] font-medium text-[#3a4258]">I&rsquo;m interested in</span>
                    <select
                      name="service"
                      value={form.service}
                      onChange={onChange}
                      className={fieldBase}
                      style={{ borderColor: "rgba(10,15,36,.12)" }}
                    >
                      {SERVICE_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <label className="block">
                  <span className="mb-2 block text-[13px] font-medium text-[#3a4258]">Project details</span>
                  <textarea
                    name="message"
                    rows={5}
                    required
                    placeholder="What are you building, and what does success look like?"
                    value={form.message}
                    onChange={onChange}
                    className={`${fieldBase} resize-none`}
                    style={{ borderColor: "rgba(10,15,36,.12)" }}
                    onFocus={(e) => (e.target.style.boxShadow = `0 0 0 3px rgba(46,111,242,.18)`)}
                    onBlur={(e) => (e.target.style.boxShadow = "none")}
                  />
                </label>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-[14.5px] font-semibold text-white shadow-[0_12px_24px_-10px_rgba(23,195,162,.45)] transition-transform hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
                  style={{ background: GRADIENT }}
                >
                  {status === "sending" ? "Sending…" : "Send message"}
                </button>

                {status === "error" && (
                  <p className="text-[13.5px] text-red-500">
                    Something went wrong — please try again or email us directly.
                  </p>
                )}
              </form>
            )}
          </Reveal>

          {/* info column */}
          <div className="flex flex-col gap-5">
            <Reveal
              className="rounded-[22px] p-7 text-white"
              style={{ background: `linear-gradient(155deg, ${INK} 0%, ${INK_2} 100%)` }}
            >
              <Eyebrow tone="dark">Get in touch</Eyebrow>
              <ul className="mt-6 space-y-5">
                <li>
                  <p className="text-[12px] font-mono uppercase tracking-widest text-white/40">Email</p>
                  <a href="mailto:hello@atxbase.com" className="mt-1 block text-[15px] font-medium hover:text-white/80 transition-colors">
                    hello@atxbase.com
                  </a>
                </li>
                <li>
                  <p className="text-[12px] font-mono uppercase tracking-widest text-white/40">Phone</p>
                  <a href="tel:+8800000000" className="mt-1 block text-[15px] font-medium hover:text-white/80 transition-colors">
                    +880 00 0000 0000
                  </a>
                </li>
                <li>
                  <p className="text-[12px] font-mono uppercase tracking-widest text-white/40">Office</p>
                  <p className="mt-1 text-[15px] font-medium">Dhaka, Bangladesh</p>
                </li>
                <li>
                  <p className="text-[12px] font-mono uppercase tracking-widest text-white/40">Hours</p>
                  <p className="mt-1 text-[15px] font-medium">Sun – Thu, 9:00 AM – 6:00 PM</p>
                </li>
              </ul>

              <div className="mt-7 flex items-center gap-3">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="h-9 w-9 rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:text-white hover:border-white/35 transition-colors"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                      <path d={s.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </Reveal>

            {/* location placeholder — swap for a real embedded map when you have coordinates */}
            <Reveal
              className="relative rounded-[22px] border border-black/5 overflow-hidden h-52 flex items-center justify-center"
              style={{
                background:
                  "repeating-linear-gradient(45deg, #eceff7 0px, #eceff7 10px, #f5f7fb 10px, #f5f7fb 20px)",
              }}
            >
              <div className="flex flex-col items-center gap-2 text-center px-6">
                <span
                  className="h-11 w-11 rounded-full flex items-center justify-center"
                  style={{ background: GRADIENT }}
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white">
                    <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
                  </svg>
                </span>
                <p className="text-[13px] font-medium text-[#5b6478]">Map embed goes here</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}