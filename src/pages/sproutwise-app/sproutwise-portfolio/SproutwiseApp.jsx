import React from "react";
import {
  ZONE_DATA,
  PLANTS,
  PLANT_TYPE_LABELS,
  TIP,
  WEATHER,
  MOISTURE,
} from "../apps/web/src/data/zone8b";
import mascotImg from "../apps/web/public/images/sproutwise-mascot.png";
import laughImg from "../apps/web/public/images/sproutwise-hero-hover-laugh.png";

/** All zoning fields from `ZONE_DATA` (same order as the full Sproutwise home view). */
const ZONE_REFERENCE_ROWS = [
  ["Classification", ZONE_DATA.classification],
  ["Growing season", ZONE_DATA.growingSeason],
  ["Min winter temp", ZONE_DATA.minWinterTemp],
  ["Summer", ZONE_DATA.summerHighs],
  ["Annual rainfall", ZONE_DATA.annualRainfall],
  ["Humidity", ZONE_DATA.humidity],
  ["Similar zones", ZONE_DATA.similarZones],
  ["Last frost → first frost", `${ZONE_DATA.lastFrost} → ${ZONE_DATA.firstFrost}`],
  ["Soil type", ZONE_DATA.soilType],
  ["Soil pH & drainage", ZONE_DATA.soilPH],
];

/**
 * In-portfolio Sproutwise preview — same zone data as `apps/web` without the
 * separate Vite server or API (mirrors CafeDrinkApp / Cloud Cup).
 */
function badgeModifiers(type) {
  if (type === "green") return " sproutwise-app__badge--green";
  if (type === "amber") return " sproutwise-app__badge--amber";
  return " sproutwise-app__badge--clay";
}

const DEMO_GARDEN_COUNT = 3;

export default function SproutwiseApp() {
  return (
    <div className="sproutwise-app">
      <div className="sproutwise-app__inner">
        <div className="sproutwise-app__hero">
          <div className="sproutwise-app__mascot-wrap">
            <img
              src={mascotImg}
              alt="Sproutwise mascot"
              className="sproutwise-app__mascot"
            />
            <img
              src={laughImg}
              alt=""
              aria-hidden
              className="sproutwise-app__mascot-laugh"
            />
          </div>
          <h1 className="sproutwise-app__title">Welcome Back!</h1>
          <p className="sproutwise-app__subtitle">
            Your garden is growing beautifully 🌱
          </p>
        </div>

        <div className="sproutwise-app__grid2">
          <div className="sproutwise-app__card">
            <div className="sproutwise-app__card-head">
              <div>
                <h2 className="sproutwise-app__card-title">
                  {ZONE_DATA.location.split(",")[0]}
                </h2>
                <p className="sproutwise-app__card-muted">{WEATHER.description}</p>
              </div>
              <div className="sproutwise-app__temp">{WEATHER.temp}</div>
            </div>
            <div className="sproutwise-app__stats">
              <div className="sproutwise-app__stat">
                <span className="sproutwise-app__stat-icon" aria-hidden>
                  💧
                </span>
                <span className="sproutwise-app__stat-val">{WEATHER.humidity}</span>
                <span className="sproutwise-app__stat-label">humidity</span>
              </div>
              <div className="sproutwise-app__stat">
                <span className="sproutwise-app__stat-icon" aria-hidden>
                  ☀️
                </span>
                <span className="sproutwise-app__stat-val">{WEATHER.rain}</span>
                <span className="sproutwise-app__stat-label">rain</span>
              </div>
              <div className="sproutwise-app__stat">
                <span className="sproutwise-app__stat-icon" aria-hidden>
                  🌬️
                </span>
                <span className="sproutwise-app__stat-val">{WEATHER.wind}</span>
                <span className="sproutwise-app__stat-label">wind</span>
              </div>
            </div>
          </div>

          <div className="sproutwise-app__card sproutwise-app__card--garden">
            <h2 className="sproutwise-app__card-heading">Your Garden</h2>
            <div className="sproutwise-app__garden-row">
              <div>
                <p className="sproutwise-app__garden-count">{DEMO_GARDEN_COUNT}</p>
                <p className="sproutwise-app__card-muted">Plants Growing</p>
              </div>
              <div className="sproutwise-app__garden-icon" aria-hidden>
                🌱
              </div>
            </div>
          </div>
        </div>

        <div className="sproutwise-app__card sproutwise-app__card--zone">
          <div className="sproutwise-app__zone-head">
            <span className="sproutwise-app__pin" aria-hidden>
              📍
            </span>
            <div>
              <h2 className="sproutwise-app__card-heading sproutwise-app__card-heading--sm">
                Zone {ZONE_DATA.zone} · {ZONE_DATA.location}
              </h2>
              <p className="sproutwise-app__card-muted">
                USDA Zone 8b reference — Dallas–Fort Worth area
              </p>
            </div>
          </div>
          <dl className="sproutwise-app__dl">
            {ZONE_REFERENCE_ROWS.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <p className="sproutwise-app__moisture">
            <strong>Soil moisture (demo):</strong> {MOISTURE.percent}% ·{" "}
            {MOISTURE.status} · {MOISTURE.nextWatering}
          </p>
          <div className="sproutwise-app__tags">
            {ZONE_DATA.soilTags.map((tag) => (
              <span key={tag} className="sproutwise-app__tag">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <section className="sproutwise-app__section">
          <h2 className="sproutwise-app__section-title">What to plant now</h2>
          <ul className="sproutwise-app__plant-grid">
            {PLANTS.map((p) => (
              <li key={p.name} className="sproutwise-app__plant-card">
                <div className="sproutwise-app__plant-top">
                  <span className="sproutwise-app__emoji" aria-hidden>
                    {p.emoji}
                  </span>
                  <span
                    className={
                      "sproutwise-app__badge" + badgeModifiers(p.badgeType)
                    }
                  >
                    {p.badge}
                  </span>
                </div>
                <p className="sproutwise-app__plant-type">
                  {PLANT_TYPE_LABELS[p.plantType] ?? p.plantType}
                </p>
                <h3 className="sproutwise-app__plant-name">{p.name}</h3>
                <p className="sproutwise-app__plant-meta">{p.meta}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="sproutwise-app__section">
          <h2 className="sproutwise-app__section-title">Quick Actions</h2>
          <div className="sproutwise-app__actions">
            <button type="button" className="sproutwise-app__action sproutwise-app__action--primary">
              <span className="sproutwise-app__action-icon" aria-hidden>
                🌱
              </span>
              <span>Add Plant</span>
            </button>
            <button type="button" className="sproutwise-app__action sproutwise-app__action--accent">
              <span className="sproutwise-app__action-icon" aria-hidden>
                💧
              </span>
              <span>Water Log</span>
            </button>
          </div>
        </section>

        <div className="sproutwise-app__tip">
          <h3 className="sproutwise-app__tip-title">
            {TIP.icon} Zone tip
          </h3>
          <p className="sproutwise-app__tip-text">{TIP.text}</p>
        </div>
      </div>
    </div>
  );
}
