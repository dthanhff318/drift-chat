import { notification } from 'antd';
import friendsApi from 'app/axios/api/friends';
import authStore from 'app/storeZustand/authStore';
import friendStore from 'app/storeZustand/friendStore';
import servicesStore from 'app/storeZustand/servicesStore';
import { useEffect, useState } from 'react';

const useService = () => {
  const { currentUser } = authStore();
  const { dataCommunicate, getDataCommunicate } = friendStore();
  const { loadingFriendPage, lisTUser, getListUser } = servicesStore();

  const [searchValue, setSearchValue] = useState<string>('');

  const handleAddFriend = async (friendId: string) => {
    try {
      await friendsApi.addFriend(friendId);
    } catch (err) {
      notification.error({
        message: `Error`,
        description: 'Try again',
        duration: 4,
      });
    }
  };

  const handleSearchUser = async () => {
    try {
      getListUser({ q: searchValue });
    } catch (err) {
      notification.error({
        message: `Error`,
        description: 'Try again',
        duration: 4,
      });
    }
  };

  // Get data
  useEffect(() => {
    getListUser({ q: searchValue });
  }, []);

  return {
    currentUser,
    dataCommunicate,
    lisTUser,
    searchValue,
    loadingFriendPage,
    setSearchValue,
    handleAddFriend,
    handleSearchUser,
    getDataCommunicate,
  };
};

export default useService;
