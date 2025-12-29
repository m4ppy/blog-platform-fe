import axiosInstance from "../axiosInstance";
import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from "./types";

export async function login(
  request: LoginRequest
): Promise<LoginResponse> {
  const response = await axiosInstance.post<LoginResponse>(
    "/auth/login",
    request
  );
  return response.data;
}

export function fakeLoginApi(
  request: LoginRequest
): Promise<LoginResponse> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (request.email === "test@test.com" && request.password === "1234") {
        resolve({
          accessToken: "fake-jwt-token",
        });
      } else {
        reject(new Error("Invalid credentials"));
      }
    }, 500);
  });
}

export function fakeRegisterApi(
  request: RegisterRequest
): Promise<RegisterResponse> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!request.email || !request.password || !request.username) {
        reject(new Error("Missing fields"));
        return;
      }

      if (request.email === "test@test.com") {
        reject(new Error("Email already exists"));
        return;
      }

      resolve({
        id: Date.now(),
        email: request.email,
        username: request.username,
      });
    }, 500);
  });
}