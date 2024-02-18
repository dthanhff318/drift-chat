import { create } from 'zustand';
import { notification } from 'antd';
import groupApi from 'app/axios/api/group';
import { saveGroupToLs } from 'app/helpers/localStorage';
import { TGroup, TGroupDetail } from 'types/common';
import moment from 'moment';
import { DEFAULT_PAST_TIME } from 'app/helpers/time';

type TGroupStore = {
  loadingDetailGroup: boolean;
  loadingListGroup: boolean;
  groups: TGroup[];
  detailGroup: TGroupDetail;
  currentGroup: string;
  getGroups: () => void;
  saveCurrentGroup: (groupId: string) => void;
  saveDetailGroup: (groupDetail: TGroupDetail) => void;
  saveGroups: (groups: TGroup[]) => void;
  getDetailGroup: (id: string) => void;
};

const groupStore = create<TGroupStore>((set) => ({
  loadingDetailGroup: false,
  loadingListGroup: false,
  groups: [],
  detailGroup: {},
  getGroups: async () => {
    try {
      set({ loadingListGroup: true });
      const res = await groupApi.getAllGroup();
      const listGroupSort = (res.data as TGroup[]).sort((a, b) => {
        if (!a.newestMess && b.newestMess) {
          return -1;
        } else if (a.newestMess && !b.newestMess) {
          return 1;
        } else {
          return 0;
        }
      });
      set({ groups: listGroupSort, loadingListGroup: false });
    } catch (err) {
      notification.error({
        message: `Error`,
        description: 'Try again',
        duration: 4,
      });
      set({ loadingListGroup: false });
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
  saveDetailGroup: (detailGroup: TGroupDetail) => {
    set({ detailGroup });
  },
  currentGroup: '',
  saveCurrentGroup: (groupId: string) => {
    set({ currentGroup: groupId });
    saveGroupToLs(groupId);
  },
  saveGroups: (groups: TGroup[]) => set({ groups }),
}));

export default groupStore;
