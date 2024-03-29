import groupApi from 'app/axios/api/group';
import { playMessComingAudio } from 'app/helpers/audio';
import { replacePathParams } from 'app/helpers/funcs';
import { pathHomePage, pathHomePageChat } from 'app/routes/routesConfig';
import groupStore from 'app/storeZustand/groupStore';
import messageStore from 'app/storeZustand/messageStore';
import socketStore from 'app/storeZustand/socketStore';
import { socketEmit } from 'const/socket';
import moment from 'moment';
import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { TGroup, TMessage } from 'types/common';
import authStore from 'app/storeZustand/authStore';

export const DEFAULT_PAST_TIME = '1970-01-01T00:00:00.000Z';

export const useService = () => {
  const { currentGroup, saveCurrentGroup, getGroups, saveGroups, getDetailGroup } = groupStore();
  const { socket } = socketStore();
  const { currentUser } = authStore();
  const { updateMessage, updateListMessage, getMessages } = messageStore();
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  const updateListChannelChat = (newMess: TMessage) => {
    const { groups } = groupStore.getState();
    let unreadCount = 0;
    const newGroups = groups
      .map((gr) => {
        if (gr.id === newMess.group) {
          unreadCount = (gr.unread ?? 0) + 1;
          return { ...gr, newestMess: newMess, unread: unreadCount };
        } else {
          return gr;
        }
      })
      .sort(
        (a: TGroup, b: TGroup) =>
          (moment(b.newestMess?.createdAt ?? DEFAULT_PAST_TIME) as unknown as number) -
          (moment(a.newestMess?.createdAt ?? DEFAULT_PAST_TIME) as unknown as number),
      );
    groupApi.updateUnReadMess(newMess.group ?? '', unreadCount);
    saveGroups(newGroups);
  };

  // Listen event when other user send message

  const handleMessComingSocket = (mess: TMessage) => {
    const { group } = mess;
    const selectGroup = groupStore.getState().currentGroup;
    if (group === selectGroup) {
      updateMessage(mess);
    } else {
      playMessComingAudio();
      updateListChannelChat(mess);
    }
  };

  const updateListMessSocket = (mess: TMessage) => {
    updateListMessage(mess);
  };

  const updateListGroupChat = (data: { groupId: string; members: string[] }) => {
    const { members } = data;
    if (members.includes(currentUser.id ?? '')) {
      getGroups();
    }
  };

  useEffect(() => {
    // Send message
    socket?.on(socketEmit.SEND_MESSAGE, handleMessComingSocket);
    // Delete message
    socket?.on('deleteMessage', updateListMessSocket);
    // Create new group
    socket?.on(socketEmit.CREATE_GROUP, updateListGroupChat);

    return () => {
      socket?.off(socketEmit.SEND_MESSAGE, handleMessComingSocket);
      socket?.off('deleteMessage', updateListMessSocket);
      socket?.off(socketEmit.CREATE_GROUP, updateListGroupChat);

      socket?.emit(socketEmit.CHANGE_ROOM_CHAT, {
        oldRoom: currentGroup,
        newRoom: null,
      });
    };
  }, []);

  useEffect(() => {
    const idGroup = id || currentGroup;

    if (idGroup) {
      history.push(replacePathParams(pathHomePageChat, { id: idGroup }));
      getDetailGroup(idGroup);
      getMessages(idGroup, 1, true);
      saveCurrentGroup(idGroup);
    } else {
      history.push(pathHomePage);
    }
  }, [id]);

  return {};
};
