import React from 'react';
import authStore from 'app/storeZustand/authStore';
import s from './style.module.scss';
import HeaderProfile from './components/HeaderProfile';
import { useService } from './service';
import Loading from 'app/components/Loading/Loading';

const ProfilePage = () => {
  const { userDetail, loading } = useService();
  return (
    <>
      <div className={s.profileWrap}>
        <HeaderProfile user={userDetail} />
      </div>
      <Loading loading={loading} />
    </>
  );
};

export default ProfilePage;
