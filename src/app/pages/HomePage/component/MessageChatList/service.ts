import groupStore from 'app/storeZustand/groupStore';
import { useEffect } from 'react';

export const useService = () => {
  const { groups, getGroups, saveCurrentGroup } = groupStore();

  useEffect(() => {
    getGroups();
  }, []);

  return {
    groups,
    getGroups,
    saveCurrentGroup,
  };
};
