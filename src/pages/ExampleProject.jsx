import React from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";

const HOSTED_APP_URL =
  "https://683fc7a9-93c6-4c45-b973-d7dcff546ded.created.app";

/** Full monorepo web app: run `npm run dev` from cafe-drink-app/apps/web (port 4000). */
const LOCAL_WEB_APP_ORIGIN = "http://localhost:4000";

const PROJECT_TITLE = "Cafe-Style Drink Recipe App";

function iframeSrc() {
  const fromEnv = process.env.REACT_APP_CAFE_DRINK_IFRAME_URL;
  if (fromEnv) return fromEnv.replace(/\/$/, "") + "/";
  if (process.env.NODE_ENV === "development") {
    return `${LOCAL_WEB_APP_ORIGIN}/`;
  }
  return HOSTED_APP_URL;
}

/**
 * Case-study page: embeds the full Cafe Drink web app (cafe-drink-app/apps/web)
 * in an iframe. CRA cannot import that app as a component; linking by URL is the
 * supported integration.
 */
export default function ExampleProject({ darkMode, setDarkMode }) {
  const src = iframeSrc();

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
        <p className="example-project__lede">
          Full Vite + React Router app from{" "}
          <code className="example-project__code">cafe-drink-app/apps/web</code>,
          embedded below. In development it loads{" "}
          <code className="example-project__code">{LOCAL_WEB_APP_ORIGIN}</code>{" "}
          — start it with{" "}
          <code className="example-project__code">
            cd cafe-drink-app/apps/web && npm run dev
          </code>
          . Override the iframe URL anytime with{" "}
          <code className="example-project__code">
            REACT_APP_CAFE_DRINK_IFRAME_URL
          </code>{" "}
          in <code className="example-project__code">.env.local</code>.
        </p>
      </header>

      <section className="example-project__section example-project__section--flush">
        <h2 className="example-project__visually-hidden">Drink app</h2>
        <div className="example-project__iframe-shell example-project__iframe-shell--full">
          <iframe
            className="example-project__iframe"
            title="Cafe Drink App"
            src={src}
            loading="lazy"
          />
        </div>
      </section>

      <section className="example-project__section example-project__stack">
        <h2>Also on the web</h2>
        <p className="example-project__muted">
          Open the hosted build on created.app in a new tab (same as production
          embed when the portfolio is built).
        </p>
        <p className="example-project__iframe-note">
          <a
            href={HOSTED_APP_URL}
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
          <li>Portfolio: React (Create React App), embedded via iframe</li>
          <li>
            Drink app: Vite + React Router in{" "}
            <code>cafe-drink-app/apps/web</code>
          </li>
          <li>
            Lightweight in-repo UI (no iframe) still lives in{" "}
            <code>src/cafe-drink/</code> if you want to reuse it elsewhere
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
