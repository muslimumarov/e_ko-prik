import { StateStorage } from "zustand/middleware";
import Cookies from "js-cookie";

const cookiesStorage: StateStorage = {
  getItem: (name: string) => {
    return Cookies.get(name) ?? null;
  },
  setItem: (name: string, value: string) => {
    Cookies.set(name, value, { expires: 1, Domain: null });
  },
  removeItem: (name: string) => {
    Cookies.remove(name);
  },
};

export default cookiesStorage;
