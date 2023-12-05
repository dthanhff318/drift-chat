import groupStore from "app/storeZustand/groupStore";
import messageStore from "app/storeZustand/messageStore";
import socketStore from "app/storeZustand/socketStore";
import moment from "moment";
import { useEffect } from "react";
import { TGroup, TMessage } from "types/common";

export const DEFAULT_PAST_TIME = "1970-01-01T00:00:00.000Z";

export const useService = () => {
  const { saveGroups } = groupStore();
  const { socket } = socketStore();
  const { updateMessage } = messageStore();

  const updateListChannelChat = (newMess: TMessage) => {
    const listChannelChat = groupStore.getState().groups;
    const newGroups = listChannelChat
      .map((gr) =>
        gr.id === newMess.group ? { ...gr, newestMess: newMess } : gr
      )
      .sort(
        (a: TGroup, b: TGroup) =>
          (moment(b.newestMess?.createdAt ?? DEFAULT_PAST_TIME) as any) -
          (moment(a.newestMess?.createdAt ?? DEFAULT_PAST_TIME) as any)
      );
    saveGroups(newGroups);
  };

  // Listen event when other user send message
  useEffect(() => {
    socket?.on("sendMessage", (mess) => {
      const { group } = mess;
      const selectGroup = groupStore.getState().currentGroup;
      if (group === selectGroup) {
        updateMessage(mess);
      } else {
        updateListChannelChat(mess);
      }
    });
  }, []);

  return {};
};
