import { notification } from 'antd';
import socketStore from 'app/storeZustand/socketStore';
import { useEffect } from 'react';
import { TUser } from 'types/common';

const useServices = () => {
  const { socket } = socketStore();

  const handleSocketUserlogin = (user: TUser) => {
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
