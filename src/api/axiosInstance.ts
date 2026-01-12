// /src/api/axiosInstance.ts
import axios from "axios";
import { getAccessToken, clearAuthStorage } from "../auth/authStorage";
import { notifications } from "@mantine/notifications";

const axiosInstance = axios.create({
    baseURL: "/api/v1",
    headers: {
        "Content-Type": "application/json",
    }
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
        const status = error.response?.status;
        if (status === 401 || status === 403) {
            notifications.show({
                title: "Session Expired",
                message: "Your session has expired. Please log in again.",
                color: "yellow",
            });

            clearAuthStorage();
            window.location.href = "/login";
        }

        return Promise.reject(error);
    },
);

export default axiosInstance;
