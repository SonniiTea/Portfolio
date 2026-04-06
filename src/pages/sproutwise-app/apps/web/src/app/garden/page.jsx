"use client";

import { useState, useEffect } from "react";
import { Droplets, Sun, Plus } from "lucide-react";

export default function MyGarden() {
  const [gardenPlants, setGardenPlants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGarden();
  }, []);

  const fetchGarden = () => {
    fetch("/api/garden?userId=demo-user")
      .then((res) => res.json())
      .then((data) => {
        setGardenPlants(data.gardenPlants || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} days ago`;
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-[#2F4F2F] mb-2">
              My Garden
            </h1>
            <p className="text-lg text-[#6B7C59]">
              {gardenPlants.length} plants growing
            </p>
          </div>
          <button className="bg-[#C65D32] hover:bg-[#B54D22] text-white rounded-xl px-6 py-3 flex items-center gap-2 transition-colors">
            <Plus size={20} />
            <span className="font-semibold">Add Plant</span>
          </button>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <p className="text-lg text-[#6B7C59]">Loading your garden...</p>
          </div>
        ) : gardenPlants.length === 0 ? (
          <div className="text-center py-20">
            <img
              src="https://raw.createusercontent.com/7bd8d446-ccc9-496f-a4a8-b9f8996b04e7/"
              alt="Garden Mascot"
              className="w-20 h-32 mx-auto mb-6"
            />
            <h2 className="text-2xl font-semibold text-[#2F4F2F] mb-3">
              Your garden is empty!
            </h2>
            <p className="text-[#6B7C59] mb-8">
              Add your first plant to start growing
            </p>
            <button className="bg-[#9CAF88] hover:bg-[#8A9F78] text-white rounded-xl px-8 py-3 inline-flex items-center gap-2 transition-colors">
              <Plus size={20} />
              <span className="font-semibold">Add Plant</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gardenPlants.map((plant) => (
              <div
                key={plant.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
              >
                <img
                  src={
                    plant.image_url ||
                    plant.plant_image ||
                    "https://via.placeholder.com/400x200"
                  }
                  alt={plant.nickname || plant.name}
                  className="w-full h-48 object-cover bg-[#F5E6D3]"
                />
                <div className="p-5">
                  <h3 className="text-xl font-bold text-[#2F4F2F] mb-1">
                    {plant.nickname || plant.name}
                  </h3>
                  {plant.nickname && (
                    <p className="text-sm text-[#9CAF88] italic mb-3">
                      {plant.name}
                    </p>
                  )}
                  <p className="text-sm text-[#6B7C59] mb-4">
                    Planted {formatDate(plant.planted_date)}
                  </p>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <Droplets size={16} className="text-[#9CAF88]" />
                      <span className="text-sm text-[#6B7C59] capitalize">
                        {plant.water_needs}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Sun size={16} className="text-[#C65D32]" />
                      <span className="text-sm text-[#6B7C59] capitalize">
                        {plant.sun_requirement?.split(" ")[0]}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
    </div>
  );
}
