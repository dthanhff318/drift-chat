import React from "react";
import { auth } from "app/firebase/configFirebase";
import { useDispatch } from "react-redux";
import { signoutUser } from "app/pages/AuthPage/authSlice/authSlice";
import { signOut } from "firebase/auth";
import { useHistory } from "react-router-dom";
import { pathLoginPage } from "app/routes/routesConfig";

type Props = {};

const SettingsPage = (props: Props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const handleLogout = async () => {
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
