"use client";

import {
  User,
  MapPin,
  Droplets,
  Settings,
  Bell,
  HelpCircle,
  ChevronRight,
} from "lucide-react";

export default function Profile() {
  const settingsOptions = [
    {
      icon: MapPin,
      label: "Growing Zone",
      value: "Zone 9b",
      color: "text-[#9CAF88]",
    },
    {
      icon: Droplets,
      label: "Water Reminders",
      value: "On",
      color: "text-[#C65D32]",
    },
    {
      icon: Bell,
      label: "Notifications",
      value: "Enabled",
      color: "text-[#9CAF88]",
    },
    {
      icon: Settings,
      label: "App Settings",
      value: "",
      color: "text-[#6B7C59]",
    },
    {
      icon: HelpCircle,
      label: "Help & Support",
      value: "",
      color: "text-[#6B7C59]",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Profile Header */}
        <div className="text-center mb-12">
          <img
            src="https://raw.createusercontent.com/7bd8d446-ccc9-496f-a4a8-b9f8996b04e7/"
            alt="Garden Mascot"
            className="w-20 h-32 mx-auto mb-4"
          />
          <h1 className="text-3xl font-bold text-[#2F4F2F] mb-2">
            Happy Gardener
          </h1>
          <p className="text-[#6B7C59]">Member since April 2026</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-12">
          <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
            <p className="text-4xl font-bold text-[#C65D32] mb-2">6</p>
            <p className="text-sm text-[#6B7C59]">Plants</p>
          </div>

          <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
            <p className="text-4xl font-bold text-[#9CAF88] mb-2">24</p>
            <p className="text-sm text-[#6B7C59]">Days Active</p>
          </div>

          <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
            <p className="text-4xl font-bold text-[#C65D32] mb-2">12</p>
            <p className="text-sm text-[#6B7C59]">Care Logs</p>
          </div>
        </div>

        {/* Settings */}
        <h2 className="text-2xl font-bold text-[#2F4F2F] mb-4">Settings</h2>
        <div className="space-y-3 mb-8">
          {settingsOptions.map((option, index) => {
            const IconComponent = option.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-5 flex items-center justify-between cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <IconComponent size={24} className={option.color} />
                  <span className="text-lg text-[#2F4F2F]">{option.label}</span>
                </div>
                <div className="flex items-center gap-3">
                  {option.value && (
                    <span className="text-[#9CAF88] font-semibold">
                      {option.value}
                    </span>
                  )}
                  <ChevronRight size={20} className="text-[#9CAF88]" />
                </div>
              </div>
            );
          })}
        </div>

        {/* About */}
        <div className="bg-[#9CAF88] rounded-2xl p-8 text-center text-white shadow-lg">
          <h3 className="text-xl font-bold mb-3">🌱 Keep Growing!</h3>
          <p className="leading-relaxed">
            You're doing great! Check the weather daily and keep your plants
            healthy.
          </p>
        </div>
    </div>
  );
}
