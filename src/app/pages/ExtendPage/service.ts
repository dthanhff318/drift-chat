import { replacePathParams } from 'app/helpers/funcs';
import { pathHomePageChat, pathObj } from 'app/routes/routesConfig';
import friendStore from 'app/storeZustand/friendStore';
import groupStore from 'app/storeZustand/groupStore';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import { queryKey } from 'const/reactQueryKey';
import { TDataCommunicate } from 'types/common';

export enum ETypeNavExtendPage {
  Friend = 'Friend',
  Blocked = 'Blocked',
  Mission = 'Mission',
}

const useService = () => {
  const history = useHistory();

  const queryClient = useQueryClient();

  const { groups } = groupStore();
  const [tab, setTab] = useState<ETypeNavExtendPage>(ETypeNavExtendPage.Friend);

  const goToDirectChat = (id: string) => {
    const findGroup = groups.find(
      (g) => g.members?.length === 2 && !!g.members.find((e) => e.id === id && !g.isGroup),
    );
    history.replace(
      replacePathParams(pathHomePageChat, {
        id: findGroup?.id ?? '',
      }),
    );
  };

  const goToProfile = (id: string) => {
    history.push(replacePathParams(pathObj.profileFriend, { userId: id }));
  };

  const resDataCommunicate = queryClient.getQueryData<{ data: TDataCommunicate }>(
    queryKey.DATA_COMMUNICATE,
  );

  const { data: dataCommunicate } = resDataCommunicate ?? {};
  return {
    dataCommunicate,
    tab,
    setTab,
    goToDirectChat,
    goToProfile,
  };
};

export default useService;
