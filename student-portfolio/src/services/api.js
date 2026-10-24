// Centralized API Service for Express & MongoDB Backend
const BASE_URL = 'http://localhost:5000';

// Helper to get Authorization header with JWT Bearer token
const getAuthHeaders = () => {
  const token = localStorage.getItem('auth_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

/**
 * Register a new user
 */
export const registerUser = async ({ name, email, password }) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || data.error || 'Registration failed');
  }
  return data;
};

/**
 * Login user
 */
export const loginUser = async ({ email, password }) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || data.error || 'Login failed');
  }
  return data;
};

/**
 * Get current logged in user profile (/auth/me)
 */
export const getCurrentUser = async () => {
  const res = await fetch(`${BASE_URL}/auth/me`, {
    headers: getAuthHeaders(),
  });

  const data = await res.json();
  if (!res.ok) {
    if (res.status === 401) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
    }
    throw new Error(data.message || data.error || 'Failed to fetch user profile');
  }
  return data;
};

/**
 * Fetch all tasks (Cached with node-cache on server)
 */
export const getTasks = async () => {
  const res = await fetch(`${BASE_URL}/tasks`, {
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    if (res.status === 401) {
      throw new Error('Unauthorized: Please log in to access your task list');
    }
    throw new Error(errorData.message || errorData.error || `HTTP Error ${res.status}`);
  }
  return res.json();
};

/**
 * Fetch a single task by ID
 */
export const getTaskById = async (id) => {
  const res = await fetch(`${BASE_URL}/tasks/${id}`, {
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || errorData.error || `Failed to fetch task ${id}`);
  }
  return res.json();
};

/**
 * Create a new task
 */
export const createTask = async (taskData) => {
  const res = await fetch(`${BASE_URL}/tasks`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(taskData),
  });

  const data = await res.json();
  if (!res.ok) {
    const message = data.message || data.error || 'Failed to create task';
    throw new Error(message);
  }
  return data;
};

/**
 * Update an existing task
 */
export const updateTask = async (id, taskData) => {
  const res = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(taskData),
  });

  const data = await res.json();
  if (!res.ok) {
    const message = data.message || data.error || 'Failed to update task';
    throw new Error(message);
  }
  return data;
};

/**
 * Delete a task
 */
export const deleteTask = async (id) => {
  const res = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || data.error || 'Failed to delete task');
  }
  return data;
};

/**
 * Fetch cache statistics (Practical 9 debug endpoint)
 */
export const getCacheStats = async () => {
  const res = await fetch(`${BASE_URL}/api/cache/stats`);
  if (!res.ok) {
    throw new Error('Failed to fetch cache statistics');
  }
  return res.json();
};
