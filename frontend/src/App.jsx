import React, { useState } from "react";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import StudentTasks from "./pages/StudentTasks";
import TeacherPlanner from "./pages/TeacherPlanner";
import Assignments from "./pages/Assignments";
import Analytics from "./pages/Analytics";

function App() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "student-tasks":
        return <StudentTasks />;
      case "teacher-planner":
        return <TeacherPlanner />;
      case "assignments":
        return <Assignments />;
      case "analytics":
        return <Analytics />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
      {/* Footer */}
      <footer className="bg-white border-t-2 border-blue-100 py-6 mt-16">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
            <div className="text-sm text-gray-600 font-medium">
              © 2024 i2Global | EduTrack LMS Task Tracker
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <span className="flex items-center">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                Powered by FastAPI & React
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
