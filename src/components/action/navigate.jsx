let navigateFn = null;

export const HEADER_SCROLL_OFFSET = 86;

export function getHeaderScrollOffset() {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(
    "--tps-fixed-header-height"
  );
  const height = parseInt(raw, 10);
  return Number.isFinite(height) && height > 0 ? height + 8 : HEADER_SCROLL_OFFSET;
}

/**
 * Find nearest scrollable ancestor (Framework7 may trap scroll on .page).
 */
function getScrollableParent(el) {
  let node = el?.parentElement;
  while (node && node !== document.body && node !== document.documentElement) {
    const style = window.getComputedStyle(node);
    const overflowY = style.overflowY;
    const canScroll =
      (overflowY === "auto" || overflowY === "scroll" || overflowY === "overlay") &&
      node.scrollHeight > node.clientHeight + 1;
    if (canScroll) return node;
    node = node.parentElement;
  }
  return document.scrollingElement || document.documentElement;
}

/**
 * Scroll to a landing-page section by id (matches HTML hash navigation).
 * @param {string} sectionId - e.g. "about" or "#about"
 */
export function scrollToSection(sectionId) {
  const id = String(sectionId).replace(/^#/, "");
  const target = document.getElementById(id);
  if (!target) return;

  const offset = getHeaderScrollOffset();
  const scrollRoot = getScrollableParent(target);
  const isDocumentScroll =
    scrollRoot === document.scrollingElement ||
    scrollRoot === document.documentElement ||
    scrollRoot === document.body;

  if (isDocumentScroll) {
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  } else {
    const parentTop = scrollRoot.getBoundingClientRect().top;
    const targetTop = target.getBoundingClientRect().top;
    const top = scrollRoot.scrollTop + (targetTop - parentTop) - offset;
    scrollRoot.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  }

  const hash = `#${id}`;
  if (window.location.hash !== hash) {
    window.history.pushState(
      null,
      "",
      `${window.location.pathname}${window.location.search}${hash}`,
    );
  }
}

/**
 * Initialize navigateFn from React Router useNavigate.
 */
export const setNavigate = (navigate) => {
  navigateFn = navigate;
};

/**
 * Global navigation — routes, back, and in-page section hashes (EDNEX header).
 * @param {string | number} path - Route path, "#section", "/#section", or -1
 */
export default function navigate(path) {
  const pathStr = String(path);

  if (pathStr.startsWith("#")) {
    if (!navigateFn) {
      scrollToSection(pathStr);
      return;
    }
    const onHome =
      window.location.pathname === "/" || window.location.pathname === "";
    if (onHome) {
      scrollToSection(pathStr);
      return;
    }
    navigateFn(`/${window.location.search}${pathStr}`);
    window.setTimeout(() => scrollToSection(pathStr), 200);
    return;
  }

  const hashIndex = pathStr.indexOf("#");
  if (hashIndex !== -1) {
    const routePath = pathStr.slice(0, hashIndex) || "/";
    const hash = pathStr.slice(hashIndex);
    const onTargetRoute =
      routePath === window.location.pathname ||
      (routePath === "/" &&
        (window.location.pathname === "/" || window.location.pathname === ""));

    if (!navigateFn) {
      scrollToSection(hash);
      return;
    }

    if (onTargetRoute) {
      scrollToSection(hash);
      return;
    }

    navigateFn(`${routePath}${window.location.search}${hash}`);
    window.setTimeout(() => scrollToSection(hash), 200);
    return;
  }

  if (!navigateFn) {
    if (pathStr === "-1") {
      window.history.back();
      return;
    }
    window.location.href = pathStr;
    return;
  }

  if (pathStr === "-1") {
    navigateFn(-1);
    return;
  }

  const queryParams = window.location.search;
  navigateFn(`${pathStr}${queryParams}`);
}
