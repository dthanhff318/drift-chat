import { notification } from 'antd';
import servicesApi from 'app/axios/api/servicesApi';
import { TQuery, TUser } from 'types/common';
import { create } from 'zustand';

export enum EFriendLoading {
  NONE = 'none',
  LIST = 'list',
}

type TServicesStore = {
  loadingFriendPage: EFriendLoading;
  lisTUser: TUser[];
  getListUser: (query: TQuery) => void;
};

const servicesStore = create<TServicesStore>((set) => ({
  loadingFriendPage: EFriendLoading.NONE,
  lisTUser: [],
  getListUser: async (query: TQuery) => {
    try {
      set({ loadingFriendPage: EFriendLoading.LIST });
      const res = await servicesApi.getUsers(query);
      return set({
        lisTUser: res.data,
        loadingFriendPage: EFriendLoading.NONE,
      });
    } catch (err) {
      notification.error({
        message: `Error`,
        description: 'Try again',
        duration: 4,
      });
    }
  },
}));

export default servicesStore;
