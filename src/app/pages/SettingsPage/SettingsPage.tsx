import { auth } from 'app/firebase/configFirebase';
import { geTUserFromLs } from 'app/helpers/localStorage';
import authStore from 'app/storeZustand/authStore';
import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import s from './style.module.scss';
import Button from 'app/components/Button/Button';

const SettingsPage = () => {
  const { currenTUser, logout } = authStore.getState();
  const infoUser = currenTUser ?? geTUserFromLs();
  const history = useHistory();
  const handleLogout = async () => {
    // await authApi.logout(infoUser.uid ?? "");
    await signOut(auth).then(() => {
      // logout();
      // history.push(pathLoginPage);
    });
  };

  useEffect(() => {
    // (async () => {
    //   try {
    //     const res = await authApi.getTokenLivekit();
    //     setToken(res.data);
    //   } catch (e) {
    //     console.log(e);
    //   }
    // })();
  }, []);

  return (
    <div className={s.wrapper}>
      <h2 className={s.titlePage}>Settings</h2>
      <div className={s.content}>hi</div>
      <div className={s.bottom}>
        <Button text="Logout" fill={true} onClick={handleLogout} />
      </div>
    </div>
  );
};

export default SettingsPage;
