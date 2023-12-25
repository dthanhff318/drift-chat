import React from "react";
import { auth } from "app/firebase/configFirebase";
import { signOut } from "firebase/auth";
import { useHistory } from "react-router-dom";
import { pathLoginPage } from "app/routes/routesConfig";
import authApi from "app/axios/api/auth";
import { geTUserFromLs } from "app/helpers/localStorage";
import authStore from "app/storeZustand/authStore";

type Props = {};

const SettingsPage = (props: Props) => {
  const { currenTUser } = authStore.getState();
  const infoUser = currenTUser ?? geTUserFromLs();
  const history = useHistory();
  const handleLogout = async () => {
    await authApi.logout(infoUser.uid ?? "");
    await signOut(auth).then(() => {
      // dispatch(signouTUser());
      history.push(pathLoginPage);
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
