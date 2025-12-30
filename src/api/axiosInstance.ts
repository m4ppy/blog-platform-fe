import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://localhost:8080/api",
});

export default axiosInstance;
