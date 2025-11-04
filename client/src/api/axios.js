import axios from 'axios';

// Use relative URL in production, localhost in development
const baseURL = import.meta.env.VITE_API_BASE || 
  (import.meta.env.MODE === 'production' ? '/api' : 'http://localhost:5000/api');

const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('kanban_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;