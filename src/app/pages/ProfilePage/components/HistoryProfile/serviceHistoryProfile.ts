import historyApi from 'app/axios/api/historyApi';
import authStore from 'app/storeZustand/authStore';
import settingStore from 'app/storeZustand/settingStore';
import { useQuery } from 'react-query';
import { THistoryProfile } from 'types/common';
import { useHistory } from 'react-router-dom';
import { replacePathParams } from 'app/helpers/funcs';
import { pathProfileFriend } from 'app/routes/routesConfig';

export const useServiceHistoryProfile = () => {
  const { currentUser } = authStore();
  const { settings } = settingStore();

  const history = useHistory();

  const { data, isLoading } = useQuery<{ data: THistoryProfile[] }>({
    queryKey: ['historyProfile'],
    queryFn: () => historyApi.getHistoryProfileByUserId(currentUser.id ?? ''),
  });

  const goToFriendProfile = (userId: string) => {
    history.push(replacePathParams(pathProfileFriend, { userId }));
  };

  return { data, isLoading, settings, goToFriendProfile };
};
