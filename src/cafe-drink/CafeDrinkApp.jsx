import React, { useMemo, useState } from "react";
import { drinks } from "./data/drinks";

const CATEGORIES = ["All", "Coffee & Tea", "Refreshers"];

/**
 * In-portfolio version of the Cafe Drink App — uses the same recipe data as
 * `cafe-drink-app/apps/web` without the separate Vite/API stack.
 */
export default function CafeDrinkApp() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedId, setSelectedId] = useState(null);

  const filtered = useMemo(() => {
    return drinks.filter((d) => {
      const matchCat = category === "All" || d.category === category;
      const q = search.trim().toLowerCase();
      const matchSearch =
        !q ||
        d.name.toLowerCase().includes(q) ||
        d.category.toLowerCase().includes(q);
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
            <div>
              <h3 className="cafe-drink-app__detail-title">{selected.name}</h3>
              <p className="cafe-drink-app__detail-desc">{selected.description}</p>
              <div className="cafe-drink-app__meta">
                <span>⏱ {selected.time}</span>
                <span>☕ {selected.difficulty}</span>
              </div>
              <h4 className="cafe-drink-app__subhead">Ingredients</h4>
              <ul className="cafe-drink-app__list">
                {selected.ingredients.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
              <h4 className="cafe-drink-app__subhead">Steps</h4>
              <ol className="cafe-drink-app__steps">
                {selected.steps.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ol>
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
