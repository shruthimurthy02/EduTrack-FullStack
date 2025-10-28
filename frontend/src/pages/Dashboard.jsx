/**
 * Dashboard page with statistics and overview.
 */

import React, { useState, useEffect } from "react";
import { fetchTasks } from "../services/api";
import StatsCard from "../components/StatsCard";
import TaskCard from "../components/TaskCard";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiStatus, setApiStatus] = useState(null);

  useEffect(() => {
    loadTasks();
    checkApiHealth();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await fetchTasks();
      setTasks(data);
    } catch (err) {
      console.error("Error loading tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  const checkApiHealth = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/health");
      const data = await response.json();
      setApiStatus({ healthy: true, message: data.status });
    } catch (err) {
      setApiStatus({ healthy: false, message: "API connection failed" });
    }
  };

  const handleTaskUpdated = () => {
    loadTasks();
  };

  // Calculate statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const completionRate =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Get recent tasks (last 3)
  const recentTasks = tasks.slice(0, 3);

  // Get tasks by role
  const studentTasks = tasks.filter((t) => t.role === "student").length;
  const teacherTasks = tasks.filter((t) => t.role === "teacher").length;

  // Stats icons
  const statsIcon = (color) => (
    <svg
      className={`w-8 h-8 ${color}`}
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
  );

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#004AAD] via-[#0054C7] to-[#004AAD] rounded-2xl shadow-2xl p-12 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to EduTrack LMS</h1>
          <p className="text-xl text-blue-100 mb-8">
            Your complete task management platform for education
          </p>
          <div className="flex items-center justify-center space-x-6">
            <div className="text-center">
              <div className="text-4xl font-bold">{totalTasks}</div>
              <div className="text-sm text-blue-100">Total Tasks</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold">{completedTasks}</div>
              <div className="text-sm text-blue-100">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold">{completionRate}%</div>
              <div className="text-sm text-blue-100">Progress</div>
            </div>
          </div>
        </div>
      </div>

      {/* API Status Indicator */}
      {apiStatus && (
        <div
          className={`alert ${apiStatus.healthy ? "alert-success" : "alert-error"} shadow-lg`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            {apiStatus.healthy ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            )}
          </svg>
          <span className="font-medium">{apiStatus.message}</span>
        </div>
      )}

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Tasks</p>
              <h3 className="text-3xl font-bold text-blue-600 mt-2">
                {totalTasks}
              </h3>
            </div>
            <div className="bg-blue-100 p-4 rounded-full">
              <svg
                className="w-8 h-8 text-blue-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Completed</p>
              <h3 className="text-3xl font-bold text-green-600 mt-2">
                {completedTasks}
              </h3>
            </div>
            <div className="bg-green-100 p-4 rounded-full">
              <svg
                className="w-8 h-8 text-green-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Pending</p>
              <h3 className="text-3xl font-bold text-orange-600 mt-2">
                {pendingTasks}
              </h3>
            </div>
            <div className="bg-orange-100 p-4 rounded-full">
              <svg
                className="w-8 h-8 text-orange-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Progress</p>
              <h3 className="text-3xl font-bold text-purple-600 mt-2">
                {completionRate}%
              </h3>
            </div>
            <div className="bg-purple-100 p-4 rounded-full">
              <svg
                className="w-8 h-8 text-purple-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Role Distribution */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">
            Role Distribution
          </h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-3">
                <span className="text-sm font-semibold text-gray-700 flex items-center">
                  <span className="mr-2">📚</span> Students
                </span>
                <span className="text-lg font-bold text-gray-800">
                  {studentTasks}
                </span>
              </div>
              <progress
                className="progress progress-success w-full h-3"
                value={totalTasks > 0 ? (studentTasks / totalTasks) * 100 : 0}
                max="100"
              ></progress>
            </div>
            <div>
              <div className="flex justify-between mb-3">
                <span className="text-sm font-semibold text-gray-700 flex items-center">
                  <span className="mr-2">👨‍🏫</span> Teachers
                </span>
                <span className="text-lg font-bold text-gray-800">
                  {teacherTasks}
                </span>
              </div>
              <progress
                className="progress progress-primary w-full h-3"
                value={totalTasks > 0 ? (teacherTasks / totalTasks) * 100 : 0}
                max="100"
              ></progress>
            </div>
          </div>
        </div>

        {/* Completion Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">
            Completion Status
          </h3>
          <div className="flex items-center justify-center py-8">
            <div
              className="radial-progress text-blue-500 text-6xl"
              style={{ "--value": completionRate }}
              role="progressbar"
            >
              {completionRate}%
            </div>
          </div>
          <div className="flex justify-center space-x-6 mt-6">
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 bg-green-500 rounded-full shadow-md"></div>
              <span className="text-sm font-medium text-gray-700">
                Completed
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 bg-orange-500 rounded-full shadow-md"></div>
              <span className="text-sm font-medium text-gray-700">Pending</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Tasks */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">
          Recent Activity
        </h3>
        {loading ? (
          <div className="text-center py-12">
            <span className="loading loading-spinner loading-lg"></span>
            <p className="mt-4 text-gray-500">Loading tasks...</p>
          </div>
        ) : recentTasks.length > 0 ? (
          <div className="space-y-3">
            {recentTasks.map((task) => (
              <div
                key={task.id}
                className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">
                      {task.completed ? "✅" : "⏳"}
                    </span>
                    <span className="font-semibold text-gray-800">
                      {task.title}
                    </span>
                    <span
                      className={`badge ${task.role === "student" ? "badge-success" : "badge-primary"}`}
                    >
                      {task.role}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">{task.category}</span>
                </div>
              </div>
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
            <p className="mt-4 text-gray-500 font-medium">
              No recent tasks. Create your first task to get started!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
