import Loading from 'app/components/Loading/Loading';
import React from 'react';
import HeaderProfile from './components/HeaderProfile/HeaderProfile';
import { useService } from './service';
import s from './style.module.scss';
import HistoryProfile from './components/HistoryProfile/HistoryProfile';

const ProfilePage = () => {
  const { profileUser, loading, userId } = useService();
  return (
    <>
      <div className={s.profileWrap}>
        <HeaderProfile friendId={userId} user={profileUser} />
        <div className={s.content}>
          <HistoryProfile user={profileUser} />
        </div>
      </div>
      <Loading loading={loading} />
    </>
  );
};

export default ProfilePage;
