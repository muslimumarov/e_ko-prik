import { create } from "zustand";
import Cookies from "js-cookie";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  setTokens: (access: string, refresh: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  accessToken: Cookies.get("access") || null,
  refreshToken: Cookies.get("refresh") || null,
  isAuthenticated: !!Cookies.get("access"),
  setTokens: (access, refresh) => {
    Cookies.set("access", access, {
      expires: 1, // 1 kun
      secure: true,
      sameSite: "Strict",
    });
    Cookies.set("refresh", refresh, {
      expires: 7, // 7 kun
      secure: true,
      sameSite: "Strict",
    });

    set({
      accessToken: access,
      refreshToken: refresh,
      isAuthenticated: true,
    });
  },
  logout: () => {
    Cookies.remove("access");
    Cookies.remove("refresh");

    set({
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
    });
  },
}));

export default useAuthStore;
