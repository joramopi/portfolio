import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000, // 10 segundos timeout
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    // Log request en desarrollo
    if (import.meta.env.DEV) {
      console.log(`\u{1F680} API Request: ${config.method?.toUpperCase()} ${config.url}`);
    }

    return config;
  },
  (error) => {
    if (import.meta.env.DEV) {
      console.error('\u274C API Request Error:', error);
    }
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    if (import.meta.env.DEV) {
      console.log(`\u2705 API Response: ${response.status} ${response.config.url}`);
    }
    return response;
  },
  (error) => {
    // Log error en desarrollo
    if (import.meta.env.DEV) {
      console.error('\u274C API Error:', {
        status: error.response?.status,
        url: error.config?.url,
        message: error.response?.data?.message || error.message,
      });
    }

    // Manejo específico de errores
    if (error.response?.status === 401) {
      // Token expirado o inválido
      localStorage.removeItem('token');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }

    // Crear error más descriptivo
    const enhancedError = new Error(
      error.response?.data?.message ||
      error.message ||
      'Error de conexión'
    );
    enhancedError.status = error.response?.status;
    enhancedError.originalError = error;

    return Promise.reject(enhancedError);
  }
);

export default api;
