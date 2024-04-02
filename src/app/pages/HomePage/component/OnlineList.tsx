import Avatar from 'app/components/Avatar/Avatar';
import friendStore from 'app/storeZustand/friendStore';
import React from 'react';
import s from './style.module.scss';
import { useHistory, useParams } from 'react-router-dom';
import { replacePathParams } from 'app/helpers/funcs';
import { pathHomePageChat } from 'app/routes/routesConfig';
import groupStore from 'app/storeZustand/groupStore';
import messageStore from 'app/storeZustand/messageStore';
import { useQueryClient } from 'react-query';
import { TDataCommunicate } from 'types/common';
import { queryKey } from 'const/reactQueryKey';

const OnlineList = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  const queryClient = useQueryClient();
  const dataCommunicateQuery = queryClient.getQueryData<{ data: TDataCommunicate }>(
    queryKey.DATA_COMMUNICATE,
  );
  const { listFriend } = dataCommunicateQuery?.data ?? {};
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
        {listFriend
          ?.filter((x) => x.isOnline)
          .map((e, i) => (
            <div className={s.itemUser} key={i} onClick={() => handleSelectChat(e.id ?? '')}>
              <Avatar src={e.photoUrl} online={e.isOnline} />
              <span className={s.userName}>{e.displayName}</span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default OnlineList;
