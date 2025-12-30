import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { getAccessToken, clearAccessToken } from "./authStorage";

interface AuthState {
    accessToken: string | null;
}

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
    });

    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        const token = getAccessToken();
        if (token) {
            setAuth({ accessToken: token });
        }
        setInitialized(true);
    }, []);

    const logout = () => {
        clearAccessToken();
        setAuth({ accessToken: null });
        navigate("/login", { replace: true });
    };

    return (
        <AuthContext.Provider value={{ auth, initialized, setAuth, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
