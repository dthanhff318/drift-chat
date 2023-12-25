import { useHistory } from "react-router-dom";
import { useEffect } from "react";

import friendsApi from "app/axios/api/friends";
import authStore from "app/storeZustand/authStore";
import friendStore from "app/storeZustand/friendStore";
import servicesStore from "app/storeZustand/servicesStore";

const useService = () => {
  const history = useHistory();
  const { currenTUser } = authStore();
  const { dataCommunicate, getDataCommunicate } = friendStore();
  const { lisTUser, getLisTUser } = servicesStore();
  const handleAddFriend = async (friendId: string) => {
    try {
      await friendsApi.addFriend(friendId);
    } catch (err) {}
  };
  useEffect(() => {
    getDataCommunicate();
    getLisTUser();
  }, []);
  return {
    currenTUser,
    dataCommunicate,
    lisTUser,
    handleAddFriend,
  };
};

export default useService;
