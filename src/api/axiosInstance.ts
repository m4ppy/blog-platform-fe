// /src/api/axiosInstance.ts
import axios from "axios";
import { getAccessToken, clearAuthStorage } from "../auth/authStorage";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

/**
 * Request interceptor
 * - Attach access token if it exists
 */
axiosInstance.interceptors.request.use(
    (config) => {
        const token = getAccessToken();

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error),
);

/**
 * Response interceptor
 * - Handle unauthorized responses globally
 */
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            clearAuthStorage();
            window.location.href = "/login";
        }

        return Promise.reject(error);
    },
);

export default axiosInstance;
