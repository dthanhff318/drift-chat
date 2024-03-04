import { notification } from 'antd';
import friendsApi from 'app/axios/api/friends';
import authStore from 'app/storeZustand/authStore';
import friendStore from 'app/storeZustand/friendStore';
import servicesStore from 'app/storeZustand/servicesStore';
import socketStore from 'app/storeZustand/socketStore';
import { socketEmit } from 'const/socket';
import { EFriendStatus } from 'enums';
import { useEffect, useState } from 'react';
import { TDataCommunicate, TUser } from 'types/common';

const useService = () => {
  const { currentUser } = authStore();
  const { dataCommunicate, getDataCommunicate } = friendStore();
  const { socket } = socketStore();
  const { loadingFriendPage, listUser, getListUser } = servicesStore();
  const [usersLoading, setUserLoading] = useState<string[]>([]);

  const [searchValue, setSearchValue] = useState<string>('');

  const handleFriendRequest = async (friendId: string, status: EFriendStatus) => {
    try {
      switch (status) {
        case EFriendStatus.Add:
          setUserLoading((prev) => [...prev, friendId]);
          await friendsApi.addFriend(friendId);
          socket?.emit(socketEmit.ADD_FRIEND, currentUser.id);
          getDataCommunicate();
          setUserLoading((prev) => prev.filter((e) => e !== friendId));
          break;
        case EFriendStatus.Accept:
          setUserLoading((prev) => [...prev, friendId]);
          await friendsApi.acceptFrRequest(friendId);
          getDataCommunicate();
          setUserLoading((prev) => prev.filter((e) => e !== friendId));
          break;
        default:
      }
    } catch (err) {
      setUserLoading((prev) => prev.filter((e) => e !== friendId));
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

  const checkStatusFriend = (dataCommunicate: TDataCommunicate, user: TUser) => {
    const { listFriend, listRequest, listAccept } = dataCommunicate;
    if (listFriend?.find((f) => f.id === user.id)) {
      return EFriendStatus.Friend;
    }
    if (listRequest?.find((f) => f.id === user.id)) {
      return EFriendStatus.Waiting;
    }
    if (listAccept?.find((f) => f.id === user.id)) {
      return EFriendStatus.Accept;
    } else {
      return EFriendStatus.Add;
    }
  };

  const handleListenEventAddFriend = (friendId: string) => {
    getDataCommunicate();
  };

  // Get data
  useEffect(() => {
    getListUser({ q: searchValue });
  }, []);

  // Socket
  useEffect(() => {
    socket?.emit(socketEmit.ADD_FRIEND, handleListenEventAddFriend);
    return () => {
      socket?.off(socketEmit.ADD_FRIEND, handleListenEventAddFriend);
    };
  }, []);

  return {
    currentUser,
    dataCommunicate,
    listUser,
    searchValue,
    loadingFriendPage,
    usersLoading,
    setSearchValue,
    handleFriendRequest,
    handleSearchUser,
    getDataCommunicate,
    checkStatusFriend,
  };
};

export default useService;
