import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

const AUTH_ENDPOINTS = ['/auth/login', '/auth/register', '/auth/me'];

api.interceptors.response.use(
  response => response.data,
  error => {
    const isAuthEndpoint = AUTH_ENDPOINTS.some(e => error.config?.url?.includes(e));
    if (error.response?.status === 401 && !isAuthEndpoint) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  register: (name, email, password) => api.post('/auth/register', { name, email, password }),

  login: (email, password) => api.post('/auth/login', { email, password }),

  logout: () => api.post('/auth/logout'),

  me: () => api.get('/auth/me'),
};

export const exercisesApi = {
  list: params => api.get('/exercises', { params }),

  get: id => api.get(`/exercises/${id}`),

  create: data => api.post('/exercises', data),

  update: (id, data) => api.patch(`/exercises/${id}`, data),

  delete: id => api.delete(`/exercises/${id}`),
};

export const templatesApi = {
  list: () => api.get('/templates'),

  get: id => api.get(`/templates/${id}`),

  create: data => api.post('/templates', data),

  update: (id, data) => api.patch(`/templates/${id}`, data),

  delete: id => api.delete(`/templates/${id}`),

  duplicate: id => api.post(`/templates/${id}/duplicate`),
};

export const sessionsApi = {
  list: params => api.get('/sessions', { params }),

  get: id => api.get(`/sessions/${id}`),

  start: data => api.post('/sessions', data),

  update: (id, data) => api.patch(`/sessions/${id}`, data),

  complete: id => api.post(`/sessions/${id}/complete`),

  abandon: id => api.post(`/sessions/${id}/abandon`),

  previousPerformance: id => api.get(`/sessions/${id}/previous-performance`),
};

export const bodyMetricsApi = {
  list: params => api.get('/body-metrics', { params }),

  create: data => api.post('/body-metrics', data),

  update: (id, data) => api.patch(`/body-metrics/${id}`, data),

  delete: id => api.delete(`/body-metrics/${id}`),
};

export const analyticsApi = {
  volume: params => api.get('/analytics/volume', { params }),

  prs: () => api.get('/analytics/prs'),

  estimated1RM: exerciseId => api.get(`/analytics/estimated-1rm/${exerciseId}`),

  progressiveOverload: exerciseId => api.get(`/analytics/progressive-overload/${exerciseId}`),

  plateau: () => api.get('/analytics/plateau'),

  heatmap: params => api.get('/analytics/heatmap', { params }),
};

export const userApi = {
  profile: () => api.get('/users/profile'),

  updateProfile: data => api.patch('/users/profile', data),

  updatePassword: data => api.patch('/users/password', data),
};