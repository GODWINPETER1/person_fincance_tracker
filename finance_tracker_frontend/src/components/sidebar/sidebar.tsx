import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiHome, FiBarChart2, FiSettings, FiMenu } from "react-icons/fi";

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={`h-screen bg-gray-900 text-white p-4 transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Toggle Button */}
      <button
        className="mb-6 p-2 text-xl hover:bg-gray-700 rounded"
        onClick={toggleSidebar}
      >
        <FiMenu />
      </button>

      {/* Menu Items */}
      <nav className="flex flex-col gap-4">
        <NavLink to="/" className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded">
          <FiHome />
          {!isCollapsed && <span>Dashboard</span>}
        </NavLink>
        <NavLink to="/reports" className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded">
          <FiBarChart2 />
          {!isCollapsed && <span>Reports</span>}
        </NavLink>
        <NavLink to="/settings" className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded">
          <FiSettings />
          {!isCollapsed && <span>Settings</span>}
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
