import { notification } from 'antd';
import socketStore from 'app/storeZustand/socketStore';
import { useEffect } from 'react';
import { TUser } from 'types/common';
import authStore from 'app/storeZustand/authStore';

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

  useEffect(() => {
    socket?.on('userLogin', handleSocketUserlogin);
    return () => {
      socket?.off('userLogin', handleSocketUserlogin);
    };
  }, [socket]);

  return {};
};

export default useServices;
