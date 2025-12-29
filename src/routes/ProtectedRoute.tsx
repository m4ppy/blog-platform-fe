import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";

type Props = {
  children: React.ReactNode;
};

function ProtectedRoute({ children }: Props) {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext not found");
  }

  const { auth, initialized } = authContext;

  if (!initialized) {
    return null;
  }

  if (!auth.accessToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
