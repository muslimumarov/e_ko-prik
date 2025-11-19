import useAuthStore from "../../../store/useAuthStore.ts";
import { api } from "../../../core/hooks/apiUrl.ts";
import { AxiosError } from "axios";

// Brute-force himoya (delay)
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

interface LoginResponse {
  success: boolean;
  message: string;
}

const useLogin = () => {
  const { setTokens, clearTokens } = useAuthStore();

  const login = async (
    username: string,
    password: string,
  ): Promise<LoginResponse> => {
    try {
      await sleep(400); // bruteforce himoya

      const res = await api.post("/token/", { username, password });

      const { access, refresh } = res.data;

      if (!access || !refresh) {
        clearTokens();
        return { success: false, message: "Noto‘g‘ri server javobi" };
      }

      // Tokenni decode qilish
      try {
        const payload = JSON.parse(atob(access.split(".")[1]));
        if (!payload || !payload.exp) {
          return { success: false, message: "Token buzilgan" };
        }
      } catch {
        return { success: false, message: "Tokenni o‘qib bo‘lmadi" };
      }

      setTokens(access, refresh);

      return { success: true, message: "Login muvaffaqiyatli" };
    } catch (err: unknown) {
      console.error("Login error:", err);

      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return { success: false, message: "Login yoki parol noto‘g‘ri" };
        }
        if (err.response?.status === 429) {
          return {
            success: false,
            message: "Juda ko‘p urinish. Keyinroq urinib ko‘ring.",
          };
        }
      }

      return { success: false, message: "Serverda xatolik yuz berdi" };
    }
  };

  return { login };
};

export default useLogin;
