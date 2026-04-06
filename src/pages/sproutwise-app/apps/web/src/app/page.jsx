"use client";

import { useState, useEffect } from "react";
import { Droplets, Sun, Cloud, Sprout, MapPin } from "lucide-react";
import { ZONE_DATA, PLANTS, TIP, zonePlantBadgeClass } from "../data/zone8b";

export default function Home() {
  const [weather, setWeather] = useState(null);
  const [gardenCount, setGardenCount] = useState(0);

  useEffect(() => {
    // Fetch user's garden count
    fetch("/api/garden?userId=demo-user")
      .then((res) => res.json())
      .then((data) => setGardenCount(data.gardenPlants?.length || 0))
      .catch((err) => console.error(err));

    // Fetch weather for demo location
    fetch("/integrations/weather-by-city/weather/San Francisco")
      .then((res) => res.json())
      .then((data) => setWeather(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 min-w-0 overflow-x-hidden">
        {/* Mascot Greeting */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="group relative w-20 h-32 shrink-0 cursor-default">
              <img
                src="/images/sproutwise-mascot.png"
                alt="Sproutwise mascot"
                className="relative z-0 h-full w-full object-contain"
              />
              <img
                src="/images/sproutwise-hero-hover-laugh.png"
                alt=""
                aria-hidden
                className="pointer-events-none absolute inset-0 z-10 h-full w-full object-contain opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"
              />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-[#2F4F2F] mb-2">
            Welcome Back!
          </h1>
          <p className="text-lg text-[#6B7C59]">
            Your garden is growing beautifully 🌱
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8 min-w-0">
          {/* Weather Widget */}
          {weather && (
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg min-w-0">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between mb-4">
                <div className="min-w-0 flex-1">
                  <h2 className="text-lg sm:text-xl font-semibold text-[#2F4F2F] mb-1 break-words">
                    {weather.location?.name}
                  </h2>
                  <p className="text-sm text-[#9CAF88]">
                    {weather.current?.condition?.text}
                  </p>
                </div>
                <div className="text-left sm:text-right shrink-0">
                  <p className="text-4xl sm:text-5xl font-bold text-[#C65D32] tabular-nums">
                    {Math.round(weather.current?.temp_f)}°
                  </p>
                  <p className="text-sm text-[#6B7C59]">
                    Feels like {Math.round(weather.current?.feelslike_f)}°
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap justify-between gap-3 sm:gap-4 mt-4">
                <div className="flex min-w-[4.5rem] flex-1 flex-col items-center">
                  <Droplets size={24} className="text-[#9CAF88] mb-2 shrink-0" />
                  <p className="text-xs sm:text-sm text-[#6B7C59] text-center">
                    {weather.current?.humidity}%
                  </p>
                </div>
                <div className="flex min-w-[4.5rem] flex-1 flex-col items-center">
                  <Sun size={24} className="text-[#C65D32] mb-2 shrink-0" />
                  <p className="text-xs sm:text-sm text-[#6B7C59] text-center">
                    UV {weather.current?.uv}
                  </p>
                </div>
                <div className="flex min-w-[4.5rem] flex-1 flex-col items-center">
                  <Cloud size={24} className="text-[#9CAF88] mb-2 shrink-0" />
                  <p className="text-xs sm:text-sm text-[#6B7C59] text-center">
                    {weather.current?.wind_mph} mph
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Garden Summary */}
          <div className="sw-home-garden-card bg-white rounded-2xl p-4 sm:p-6 shadow-lg min-w-0">
            <h2 className="text-lg sm:text-xl font-bold text-[#2F4F2F] mb-4">
              Your Garden
            </h2>
            <div className="sw-home-garden-row">
              <div className="min-w-0">
                <p className="text-4xl sm:text-5xl font-bold text-[#C65D32] mb-1 tabular-nums">
                  {gardenCount}
                </p>
                <p className="text-sm text-[#6B7C59]">Plants Growing</p>
              </div>
              <div className="sw-home-garden-icon-wrap bg-[#F5E6D3] rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center shrink-0">
                <Sprout className="h-8 w-8 sm:h-10 sm:w-10 text-[#9CAF88]" strokeWidth={1.75} />
              </div>
            </div>
          </div>
        </div>

        {/* Zone 8b context (static reference data) */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8 border border-[#9CAF88]/25">
          <div className="flex items-start gap-3 mb-4">
            <MapPin className="text-[#9CAF88] shrink-0 mt-0.5" size={22} />
            <div>
              <h2 className="text-lg font-bold text-[#2F4F2F]">
                Zone {ZONE_DATA.zone} · {ZONE_DATA.location}
              </h2>
              <p className="text-sm text-[#6B7C59] mt-1">
                {ZONE_DATA.classification} · {ZONE_DATA.growingSeason}
              </p>
            </div>
          </div>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-[#6B7C59]">
            <div>
              <dt className="font-semibold text-[#2F4F2F]">Soil</dt>
              <dd>{ZONE_DATA.soilType}</dd>
            </div>
            <div>
              <dt className="font-semibold text-[#2F4F2F]">Last / first frost</dt>
              <dd>
                {ZONE_DATA.lastFrost} → {ZONE_DATA.firstFrost}
              </dd>
            </div>
          </dl>
          <div className="flex flex-wrap gap-2 mt-4">
            {ZONE_DATA.soilTags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#F5E6D3] text-[#5C4A3A]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* What to plant now (zone dataset) */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#2F4F2F] mb-4">
            What to plant now
          </h2>
          <div className="grid grid-cols-1 min-[520px]:grid-cols-2 xl:grid-cols-3 gap-4">
            {PLANTS.map((p) => (
              <div
                key={p.name}
                className="bg-white rounded-2xl p-4 shadow-md border border-gray-100 flex flex-col gap-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-2xl" aria-hidden>
                    {p.emoji}
                  </span>
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full ${zonePlantBadgeClass(p.badgeType)}`}
                  >
                    {p.badge}
                  </span>
                </div>
                <h3 className="font-bold text-[#2F4F2F]">{p.name}</h3>
                <p className="text-sm text-[#6B7C59] leading-snug">{p.meta}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#2F4F2F] mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <button
              type="button"
              className="bg-[#9CAF88] hover:bg-[#8A9F78] text-white rounded-xl p-4 sm:p-6 flex items-center justify-center gap-3 transition-colors min-w-0"
            >
              <Sprout className="h-7 w-7 sm:h-8 sm:w-8 shrink-0" strokeWidth={1.75} />
              <span className="text-base sm:text-lg font-semibold">Add Plant</span>
            </button>
            <button
              type="button"
              className="bg-[#C65D32] hover:bg-[#B54D22] text-white rounded-xl p-4 sm:p-6 flex items-center justify-center gap-3 transition-colors min-w-0"
            >
              <Droplets className="h-7 w-7 sm:h-8 sm:w-8 shrink-0" strokeWidth={1.75} />
              <span className="text-base sm:text-lg font-semibold">Water Log</span>
            </button>
          </div>
        </div>

        {/* Gardening Tip (from zone dataset) */}
        <div className="bg-[#9CAF88] rounded-2xl p-6 text-white">
          <h3 className="text-lg font-bold mb-2">
            {TIP.icon} Zone tip
          </h3>
          <p className="leading-relaxed">{TIP.text}</p>
        </div>
      </div>
  );
}
