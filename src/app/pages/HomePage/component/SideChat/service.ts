import groupApi from "app/axios/api/group";
import groupStore from "app/storeZustand/groupStore";
import { useState } from "react";
import { IndexedObject } from "types/common";

type TModalSideChat = "" | "change-name-group" | "list-member";
type TLoadingSideChat = "" | "change-name-group";

export const useService = () => {
  const { getGroups, getDetailGroup, currentGroup } = groupStore();
  const [loading, setLoading] = useState<TLoadingSideChat>("");
  const [modal, setModal] = useState<TModalSideChat>("");
  const handleUpdateNameGroup = async (data: IndexedObject) => {
    try {
      setLoading("change-name-group");
      await groupApi.updateGroup(currentGroup, data);
      getGroups();
      getDetailGroup(currentGroup);
      setLoading("");
    } catch (err) {
      setLoading("");
    }
  };
  return {
    modal,
    loading,
    setModal,
    handleUpdateNameGroup,
  };
};
