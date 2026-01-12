import {
    createContext,
    useEffect,
    useState,
    useCallback,
    useContext,
} from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import {
    getAccessToken,
    setAccessToken,
    clearAuthStorage,
} from "./authStorage";

interface AuthContextType {
    isAuthenticated: boolean;
    token: string | null;
    initialized: boolean;
    login: (token: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

type Props = {
    children: ReactNode;
};

export function AuthProvider({ children }: Props) {
    const navigate = useNavigate();

    const [token, setToken] = useState<string | null>(null);
    const [initialized, setInitialized] = useState(false);

    // Initialize auth from localStorage
    useEffect(() => {
        const storedToken = getAccessToken();

        if (storedToken) {
            setToken(storedToken);
        }

        setInitialized(true);
    }, []);

    useEffect(() => {
        const handleStorageChanage = () => {
            const storedToken = getAccessToken();
            
            if (!storedToken) {
                setToken(null);
            }
        };

        window.addEventListener("storage", handleStorageChanage);
        return () => window.removeEventListener("storage", handleStorageChanage);
    }, []);

    const login = useCallback((newToken: string) => {
        setAccessToken(newToken);
        setToken(newToken);
    }, []);

    const logout = useCallback(() => {
        clearAuthStorage();
        setToken(null);
        navigate("/login", { replace: true });
    }, [navigate]);

    const value: AuthContextType = {
        token,
        isAuthenticated: Boolean(token),
        initialized,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return context;
}
