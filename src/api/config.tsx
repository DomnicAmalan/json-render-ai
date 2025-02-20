import axios, { AxiosInstance } from 'axios';

const apiURL = import.meta.env.VITE_APP_API_URL;
console.log(apiURL, 'apiURL')
const axiosUnauthInstance: AxiosInstance = axios.create({
  baseURL: apiURL, 
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosUnauthInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const getAuthToken = (): string | null => {
  return localStorage.getItem('token');
};

const logOutUser = () => {
  localStorage.removeItem('token');
  window.location.href = '/signin';
};

const axiosAuthInstance: AxiosInstance = axios.create({
  baseURL: apiURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosAuthInstance.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      logOutUser();
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosAuthInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      logOutUser();
    }
    return Promise.reject(error);
  }
);


export {axiosUnauthInstance, axiosAuthInstance};
