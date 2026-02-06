import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    // withCredentials: false, // Disabled as we use Bearer token only
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
    (config) => {
        // Check if running in browser environment (optional check if using Cookies package which handles window check safely usually, but good practice)
        if (typeof window !== 'undefined') {
            const token = Cookies.get('accessToken');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle errors globally
apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // Handle 401 Unauthorized errors (e.g., token expired)
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Attempt to refresh token if we have a mechanism for it
                // ...
            } catch (refreshError) {
                // Clear tokens and redirect to login
                if (typeof window !== 'undefined') {
                    Cookies.remove('accessToken');
                    window.location.href = '/login';
                }
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);
