import axios, { AxiosInstance } from 'axios';

// Create an Axios instance for unauthenticated routes (e.g., sign-up, sign-in)
const axiosUnauthInstance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000', // Your API base URL
  timeout: 10000, // Request timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for unauthenticated requests (you can add any custom logic if needed)
axiosUnauthInstance.interceptors.request.use(
  (config) => {
    // Perform actions before the request is sent (e.g., logging)
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Function to get token from localStorage
const getAuthToken = (): string | null => {
  return localStorage.getItem('token');
};

// Function to log out user (e.g., clear localStorage and redirect)
const logOutUser = () => {
  localStorage.removeItem('token');
  window.location.href = '/signin'; // Redirect to sign-in page
};

// Create an Axios instance for authenticated routes (for all other requests)
const axiosAuthInstance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000', // Your API base URL
  timeout: 10000, // Request timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for authenticated routes
axiosAuthInstance.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      // Attach the token to the Authorization header
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      // If token is missing, redirect to the sign-in page
      logOutUser();
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for authenticated requests (e.g., handle token expiration)
axiosAuthInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle token expiration or unauthorized errors
    if (error.response?.status === 401) {
      logOutUser();
    }
    return Promise.reject(error);
  }
);


export {axiosUnauthInstance, axiosAuthInstance};
