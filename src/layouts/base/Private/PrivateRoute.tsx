// components/PrivateRoute.tsx
import { Navigate } from "react-router-dom";
import useAuthStore from "../../../store/useAuthStore.ts";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
