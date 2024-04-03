import groupApi from 'app/axios/api/group';
import groupStore from 'app/storeZustand/groupStore';
import { queryKey } from 'const/reactQueryKey';
import { useQuery } from 'react-query';
import { TGroup } from 'types/common';

export const useService = () => {
  const { saveCurrentGroup } = groupStore();

  const { data, isLoading } = useQuery<{ data: TGroup[] }>({
    queryKey: queryKey.GET_GROUPS,
    queryFn: () => groupApi.getAllGroup(),
  });

  return {
    data,
    isLoading,
    saveCurrentGroup,
  };
};
