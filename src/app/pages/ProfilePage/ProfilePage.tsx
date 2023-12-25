import React from "react";
import authStore from "app/storeZustand/authStore";
import s from "./style.module.scss";
import HeaderProfile from "./components/HeaderProfile";

type Props = {};

const ProfilePage = (props: Props) => {
  const { currenTUser } = authStore.getState();

  return (
    <div className={s.profileWrap}>
      <HeaderProfile user={currenTUser} />
    </div>
  );
};

export default ProfilePage;
