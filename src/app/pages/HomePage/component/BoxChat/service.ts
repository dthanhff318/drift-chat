import messageApi from "app/axios/api/messageApi";
import authStore from "app/storeZustand/authStore";
import groupStore from "app/storeZustand/groupStore";
import messageStore from "app/storeZustand/messageStore";
import socketStore from "app/storeZustand/socketStore";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { IndexedObject, TGroup, TMessage } from "types/common";
import { SendOutlined } from "@ant-design/icons";
import React from "react";
import { TSendMess } from "app/axios/api/typeApi";

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

  const inputUploadRef = useRef<HTMLInputElement>(null);

  const [message, setMessage] = useState("");
  const [openEmoji, setOpenEmoji] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [openSideChat, setOpenSideChat] = useState<boolean>(false);
  const [reply, setReply] = useState<TMessage>({});

  const handleSendMess = async () => {
    let resMessage: TMessage;
    try {
      setLoading(true);
      if (file) {
        const formMessage = new FormData();
        formMessage.append("image", file);
        formMessage.append("senderId", currentUser.id ?? "");
        formMessage.append("group", currentGroup);
        formMessage.append("content", message.trim());
        if (reply.id) {
          formMessage.append("replyMessage", reply.id);
        }
        const res = await messageApi.sendMessageWithImage(formMessage);
        resMessage = res.data as TMessage;
        setFile(null);
      } else {
        if (!message.trim()) {
          setLoading(false);
          return;
        }
        const messBody: TSendMess = {
          senderId: currentUser.id ?? "",
          group: currentGroup,
          content: message.trim(),
        };
        if (reply.id) {
          messBody.replyMessage = reply.id;
        }
        const res = await messageApi.sendMessage(messBody);
        resMessage = res.data as TMessage;
      }
      updateMessage(resMessage);
      updateListChannelChat(resMessage);
      setOpenEmoji(false);
      setMessage("");
      socket?.emit("sendMessage", { ...resMessage, room: currentGroup });
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
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

  const onUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files) return;
    setFile(files[0]);
  };

  const isMessageLoaded = (messId: string) => {
    const listMess = messageStore.getState().messages;
    return !!listMess.find((e) => e.id === messId);
  };

  const scrollMessageIntoView = (messId: string) => {
    console.log(!isMessageLoaded(messId));

    if (!isMessageLoaded(messId)) {
      getMessages(currentGroup, page);
      // scrollMessageIntoView(messId);
    } else {
      const ele = document.querySelector(`#m${messId}`);
      ele?.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  };

  useEffect(() => {
    page > 1 && inView && hasMore && getMessages(currentGroup, page);
  }, [inView]);

  useEffect(() => {
    if (currentGroup) {
      getMessages(currentGroup, 1);
    }
    setReply({});
    setFile(null);
  }, [currentGroup]);

  return {
    message,
    messages,
    groups,
    currentGroup,
    currentUser,
    firstTimeLoading,
    openEmoji,
    inputUploadRef,
    file,
    loading,
    reply,
    openSideChat,
    scrollMessageIntoView,
    isMessageLoaded,
    setOpenSideChat,
    setReply,
    setFile,
    onUploadImage,
    setOpenEmoji,
    ref,
    setMessage,
    handleSendMess,
  };
};
