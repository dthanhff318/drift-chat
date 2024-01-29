import React from 'react';
import authStore from 'app/storeZustand/authStore';
import s from './style.module.scss';
import HeaderProfile from './components/HeaderProfile';
import { useService } from './service';

const ProfilePage = () => {
  const { currenTUser } = authStore.getState();
  useService();
  return (
    <div className={s.profileWrap}>
      <HeaderProfile user={currenTUser} />
    </div>
  );
};

export default ProfilePage;
