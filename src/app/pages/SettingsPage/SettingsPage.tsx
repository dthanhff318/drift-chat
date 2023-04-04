import React from "react";
import { auth } from "app/firebase/configFirebase";
import { useDispatch, useSelector } from "react-redux";
import { signoutUser } from "app/pages/AuthPage/authSlice/authSlice";
import { signOut } from "firebase/auth";
import { useHistory } from "react-router-dom";
import { pathLoginPage } from "app/routes/routesConfig";
import authApi from "app/axios/api/auth";
import { RootState } from "store/configStore";
import { getUserFromLs } from "app/helpers/localStorage";

type Props = {};

const SettingsPage = (props: Props) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const infoUser = user ?? getUserFromLs();
  const dispatch = useDispatch();
  const history = useHistory();
  const handleLogout = async () => {
    await authApi.logout(infoUser.uid);
    await signOut(auth).then(() => {
      dispatch(signoutUser());
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
