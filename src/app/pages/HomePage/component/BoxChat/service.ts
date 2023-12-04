import messageApi from "app/axios/api/messageApi";
import authStore from "app/storeZustand/authStore";
import groupStore from "app/storeZustand/groupStore";
import messageStore from "app/storeZustand/messageStore";
import socketStore from "app/storeZustand/socketStore";
import moment from "moment";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { TGroup, TMessage } from "types/common";

export const DEFAULT_PAST_TIME = "1970-01-01T00:00:00.000Z";

export const useService = () => {
  const { groups, currentGroup, saveGroups } = groupStore();
  const { currentUser } = authStore();
  const { socket } = socketStore();
  const {
    messages,
    page,
    hasMore,
    firstTimeLoading,
    updateMessage,
    getMessages,
  } = messageStore();

  const [ref, inView] = useInView();
  const [message, setMessage] = useState("");

  const handleSendMess = async () => {
    try {
      if (currentUser.id) {
        const messBody = {
          senderId: currentUser.id ?? "",
          group: currentGroup,
          content: message,
        };
        const res = await messageApi.sendMessage(messBody);
        updateMessage(res.data);
        updateListChannelChat(res.data);
        setMessage("");
        socket?.emit("sendMessage", { ...res.data, room: currentGroup });
      }
    } catch (err) {}
  };

  const updateListChannelChat = (newMess: TMessage) => {
    const newGroups = groups
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

  useEffect(() => {
    page > 1 && inView && hasMore && getMessages(currentGroup, page);
  }, [inView]);

  useEffect(() => {
    if (currentGroup) getMessages(currentGroup, 1);
  }, [currentGroup]);

  // Listen event when other user send message
  useEffect(() => {
    socket?.on("sendMessage", (mess) => {
      const { room } = mess;
      const selectGroup = groupStore.getState().currentGroup;
      if (room === selectGroup) {
        updateMessage(mess);
      }
    });
  }, []);

  return {
    message,
    messages,
    groups,
    currentGroup,
    currentUser,
    firstTimeLoading,
    ref,
    setMessage,
    handleSendMess,
  };
};
