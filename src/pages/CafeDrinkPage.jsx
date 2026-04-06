import React from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import CafeDrinkApp from "./cafe-drink-app/cafe-drink/CafeDrinkApp";

export default function CafeDrinkPage({ darkMode, setDarkMode }) {
  return (
    <main className="page-main example-project">
      <header className="example-project__hero">
        <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        <nav className="example-project__nav" aria-label="Project">
          <Link to="/" className="example-project__back">
            ← Back to portfolio
          </Link>
        </nav>
      </header>
      <CafeDrinkApp />
    </main>
  );
}
