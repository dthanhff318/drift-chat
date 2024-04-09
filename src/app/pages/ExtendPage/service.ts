import friendsApi from 'app/axios/api/friends';
import { replacePathParams } from 'app/helpers/funcs';
import { pathHomePageChat, pathObj } from 'app/routes/routesConfig';
import { queryKey } from 'const/reactQueryKey';
import { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { useHistory } from 'react-router-dom';
import { TDataCommunicate, TGroup } from 'types/common';

export enum ETypeNavExtendPage {
  Friend = 'Friend',
  Blocked = 'Blocked',
  Mission = 'Mission',
}

const useService = () => {
  const history = useHistory();

  const queryClient = useQueryClient();
  const dataGroupsQuery = queryClient.getQueryData<{ data: TGroup[] }>(queryKey.GET_GROUPS, {});
  const groups = dataGroupsQuery?.data ?? [];

  const { data } = useQuery<{ data: TDataCommunicate }>({
    queryKey: queryKey.DATA_COMMUNICATE,
    queryFn: () => friendsApi.getInfoCommuication(),
  });
  const dataCommunicate = data?.data ?? {};
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

  return {
    dataCommunicate,
    tab,
    setTab,
    goToDirectChat,
    goToProfile,
  };
};

export default useService;
