import groupApi from "app/axios/api/group";
import messageApi from "app/axios/api/messageApi";
import { LIMIT_DATA_PER_PAGE } from "app/helpers/common";
import { saveGroupToLs } from "app/helpers/localStorage";
import { TGroup, TMessage } from "types/common";
import { create } from "zustand";

type TMessageStore = {
  messages: TMessage[];
  page: number;
  hasMore: boolean;
  getMessages: (groupId: string, pageNumber: number) => void;
  saveMessage: (messages: TMessage[]) => void;
  updateMessage: (message: TMessage) => void;
  clearStateMessages: () => void;
};

const messageStore = create<TMessageStore>((set) => ({
  messages: [],
  page: 1,
  hasMore: true,
  getMessages: async (groupId, pageNumber = 1) => {
    try {
      const data = {
        page: pageNumber,
        limit: LIMIT_DATA_PER_PAGE,
        groupId,
      };
      const res = await messageApi.getMessages(data);
      const { results, page, totalPages, totalResults } = res.data;

      set((state) => {
        let newListMessage: TMessage[] = [];
        let page;
        if (state.messages.length) {
          page = state.page + 1;
          newListMessage = [...state.messages, ...results];
        } else {
          newListMessage = results;
          page = 2;
        }
        console.log(newListMessage);

        return {
          messages: newListMessage,
          page,
          hasMore: Number(page) <= Number(totalPages),
        };
      });
    } catch (err) {}
  },
  saveMessage: (messages: TMessage[]) => {
    set({ messages: messages });
  },
  updateMessage: (message: TMessage) => {
    set((state) => ({ messages: [message, ...state.messages] }));
  },
  clearStateMessages: () => set({ messages: [], page: 1, hasMore: true }),
}));

export default messageStore;
