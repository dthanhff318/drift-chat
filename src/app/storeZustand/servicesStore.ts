import friendsApi from "app/axios/api/friends";
import userApi from "app/axios/api/userApi";
import { TUser } from "types/common";
import { create } from "zustand";

type TServicesStore = {
  lisTUser: TUser[];
  getLisTUser: () => void;
};

const servicesStore = create<TServicesStore>((set) => ({
  lisTUser: [],
  getLisTUser: async () => {
    try {
      const res = await userApi.getAllUser();
      return set({ lisTUser: res.data });
    } catch (err) {}
  },
}));

export default servicesStore;
