import axios from "axios";
import i18n from "../../i18n"; // <--- bu yo‘lni loyhangizga qarab moslang

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Tilni headerga avtomatik qo‘shish
api.interceptors.request.use((config) => {
  const lang = i18n.language.slice(0, 2); // foydalanuvchi tanlagan til
  config.headers["Accept-Language"] = lang;
  return config;
});
