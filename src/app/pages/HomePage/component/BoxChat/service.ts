import messageApi from 'app/axios/api/messageApi';
import authStore from 'app/storeZustand/authStore';
import groupStore from 'app/storeZustand/groupStore';
import messageStore from 'app/storeZustand/messageStore';
import socketStore from 'app/storeZustand/socketStore';
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { IndexedObject, TGroup, TMessage } from 'types/common';
import React from 'react';
import { TSendMess } from 'app/axios/api/typeApi';
import { notification } from 'antd';

export const DEFAULT_PAST_TIME = '1970-01-01T00:00:00.000Z';

export const useService = () => {
  const { groups, currentGroup, detailGroup, loadingDetailGroup, saveGroups } = groupStore();
  const { currenTUser } = authStore();
  const { socket } = socketStore();
  const {
    messages,
    page,
    hasMore,
    firstTimeLoading,
    updateMessage,
    updateListMessage,
    getMessages,
  } = messageStore();

  const [ref, inView] = useInView();

  const inputUploadRef = useRef<HTMLInputElement>(null);

  const [message, setMessage] = useState('');
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
        formMessage.append('image', file);
        formMessage.append('senderId', currenTUser.id ?? '');
        formMessage.append('group', currentGroup);
        formMessage.append('content', message.trim());
        if (reply.id) {
          formMessage.append('replyMessage', reply.id);
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
          senderId: currenTUser.id ?? '',
          group: currentGroup,
          content: message.trim(),
        };
        if (reply.id) {
          messBody.replyMessage = reply.id;
        }
        const res = await messageApi.sendMessage(messBody);
        resMessage = res.data as TMessage;
        if (reply.id) {
          resMessage.replyMessage = reply;
        }
      }
      updateMessage(resMessage);
      updateListChannelChat(resMessage);
      setOpenEmoji(false);
      setReply({});
      setMessage('');
      socket?.emit('sendMessage', { ...resMessage, room: currentGroup });
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const updateListChannelChat = (newMess: TMessage) => {
    const newGroups = groups
      .map((gr) => (gr.id === newMess.group ? { ...gr, newestMess: newMess } : gr))
      .sort(
        (a: TGroup, b: TGroup) =>
          (moment(b.newestMess?.createdAt ?? DEFAULT_PAST_TIME) as any) -
          (moment(a.newestMess?.createdAt ?? DEFAULT_PAST_TIME) as any),
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
    if (!isMessageLoaded(messId)) {
      // getMessages(currentGroup, page);
      // scrollMessageIntoView(messId);
      notification.info({
        message: `Message is old`,
        description: 'This feature is coming soon',
        duration: 2,
      });
    } else {
      const ele = document.querySelector(`#m${messId}`);
      ele?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    }
  };

  const deleteMessage = async (mess: TMessage) => {
    if (!mess.id) return;
    const res = await messageApi.updateMessage(mess.id, {
      isDelete: true,
    });
    const updateMess = res.data;
    socket?.emit('deleteMessage', updateMess);
    updateListMessage(updateMess);
  };

  useEffect(() => {
    page > 1 && inView && hasMore && getMessages(currentGroup, page);
  }, [inView]);

  // Get message page 1
  useEffect(() => {
    // if (currentGroup && !messages.length) {
    //   getMessages(currentGroup, 1);
    // }
    setReply({});
    setFile(null);
  }, [currentGroup]);

  return {
    message,
    messages,
    groups,
    currentGroup,
    currenTUser,
    firstTimeLoading,
    loadingDetailGroup,
    openEmoji,
    inputUploadRef,
    file,
    loading,
    reply,
    openSideChat,
    detailGroup,
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
    deleteMessage,
  };
};
