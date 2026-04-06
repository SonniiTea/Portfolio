"use client";

import { useState, useEffect, useMemo } from "react";
import { Search, ChevronRight, MapPin } from "lucide-react";
import {
  ZONE_DATA,
  PLANTS,
  TIP,
  zonePlantBadgeClass,
  PLANT_TYPE_LABELS,
  PLANT_TYPE_ORDER,
} from "../../data/zone8b";

/** API may return snake_case or camelCase depending on driver / transforms. */
function getDbPlantType(plant) {
  const t = plant?.plant_type ?? plant?.plantType ?? "";
  return typeof t === "string" ? t.toLowerCase() : "";
}

function typeRank(t) {
  const i = PLANT_TYPE_ORDER.indexOf(t);
  return i === -1 ? 999 : i;
}

export default function PlantLibrary() {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState(null);

  const zonePlantsForLibrary = useMemo(
    () =>
      PLANTS.map((p) => ({
        key: `zone-${p.name}`,
        emoji: p.emoji,
        name: p.name,
        meta: p.meta,
        badge: p.badge,
        badgeType: p.badgeType,
        plantType: p.plantType,
      })),
    []
  );

  const filteredZonePlants = useMemo(() => {
    let list = zonePlantsForLibrary;
    if (selectedType) {
      list = list.filter((p) => p.plantType === selectedType);
    }
    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) || p.meta.toLowerCase().includes(q)
      );
    }
    return list;
  }, [search, zonePlantsForLibrary, selectedType]);

  /** Single merged list: zone picks + DB rows, sorted by category (All) or A–Z (one tab). */
  const libraryRows = useMemo(() => {
    const zoneRows = filteredZonePlants.map((p) => ({
      kind: "zone",
      data: p,
    }));
    const dbRows = loading
      ? []
      : plants.map((plant) => ({
          kind: "db",
          data: plant,
        }));

    const combined = [...zoneRows, ...dbRows];

    return [...combined].sort((a, b) => {
      if (!selectedType) {
        const ta =
          a.kind === "zone" ? a.data.plantType : getDbPlantType(a.data);
        const tb =
          b.kind === "zone" ? b.data.plantType : getDbPlantType(b.data);
        const ra = typeRank(ta);
        const rb = typeRank(tb);
        if (ra !== rb) return ra - rb;
      }
      const na = a.kind === "zone" ? a.data.name : a.data.name || "";
      const nb = b.kind === "zone" ? b.data.name : b.data.name || "";
      const byName = na.localeCompare(nb, undefined, { sensitivity: "base" });
      if (byName !== 0) return byName;
      if (a.kind === "zone" && b.kind === "zone") {
        return (a.data.badge || "").localeCompare(b.data.badge || "");
      }
      return 0;
    });
  }, [filteredZonePlants, plants, loading, selectedType]);

  useEffect(() => {
    fetchPlants();
  }, [selectedType, search]);

  const fetchPlants = () => {
    setLoading(true);
    let url = "/api/plants?";
    if (selectedType) url += `type=${selectedType}&`;
    if (search) url += `search=${search}&`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setPlants(data.plants || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setPlants([]);
        setLoading(false);
      });
  };

  const plantTypes = [
    { label: "All", value: null },
    { label: "Vegetables", value: "vegetable" },
    { label: "Fruits", value: "fruit" },
    { label: "Herbs", value: "herb" },
    { label: "Flowers", value: "flower" },
  ];

  const isEmpty =
    !loading &&
    libraryRows.length === 0 &&
    (selectedType || filteredZonePlants.length === 0);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-[#2F4F2F] mb-8">Plant Library</h1>

      {/* Zone 8b reference data */}
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
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-[#6B7C59] mb-4">
          <div>
            <dt className="font-semibold text-[#2F4F2F]">Soil</dt>
            <dd>{ZONE_DATA.soilType}</dd>
          </div>
          <div>
            <dt className="font-semibold text-[#2F4F2F]">Winter lows</dt>
            <dd>{ZONE_DATA.minWinterTemp}</dd>
          </div>
          <div>
            <dt className="font-semibold text-[#2F4F2F]">Last / first frost</dt>
            <dd>
              {ZONE_DATA.lastFrost} → {ZONE_DATA.firstFrost}
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-[#2F4F2F]">Summer</dt>
            <dd>{ZONE_DATA.summerHighs}</dd>
          </div>
        </dl>
        <div className="flex flex-wrap gap-2">
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

      <div className="bg-[#9CAF88] rounded-2xl p-6 text-white mb-10">
        <h3 className="text-lg font-bold mb-2">{TIP.icon} Zone tip</h3>
        <p className="leading-relaxed">{TIP.text}</p>
      </div>

      <h2 className="text-2xl font-bold text-[#2F4F2F] mb-2">Browse & search</h2>
      <p className="text-sm text-[#6B7C59] mb-6">
        Category tabs filter and re-sort: <em>All</em> orders by type
        (Vegetable…Flower) then A–Z; a single tab orders A–Z within that type.
      </p>

      {/* Search Bar */}
      <div className="bg-white rounded-xl flex items-center px-4 py-3 mb-6 shadow-sm">
        <Search size={20} className="text-[#9CAF88]" />
        <input
          type="text"
          className="flex-1 ml-3 outline-none text-[#2F4F2F]"
          placeholder="Search plants..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Filter Chips */}
      <div className="flex gap-3 mb-8 overflow-x-auto">
        {plantTypes.map((type) => (
          <button
            key={type.label}
            type="button"
            onClick={() => setSelectedType(type.value)}
            className={`px-5 py-2 rounded-full font-semibold whitespace-nowrap transition-colors ${
              selectedType === type.value
                ? "bg-[#9CAF88] text-white"
                : "bg-white text-[#6B7C59] border border-gray-200 hover:border-[#9CAF88]"
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>

      {isEmpty ? (
        <div className="text-center py-20">
          <p className="text-lg text-[#6B7C59]">No plants found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {libraryRows.map((row) =>
            row.kind === "zone" ? (
              <div
                key={row.data.key}
                className="bg-white rounded-2xl overflow-hidden shadow-lg border border-[#9CAF88]/30 hover:shadow-xl transition-shadow cursor-pointer"
              >
                <div className="flex items-stretch min-h-[8rem]">
                  <div
                    className="w-20 shrink-0 flex items-center justify-center bg-[#E8F0E4] text-4xl"
                    aria-hidden
                  >
                    {row.data.emoji}
                  </div>
                  <div className="flex-1 p-5 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="text-lg font-bold text-[#2F4F2F]">
                        {row.data.name}
                      </h3>
                      <span
                        className={`text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 ${zonePlantBadgeClass(row.data.badgeType)}`}
                      >
                        {row.data.badge}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-[#9CAF88] uppercase tracking-wide mb-1">
                      {PLANT_TYPE_LABELS[row.data.plantType]} · Zone{" "}
                      {ZONE_DATA.zone} pick
                    </p>
                    <p className="text-sm text-[#6B7C59] line-clamp-3">
                      {row.data.meta}
                    </p>
                  </div>
                  <ChevronRight
                    size={24}
                    className="text-[#9CAF88] mr-4 self-center shrink-0"
                  />
                </div>
              </div>
            ) : (
              <div
                key={row.data.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
              >
                <div className="flex items-center">
                  <img
                    src={row.data.image_url || "https://via.placeholder.com/120"}
                    alt={row.data.name}
                    className="w-20 h-32 object-cover bg-[#F5E6D3]"
                  />
                  <div className="flex-1 p-5">
                    <h3 className="text-lg font-bold text-[#2F4F2F] mb-1">
                      {row.data.name}
                    </h3>
                    <p className="text-sm text-[#9CAF88] italic mb-2">
                      {row.data.scientific_name}
                    </p>
                    <p className="text-sm text-[#6B7C59] line-clamp-2">
                      {row.data.description}
                    </p>
                  </div>
                  <ChevronRight size={24} className="text-[#9CAF88] mr-4" />
                </div>
              </div>
            )
          )}
          {loading && (
            <div className="col-span-full text-center py-8 border border-dashed border-[#9CAF88]/40 rounded-2xl">
              <p className="text-[#6B7C59]">Loading database plants…</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
