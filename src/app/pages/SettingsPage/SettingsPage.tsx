import { auth } from 'app/firebase/configFirebase';
import { geTUserFromLs } from 'app/helpers/localStorage';
import authStore from 'app/storeZustand/authStore';
import { signOut } from 'firebase/auth';
import React from 'react';
import { useHistory } from 'react-router-dom';

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
  return (
    <div>
      SettingsPage
      <h2>Logout</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default SettingsPage;
