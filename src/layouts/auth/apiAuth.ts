import axios from "axios";
import useAuthStore from "../../store/useAuthStore";

const useLogin = () => {
  const { setTokens } = useAuthStore();

  const login = async (
    username: string,
    password: string,
  ): Promise<boolean> => {
    try {
      const res = await axios.post("http://192.168.4.150:3000/api/token/", {
        username,
        password,
      });
      const { access, refresh } = res.data;
      setTokens(access, refresh);
      return true; // ✅ login muvaffaqiyatli
    } catch (err) {
      console.error("Login error:", err);
      return false; // ❌ login xato
    }
  };

  return { login };
};

export default useLogin;
