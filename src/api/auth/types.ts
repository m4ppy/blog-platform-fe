export interface User {
  id: string;      // UUID
  name: string;
  email: string;
}

export interface AuthState {
  accessToken: string | null;
  user: User | null;
}

export type LoginRequest = {
    email: string;
    password: string;
};

export type LoginResponse = {
    accessToken: string;
        user: {
        id: string;
        name: string;
        email: string;
    };
};

export interface RegisterRequest {
    email: string;
    password: string;
    username: string;
}

export interface RegisterResponse {
    id: number;
    email: string;
    username: string;
}