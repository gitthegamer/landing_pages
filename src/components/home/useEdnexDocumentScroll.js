import { useEffect } from "react";

const SCROLL_CHAIN_IDS = ["app", "framework7-root"];

/**
 * Framework7 App sets #app { height: 100% } and traps scroll in .page / .page-content.
 * Reset the chain so the landing page scrolls on the document (like the static HTML).
 */
export function applyEdnexDocumentScroll() {
  document.documentElement.classList.add("ednex-landing");

  SCROLL_CHAIN_IDS.forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.style.height = "auto";
    el.style.minHeight = "100vh";
    el.style.overflow = "visible";
    el.style.overflowX = "hidden";
  });

  document.querySelectorAll(".ednex-page.page").forEach((page) => {
    page.style.position = "relative";
    page.style.top = "auto";
    page.style.left = "auto";
    page.style.height = "auto";
    page.style.minHeight = "100vh";
    page.style.overflow = "visible";
  });

  document.querySelectorAll(".ednex-page .page-content").forEach((el) => {
    el.style.height = "auto";
    el.style.overflow = "visible";
  });
}

export function clearEdnexDocumentScroll() {
  document.documentElement.classList.remove("ednex-landing");
  SCROLL_CHAIN_IDS.forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.style.height = "";
    el.style.minHeight = "";
    el.style.overflow = "";
    el.style.overflowX = "";
  });
}

export default function useEdnexDocumentScroll() {
  useEffect(() => {
    applyEdnexDocumentScroll();
    const t1 = window.setTimeout(applyEdnexDocumentScroll, 0);
    const t2 = window.setTimeout(applyEdnexDocumentScroll, 100);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      clearEdnexDocumentScroll();
    };
  }, []);
}
