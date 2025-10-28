/**
 * Header component with i2Global branding and navigation.
 */

import React from "react";

const Header = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "student-tasks", label: "Student Tasks", icon: "📚" },
    { id: "teacher-planner", label: "Teacher Planner", icon: "📖" },
    { id: "assignments", label: "Assignments", icon: "📝" },
    { id: "analytics", label: "Analytics", icon: "📈" },
  ];

  return (
    <header className="bg-gradient-to-r from-[#004AAD] via-[#0054C7] to-[#004AAD] shadow-xl sticky top-0 z-50">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Logo and Branding */}
          <div className="flex items-center space-x-3">
            <div className="bg-white p-2.5 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <svg
                className="w-10 h-10 text-[#004AAD]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">
                EduTrack LMS
              </h1>
              <p className="text-blue-100 text-xs font-medium">
                i2Global • Task Management Platform
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex space-x-2 bg-white/15 rounded-xl p-1.5 backdrop-blur-sm">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 flex items-center space-x-2 ${
                  activeTab === item.id
                    ? "bg-white text-[#004AAD] shadow-lg scale-105"
                    : "text-white hover:bg-white/25 hover:scale-102"
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="btn btn-sm btn-ghost text-white">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
