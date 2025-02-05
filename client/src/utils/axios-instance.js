import axios from 'axios';
import { getCookie } from './common';

const token = getCookie('authToken');

const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}), 
  },
});


// Automatically update the token for each request
axiosInstance.interceptors.request.use((config) => {
  const updatedToken = getCookie('authToken');
  if (updatedToken) {
    config.headers.Authorization = `Bearer ${updatedToken}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;