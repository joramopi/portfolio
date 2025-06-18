import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const t = localStorage.getItem('token');
  if (t) {
    config.headers['Authorization'] = `Bearer ${t}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error('API error:', err);
    return Promise.reject(err);
  }
);

export default api;
