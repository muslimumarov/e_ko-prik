import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type AuthStoreState = {
  accessToken: string | null;
  refreshToken: string | null;
  setAccessToken: (_accessToken: AuthStoreState["accessToken"]) => void;
  setRefreshToken: (_refreshToken: AuthStoreState["refreshToken"]) => void;
  clearToken: () => void;
};

const useAuthStore = create<AuthStoreState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      setAccessToken: (accessToken) => {
        set({
          accessToken,
        });
      },
      setRefreshToken: (refreshToken) => {
        set({ refreshToken });
      },
      clearToken: () => {
        set({ accessToken: null, refreshToken: null });
      },
    }),
    {
      name: "authStore",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useAuthStore;
