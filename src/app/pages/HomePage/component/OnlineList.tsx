import Avatar from 'app/components/Avatar/Avatar';
import friendStore from 'app/storeZustand/friendStore';
import React from 'react';
import s from './style.module.scss';
import { useHistory, useParams } from 'react-router-dom';
import { replacePathParams } from 'app/helpers/funcs';
import { pathHomePageChat } from 'app/routes/routesConfig';
import groupStore from 'app/storeZustand/groupStore';
import messageStore from 'app/storeZustand/messageStore';

const OnlineList = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const {
    dataCommunicate: { listFriend },
  } = friendStore();
  const { groups } = groupStore();
  const { clearStateMessages } = messageStore();
  const handleSelectChat = (idGroup: string) => {
    const findGroup = groups.find(
      (g) => g.members?.length === 2 && !!g.members.find((e) => e.id === idGroup && !g.isGroup),
    );
    if (id === findGroup?.id) return;
    history.push(replacePathParams(pathHomePageChat, { id: findGroup?.id ?? '' }));
    clearStateMessages();
  };

  return (
    <div className={s.onlineListWrap}>
      <div className={s.list}>
        {listFriend?.map((e, i) => (
          <div className={s.itemUser} key={i} onClick={() => handleSelectChat(e.id ?? '')}>
            <Avatar src={e.photoUrl} />
            <span className={s.userName}>{e.displayName}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OnlineList;
