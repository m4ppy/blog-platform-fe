import axiosInstance from "../axiosInstance";
import type {
    LoginRequest,
    AuthResponse,
    RegisterRequest,
} from "./types";

export async function login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await axiosInstance.post<AuthResponse>(
        "/auth/login",
        credentials,
    );
    return response.data;
}

export async function register(request: RegisterRequest): Promise<AuthResponse> {
    const response = await axiosInstance.post<AuthResponse>(
        "/auth/register",
        request,
    );
    return response.data;
}
