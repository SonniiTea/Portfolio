/**
 * Sproutwise web app URL for the portfolio iframe (`src/pages/sproutwise-app/apps/web`, dev port 4000 — see `vite.config.ts`).
 *
 * Override at build time with `REACT_APP_SPROUTWISE_IFRAME_URL` when the app is deployed.
 */
export const SPROUTWISE_HOSTED_URL = "";

const DEV_PORT = 4000;

/** Base URL for the Sproutwise web app (no trailing slash). */
export function getSproutwiseAppBaseUrl() {
  const fromEnv = process.env.REACT_APP_SPROUTWISE_IFRAME_URL;
  if (fromEnv) {
    return fromEnv.replace(/\/$/, "");
  }
  if (process.env.NODE_ENV === "development") {
    if (typeof window !== "undefined") {
      return `${window.location.protocol}//${window.location.hostname}:${DEV_PORT}`;
    }
    return `http://localhost:${DEV_PORT}`;
  }
  return SPROUTWISE_HOSTED_URL || "";
}

/** iframe `src` expects a trailing slash for the app root. */
export function getSproutwiseIframeSrc() {
  const base = getSproutwiseAppBaseUrl();
  return base ? `${base}/` : "";
}
