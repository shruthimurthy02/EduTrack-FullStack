/**
 * Task card component for displaying individual tasks.
 */

import React, { useState } from "react";
import { updateTask, deleteTask } from "../services/api";

const TaskCard = ({ task, onTaskUpdated }) => {
  const [loading, setLoading] = useState({});
  const [error, setError] = useState(null);

  /**
   * Handle task completion toggle.
   */
  const handleToggleComplete = async () => {
    setLoading({ ...loading, [task.id]: true });
    setError(null);

    try {
      await updateTask(task.id, { completed: !task.completed });
      onTaskUpdated();
    } catch (err) {
      setError("Failed to update task");
      console.error("Error updating task:", err);
    } finally {
      setLoading({ ...loading, [task.id]: false });
    }
  };

  /**
   * Handle task deletion.
   */
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }

    setLoading({ ...loading, [task.id]: true });
    setError(null);

    try {
      await deleteTask(task.id);
      onTaskUpdated();
    } catch (err) {
      setError("Failed to delete task");
      console.error("Error deleting task:", err);
    } finally {
      setLoading({ ...loading, [task.id]: false });
    }
  };

  /**
   * Handle status change.
   */
  const handleStatusChange = async (newStatus) => {
    setLoading({ ...loading, [task.id]: true });
    try {
      await updateTask(task.id, { status: newStatus });
      onTaskUpdated();
    } catch (err) {
      setError("Failed to update status");
      console.error("Error updating status:", err);
    } finally {
      setLoading({ ...loading, [task.id]: false });
    }
  };

  const getRoleBadgeColor = (role) => {
    return role === "student"
      ? "bg-green-100 text-green-800"
      : "bg-purple-100 text-purple-800";
  };

  const getCategoryColor = (category) => {
    const colorMap = {
      lesson_plan: "bg-yellow-100 text-yellow-800",
      assignment: "bg-blue-100 text-blue-800",
      learning_task: "bg-pink-100 text-pink-800",
    };
    return colorMap[category] || "bg-gray-100 text-gray-800";
  };

  const getStatusColor = (status) => {
    const statusMap = {
      pending: "bg-orange-100 text-orange-800",
      completed: "bg-green-100 text-green-800",
      submitted: "bg-blue-100 text-blue-800",
    };
    return statusMap[status] || "bg-gray-100 text-gray-800";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "No due date";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getCategoryDisplay = (category) => {
    const categoryMap = {
      lesson_plan: "Lesson Plan",
      assignment: "Assignment",
      learning_task: "Learning Task",
    };
    return categoryMap[category] || category;
  };

  return (
    <div
      className={`bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300 ${
        task.completed ? "opacity-75" : ""
      }`}
    >
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="flex justify-between items-start">
        <div className="flex-1">
          {/* Task Header */}
          <div className="flex items-center space-x-3 mb-3">
            <h3
              className={`text-xl font-bold ${task.completed ? "line-through text-gray-500" : "text-gray-800"}`}
            >
              {task.title}
            </h3>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${getRoleBadgeColor(task.role)}`}
            >
              {task.role.toUpperCase()}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(task.category)}`}
            >
              {getCategoryDisplay(task.category)}
            </span>
          </div>

          {/* Description */}
          {task.description && (
            <p className="text-gray-600 mb-3">{task.description}</p>
          )}

          {/* Due Date */}
          {task.due_date && (
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <svg
                className="w-4 h-4 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
              Due: {formatDate(task.due_date)}
            </div>
          )}

          {/* Status Badges */}
          <div className="flex items-center space-x-2">
            {task.completed ? (
              <span className="text-green-600 font-semibold text-sm flex items-center">
                <svg
                  className="w-5 h-5 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Completed
              </span>
            ) : (
              <span className="text-orange-600 font-semibold text-sm flex items-center">
                <svg
                  className="w-5 h-5 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
                Pending
              </span>
            )}
            {task.status && (
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(task.status)}`}
              >
                {task.status.toUpperCase()}
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col space-y-2 ml-4">
          {!task.completed && (
            <button
              onClick={handleToggleComplete}
              disabled={loading[task.id]}
              className="btn btn-success btn-sm"
            >
              {loading[task.id] ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <>
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Mark Done
                </>
              )}
            </button>
          )}
          <button
            onClick={handleDelete}
            disabled={loading[task.id]}
            className="btn btn-error btn-sm"
          >
            {loading[task.id] ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              <>
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Delete
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
