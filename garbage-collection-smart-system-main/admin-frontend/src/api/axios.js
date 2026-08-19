'use client';
import axios from 'axios';
import { toast } from 'react-toastify';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "https://garbage-collection1.onrender.com/api",
  withCredentials: true,
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && typeof window !== 'undefined') {
      if (error.response.status === 401) {
        // Avoid infinite loops if already on login
        if (!window.location.pathname.toLowerCase().includes('/login') && window.location.pathname !== '/') {
          if (!sessionStorage.getItem('reloaded-for-401')) {
            sessionStorage.setItem('reloaded-for-401', 'true');
            toast.error("Session timeout please login again");
            setTimeout(() => {
              window.location.href = '/';
            }, 2000);
          }
        } else {
          sessionStorage.removeItem('reloaded-for-401');
        }
      } else if (error.response.status === 403 && error.response.data?.errorCode === 'SUBSCRIPTION_EXPIRED') {
        // Handle Subscription Expiry Lockout globally
        if (!window.location.pathname.toLowerCase().includes('/login') && window.location.pathname !== '/' && !sessionStorage.getItem('subscription-expired-reloaded')) {
          sessionStorage.setItem('subscription-expired-reloaded', 'true');
          toast.error("Subscription expired. Contact company for renewal.");
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
