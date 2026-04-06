import { NavLink } from "react-router";

import SproutwiseNavLogo from "./SproutwiseNavLogo";

const tabClass = ({ isActive }) =>
  isActive
    ? "text-[#2F4F2F] font-semibold border-b-2 border-[#9CAF88] pb-1"
    : "text-[#6B7C59] hover:text-[#2F4F2F] transition-colors";

export default function SproutwiseNav() {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <SproutwiseNavLogo />
          <div className="flex gap-6">
            <NavLink to="/" end className={tabClass}>
              Home
            </NavLink>
            <NavLink to="/garden" className={tabClass}>
              My Garden
            </NavLink>
            <NavLink to="/library" className={tabClass}>
              Plants
            </NavLink>
            <NavLink to="/weather" className={tabClass}>
              Weather
            </NavLink>
            <NavLink to="/profile" className={tabClass}>
              Profile
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}
