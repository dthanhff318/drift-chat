import { notification } from 'antd';
import friendsApi from 'app/axios/api/friends';
import authStore from 'app/storeZustand/authStore';
import socketStore from 'app/storeZustand/socketStore';
import { queryKey } from 'const/reactQueryKey';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { TUser } from 'types/common';

const useServices = () => {
  const { socket } = socketStore();
  const { currentUser } = authStore();

  const handleSocketUserlogin = (user: TUser) => {
    if (currentUser.id === user.id) return;
    notification.success({
      message: `${user.displayName} is online`,
      description: "Let's say something",
      duration: 4,
    });
  };

  const { refetch } = useQuery({
    queryKey: queryKey.DATA_COMMUNICATE,
    queryFn: () => friendsApi.getInfoCommuication(),
  });

  useEffect(() => {
    socket?.on('userLogin', handleSocketUserlogin);
    return () => {
      socket?.off('userLogin', handleSocketUserlogin);
    };
  }, [socket]);

  useEffect(() => {
    refetch();
  }, []);

  return {};
};

export default useServices;
