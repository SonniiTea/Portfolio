import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./portfolio/style.css";
import Portfolio from "./portfolio/portfolio";
import ExampleProject from "./pages/ExampleProject";
import CafeDrinkPage from "./pages/CafeDrinkPage";

/** Matches CRA’s injected PUBLIC_URL (see `.env.development` for local root vs GitHub Pages build). */
const basename = (process.env.PUBLIC_URL || "").replace(/\/$/, "");

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <BrowserRouter basename={basename}>
      <div className={`app-root${darkMode ? " dark-mode" : ""}`}>
        <div className="bg-blobs" aria-hidden="true">
          <span className="blob blob-a">
            <span className="blob-fill" />
          </span>
          <span className="blob blob-b">
            <span className="blob-fill" />
          </span>
          <span className="blob blob-c">
            <span className="blob-fill" />
          </span>
        </div>
        <Routes>
          <Route
            path="/"
            element={
              <Portfolio darkMode={darkMode} setDarkMode={setDarkMode} />
            }
          />
          <Route
            path="/projects/example"
            element={
              <ExampleProject
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />
            }
          />
          <Route
            path="/cafe-drink"
            element={
              <CafeDrinkPage
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
