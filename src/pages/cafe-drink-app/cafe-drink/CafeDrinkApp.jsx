import React, { useEffect, useMemo, useState, useCallback } from "react";
import { drinks } from "./data/drinks";

const CATEGORIES = ["All", "Coffee & Tea", "Refreshers", "Seasonal"];

function RecipeCheckRow({ rowId, text, checked, onToggle }) {
  return (
    <label className="cafe-drink-app__check-row">
      <span className="cafe-drink-app__check-hit">
        <input
          type="checkbox"
          className="cafe-drink-app__check-input"
          checked={checked}
          onChange={() => onToggle(rowId)}
        />
        <span className="cafe-drink-app__check-box" aria-hidden="true">
          <svg className="cafe-drink-app__check-icon" viewBox="0 0 16 16" fill="none">
            <path
              className="cafe-drink-app__check-path"
              d="M3 8.5l3 3 7-7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </span>
      <span className="cafe-drink-app__check-text">{text}</span>
    </label>
  );
}

/**
 * In-portfolio version of the Cafe Drink App — uses the same recipe data as
 * `cafe-drink-app/apps/web` without the separate Vite/API stack.
 */
export default function CafeDrinkApp() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedId, setSelectedId] = useState(null);
  const [checkedRows, setCheckedRows] = useState(() => new Set());

  const toggleRow = useCallback((rowId) => {
    setCheckedRows((prev) => {
      const next = new Set(prev);
      if (next.has(rowId)) next.delete(rowId);
      else next.add(rowId);
      return next;
    });
  }, []);

  useEffect(() => {
    setCheckedRows(new Set());
  }, [selectedId]);

  const filtered = useMemo(() => {
    return drinks.filter((d) => {
      const matchCat = category === "All" || d.category === category;
      const q = search.trim().toLowerCase();
      const matchSearch =
        !q ||
        d.name.toLowerCase().includes(q) ||
        d.category.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [search, category]);

  const selected = useMemo(
    () => drinks.find((d) => d.id === selectedId) || null,
    [selectedId]
  );

  if (selected) {
    return (
      <div className="cafe-drink-app">
        <div className="cafe-drink-app__detail">
          <button
            type="button"
            className="cafe-drink-app__back"
            onClick={() => setSelectedId(null)}
          >
            ← Back to drinks
          </button>
          <div className="cafe-drink-app__detail-grid">
            <div className="cafe-drink-app__detail-visual">
              <img src={selected.image} alt={selected.name} />
              <span className="cafe-drink-app__badge">{selected.category}</span>
            </div>
            <div className="cafe-drink-app__detail-body">
              <div className="cafe-drink-app__recipe-section cafe-drink-app__recipe-section--intro">
                <h3 className="cafe-drink-app__detail-title">{selected.name}</h3>
                {selected.introParagraphs?.length ? (
                  selected.introParagraphs.map((para, i) => (
                    <p key={i} className="cafe-drink-app__detail-desc">
                      {para}
                    </p>
                  ))
                ) : (
                  <p className="cafe-drink-app__detail-desc">
                    {selected.description}
                  </p>
                )}
                <div className="cafe-drink-app__meta">
                  <span>⏱ {selected.time}</span>
                  <span>☕ {selected.difficulty}</span>
                </div>
              </div>

              {selected.syrupRecipe ? (
                <div className="cafe-drink-app__recipe-section">
                  <h4 className="cafe-drink-app__subhead">
                    {selected.syrupRecipe.title}
                  </h4>
                  <ol className="cafe-drink-app__check-list">
                    {selected.syrupRecipe.steps.map((line, i) => {
                      const rowId = `syrup-${i}`;
                      return (
                        <li key={rowId}>
                          <RecipeCheckRow
                            rowId={rowId}
                            text={line}
                            checked={checkedRows.has(rowId)}
                            onToggle={toggleRow}
                          />
                        </li>
                      );
                    })}
                  </ol>
                </div>
              ) : null}

              <div className="cafe-drink-app__recipe-section">
                <h4 className="cafe-drink-app__subhead">Ingredients</h4>
                <ul className="cafe-drink-app__check-list cafe-drink-app__check-list--unordered">
                  {selected.ingredients.map((line, i) => {
                    const rowId = `ing-${i}`;
                    return (
                      <li key={rowId}>
                        <RecipeCheckRow
                          rowId={rowId}
                          text={line}
                          checked={checkedRows.has(rowId)}
                          onToggle={toggleRow}
                        />
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="cafe-drink-app__recipe-section">
                <h4 className="cafe-drink-app__subhead">
                  {selected.syrupRecipe ? "Directions" : "Steps"}
                </h4>
                <ol className="cafe-drink-app__check-list">
                  {selected.steps.map((line, i) => {
                    const rowId = `step-${i}`;
                    return (
                      <li key={rowId}>
                        <RecipeCheckRow
                          rowId={rowId}
                          text={line}
                          checked={checkedRows.has(rowId)}
                          onToggle={toggleRow}
                        />
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cafe-drink-app">
      <header className="cafe-drink-app__header">
        <p className="cafe-drink-app__eyebrow">✨ Your happy place</p>
        <h2 className="cafe-drink-app__title">Cafe Vibes ☕</h2>
        <p className="cafe-drink-app__tagline">
          Colorful drinks, happy moments — tap a card for the full recipe.
        </p>
      </header>

      <div className="cafe-drink-app__toolbar">
        <label className="cafe-drink-app__search-wrap">
          <span className="cafe-drink-app__visually-hidden">Search drinks</span>
          <input
            className="cafe-drink-app__search"
            type="search"
            placeholder="Search recipes…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoComplete="off"
          />
        </label>
        <div className="cafe-drink-app__chips" role="group" aria-label="Category">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              className={
                c === category
                  ? "cafe-drink-app__chip cafe-drink-app__chip--active"
                  : "cafe-drink-app__chip"
              }
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <ul className="cafe-drink-app__grid">
        {filtered.map((d) => (
          <li key={d.id}>
            <button
              type="button"
              className="cafe-drink-app__card"
              onClick={() => setSelectedId(d.id)}
            >
              <div className="cafe-drink-app__card-img">
                <img src={d.image} alt={d.name} />
              </div>
              <div className="cafe-drink-app__card-body">
                <span className="cafe-drink-app__card-cat">{d.category}</span>
                <h3 className="cafe-drink-app__card-title">{d.name}</h3>
                <p className="cafe-drink-app__card-desc">{d.description}</p>
                <span className="cafe-drink-app__card-meta">{d.time}</span>
              </div>
            </button>
          </li>
        ))}
      </ul>

      {filtered.length === 0 ? (
        <p className="cafe-drink-app__empty">No drinks match that search.</p>
      ) : null}
    </div>
  );
}
