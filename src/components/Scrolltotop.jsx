import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Mount this once, inside <BrowserRouter> and above <Routes>, in App.jsx:
 *
 *   <BrowserRouter>
 *     <ScrollToTop />
 *     <Header />
 *     <Routes>...</Routes>
 *     <Footer />
 *   </BrowserRouter>
 *
 * React Router doesn't reset scroll position on navigation — it just
 * leaves the browser wherever it was on the previous page. This fixes
 * that: plain route changes jump to the top, and links with a hash
 * (e.g. /services#digital-marketing) scroll to that section instead.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Give the new page a tick to render before measuring the target.
      const id = hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" in window ? "instant" : "auto" });
  }, [pathname, hash]);

  return null;
}