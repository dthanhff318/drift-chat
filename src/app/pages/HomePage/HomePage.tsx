import React from "react";
import { getUserFromLs } from "app/helpers/localStorage";
import { useSelector } from "react-redux";
import { RootState } from "store/configStore";
import ChannelChat from "./component/ChannelChat";
import s from "./style.module.scss";
type Props = {};

const HomePage = (props: Props) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const infoUser = user ?? getUserFromLs();
  return (
    <div className={s.wrapper}>
      <ChannelChat infoUser={infoUser} />
      <div>hi</div>
    </div>
  );
};

export default HomePage;
