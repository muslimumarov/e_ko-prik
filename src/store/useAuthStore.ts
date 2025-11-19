import { create } from "zustand";
import Cookies from "js-cookie";

// 🔐 Cookie xavfsizlik sozlamalari
const secureCookieOptions = {
  secure: true,
  sameSite: "Strict" as const,
};

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;

  setTokens: (access: string, refresh: string) => void;
  logout: () => void;
  clearTokens: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  accessToken: Cookies.get("access") || null,
  refreshToken: Cookies.get("refresh") || null,
  isAuthenticated: !!Cookies.get("access"),

  // ============================
  // 🔐 TOKEN O‘RNATISH
  // ============================
  setTokens: (access, refresh) => {
    // 1) ACCESS TOKEN → 1 kun
    Cookies.set("access", access, {
      ...secureCookieOptions,
      expires: 1,
    });

    // 2) REFRESH TOKEN → 7 kun
    Cookies.set("refresh", refresh, {
      ...secureCookieOptions,
      expires: 7,
    });

    set({
      accessToken: access,
      refreshToken: refresh,
      isAuthenticated: true,
    });
  },

  // ============================
  // 🔒 LOGOUT
  // ============================
  logout: () => {
    Cookies.remove("access");
    Cookies.remove("refresh");

    set({
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
    });
  },

  // ============================
  // 🧹 TOKEN CLEAR (majburiy)
  // ============================
  clearTokens: () => {
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
