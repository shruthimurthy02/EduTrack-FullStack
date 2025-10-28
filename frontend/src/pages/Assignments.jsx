/**
 * Assignments page for managing assignment-specific tasks.
 */

import React, { useState, useEffect } from "react";
import { fetchTasks, updateTask } from "../services/api";
import TaskCard from "../components/TaskCard";

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState({});

  useEffect(() => {
    loadAssignments();
  }, []);

  const loadAssignments = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await fetchTasks({ category: "assignment" });
      setAssignments(data);
    } catch (err) {
      setError(
        "Failed to load assignments. Make sure the FastAPI backend is running on http://127.0.0.1:8000",
      );
      console.error("Error loading assignments:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleTaskUpdated = () => {
    loadAssignments();
  };

  const handleFileUpload = (assignmentId, event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (file) {
      setUploading({ ...uploading, [assignmentId]: true });

      // Simulate file upload (mock - no actual backend upload)
      setTimeout(() => {
        alert(`File "${file.name}" uploaded successfully (mock upload)`);
        setUploading({ ...uploading, [assignmentId]: false });
      }, 1000);
    }
  };

  const handleMarkAsSubmitted = async (assignmentId) => {
    try {
      await updateTask(assignmentId, { status: "submitted" });
      handleTaskUpdated();
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to mark as submitted");
    }
  };

  // Calculate assignment statistics
  const totalAssignments = assignments.length;
  const submittedAssignments = assignments.filter(
    (a) => a.status === "submitted" || a.completed,
  ).length;
  const pendingAssignments = assignments.filter(
    (a) => !a.completed && a.status !== "submitted",
  ).length;

  const formatDate = (dateString) => {
    if (!dateString) return "No due date";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const isOverdue = (dueDate) => {
    if (!dueDate) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(dueDate);
    return due < today;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl shadow-md p-6 text-white">
        <h2 className="text-3xl font-bold mb-2">Assignments</h2>
        <p className="text-primary-100">Manage and submit your assignments</p>
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

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">
                Total Assignments
              </p>
              <h3 className="text-3xl font-bold text-gray-800 mt-2">
                {totalAssignments}
              </h3>
            </div>
            <div className="bg-blue-100 p-4 rounded-full">
              <svg
                className="w-8 h-8 text-blue-600"
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
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Submitted</p>
              <h3 className="text-3xl font-bold text-green-600 mt-2">
                {submittedAssignments}
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

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Pending</p>
              <h3 className="text-3xl font-bold text-orange-600 mt-2">
                {pendingAssignments}
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
      </div>

      {/* Assignments List */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-800">Your Assignments</h3>
          <button
            onClick={loadAssignments}
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

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="text-center">
              <span className="loading loading-spinner loading-lg"></span>
              <p className="mt-4 text-gray-600">Loading assignments...</p>
            </div>
          </div>
        ) : assignments.length > 0 ? (
          <div className="space-y-4">
            {assignments.map((assignment) => (
              <div key={assignment.id} className="bg-gray-50 rounded-xl p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h3
                        className={`text-xl font-bold ${assignment.completed ? "line-through text-gray-500" : "text-gray-800"}`}
                      >
                        {assignment.title}
                      </h3>
                      {isOverdue(assignment.due_date) &&
                        !assignment.completed &&
                        assignment.status !== "submitted" && (
                          <span className="badge badge-error">Overdue</span>
                        )}
                      {(assignment.status === "submitted" ||
                        assignment.completed) && (
                        <span className="badge badge-success">Submitted</span>
                      )}
                    </div>

                    {assignment.description && (
                      <p className="text-gray-600 mb-3">
                        {assignment.description}
                      </p>
                    )}

                    {assignment.due_date && (
                      <div className="flex items-center text-sm space-x-4 mb-3">
                        <span className="text-gray-500">
                          Due: {formatDate(assignment.due_date)}
                        </span>
                        {isOverdue(assignment.due_date) && (
                          <span className="text-red-600 font-semibold">
                            ⚠️ Overdue
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                {!assignment.completed && assignment.status !== "submitted" && (
                  <div className="flex space-x-2 mt-4">
                    <button
                      className="btn btn-outline btn-success btn-sm"
                      onClick={() => handleMarkAsSubmitted(assignment.id)}
                    >
                      Mark as Submitted
                    </button>
                    <label className="btn btn-outline btn-primary btn-sm">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Upload File
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => handleFileUpload(assignment.id, e)}
                      />
                    </label>
                  </div>
                )}
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
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              No assignments yet
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Assignments will appear here once created
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Assignments;
