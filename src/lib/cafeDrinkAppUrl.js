/**
 * Default production URL for cafe-drink-app (override with
 * REACT_APP_CAFE_DRINK_IFRAME_URL at build time — required if this deployment
 * is removed or changed).
 */
export const CAFE_DRINK_HOSTED_URL =
  "https://683fc7a9-93c6-4c45-b973-d7dcff546ded.created.app";

const DEV_PORT = 4000;

/**
 * Base URL for the full drink app (no trailing slash).
 * Uses REACT_APP_CAFE_DRINK_IFRAME_URL when set; otherwise dev origin matches
 * the portfolio hostname; production uses the hosted URL.
 */
export function getCafeDrinkAppBaseUrl() {
  const fromEnv = process.env.REACT_APP_CAFE_DRINK_IFRAME_URL;
  if (fromEnv) {
    return fromEnv.replace(/\/$/, "");
  }
  if (process.env.NODE_ENV === "development") {
    if (typeof window !== "undefined") {
      return `${window.location.protocol}//${window.location.hostname}:${DEV_PORT}`;
    }
    return `http://localhost:${DEV_PORT}`;
  }
  return CAFE_DRINK_HOSTED_URL;
}

/** iframe `src` expects a trailing slash for the app root. */
export function getCafeDrinkIframeSrc() {
  return `${getCafeDrinkAppBaseUrl()}/`;
}
