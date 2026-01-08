import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { getAccessToken, getStoredUser, clearAuthStorage } from "./authStorage";
import type { AuthState } from "../api/auth/types";

interface AuthContextType {
    auth: AuthState;
    initialized: boolean;
    setAuth: (auth: AuthState) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

type Props = {
    children: ReactNode;
};

export function AuthProvider({ children }: Props) {
    const navigate = useNavigate();

    const [auth, setAuth] = useState<AuthState>({
        accessToken: null,
        user: null,
    });

    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        const token = getAccessToken();
        const user = getStoredUser();

        if (token && user) {
            setAuth({ accessToken: token, user });
        }

        setInitialized(true);
    }, []);

    const logout = () => {
        clearAuthStorage();
        setAuth({ accessToken: null, user: null });
        navigate("/login", { replace: true });
    };

    return (
        <AuthContext.Provider value={{ auth, initialized, setAuth, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
