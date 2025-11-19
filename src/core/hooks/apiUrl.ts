import axios from "axios";
import i18n from "../../i18n"; // Loyihangizga moslang

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor – har doim tilni headerga qo‘shish
api.interceptors.request.use((config) => {
  const lang = i18n.language.slice(0, 2);
  config.headers["Accept-Language"] = lang;
  return config;
});

// Response interceptor – xatolarni markazlashtirish
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  },
);
