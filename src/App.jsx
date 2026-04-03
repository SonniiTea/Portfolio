import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./portfolio/style.css";
import Portfolio from "./portfolio/portfolio";
import ExampleProject from "./pages/ExampleProject";

/** Must match package.json "homepage" path for GitHub Pages */
const basename = "/Portfolio";

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
        </Routes>
      </div>
    </BrowserRouter>
  );
}
