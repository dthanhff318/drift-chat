import { TUser } from 'types/common';
import { create } from 'zustand';

export type TLoadingAuth = 'update-user' | '';

type TAuthStore = {
  loading: TLoadingAuth;
  currentUser: TUser;
  saveCurrentUser: (user: TUser) => void;
  logout: () => void;
};

const authStore = create<TAuthStore>((set) => ({
  loading: '',
  currentUser: {},
  saveCurrentUser: (user: TUser) => set({ currentUser: user }),
  logout: () => {
    localStorage.clear();
    set({ currentUser: {} });
  },
}));

export default authStore;
