import React from "react";
import Sidebar from "@/components/sidebar/sidebar";
import Navbar from "@/components/navbar/navbar";
import { Outlet } from "react-router-dom";

const DashboardLayout: React.FC = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="p-6 flex-grow bg-gray-100 overflow-auto">
          <Outlet /> {/* This will render the active page */}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
