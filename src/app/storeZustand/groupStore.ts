import { notification } from 'antd';
import groupApi from 'app/axios/api/group';
import { saveGroupToLs } from 'app/helpers/localStorage';
import { TGroup } from 'types/common';
import { create } from 'zustand';

type TGroupStore = {
  loadingDetailGroup: boolean;
  groups: TGroup[];
  detailGroup: TGroup;
  currentGroup: string;
  getGroups: () => void;
  saveCurrentGroup: (groupId: string) => void;
  saveGroups: (groups: TGroup[]) => void;
  getDetailGroup: (id: string) => void;
};

const groupStore = create<TGroupStore>((set) => ({
  loadingDetailGroup: false,
  groups: [],
  detailGroup: {},
  getGroups: async () => {
    try {
      const res = await groupApi.getAllGroup();
      set({ groups: res.data });
    } catch (err) {
      notification.error({
        message: `Error`,
        description: 'Try again',
        duration: 4,
      });
    }
  },
  getDetailGroup: async (id: string) => {
    try {
      set({ loadingDetailGroup: true });
      const res = await groupApi.getDetailGroup(id);
      set({ detailGroup: res.data, loadingDetailGroup: false });
    } catch (err) {
      notification.error({
        message: `Error`,
        description: 'Try again',
        duration: 4,
      });
    }
  },
  currentGroup: '',
  saveCurrentGroup: (groupId: string) => {
    set({ currentGroup: groupId });
    saveGroupToLs(groupId);
  },
  saveGroups: (groups: TGroup[]) => set({ groups }),
}));

export default groupStore;
