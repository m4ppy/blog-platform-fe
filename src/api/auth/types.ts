export interface User {
  id: string;      // UUID
  name: string;
  email: string;
}

export interface AuthState {
  accessToken: string | null;
  isAuthenticated: boolean;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    expiresIn: number;
}

export interface RegisterRequest {
    email: string;
    name: string;
    password: string;
}