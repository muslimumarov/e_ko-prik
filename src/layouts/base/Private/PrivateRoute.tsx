// components/PrivateRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "../../../store/useAuthStore.ts";

// 🔹 JWT decoding funksiyasi
const isTokenValid = (token: string | null): boolean => {
  if (!token) return false;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const now = Math.floor(Date.now() / 1000);
    return payload.exp && payload.exp > now;
  } catch {
    return false;
  }
};

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { accessToken, logout } = useAuthStore();

  // 🔹 Token mavjudligi va validligini tekshir
  const isAuthenticated = isTokenValid(accessToken);

  if (!isAuthenticated) {
    // token yaroqsiz bo‘lsa → logout qil va login sahifasiga yo‘naltir
    logout();
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
