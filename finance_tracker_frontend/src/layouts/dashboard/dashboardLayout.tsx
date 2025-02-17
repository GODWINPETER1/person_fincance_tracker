import React from "react";
import Sidebar from "@/components/sidebar/sidebar";
import Navbar from "@/components/navbar/navbar";
import { Outlet } from "react-router-dom";

const DashboardLayout: React.FC = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-6 flex-1 bg-gray-100">
          <Outlet /> {/* This will render the active page */}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
