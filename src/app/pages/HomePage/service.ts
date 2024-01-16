import { notification } from 'antd';
import groupApi from 'app/axios/api/group';
import groupStore from 'app/storeZustand/groupStore';
import messageStore from 'app/storeZustand/messageStore';
import socketStore from 'app/storeZustand/socketStore';
import moment from 'moment';
import { useEffect } from 'react';
import { TGroup, TMessage } from 'types/common';
import { useHistory, useParams } from 'react-router-dom';
import { pathHomePage, pathHomePageChat } from 'app/routes/routesConfig';
import { replacePathParams } from 'app/helpers/funcs';

export const DEFAULT_PAST_TIME = '1970-01-01T00:00:00.000Z';

export const useService = () => {
  const { currentGroup, saveCurrentGroup, saveGroups, getDetailGroup } = groupStore();
  const { socket } = socketStore();
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
          (moment(b.newestMess?.createdAt ?? DEFAULT_PAST_TIME) as any) -
          (moment(a.newestMess?.createdAt ?? DEFAULT_PAST_TIME) as any),
      );
    groupApi.updateUnReadMess(newMess.group ?? '', unreadCount);
    saveGroups(newGroups);
  };

  // Listen event when other user send message
  useEffect(() => {
    // Send message
    socket?.on('sendMessage', (mess) => {
      const { group } = mess;
      const selectGroup = groupStore.getState().currentGroup;
      if (group === selectGroup) {
        updateMessage(mess);
      } else {
        updateListChannelChat(mess);
      }
    });

    // Delete message
    socket?.on('deleteMessage', (mess) => {
      updateListMessage(mess);
    });
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
