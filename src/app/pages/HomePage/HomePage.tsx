import React from "react";
import ChannelChat from "./component/ChannelChat";
import s from "./style.module.scss";
import BoxChat from "./component/BoxChat/BoxChat";
import authStore from "app/storeZustand/authStore";
type Props = {};

const HomePage = (props: Props) => {
  const { currentUser } = authStore();

  return (
    <div className={s.wrapper}>
      <ChannelChat infoUser={currentUser} />
      <BoxChat />
    </div>
  );
};

export default HomePage;
