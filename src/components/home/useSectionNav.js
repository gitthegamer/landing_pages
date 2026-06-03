import { useCallback } from "react";
import navigate from "../action/navigate";

/** In-page section links (same behavior as HTML anchor nav). */
export function useSectionNav() {
  return useCallback((e, sectionId) => {
    e.preventDefault();
    navigate(`#${sectionId}`);
  }, []);
}

export function sectionNavProps(sectionId, onNav) {
  return {
    href: `#${sectionId}`,
    onClick: (e) => onNav(e, sectionId),
  };
}
