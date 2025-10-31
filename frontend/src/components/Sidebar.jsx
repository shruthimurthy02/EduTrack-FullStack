import React from 'react';

const items = [
  { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
  { id: 'student-tasks', label: 'Students', icon: '🎒' },
  { id: 'teacher-planner', label: 'Planner', icon: '🗂️' },
  { id: 'assignments', label: 'Assignments', icon: '📝' },
  { id: 'analytics', label: 'Analytics', icon: '📊' },
];

const Sidebar = ({ activeTab, setActiveTab }) => {
  return (
    <aside className="hidden lg:block w-64 px-4 py-6">
      <div className="card-soft p-4">
        <nav className="space-y-1">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full text-left px-4 py-3 rounded-xl flex items-center space-x-3 font-medium transition-transform hover:-translate-y-0.5 ${
                activeTab === item.id
                  ? 'bg-blue-50 text-blue-700 shadow'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;


