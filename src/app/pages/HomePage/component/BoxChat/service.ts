import { notification } from 'antd';
import authApi from 'app/axios/api/auth';
import messageApi from 'app/axios/api/messageApi';
import { TSendMess } from 'app/axios/api/typeApi';
import { listAllowImageType } from 'app/helpers/common';
import { getNameUser } from 'app/helpers/funcs';
import { DEFAULT_PAST_TIME } from 'app/helpers/time';
import authStore from 'app/storeZustand/authStore';
import groupStore from 'app/storeZustand/groupStore';
import messageStore from 'app/storeZustand/messageStore';
import settingStore from 'app/storeZustand/settingStore';
import socketStore from 'app/storeZustand/socketStore';
import { socketEmit } from 'const/socket';
import moment from 'moment';
import qs from 'query-string';
import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useHistory } from 'react-router-dom';
import { TGroup, TMessage } from 'types/common';

export const useService = () => {
  const history = useHistory();

  const { groups, currentGroup, detailGroup, loadingDetailGroup, saveGroups } = groupStore();
  const { currentUser } = authStore();
  const { settings } = settingStore();
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
  const triggerSidechatRef = useRef<HTMLDivElement>(null);

  const [message, setMessage] = useState('');
  const [openEmoji, setOpenEmoji] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [openSideChat, setOpenSideChat] = useState<boolean>(false);
  const [reply, setReply] = useState<TMessage>({});
  const [token, setToken] = useState<string>('');
  const [typing, setTyping] = useState<string>('');

  const handleSendMess = async () => {
    let resMessage: TMessage;
    try {
      setLoading(true);
      if (file) {
        const formMessage = new FormData();
        formMessage.append('image', file);
        formMessage.append('senderId', currentUser.id ?? '');
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
          senderId: currentUser.id ?? '',
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
      socket?.emit(socketEmit.SEND_MESSAGE, { ...resMessage, room: currentGroup });
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
    if (!listAllowImageType.includes(files[0].type)) {
      notification.error({
        message: `File type invalid`,
        description: 'Only accept send image',
        duration: 4,
      });
      return;
    }
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

  const queryUrlObj = qs.parse(history.location.search);
  const isVideo = queryUrlObj.video;
  const handleVideoCall = async () => {
    if (!isVideo) {
      try {
        const res = await authApi.getTokenLivekit(detailGroup.id ?? '');
        setToken(res.data);
      } catch (e) {
        console.log(e);
      }
    }
    const url = qs.stringifyUrl(
      {
        url: history.location.pathname,
        query: {
          video: isVideo ? undefined : true,
        },
      },
      {
        skipNull: true,
      },
    );
    history.push(url);
  };

  const handleInputChange = (e) => {
    setOpenEmoji(false);
    setMessage(e.target.value);
    if (socket) {
      socket.emit(socketEmit.TYPING, {
        group: currentGroup,
        user: currentUser.id,
        messageLength: message.length,
      });
    }
  };

  const handleShowUserTyping = (data: { group: string; user: string; messageLength: number }) => {
    if (currentGroup === data.group) {
      if (data.messageLength < 8) {
        setTyping('');
        return;
      }
      if (detailGroup.isGroup) {
        setTyping('Someone');
      } else {
        const findUser = detailGroup.members?.find((e) => e.id === data.user);
        if (findUser && detailGroup.setting) {
          const nickname = getNameUser(findUser, detailGroup.setting) ?? '';
          console.log(nickname);
          setTyping(nickname);
        } else setTyping('');
      }
    }
  };

  const handleListenOpsChangeRoom = (data: { oldRoom: string; newRoom: string }) => {
    if (data.oldRoom === currentGroup) {
      setTyping('');
    }
  };

  useEffect(() => {
    page > 1 && inView && hasMore && getMessages(currentGroup, page);
  }, [inView]);

  useEffect(() => {
    setReply({});
    setFile(null);
    if (socket) {
      socket.on(socketEmit.TYPING, handleShowUserTyping);
    }
    return () => {
      setTyping('');
      socket?.off(socketEmit.TYPING, handleShowUserTyping);
    };
  }, [currentGroup]);

  useEffect(() => {
    if (socket) {
      socket.on(socketEmit.CHANGE_ROOM_CHAT, handleListenOpsChangeRoom);
    }
    return () => {
      socket?.off(socketEmit.CHANGE_ROOM_CHAT, handleListenOpsChangeRoom);
    };
  }, []);

  return {
    message,
    messages,
    groups,
    currentGroup,
    currentUser,
    firstTimeLoading,
    loadingDetailGroup,
    openEmoji,
    inputUploadRef,
    file,
    loading,
    reply,
    openSideChat,
    detailGroup,
    token,
    queryUrlObj,
    triggerSidechatRef,
    settings,
    typing,
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
    handleVideoCall,
    handleInputChange,
  };
};
