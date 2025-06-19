import useAuthStore from "../../store/useAuthStore.ts";
import { api } from "../../core/hooks/apiUrl.ts";

const useLogin = () => {
  const { setTokens } = useAuthStore();

  const login = async (
    username: string,
    password: string,
  ): Promise<boolean> => {
    try {
      const res = await api.post("/token/", {
        username,
        password,
      });
      const { access, refresh } = res.data;
      setTokens(access, refresh);
      return true;
    } catch (err) {
      console.error("Login error:", err);
      return false;
    }
  };

  return { login };
};

export default useLogin;
