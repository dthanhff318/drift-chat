import { TUser } from 'types/common';
import { create } from 'zustand';

type TProfileStore = {
  profileUser: TUser;
  saveProfileUser: (user: TUser) => void;
};

const profileStore = create<TProfileStore>((set) => ({
  profileUser: {},
  saveProfileUser: (user: TUser) => set({ profileUser: user }),
}));

export default profileStore;
