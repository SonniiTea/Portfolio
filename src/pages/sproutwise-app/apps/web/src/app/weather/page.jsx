"use client";

import { useState, useEffect } from "react";
import { Cloud, Droplets, Wind, Eye, Gauge, Sun } from "lucide-react";

export default function Weather() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("San Francisco");
  const [inputCity, setInputCity] = useState("San Francisco");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWeather();
  }, []);

  const fetchWeather = () => {
    setLoading(true);
    setCity(inputCity);
    fetch(`/integrations/weather-by-city/weather/${inputCity}`)
      .then((res) => res.json())
      .then((data) => {
        setWeather(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  const getGardeningAdvice = () => {
    if (!weather) return "";

    const temp = weather.current?.temp_f;
    const humidity = weather.current?.humidity;
    const uv = weather.current?.uv;

    if (temp > 85) return "🌡️ Hot day! Water plants in early morning or evening";
    if (temp < 40) return "❄️ Cold weather! Protect sensitive plants";
    if (humidity > 80) return "💧 High humidity - watch for fungal issues";
    if (uv > 7) return "☀️ High UV - great for sun-loving plants!";
    if (weather.current?.precip_mm > 0)
      return "🌧️ Rainy day - skip watering today";
    return "✅ Perfect conditions for gardening!";
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-[#2F4F2F] mb-8">Weather</h1>

        {/* City Search */}
        <form onSubmit={handleSubmit} className="flex gap-3 mb-8">
          <input
            type="text"
            className="flex-1 bg-white rounded-xl px-5 py-3 outline-none text-[#2F4F2F] shadow-sm"
            placeholder="Enter city name..."
            value={inputCity}
            onChange={(e) => setInputCity(e.target.value)}
          />
          <button
            type="submit"
            className="bg-[#9CAF88] hover:bg-[#8A9F78] text-white rounded-xl px-8 py-3 font-semibold transition-colors"
          >
            Search
          </button>
        </form>

        {loading ? (
          <div className="text-center py-20">
            <p className="text-lg text-[#6B7C59]">Loading weather...</p>
          </div>
        ) : weather ? (
          <div>
            {/* Current Weather */}
            <div className="bg-gradient-to-br from-[#9CAF88] to-[#7A9068] rounded-3xl p-10 mb-6 text-center text-white shadow-xl">
              <h2 className="text-2xl font-semibold mb-2">
                {weather.location?.name}
              </h2>
              <p className="text-[#F5E6D3] mb-6">
                {weather.location?.region}, {weather.location?.country}
              </p>

              <p className="text-7xl font-bold mb-4">
                {Math.round(weather.current?.temp_f)}°
              </p>

              <p className="text-xl mb-2">{weather.current?.condition?.text}</p>
              <p className="text-[#F5E6D3]">
                Feels like {Math.round(weather.current?.feelslike_f)}°
              </p>
            </div>

            {/* Gardening Advice */}
            <div className="bg-[#C65D32] rounded-2xl p-6 mb-6 text-white shadow-lg">
              <h3 className="text-lg font-bold mb-2">Gardening Advice</h3>
              <p className="leading-relaxed">{getGardeningAdvice()}</p>
            </div>

            {/* Weather Details */}
            <h2 className="text-2xl font-bold text-[#2F4F2F] mb-4">Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-5 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                  <Droplets size={28} className="text-[#9CAF88]" />
                  <span className="text-lg text-[#2F4F2F]">Humidity</span>
                </div>
                <span className="text-2xl font-bold text-[#C65D32]">
                  {weather.current?.humidity}%
                </span>
              </div>

              <div className="bg-white rounded-2xl p-5 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                  <Wind size={28} className="text-[#9CAF88]" />
                  <span className="text-lg text-[#2F4F2F]">Wind Speed</span>
                </div>
                <span className="text-2xl font-bold text-[#C65D32]">
                  {weather.current?.wind_mph} mph
                </span>
              </div>

              <div className="bg-white rounded-2xl p-5 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                  <Sun size={28} className="text-[#C65D32]" />
                  <span className="text-lg text-[#2F4F2F]">UV Index</span>
                </div>
                <span className="text-2xl font-bold text-[#C65D32]">
                  {weather.current?.uv}
                </span>
              </div>

              <div className="bg-white rounded-2xl p-5 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                  <Eye size={28} className="text-[#9CAF88]" />
                  <span className="text-lg text-[#2F4F2F]">Visibility</span>
                </div>
                <span className="text-2xl font-bold text-[#C65D32]">
                  {weather.current?.vis_miles} mi
                </span>
              </div>

              <div className="bg-white rounded-2xl p-5 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                  <Gauge size={28} className="text-[#9CAF88]" />
                  <span className="text-lg text-[#2F4F2F]">Pressure</span>
                </div>
                <span className="text-2xl font-bold text-[#C65D32]">
                  {weather.current?.pressure_in} in
                </span>
              </div>

              <div className="bg-white rounded-2xl p-5 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                  <Cloud size={28} className="text-[#9CAF88]" />
                  <span className="text-lg text-[#2F4F2F]">Precipitation</span>
                </div>
                <span className="text-2xl font-bold text-[#C65D32]">
                  {weather.current?.precip_in} in
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-lg text-[#6B7C59]">No weather data available</p>
          </div>
        )}
    </div>
  );
}
