import React from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import {
  CAFE_DRINK_HOSTED_URL,
  getCafeDrinkIframeSrc,
} from "../lib/cafeDrinkAppUrl";

const PROJECT_TITLE = "Cafe-Style Drink Recipe App";

function iframeSrc() {
  return getCafeDrinkIframeSrc();
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
          embedded below. In development the iframe uses{" "}
          <strong>this page’s hostname</strong> and port{" "}
          <code className="example-project__code">4000</code>{" "}
          (so <code className="example-project__code">localhost</code> and{" "}
          <code className="example-project__code">127.0.0.1</code> stay consistent
          with Chrome). Start the app with{" "}
          <code className="example-project__code">
            cd cafe-drink-app/apps/web && npm run dev
          </code>
          . Override the URL with{" "}
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
            href={CAFE_DRINK_HOSTED_URL}
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
