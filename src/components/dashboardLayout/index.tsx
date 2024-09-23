"use client";

import React from 'react';

import Sidebar from '../sidebar';
import Topbar from '../topbar';

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showMenu, setShowMenu] = React.useState(true)

  const handleToogleMenu = () => {
    setShowMenu(!showMenu)
  }

  return (
    <div className="flex font-sans">
      <Sidebar handleToogleMenu={handleToogleMenu} showMenu={showMenu} />
      <div className={`flex flex-col flex-1 transition-all ${showMenu ? "" : ""}`}>
        <Topbar />
        <main className="p-4 pl-6 flex-1 bg-[#f8f8f8]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
