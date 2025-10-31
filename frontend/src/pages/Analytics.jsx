/**
 * Analytics page - Mini-LMS statistics and insights.
 */

import React, { useState, useEffect } from "react";
import { fetchTasks } from "../services/api";

const Analytics = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const data = await fetchTasks();
      setTasks(data);
    } catch (err) {
      console.error("Error loading tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  // Calculate comprehensive statistics
  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.completed).length,
    pending: tasks.filter((t) => !t.completed).length,
    student: tasks.filter((t) => t.role === "student").length,
    teacher: tasks.filter((t) => t.role === "teacher").length,
    lessonPlans: tasks.filter((t) => t.category === "lesson_plan").length,
    assignments: tasks.filter((t) => t.category === "assignment").length,
    learningTasks: tasks.filter((t) => t.category === "learning_task").length,
    completionRate:
      tasks.length > 0
        ? Math.round(
            (tasks.filter((t) => t.completed).length / tasks.length) * 100,
          )
        : 0,
  };

  const getRecentTasks = () => {
    return tasks.slice(0, 5);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#004AAD] to-[#0066CC] rounded-2xl shadow-xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-4xl font-bold mb-2">📊 Analytics Dashboard</h2>
            <p className="text-blue-100 text-lg">
              Mini-LMS insights and metrics
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-3xl font-bold">{stats.total}</div>
              <div className="text-sm text-blue-100">Total Tasks</div>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8" fill="white" viewBox="0 0 20 20">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : (
        <>
          {/* Main Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Completion Rate */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-600">
                  Completion Rate
                </h3>
                <div className="text-4xl">✅</div>
              </div>
              <div className="text-4xl font-bold text-green-600">
                {stats.completionRate}%
              </div>
              <div className="mt-4">
                <progress
                  className="progress progress-success w-full"
                  value={stats.completionRate}
                  max="100"
                ></progress>
              </div>
            </div>

            {/* Role Distribution - Students */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-600">
                  Student Tasks
                </h3>
                <div className="text-4xl">📚</div>
              </div>
              <div className="text-4xl font-bold text-blue-600">
                {stats.student}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                {tasks.length > 0
                  ? Math.round((stats.student / tasks.length) * 100)
                  : 0}
                % of total
              </p>
            </div>

            {/* Role Distribution - Teachers */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-600">
                  Teacher Tasks
                </h3>
                <div className="text-4xl">👨‍🏫</div>
              </div>
              <div className="text-4xl font-bold text-purple-600">
                {stats.teacher}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                {tasks.length > 0
                  ? Math.round((stats.teacher / tasks.length) * 100)
                  : 0}
                % of total
              </p>
            </div>

            {/* Pending Tasks */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-600">Pending</h3>
                <div className="text-4xl">⏳</div>
              </div>
              <div className="text-4xl font-bold text-orange-600">
                {stats.pending}
              </div>
              <p className="text-sm text-gray-500 mt-2">Require attention</p>
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Task Categories
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Lesson Plans */}
              <div className="border-l-4 border-yellow-500 pl-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-700">Lesson Plans</h4>
                  <span className="text-2xl">📖</span>
                </div>
                <div className="text-3xl font-bold text-yellow-600">
                  {stats.lessonPlans}
                </div>
                <progress
                  className="progress progress-warning w-full mt-2"
                  value={
                    tasks.length > 0
                      ? (stats.lessonPlans / tasks.length) * 100
                      : 0
                  }
                  max="100"
                ></progress>
              </div>

              {/* Assignments */}
              <div className="border-l-4 border-blue-500 pl-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-700">Assignments</h4>
                  <span className="text-2xl">📝</span>
                </div>
                <div className="text-3xl font-bold text-blue-600">
                  {stats.assignments}
                </div>
                <progress
                  className="progress progress-info w-full mt-2"
                  value={
                    tasks.length > 0
                      ? (stats.assignments / tasks.length) * 100
                      : 0
                  }
                  max="100"
                ></progress>
              </div>

              {/* Learning Tasks */}
              <div className="border-l-4 border-pink-500 pl-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-700">
                    Learning Tasks
                  </h4>
                  <span className="text-2xl">🎯</span>
                </div>
                <div className="text-3xl font-bold text-pink-600">
                  {stats.learningTasks}
                </div>
                <progress
                  className="progress progress-error w-full mt-2"
                  value={
                    tasks.length > 0
                      ? (stats.learningTasks / tasks.length) * 100
                      : 0
                  }
                  max="100"
                ></progress>
              </div>
            </div>
          </div>

          {/* Completion Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Circular Progress */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                Overall Progress
              </h3>
              <div className="flex justify-center">
                <div
                  className="radial-progress text-primary text-6xl"
                  style={{ "--value": stats.completionRate }}
                >
                  {stats.completionRate}%
                </div>
              </div>
              <div className="flex justify-center space-x-4 mt-6">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span className="text-sm text-gray-600">
                    Completed: {stats.completed}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-orange-500 rounded"></div>
                  <span className="text-sm text-gray-600">
                    Pending: {stats.pending}
                  </span>
                </div>
              </div>
            </div>

            {/* Role Distribution Chart */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                Role Distribution
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Students
                    </span>
                    <span className="text-sm font-semibold text-gray-800">
                      {stats.student}
                    </span>
                  </div>
                  <progress
                    className="progress progress-success w-full"
                    value={
                      tasks.length > 0
                        ? (stats.student / tasks.length) * 100
                        : 0
                    }
                    max="100"
                  ></progress>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Teachers
                    </span>
                    <span className="text-sm font-semibold text-gray-800">
                      {stats.teacher}
                    </span>
                  </div>
                  <progress
                    className="progress progress-primary w-full"
                    value={
                      tasks.length > 0
                        ? (stats.teacher / tasks.length) * 100
                        : 0
                    }
                    max="100"
                  ></progress>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          {getRecentTasks().length > 0 && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                Recent Activity
              </h3>
              <div className="space-y-3">
                {getRecentTasks().map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <span>{task.completed ? "✅" : "⏳"}</span>
                      <span className="font-medium text-gray-800">
                        {task.title}
                      </span>
                      <span
                        className={`badge ${task.role === "student" ? "badge-success" : "badge-primary"}`}
                      >
                        {task.role}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {task.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Analytics;


