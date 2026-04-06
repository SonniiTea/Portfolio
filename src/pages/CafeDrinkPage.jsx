import React from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import CafeDrinkApp from "./cafe-drink-app/cafe-drink/CafeDrinkApp";

export default function CafeDrinkPage({ darkMode, setDarkMode }) {
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
      <CafeDrinkApp />
    </main>
  );
}
