import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

// Request interceptor for loading state
let requestCount = 0;

api.interceptors.request.use(
  (config) => {
    requestCount++;
    if (requestCount === 1) {
      const loader = document.getElementById('global-loader');
      if (loader) loader.style.display = 'flex';
    }
    return config;
  },
  (error) => {
    requestCount--;
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    requestCount--;
    if (requestCount === 0) {
      const loader = document.getElementById('global-loader');
      if (loader) loader.style.display = 'none';
    }
    return response;
  },
  (error) => {
    requestCount--;
    if (requestCount === 0) {
      const loader = document.getElementById('global-loader');
      if (loader) loader.style.display = 'none';
    }
    
    if (error.code === 'ECONNABORTED') {
      console.error('Request timeout');
    } else if (!error.response) {
      console.error('Network error - is the backend running?');
    }
    
    return Promise.reject(error);
  }
);

// API Methods
export const searchCourses = (query) => api.get(`/search?q=${query}`);
export const getAllCourses = () => api.get('/courses');
export const getPapers = (courseCode) => api.get(`/papers/${courseCode}`);
export const getNotes = (courseCode) => api.get(`/notes/${courseCode}`);
export const getStats = () => api.get('/stats');
export const uploadPaper = (formData) => api.post('/upload-paper', formData, {
  headers: { 'Content-Type': 'multipart/form-data' },
  timeout: 60000,
});
export const uploadNote = (formData) => api.post('/upload-note', formData, {
  headers: { 'Content-Type': 'multipart/form-data' },
  timeout: 60000,
});
export const getViewUrl = (type, id) => `${API_BASE_URL}/view/${type}/${id}`;
export const getDownloadUrl = (type, id) => `${API_BASE_URL}/download/${type}/${id}`;

export default api;