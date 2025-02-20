import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiHome, FiBarChart2, FiMenu } from "react-icons/fi";
import { TfiSettings } from "react-icons/tfi";

// Define menu items in an array for better maintainability
const menuItems = [
  { path: "/dashboard", label: "Dashboard", icon: <FiHome /> },
  { path: "/transactions", label: "Transactions", icon: <FiBarChart2 /> },
  { path: "/budget", label: "Budget", icon: <FiBarChart2 /> },
  { path: "/reports", label: "Reports", icon: <FiBarChart2 /> },
  { path: "/settings", label: "Settings", icon: <TfiSettings /> },
];

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={`h-screen bg-gray-900 text-white p-4 transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
      aria-label="Sidebar"
    >
      {/* Toggle Button */}
      <button
        className="mb-6 p-2 text-xl hover:bg-gray-700 rounded"
        onClick={() => setIsCollapsed(!isCollapsed)}
        aria-label="Toggle Sidebar"
      >
        <FiMenu />
      </button>

      {/* Menu Items */}
      <nav className="flex flex-col gap-4">
        {menuItems.map(({ path, label, icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded transition ${
                isActive ? "bg-gray-700" : "hover:bg-gray-800"
              }`
            }
          >
            {icon}
            {!isCollapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
