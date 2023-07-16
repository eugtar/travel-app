import { create } from "zustand";

interface IUserMenuStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useUserMenu = create<IUserMenuStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useUserMenu;
