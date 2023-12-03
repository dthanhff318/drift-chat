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
  firstTimeLoading: boolean;
  getMessages: (groupId: string, pageNumber: number) => void;
  saveMessages: (messages: TMessage[]) => void;
  updateMessage: (message: TMessage) => void;
  clearStateMessages: () => void;
};

const messageStore = create<TMessageStore>((set) => ({
  messages: [],
  page: 1,
  hasMore: true,
  firstTimeLoading: false,
  getMessages: async (groupId, pageNumber = 1) => {
    try {
      if (pageNumber === 1) {
        set({ firstTimeLoading: true });
      }
      const data = {
        page: pageNumber,
        limit: LIMIT_DATA_PER_PAGE,
        groupId,
      };
      const res = await messageApi.getMessages(data);
      const { results, page, totalPages, totalResults } = res.data;

      set((state) => {
        let newListMessage: TMessage[] = [];
        let page: number;
        if (state.messages.length) {
          page = state.page + 1;
          newListMessage = [...state.messages, ...results];
        } else {
          newListMessage = results;
          page = 2;
        }
        return {
          messages: newListMessage,
          page,
          hasMore: Number(page) <= Number(totalPages),
          firstTimeLoading: false,
        };
      });
    } catch (err) {}
  },
  saveMessages: (messages: TMessage[]) => {
    set({ messages: messages });
  },
  updateMessage: (message: TMessage) => {
    set((state) => ({ messages: [message, ...state.messages] }));
  },
  clearStateMessages: () => set({ messages: [], page: 1, hasMore: true }),
}));

export default messageStore;
