/**
 * API service for communicating with FastAPI backend.
 */

import axios from "axios";

// Try both localhost and 127.0.0.1 automatically
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

const api = axios.create({
  baseURL: API_BASE_URL.replace(/\/+$/, ""), // remove trailing slashes if any
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Fetch all tasks from the API.
 */
export const fetchTasks = async (filters = {}) => {
  try {
    const response = await api.get("/tasks", { params: filters });
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching tasks:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Fetch a single task by ID.
 */
export const fetchTask = async (taskId) => {
  try {
    const response = await api.get(`/tasks/${taskId}`);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching task:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Create a new task.
 */
export const createTask = async (taskData) => {
  try {
    const response = await api.post("/tasks", taskData);
    return response.data;
  } catch (error) {
    console.error("❌ Error creating task:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Update an existing task.
 */
export const updateTask = async (taskId, taskData) => {
  try {
    const response = await api.put(`/tasks/${taskId}`, taskData);
    return response.data;
  } catch (error) {
    console.error("❌ Error updating task:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Delete a task by ID.
 */
export const deleteTask = async (taskId) => {
  try {
    const response = await api.delete(`/tasks/${taskId}`);
    return response.data;
  } catch (error) {
    console.error("❌ Error deleting task:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Check if the API is running.
 */
export const checkHealth = async () => {
  try {
    const response = await api.get("/health");
    return response.data;
  } catch (error) {
    console.error("❌ Error checking API health:", error.response?.data || error.message);
    throw error;
  }
};

export default api;

