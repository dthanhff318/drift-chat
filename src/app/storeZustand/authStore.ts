import { TUser } from 'types/common';
import { create } from 'zustand';

export type TLoadingAuth = 'update-user' | '';

type TAuthStore = {
  loading: TLoadingAuth;
  currenTUser: TUser;
  saveCurrenTUser: (user: TUser) => void;
  logout: () => void;
};

const authStore = create<TAuthStore>((set) => ({
  loading: '',
  currenTUser: {},
  saveCurrenTUser: (user: TUser) => set({ currenTUser: user }),
  logout: () => {
    localStorage.clear();
    set({ currenTUser: {} });
  },
}));

export default authStore;
