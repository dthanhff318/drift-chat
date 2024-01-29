import React, { ReactNode } from 'react';
import Sidebar from './Sidebar';
import s from './style.module.scss';
import useServices from './service';

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  useServices();
  return (
    <div className={s.layoutWrapper}>
      <Sidebar />
      {children}
    </div>
  );
};

export default Layout;
