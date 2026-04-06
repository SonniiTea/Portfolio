import React, { useState } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import ProjectViewportToggle from "../components/ProjectViewportToggle";
import {
  getSproutwiseAppBaseUrl,
  getSproutwiseIframeSrc,
} from "../lib/sproutwiseAppUrl";

function useIframeEmbed() {
  if (process.env.NODE_ENV === "development") return true;
  return process.env.REACT_APP_SPROUTWISE_USE_IFRAME === "true";
}

export default function SproutwisePage({ darkMode, setDarkMode }) {
  const [viewport, setViewport] = useState("desktop");
  const liveAppUrl = getSproutwiseAppBaseUrl();
  const iframeSrc = getSproutwiseIframeSrc();
  const showIframe = useIframeEmbed() && Boolean(iframeSrc);

  return (
    <main className="page-main sproutwise-page">
      <header className="sproutwise-page__top" aria-label="Page">
        <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        <nav className="sproutwise-page__nav" aria-label="Project">
          <Link to="/" className="example-project__back">
            ← Back to portfolio
          </Link>
        </nav>
      </header>

      <div className="project-viewport">
        <div className="project-viewport__toolbar">
          <ProjectViewportToggle value={viewport} onChange={setViewport} />
        </div>
        <div
          className={`project-viewport__frame project-viewport__frame--${viewport}`}
        >
          {showIframe ? (
            <iframe
              className="sproutwise-page__iframe"
              title="Sproutwise"
              src={iframeSrc}
            />
          ) : (
            <div className="sproutwise-page__fallback">
              {process.env.NODE_ENV === "development" ? (
                <>
                  <p>
                    Start the Sproutwise web app, then refresh this page (port{" "}
                    <strong>4001</strong>).
                  </p>
                  <p className="sproutwise-page__fallback-path">
                    <code className="example-project__code">
                      {`cd src/pages/sproutwise-app/apps/web && npm install && npm run dev`}
                    </code>
                  </p>
                </>
              ) : (
                <p>
                  Set{" "}
                  <code className="example-project__code">
                    REACT_APP_SPROUTWISE_IFRAME_URL
                  </code>{" "}
                  when building to embed the hosted app, or open it in a new tab
                  if you have a deployment URL.
                </p>
              )}
              {liveAppUrl ? (
                <a
                  href={liveAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="example-project__back"
                >
                  Open Sproutwise app →
                </a>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
