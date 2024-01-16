import React, { useState } from 'react';
import s from './style.module.scss';
import FriendRow from './FriendRow';
import { TUser } from 'types/common';
import friendStore from 'app/storeZustand/friendStore';
import friendsApi from 'app/axios/api/friends';
import groupStore from 'app/storeZustand/groupStore';
import { useHistory } from 'react-router-dom';
import { replacePathParams } from 'app/helpers/funcs';
import { pathHomePageChat } from 'app/routes/routesConfig';
import messageStore from 'app/storeZustand/messageStore';
type TControl = 'friend' | 'approve' | 'blocked';

const MyFriendControl = () => {
  const history = useHistory();
  const [control, setControl] = useState<TControl>('friend');
  const { dataCommunicate, getDataCommunicate } = friendStore();
  const { groups } = groupStore();
  const { clearStateMessages } = messageStore();

  const handleAccept = async (id: string) => {
    await friendsApi.acceptFrRequest(id);
    getDataCommunicate();
  };

  const handleGoToChat = (idGroup: string) => {
    const findGroup = groups.find(
      (g) => g.members?.length === 2 && !!g.members.find((e) => e.id === idGroup && !g.isGroup),
    );
    history.push(replacePathParams(pathHomePageChat, { id: findGroup?.id ?? '' }));
    clearStateMessages();
  };

  return (
    <div className={s.friendControlWrap}>
      <div className={s.controlHeader}>
        <div
          className={`${s.item} ${control === 'friend' ? s.active : ''}`}
          onClick={() => setControl('friend')}
        >
          My Friend
        </div>
        <div
          className={`${s.item} ${control === 'approve' ? s.active : ''}`}
          onClick={() => setControl('approve')}
        >
          Approve
        </div>
        <div
          className={`${s.item} ${control === 'blocked' ? s.active : ''}`}
          onClick={() => setControl('blocked')}
        >
          Blocked
        </div>
      </div>
      <div className={s.controlContent}>
        {control === 'friend' &&
          dataCommunicate.listFriend?.map((t: TUser) => (
            <div key={t.id}>
              <FriendRow
                data={t}
                textButton="Message"
                onClick={() => {
                  handleGoToChat(t.id ?? '');
                }}
              />
            </div>
          ))}
        {control === 'approve' &&
          dataCommunicate.listAccept?.map((t: TUser) => (
            <div key={t.id}>
              <FriendRow
                data={t}
                textButton="Accept"
                onClick={() => {
                  handleAccept(t.id ?? '');
                }}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default MyFriendControl;
