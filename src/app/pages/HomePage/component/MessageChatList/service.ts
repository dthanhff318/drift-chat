import groupApi from 'app/axios/api/group';
import groupStore from 'app/storeZustand/groupStore';
import { queryKey } from 'const/reactQueryKey';
import { useQuery, useQueryClient } from 'react-query';
import { TGroup } from 'types/common';

export const useService = () => {
  const queryClient = useQueryClient();
  const { saveCurrentGroup } = groupStore();

  const groupsQueryState = queryClient.getQueryState<{ data: TGroup[] }>(queryKey.GET_GROUPS);
  return {
    groupsQueryState,
    saveCurrentGroup,
  };
};
