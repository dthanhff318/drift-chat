import friendsApi from "app/axios/api/friends";
import { TDataCommunicate } from "types/common";
import { create } from "zustand";

type TFriendStore = {
  dataCommunicate: TDataCommunicate;
  getDataCommunicate: () => void;
};

const friendStore = create<TFriendStore>((set) => ({
  dataCommunicate: {},
  getDataCommunicate: async () => {
    try {
      const res = await friendsApi.getInfoCommuication();
      return set({ dataCommunicate: res.data });
    } catch (err) {}
  },
}));

export default friendStore;
