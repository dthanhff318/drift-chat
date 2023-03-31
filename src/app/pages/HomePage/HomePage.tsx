import React from "react";
import ChannelChat from "./component/ChannelChat";
import s from "./style.module.scss";
type Props = {};

const HomePage = (props: Props) => {
  return (
    <div className={s.wrapper}>
      <ChannelChat />
      <div></div>
    </div>
  );
};

export default HomePage;
