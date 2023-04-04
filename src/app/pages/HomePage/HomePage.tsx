import React from "react";
import { getUserFromLs } from "app/helpers/localStorage";
import { useSelector } from "react-redux";
import { RootState } from "store/configStore";
import ChannelChat from "./component/ChannelChat";
import s from "./style.module.scss";
import BoxChat from "./component/BoxChat";
type Props = {};

const HomePage = (props: Props) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const infoUser = user ?? getUserFromLs();
  return (
    <div className={s.wrapper}>
      <ChannelChat infoUser={infoUser} />
      <BoxChat />
    </div>
  );
};

export default HomePage;
