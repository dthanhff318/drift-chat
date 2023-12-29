import { TUser } from "types/common";
import { create } from "zustand";

type TAuthStore = {
  currenTUser: TUser;
  saveCurrenTUser: (user: TUser) => void;
  logout: () => void;
};

const authStore = create<TAuthStore>((set) => ({
  currenTUser: {},
  saveCurrenTUser: (user: TUser) => set({ currenTUser: user }),
  logout: () => {
    localStorage.clear();
    set({ currenTUser: {} });
  },
}));

export default authStore;
