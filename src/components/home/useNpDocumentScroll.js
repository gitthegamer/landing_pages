import { useEffect } from "react";

const SCROLL_CHAIN_IDS = ["app", "framework7-root"];
const SCROLL_CHAIN_SELECTORS = [
  ".views",
  ".view",
  ".pages",
  ".np-layout",
  ".np-page.page",
  ".np-page .page-content",
];

export function applyNpDocumentScroll() {
  document.documentElement.classList.add("np-landing");

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

export function clearNpDocumentScroll() {
  document.documentElement.classList.remove("np-landing");
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

export default function useNpDocumentScroll() {
  useEffect(() => {
    applyNpDocumentScroll();
    const t1 = window.setTimeout(applyNpDocumentScroll, 0);
    const t2 = window.setTimeout(applyNpDocumentScroll, 100);
    const t3 = window.setTimeout(applyNpDocumentScroll, 500);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      clearNpDocumentScroll();
    };
  }, []);
}
