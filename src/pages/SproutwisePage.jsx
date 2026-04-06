import React, { useState } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import ProjectViewportToggle from "../components/ProjectViewportToggle";
import SproutwiseApp from "./sproutwise-app/sproutwise-portfolio/SproutwiseApp";

export default function SproutwisePage({ darkMode, setDarkMode }) {
  const [viewport, setViewport] = useState("desktop");

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
          <SproutwiseApp />
        </div>
      </div>
    </main>
  );
}
