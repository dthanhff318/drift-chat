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

  useQuery({
    queryKey: queryKey.DATA_COMMUNICATE,
    queryFn: () => friendsApi.getInfoCommuication(),
  });

  return {
    dataCommunicate,
    tab,
    setTab,
    goToDirectChat,
    goToProfile,
  };
};

export default useService;
