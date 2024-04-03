import { notification } from 'antd';
import friendsApi from 'app/axios/api/friends';
import { replacePathParams } from 'app/helpers/funcs';
import { pathProfileFriend } from 'app/routes/routesConfig';
import authStore from 'app/storeZustand/authStore';
import servicesStore from 'app/storeZustand/servicesStore';
import socketStore from 'app/storeZustand/socketStore';
import { queryKey } from 'const/reactQueryKey';
import { socketEmit } from 'const/socket';
import { EFriendStatus } from 'enums';
import { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useHistory } from 'react-router-dom';
import { TDataCommunicate, TUser } from 'types/common';

const useService = () => {
  const queryClient = useQueryClient();

  const resDataCommunicate = queryClient.getQueryData<{ data: TDataCommunicate }>(
    queryKey.DATA_COMMUNICATE,
  );
  const dataCommunicate = resDataCommunicate?.data ?? {};
  const history = useHistory();
  const { currentUser } = authStore();
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
          queryClient.refetchQueries(queryKey.DATA_COMMUNICATE);
          setUserLoading((prev) => prev.filter((e) => e !== id));
          break;
        case EFriendStatus.Accept:
          setUserLoading((prev) => [...prev, id]);
          await friendsApi.acceptFrRequest(id);
          socket?.emit(socketEmit.ACCEPT_REQUEST, displayName);
          queryClient.refetchQueries(queryKey.DATA_COMMUNICATE);
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

  const handleListenEventAddFriend = async (friendId: string) => {
    await queryClient.refetchQueries(queryKey.DATA_COMMUNICATE);
  };
  const handleListenEventAcceptRequest = async (friendName: string) => {
    await queryClient.refetchQueries(queryKey.DATA_COMMUNICATE);
    notification.success({
      message: `${friendName} accepted your friend request`,
      description: "Let's talk",
      duration: 4,
    });
  };

  const handleGoToProfileFriend = (id: string) => {
    history.push(replacePathParams(pathProfileFriend, { userId: id }));
  };

  const handleClickShowApproval = async () => {
    try {
      await queryClient.refetchQueries(queryKey.DATA_COMMUNICATE);
      setShowApprove(true);
    } catch (err) {
      console.log(err);
    }
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
    listUser,
    searchValue,
    loadingFriendPage,
    usersLoading,
    showApprove,
    dataCommunicate,
    setShowApprove,
    setSearchValue,
    handleFriendRequest,
    handleSearchUser,
    checkStatusFriend,
    handleGoToProfileFriend,
    handleClickShowApproval,
  };
};

export default useService;
