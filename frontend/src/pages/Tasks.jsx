/**
 * Tasks page for managing all tasks.
 */

import React, { useState, useEffect } from "react";
import { fetchTasks } from "../services/api";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";
import FilterBar from "../components/FilterBar";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    role: null,
    category: null,
    completed: null,
  });

  useEffect(() => {
    loadTasks();
  }, [filters]);

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = {};
      if (filters.role) params.role = filters.role;
      if (filters.category) params.category = filters.category;
      if (filters.completed !== null) params.completed = filters.completed;

      const data = await fetchTasks(params);
      setTasks(data);
    } catch (err) {
      setError(
        "Failed to load tasks. Make sure the FastAPI backend is running on http://127.0.0.1:8000",
      );
      console.error("Error loading tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleTaskAdded = () => {
    loadTasks();
  };

  const handleTaskUpdated = () => {
    loadTasks();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl shadow-md p-6 text-white">
        <h2 className="text-3xl font-bold mb-2">Task Manager</h2>
        <p className="text-primary-100">
          Create, manage, and track all your tasks
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="alert alert-error shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {/* Task Form */}
      <TaskForm onTaskAdded={handleTaskAdded} />

      {/* Filter Bar */}
      <FilterBar filters={filters} setFilters={setFilters} />

      {/* Task List */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-800">
            All Tasks ({tasks.length})
          </h3>
          <button
            onClick={loadTasks}
            disabled={loading}
            className="btn btn-primary btn-sm"
          >
            {loading ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Loading...
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Refresh
              </>
            )}
          </button>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="text-center">
              <span className="loading loading-spinner loading-lg"></span>
              <p className="mt-4 text-gray-600">Loading tasks...</p>
            </div>
          </div>
        ) : tasks.length > 0 ? (
          <div className="space-y-4">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onTaskUpdated={handleTaskUpdated}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-16 w-16 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              No tasks found
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              {Object.values(filters).some((f) => f !== null)
                ? "Try adjusting your filters"
                : "Create your first task to get started!"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tasks;


