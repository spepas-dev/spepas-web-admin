import axios from 'axios';

// Global auth failure handler to avoid circular dependencies
const handleAuthFailure = () => {
  // Clear all auth-related data
  localStorage.removeItem('user_data');
  localStorage.removeItem('is_authenticated');
  localStorage.removeItem('auth_token'); // Legacy cleanup
  localStorage.removeItem('refresh_token'); // Legacy cleanup

  // Redirect to login page if not already there
  const currentPath = window.location.pathname;
  if (!currentPath.includes('/auth/login')) {
    console.warn('Authentication failed, redirecting to login');
    window.location.replace('/auth/login');
  }
};

export const axiosInstance = axios.create({
  baseURL: 'https://api.spepas.com/api/gateway/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  withCredentials: true
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Add request timestamp for debugging
    config.metadata = { startTime: new Date() };
    return config;
  },
  (error) => {
    console.error('Request setup error:', error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // Log response time for debugging
    const endTime = new Date();
    const duration = response.config.metadata?.startTime ? endTime.getTime() - response.config.metadata.startTime.getTime() : 0;
    console.debug(`API ${response.config.method?.toUpperCase()} ${response.config.url} - ${response.status} (${duration}ms)`);

    // Accept all 2xx status codes as successful
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      // Only 401 Unauthorized should trigger logout
      if (response.status === 401) {
        console.warn('Unauthorized access (401), triggering auth failure');
        handleAuthFailure();
      }

      // Create error for non-2xx responses without logout for other status codes
      const customError = new Error(`Request failed with status ${response.status}`) as Error & { response?: typeof response };
      customError.response = response;
      return Promise.reject(customError);
    }
  },
  (error) => {
    // Log error details for debugging
    const endTime = new Date();
    const duration = error.config?.metadata?.startTime ? endTime.getTime() - error.config.metadata.startTime.getTime() : 0;

    console.error(`API Error ${error.config?.method?.toUpperCase()} ${error.config?.url} (${duration}ms):`, {
      status: error.response?.status,
      message: error.message,
      data: error.response?.data
    });

    // Handle different types of errors
    if (error.response) {
      // Server responded with an error status
      const status = error.response.status;

      // Skip auth failure for login endpoint to avoid infinite loops
      const isLoginEndpoint = error.config?.url?.includes('/signin') || error.config?.url?.includes('/login');

      // Only trigger auth failure for 401 Unauthorized (and not on login endpoints)
      if (status === 401 && !isLoginEndpoint) {
        console.warn('Unauthorized access (401), triggering auth failure');
        handleAuthFailure();
      }

      // Enhance error message with status code
      error.message = `Request failed with status ${status}: ${error.response.data?.message || error.message}`;
    } else if (error.request) {
      // Network error - no response received
      console.error('Network error occurred - connectivity issue:', error.request);

      // Network errors should NOT trigger auth failure
      // They are connectivity issues, not authentication issues
      error.message = 'Network error: Unable to connect to server';
    } else {
      // Something else happened in setting up the request
      console.error('Request setup error occurred - configuration issue:', error.message);

      // Request setup errors should NOT trigger auth failure
      // They are configuration issues, not authentication issues
    }

    return Promise.reject(error);
  }
);

// Add axios instance metadata type declaration
declare module 'axios' {
  interface AxiosRequestConfig {
    metadata?: {
      startTime: Date;
    };
  }
}
