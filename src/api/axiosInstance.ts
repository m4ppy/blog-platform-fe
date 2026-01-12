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

let isLogginOut = false;

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if ((error.response?.status === 401) && !isLogginOut) {
            isLogginOut = true;

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
