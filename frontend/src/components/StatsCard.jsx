/**
 * Stats card component for dashboard.
 */

import React from "react";
import { motion } from "framer-motion";

const StatsCard = ({ title, value, icon, color, trend }) => {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-gray-600 text-sm font-medium mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-gray-800">{value}</h3>
          {trend && <p className="text-sm text-green-600 mt-2">{trend}</p>}
        </div>
        <div className={`${color} p-4 rounded-full shadow-inner`}>{icon}</div>
      </div>
    </motion.div>
  );
};

export default StatsCard;


