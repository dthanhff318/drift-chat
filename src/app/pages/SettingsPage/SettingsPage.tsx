import { auth } from 'app/firebase/configFirebase';
import { geTUserFromLs, getRefreshTokenFromLocalStorage } from 'app/helpers/localStorage';
import authStore from 'app/storeZustand/authStore';
import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import s from './style.module.scss';
import Button from 'app/components/Button/Button';
import authApi from 'app/axios/api/auth';
import { pathLoginPage } from 'app/routes/routesConfig';

const SettingsPage = () => {
  const { currenTUser, logout } = authStore();
  const infoUser = currenTUser ?? geTUserFromLs();
  const history = useHistory();
  const handleLogout = async () => {
    const refreshToken = getRefreshTokenFromLocalStorage();
    await authApi.logout(refreshToken ?? '');
    await signOut(auth).then(() => {
      logout();
      history.push(pathLoginPage);
    });
  };

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
