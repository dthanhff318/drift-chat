import groupStore from 'app/storeZustand/groupStore';
import { useEffect } from 'react';

export const useService = () => {
  const { groups, loadingListGroup, getGroups, saveCurrentGroup } = groupStore();

  useEffect(() => {
    getGroups();
  }, []);

  return {
    groups,
    loadingListGroup,
    getGroups,
    saveCurrentGroup,
  };
};
