import messageApi from "app/axios/api/messageApi";
import authStore from "app/storeZustand/authStore";
import groupStore from "app/storeZustand/groupStore";
import messageStore from "app/storeZustand/messageStore";
import socketStore from "app/storeZustand/socketStore";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export const useService = () => {
  const { groups, currentGroup } = groupStore();
  const { currentUser } = authStore();
  const { socket } = socketStore();
  const { messages, page, hasMore, updateMessage, getMessages } =
    messageStore();

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
        setMessage("");
        socket?.emit("sendMessage", message);
      }
    } catch (err) {}
  };

  useEffect(() => {
    page > 1 && inView && hasMore && getMessages(currentGroup, page);
  }, [inView]);

  useEffect(() => {
    if (currentGroup) getMessages(currentGroup, 1);
  }, [currentGroup]);

  return {
    message,
    messages,
    groups,
    currentGroup,
    currentUser,
    ref,
    setMessage,
    handleSendMess,
  };
};
