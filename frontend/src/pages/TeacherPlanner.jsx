/**
 * Teacher Planner page - for managing lesson plans and teaching tasks.
 */

import React, { useState, useEffect } from "react";
import { fetchTasks } from "../services/api";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";

const TeacherPlanner = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterCategory, setFilterCategory] = useState("all");

  useEffect(() => {
    loadTasks();
  }, [filterCategory]);

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = { role: "teacher" };
      if (filterCategory !== "all") {
        params.category = filterCategory;
      }

      const data = await fetchTasks(params);
      setTasks(data);
    } catch (err) {
      setError(
        "Failed to load tasks. Make sure the FastAPI backend is running.",
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

  const teacherStats = {
    total: tasks.length,
    lessonPlans: tasks.filter((t) => t.category === "lesson_plan").length,
    learningTasks: tasks.filter((t) => t.category === "learning_task").length,
    completed: tasks.filter((t) => t.completed).length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-4xl font-bold mb-2">📖 Teacher Planner</h2>
            <p className="text-indigo-100 text-lg">
              Organize your lessons and teaching materials
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{teacherStats.total}</div>
            <div className="text-sm text-indigo-100">Total Plans</div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">
                📝 Lesson Plans
              </p>
              <h3 className="text-3xl font-bold text-purple-600 mt-2">
                {teacherStats.lessonPlans}
              </h3>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">
                📚 Learning Tasks
              </p>
              <h3 className="text-3xl font-bold text-indigo-600 mt-2">
                {teacherStats.learningTasks}
              </h3>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">✅ Completed</p>
              <h3 className="text-3xl font-bold text-green-600 mt-2">
                {teacherStats.completed}
              </h3>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">📊 Progress</p>
              <h3 className="text-3xl font-bold text-blue-600 mt-2">
                {tasks.length > 0
                  ? Math.round((teacherStats.completed / tasks.length) * 100)
                  : 0}
                %
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-xl shadow-md p-4">
        <div className="flex space-x-2">
          <button
            onClick={() => setFilterCategory("all")}
            className={`btn ${filterCategory === "all" ? "btn-primary" : "btn-ghost"}`}
          >
            All Plans
          </button>
          <button
            onClick={() => setFilterCategory("lesson_plan")}
            className={`btn ${filterCategory === "lesson_plan" ? "btn-primary" : "btn-ghost"}`}
          >
            Lesson Plans
          </button>
          <button
            onClick={() => setFilterCategory("learning_task")}
            className={`btn ${filterCategory === "learning_task" ? "btn-primary" : "btn-ghost"}`}
          >
            Learning Tasks
          </button>
        </div>
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

      {/* Task List */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-800">
            Your Plans ({tasks.length})
          </h3>
          <button
            onClick={loadTasks}
            disabled={loading}
            className="btn btn-primary btn-sm"
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "🔄 Refresh"
            )}
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <span className="loading loading-spinner loading-lg"></span>
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
              No plans yet
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Create your first lesson plan or learning task!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherPlanner;
