import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

type Props = {
    children: ReactNode;
};

function ProtectedRoute({ children }: Props) {
    const { isAuthenticated, initialized } = useAuth();

    // Wait until auth state is restored from localStorage
    if (!initialized) {
        return null; // or a loading spinner
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
}

export default ProtectedRoute;
