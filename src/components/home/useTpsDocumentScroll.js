import { useEffect } from "react";

const SCROLL_CHAIN_IDS = ["app", "framework7-root"];
const SCROLL_CHAIN_SELECTORS = [
  ".views",
  ".view",
  ".pages",
  ".tps-layout",
  ".tps-page.page",
  ".tps-page .page-content",
];

/**
 * Framework7 App sets #app { height: 100% } and traps scroll in .page / .page-content.
 * Reset the chain so The Play Standard landing scrolls on the document.
 */
export function applyTpsDocumentScroll() {
  document.documentElement.classList.add("tps-landing");

  SCROLL_CHAIN_IDS.forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.style.height = "auto";
    el.style.minHeight = "100vh";
    el.style.overflow = "visible";
    el.style.overflowX = "hidden";
  });

  SCROLL_CHAIN_SELECTORS.forEach((selector) => {
    document.querySelectorAll(selector).forEach((el) => {
      el.style.position = "relative";
      el.style.top = "auto";
      el.style.left = "auto";
      el.style.height = "auto";
      el.style.minHeight = selector.includes("page-content") ? "0" : "100vh";
      el.style.overflow = "visible";
      if (el.classList?.contains("page")) {
        el.style.width = "100%";
        el.style.transform = "none";
      }
    });
  });
}

export function clearTpsDocumentScroll() {
  document.documentElement.classList.remove("tps-landing");
  SCROLL_CHAIN_IDS.forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.style.height = "";
    el.style.minHeight = "";
    el.style.overflow = "";
    el.style.overflowX = "";
  });
  SCROLL_CHAIN_SELECTORS.forEach((selector) => {
    document.querySelectorAll(selector).forEach((el) => {
      el.style.position = "";
      el.style.top = "";
      el.style.left = "";
      el.style.height = "";
      el.style.minHeight = "";
      el.style.overflow = "";
      el.style.width = "";
      el.style.transform = "";
    });
  });
}

export default function useTpsDocumentScroll() {
  useEffect(() => {
    applyTpsDocumentScroll();
    const t1 = window.setTimeout(applyTpsDocumentScroll, 0);
    const t2 = window.setTimeout(applyTpsDocumentScroll, 100);
    const t3 = window.setTimeout(applyTpsDocumentScroll, 500);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      clearTpsDocumentScroll();
    };
  }, []);
}
