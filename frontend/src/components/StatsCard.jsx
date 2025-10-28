/**
 * Stats card component for dashboard.
 */

import React from "react";

const StatsCard = ({ title, value, icon, color, trend }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-gray-600 text-sm font-medium mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-gray-800">{value}</h3>
          {trend && <p className="text-sm text-green-600 mt-2">{trend}</p>}
        </div>
        <div className={`${color} p-4 rounded-full`}>{icon}</div>
      </div>
    </div>
  );
};

export default StatsCard;
