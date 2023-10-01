import groupApi from "app/axios/api/group";
import { saveGroupToLs } from "app/helpers/localStorage";
import { TGroup } from "types/common";
import { create } from "zustand";

type TGroupStore = {
  groups: TGroup[];
  currentGroup: string;
  getGroups: () => void;
  saveCurrentGroup: (groupId: string) => void;
  saveGroups: (groups: TGroup[]) => void;
};

const groupStore = create<TGroupStore>((set) => ({
  groups: [],
  getGroups: async () => {
    try {
      const res = await groupApi.getAllGroup();
      set({ groups: res.data });
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
