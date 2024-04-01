import groupStore from 'app/storeZustand/groupStore';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { queryKey } from 'const/reactQueryKey';
import groupApi from 'app/axios/api/group';
import { TGroup } from 'types/common';

export const useService = () => {
  const { getGroups, saveCurrentGroup } = groupStore();

  const { data, isLoading } = useQuery<{ data: TGroup[] }>({
    queryKey: queryKey.GET_GROUPS,
    queryFn: () => groupApi.getAllGroup(),
  });
  useEffect(() => {
    getGroups();
  }, []);

  return {
    data,
    isLoading,
    getGroups,
    saveCurrentGroup,
  };
};
