import React from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import {
  getCafeDrinkAppBaseUrl,
  getCafeDrinkIframeSrc,
} from "../lib/cafeDrinkAppUrl";

const PROJECT_TITLE = "Cafe-Style Drink Recipe App";

/** Dev: iframe to local Vite app. Prod: most hosts block iframes (X-Frame-Options / CSP); open in new tab. */
function useIframeEmbed() {
  if (process.env.NODE_ENV === "development") return true;
  return process.env.REACT_APP_CAFE_DRINK_USE_IFRAME === "true";
}

/**
 * Case-study page: embeds the full Cafe Drink web app (src/pages/cafe-drink-app/apps/web)
 * in an iframe in development. Production uses a prominent link — typical hosts
 * (e.g. Vercel) send frame-ancestors 'none', so the embed stays blank on GitHub Pages.
 */
export default function ExampleProject({ darkMode, setDarkMode }) {
  const liveAppUrl = getCafeDrinkAppBaseUrl();
  const iframeSrc = getCafeDrinkIframeSrc();
  const showIframe = useIframeEmbed();

  return (
    <main className="page-main example-project">
      <header className="example-project__hero">
        <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        <nav className="example-project__nav" aria-label="Project">
          <Link to="/" className="example-project__back">
            ← Back to portfolio
          </Link>
        </nav>
        <h1 className="example-project__title">{PROJECT_TITLE}</h1>
        {process.env.NODE_ENV === "development" ? (
          <p className="example-project__lede">
            Full Vite + React Router app from{" "}
            <code className="example-project__code">
              src/pages/cafe-drink-app/apps/web
            </code>{" "}
            — embedded below. The iframe uses{" "}
            <strong>this page’s hostname</strong> and port{" "}
            <code className="example-project__code">4000</code>. Start the app
            with{" "}
            <code className="example-project__code">
              cd src/pages/cafe-drink-app/apps/web && npm run dev
            </code>
            . Override the URL with{" "}
            <code className="example-project__code">
              REACT_APP_CAFE_DRINK_IFRAME_URL
            </code>{" "}
            in <code className="example-project__code">.env.local</code>.
          </p>
        ) : (
          <p className="example-project__lede">
            Full Vite + React Router app in{" "}
            <code className="example-project__code">
              src/pages/cafe-drink-app/apps/web
            </code>
            . The live deployment opens in a new tab — most production hosts block
            embedding in iframes from other sites (browser security).
          </p>
        )}
      </header>

      <section className="example-project__section example-project__section--flush">
        <h2 className="example-project__visually-hidden">Drink app</h2>
        {showIframe ? (
          <div className="example-project__iframe-shell example-project__iframe-shell--full">
            <iframe
              className="example-project__iframe"
              title="Cafe Drink App"
              src={iframeSrc}
            />
          </div>
        ) : (
          <div className="example-project__embed-fallback">
            <p className="example-project__embed-fallback-text">
              Open the live app to browse recipes. Set{" "}
              <code className="example-project__code">
                REACT_APP_CAFE_DRINK_IFRAME_URL
              </code>{" "}
              when building if your host allows embedding, then add{" "}
              <code className="example-project__code">
                REACT_APP_CAFE_DRINK_USE_IFRAME=true
              </code>{" "}
              to try an iframe again.
            </p>
            <a
              href={liveAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="example-project__embed-fallback-cta"
            >
              Open Cafe Drink App →
            </a>
          </div>
        )}
      </section>

      <section className="example-project__section example-project__stack">
        <h2>Also on the web</h2>
        <p className="example-project__muted">
          Same URL as production when the portfolio is built (overridable via{" "}
          <code className="example-project__code">
            REACT_APP_CAFE_DRINK_IFRAME_URL
          </code>
          ).
        </p>
        <p className="example-project__iframe-note">
          <a
            href={liveAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="example-project__back"
          >
            Open hosted app in a new tab →
          </a>
        </p>
      </section>

      <section className="example-project__section example-project__stack">
        <h2>Tech stack</h2>
        <ul>
          <li>Portfolio: React (Create React App), embedded via iframe in dev</li>
          <li>
            Drink app: Vite + React Router in{" "}
            <code>src/pages/cafe-drink-app/apps/web</code>
          </li>
          <li>
            Lightweight in-repo UI (no iframe) still lives in{" "}
            <code>src/pages/cafe-drink-app/cafe-drink/</code> if you want to
            reuse it elsewhere
          </li>
        </ul>
      </section>

      <footer className="example-project__footer">
        <Link
          to="/"
          className="example-project__back example-project__back--footer"
        >
          ← Return to portfolio home
        </Link>
      </footer>
    </main>
  );
}
