let navigateFn = null; // Used to store the function returned by useNavigate

/**
 * Initialize navigateFn
 * @param {Function} navigate - The navigate function from React Router
 */
export const setNavigate = (navigate) => {
  navigateFn = navigate;
};

/**
 * Global navigation function
 * @param {string | number} path - Target path or -1 (go back to the previous page)
 */
export default function navigate(path) {
  if (!navigateFn) {
    throw new Error(
      "Navigate function is not initialized. Did you call setNavigate?"
    );
  }
  const queryParams = window.location.search;
  const hash = window.location.hash;

  if (String(path) === "-1") {
    navigateFn(-1, { state: queryParams });
  } else {
    navigateFn(`${path}${queryParams || ""}${hash || ""}`);
  }
}
