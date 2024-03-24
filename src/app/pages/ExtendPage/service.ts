import authStore from 'app/storeZustand/authStore';
import friendStore from 'app/storeZustand/friendStore';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { replacePathParams } from 'app/helpers/funcs';
import { pathHomePageChat, pathObj } from 'app/routes/routesConfig';
import groupStore from 'app/storeZustand/groupStore';

export enum ETypeNavExtendPage {
  Friend = 'Friend',
  Blocked = 'Blocked',
  Mission = 'Mission',
}

const useService = () => {
  const history = useHistory();

  const { groups } = groupStore();
  const { getDataCommunicate, dataCommunicate } = friendStore();
  const [loading, setLoading] = useState<boolean>(false);
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
    loading,
    dataCommunicate,
    tab,
    setTab,
    goToDirectChat,
    goToProfile,
  };
};

export default useService;
