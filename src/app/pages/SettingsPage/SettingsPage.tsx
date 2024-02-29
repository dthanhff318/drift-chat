import authApi from 'app/axios/api/auth';
import Button from 'app/components/Button/Button';
import { auth } from 'app/firebase/configFirebase';
import { getRefreshTokenFromLocalStorage } from 'app/helpers/localStorage';
import { pathLoginPage } from 'app/routes/routesConfig';
import authStore from 'app/storeZustand/authStore';
import { signOut } from 'firebase/auth';
import React from 'react';
import { useHistory } from 'react-router-dom';
import s from './style.module.scss';

const SettingsPage = () => {
  const { logout } = authStore();
  const history = useHistory();
  const handleLogout = async () => {
    const refreshToken = getRefreshTokenFromLocalStorage();
    await authApi.logout(refreshToken ?? '');
    await signOut(auth).then(() => {
      logout();
      history.push(pathLoginPage);
    });
    sessionStorage.clear();
  };

  return (
    <div className={s.wrapper}>
      <h2 className={s.titlePage}>Settings</h2>
      <div className={s.content}>hi</div>
      <div className={s.bottom}>
        <a href="https://www.w3schools.com/jsref/event_onbeforeunload.asp">ssssssssssssssssss</a>
        <Button text="Logout" fill={true} onClick={handleLogout} />
      </div>
    </div>
  );
};

export default SettingsPage;
