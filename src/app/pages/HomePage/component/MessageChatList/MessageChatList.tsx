import React from 'react';
import s from '../style.module.scss';
import { useService } from './service';
import MessageChatItem from '../MessageChatItem/MessageChatItem';
import Loading from 'app/components/Loading/Loading';

const MessageChatList = () => {
  const { groups, loadingListGroup } = useService();

  return (
    <div className={s.msgList}>
      <Loading loading={loadingListGroup} />
      {groups.map((group) => (
        <div key={group.id}>
          <MessageChatItem group={group} />
        </div>
      ))}
    </div>
  );
};

export default MessageChatList;
