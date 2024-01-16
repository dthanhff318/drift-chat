import React from 'react';
import ChannelChat from './component/ChannelChat';
import s from './style.module.scss';
import BoxChat from './component/BoxChat/BoxChat';
import authStore from 'app/storeZustand/authStore';
import { useService } from './service';

const HomePage = () => {
  const { currenTUser } = authStore();
  useService();

  return (
    <div className={s.wrapper}>
      <ChannelChat infoUser={currenTUser} />
      <BoxChat />
    </div>
  );
};

export default HomePage;
