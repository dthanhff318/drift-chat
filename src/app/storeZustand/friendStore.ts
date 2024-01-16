import { notification } from 'antd';
import friendsApi from 'app/axios/api/friends';
import { TDataCommunicate } from 'types/common';
import { create } from 'zustand';

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
    } catch (err) {
      notification.error({
        message: `Error`,
        description: 'Try again',
        duration: 4,
      });
    }
  },
}));

export default friendStore;
