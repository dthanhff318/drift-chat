import groupApi from "app/axios/api/group";
import { saveGroupToLs } from "app/helpers/localStorage";
import { TGroup } from "types/common";
import { create } from "zustand";

type TGroupStore = {
  groups: TGroup[];
  detailGroup: TGroup;
  currentGroup: string;
  getGroups: () => void;
  saveCurrentGroup: (groupId: string) => void;
  saveGroups: (groups: TGroup[]) => void;
  getDetailGroup: (id: string) => void;
};

const groupStore = create<TGroupStore>((set) => ({
  groups: [],
  detailGroup: {},
  getGroups: async () => {
    try {
      const res = await groupApi.getAllGroup();
      set({ groups: res.data });
    } catch (err) {}
  },
  getDetailGroup: async (id: string) => {
    try {
      const res = await groupApi.getDetailGroup(id);
      set({ detailGroup: res.data });
    } catch (err) {}
  },
  currentGroup: "",
  saveCurrentGroup: (groupId: string) => {
    set({ currentGroup: groupId });
    saveGroupToLs(groupId);
  },
  saveGroups: (groups: TGroup[]) => set({ groups }),
}));

export default groupStore;
