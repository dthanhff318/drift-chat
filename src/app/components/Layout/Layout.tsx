import React, { ReactNode, useEffect } from 'react';
import s from './style.module.scss';
import Sidebar from './Sidebar';
import socketStore from 'app/storeZustand/socketStore';
import { notification } from 'antd';

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  const { socket } = socketStore.getState();
  useEffect(() => {
    socket?.on('userLogin', (user) => {
      notification.success({
        message: `${user.displayName} is online`,
        description: "Let's say something",
        duration: 4,
      });
    });
  }, []);

  return (
    <div className={s.layoutWrapper}>
      <Sidebar />
      {children}
    </div>
  );
};

export default Layout;
