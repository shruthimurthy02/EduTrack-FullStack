/**
 * Filter bar component for filtering tasks.
 */

import React from "react";

const FilterBar = ({ filters, setFilters }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Role Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Role
          </label>
          <select
            value={filters.role || ""}
            onChange={(e) =>
              setFilters({ ...filters, role: e.target.value || null })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">All Roles</option>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
        </div>

        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            value={filters.category || ""}
            onChange={(e) =>
              setFilters({ ...filters, category: e.target.value || null })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">All Categories</option>
            <option value="lesson_plan">Lesson Plan</option>
            <option value="assignment">Assignment</option>
            <option value="learning_task">Learning Task</option>
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            value={
              filters.completed !== null && filters.completed !== undefined
                ? filters.completed.toString()
                : ""
            }
            onChange={(e) => {
              const value = e.target.value;
              setFilters({
                ...filters,
                completed: value === "" ? null : value === "true",
              });
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">All Status</option>
            <option value="false">Pending</option>
            <option value="true">Completed</option>
          </select>
        </div>
      </div>

      {/* Clear Filters Button */}
      {(filters.role || filters.category || filters.completed !== null) && (
        <div className="mt-4">
          <button
            onClick={() =>
              setFilters({ role: null, category: null, completed: null })
            }
            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterBar;
