import React from 'react';
import s from '../style.module.scss';
import { useService } from './service';
import MessageChatItem from '../MessageChatItem/MessageChatItem';
import Loading from 'app/components/Loading/Loading';
import Button from 'app/components/Button/Button';
import { Link } from 'react-router-dom';
import { pathFriendPage } from 'app/routes/routesConfig';

const MessageChatList = () => {
  const { groups, loadingListGroup } = useService();

  return (
    <div className={s.msgList}>
      <Loading loading={loadingListGroup} />
      {groups.length > 0 ? (
        groups.map((group) => (
          <div key={group.id}>
            <MessageChatItem group={group} />
          </div>
        ))
      ) : (
        <div className={s.noGroup}>
          <div className={s.textNoti}>
            <p>Seem you not have any friend</p>
            <p>{`Let's find someone to chat`}</p>
          </div>
          <Link to={pathFriendPage}>
            <Button text="Find friend" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default MessageChatList;
