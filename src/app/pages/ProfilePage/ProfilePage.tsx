import React from 'react';
import authStore from 'app/storeZustand/authStore';
import s from './style.module.scss';
import HeaderProfile from './components/HeaderProfile';

const ProfilePage = () => {
  const { currenTUser } = authStore.getState();

  return (
    <div className={s.profileWrap}>
      <HeaderProfile user={currenTUser} />
    </div>
  );
};

export default ProfilePage;
