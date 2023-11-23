import { TUSer } from "types/common";
import { create } from "zustand";

type TAuthStore = {
  currentUser: TUSer;
  saveCurrentUser: (user: TUSer) => void;
};

const authStore = create<TAuthStore>((set) => ({
  currentUser: {},
  saveCurrentUser: (user: TUSer) => set({ currentUser: user }),
}));

export default authStore;
