import Loading from 'app/components/Loading/Loading';
import React from 'react';
import HeaderProfile from './components/HeaderProfile/HeaderProfile';
import { useService } from './service';
import s from './style.module.scss';

const ProfilePage = () => {
  const { userDetail, loading, userId } = useService();
  return (
    <>
      <div className={s.profileWrap}>
        <HeaderProfile friendId={userId} user={userDetail} />
      </div>
      <Loading loading={loading} />
    </>
  );
};

export default ProfilePage;
