import { useHistory } from "react-router-dom";
import { useEffect } from "react";

import friendsApi from "app/axios/api/friends";
import authStore from "app/storeZustand/authStore";

const useService = () => {
  const history = useHistory();
  const { currentUser } = authStore();
  const handleAddFriend = async (friendId: string) => {
    try {
      await friendsApi.addFriend(friendId);
    } catch (err) {}
  };
  useEffect(() => {
    // dispatch(getAllUserInApp() as unknown as AnyAction);
    // dispatch(getDataFriendCommunication() as unknown as AnyAction);
  }, []);
  return {
    currentUser,
    handleAddFriend,
  };
};

export default useService;
