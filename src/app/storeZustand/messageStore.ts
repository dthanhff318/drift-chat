import groupApi from "app/axios/api/group";
import { saveGroupToLs } from "app/helpers/localStorage";
import { TGroup, TMessage } from "types/common";
import { create } from "zustand";

type TMessageStore = {
  messages: TMessage[];
  // currentGroup: string;
  // getGroups: () => void;
  saveMessage: (messages: TMessage[]) => void;
  updateMessage: (message: TMessage) => void;
};

const messageStore = create<TMessageStore>((set) => ({
  messages: [],
  // getGroups: async () => {
  //   try {
  //     const res = await groupApi.getAllGroup();
  //     set({ groups: res.data });
  //   } catch (err) {}
  // },
  // currentGroup: "",
  saveMessage: (messages: TMessage[]) => {
    set({ messages: messages });
  },
  updateMessage: (message: TMessage) => {
    set((state) => ({ messages: [message, ...state.messages] }));
  },
}));

export default messageStore;
