import cookiesStorage from "./storages/cookieStorage.ts";
import { ACCESS_TOKEN_KEY } from "./constants/storage.constants.ts";
import { REFRESH_TOKEN_KEY } from "./constants/storage.constants.ts";

const useAuthStore = () => {
  const accessToken = cookiesStorage.getItem(ACCESS_TOKEN_KEY) || null;
  const refreshToken = cookiesStorage.getItem(REFRESH_TOKEN_KEY) || null;

  const setAccessToken = (token: string | null = null) => {
    if (token) {
      cookiesStorage.setItem(ACCESS_TOKEN_KEY, token);
    } else {
      cookiesStorage.removeItem(ACCESS_TOKEN_KEY);
    }
  };

  const setRefreshToken = (token: string | null = null) => {
    if (token) {
      cookiesStorage.setItem(REFRESH_TOKEN_KEY, token);
    } else {
      cookiesStorage.removeItem(REFRESH_TOKEN_KEY);
    }
  };

  return {
    accessToken,
    setAccessToken,
    refreshToken,
    setRefreshToken,
  };
};

export default useAuthStore;
