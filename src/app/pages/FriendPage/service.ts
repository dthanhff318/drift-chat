import { notification } from 'antd';
import friendsApi from 'app/axios/api/friends';
import { replacePathParams } from 'app/helpers/funcs';
import { pathProfileFriend } from 'app/routes/routesConfig';
import authStore from 'app/storeZustand/authStore';
import friendStore from 'app/storeZustand/friendStore';
import servicesStore from 'app/storeZustand/servicesStore';
import socketStore from 'app/storeZustand/socketStore';
import { socketEmit } from 'const/socket';
import { EFriendStatus } from 'enums';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TDataCommunicate, TUser } from 'types/common';

const useService = () => {
  const history = useHistory();
  const { currentUser } = authStore();
  const { dataCommunicate, getDataCommunicate } = friendStore();
  const { socket } = socketStore();
  const { loadingFriendPage, listUser, getListUser } = servicesStore();
  const [usersLoading, setUserLoading] = useState<string[]>([]);

  const [searchValue, setSearchValue] = useState<string>('');
  const [showApprove, setShowApprove] = useState<boolean>(false);

  const handleFriendRequest = async (friend: TUser, status: EFriendStatus) => {
    const { id = '', displayName } = friend;
    try {
      switch (status) {
        case EFriendStatus.Add:
          setUserLoading((prev) => [...prev, id]);
          await friendsApi.addFriend(id);
          socket?.emit(socketEmit.ADD_FRIEND, currentUser.id);
          getDataCommunicate();
          setUserLoading((prev) => prev.filter((e) => e !== id));
          break;
        case EFriendStatus.Accept:
          setUserLoading((prev) => [...prev, id]);
          await friendsApi.acceptFrRequest(id);
          socket?.emit(socketEmit.ACCEPT_REQUEST, displayName);
          getDataCommunicate();
          setUserLoading((prev) => prev.filter((e) => e !== id));
          break;
        default:
      }
    } catch (err) {
      setUserLoading((prev) => prev.filter((e) => e !== id));
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
  const handleListenEventAcceptRequest = (friendName: string) => {
    getDataCommunicate();
    notification.success({
      message: `${friendName} accepted your friend request`,
      description: "Let's talk",
      duration: 4,
    });
  };

  const handleGoToProfileFriend = (id: string) => {
    history.push(replacePathParams(pathProfileFriend, { userId: id }));
  };

  // Get data
  useEffect(() => {
    getListUser({ q: searchValue });
  }, []);

  // Socket
  useEffect(() => {
    socket?.on(socketEmit.ADD_FRIEND, handleListenEventAddFriend);
    socket?.on(socketEmit.ACCEPT_REQUEST, handleListenEventAcceptRequest);
    return () => {
      socket?.off(socketEmit.ADD_FRIEND, handleListenEventAddFriend);
      socket?.off(socketEmit.ACCEPT_REQUEST, handleListenEventAcceptRequest);
    };
  }, []);

  return {
    currentUser,
    dataCommunicate,
    listUser,
    searchValue,
    loadingFriendPage,
    usersLoading,
    showApprove,
    setShowApprove,
    setSearchValue,
    handleFriendRequest,
    handleSearchUser,
    getDataCommunicate,
    checkStatusFriend,
    handleGoToProfileFriend,
  };
};

export default useService;
