import { create } from "zustand";

interface ModalStore {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  isOpen: localStorage.getItem("openModal") === "true",
  openModal: () => {
    localStorage.setItem("openModal", "true");
    set({ isOpen: true });
  },
  closeModal: () => {
    localStorage.setItem("openModal", "false");
    set({ isOpen: false });
  },
}));
