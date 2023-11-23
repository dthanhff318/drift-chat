import groupStore from "app/storeZustand/groupStore";
import { useEffect } from "react";

export const useService = () => {
  const { groups, currentGroup, getGroups, saveCurrentGroup } = groupStore();

  useEffect(() => {
    getGroups();
  }, []);
  return {
    groups,
    getGroups,
    saveCurrentGroup,
  };
};
