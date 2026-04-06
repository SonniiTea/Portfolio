import React, { useState } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import ProjectViewportToggle from "../components/ProjectViewportToggle";
import CafeDrinkApp from "./cafe-drink-app/cafe-drink/CafeDrinkApp";

export default function CafeDrinkPage({ darkMode, setDarkMode }) {
  const [viewport, setViewport] = useState("desktop");

  return (
    <main className="page-main cafe-drink-page">
      <header className="cafe-drink-page__top" aria-label="Page">
        <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        <nav className="cafe-drink-page__nav" aria-label="Project">
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
          <CafeDrinkApp />
        </div>
      </div>
    </main>
  );
}
