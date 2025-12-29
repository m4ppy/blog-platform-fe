import axios from "axios";
import { getAccessToken, clearAccessToken } from "../../auth/authStorage";

export const apiClient = axios.create({
    baseURL: "http://localhost:8080/api/auth",
    headers: {"Content-Type": "application/json" },
    withCredentials: true,
});

export const loginApi = (email: string, password: string) => {
  return apiClient.post("/auth/login", {
    email,
    password,
  });
};

apiClient.interceptors.request.use(
    (config) => {
        const token = getAccessToken();

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearAccessToken();
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default apiClient;