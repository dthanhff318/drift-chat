import { useEffect, useRef, useState } from "react";
import friendsApi from "app/axios/api/friends";
import authStore from "app/storeZustand/authStore";
import friendStore from "app/storeZustand/friendStore";
import servicesStore from "app/storeZustand/servicesStore";
import { TQuery } from "types/common";

const useService = () => {
  const { currenTUser } = authStore();
  const { dataCommunicate, getDataCommunicate } = friendStore();
  const { loadingFriendPage, lisTUser, getListUser } = servicesStore();

  const [searchValue, setSearchValue] = useState<string>("");

  const handleAddFriend = async (friendId: string) => {
    try {
      await friendsApi.addFriend(friendId);
    } catch (err) {}
  };

  const handleSearchUser = async () => {
    try {
      getListUser({ q: searchValue });
    } catch (err) {}
  };

  // Get data
  useEffect(() => {
    getListUser({ q: searchValue });
  }, []);

  return {
    currenTUser,
    dataCommunicate,
    lisTUser,
    searchValue,
    loadingFriendPage,
    setSearchValue,
    handleAddFriend,
    handleSearchUser,
  };
};

export default useService;
