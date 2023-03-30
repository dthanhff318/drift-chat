import React from "react";
import ChannelChat from "./component/ChannelChat";
import s from "./style.module.scss";
type Props = {};

const HomePage = (props: Props) => {
  return (
    <div className={s.wrapper}>
      <ChannelChat />
      <div className={s.contentChat}>
        <div className={s.messageList}>btnSend</div>
        <div className={s.inputWrap}>
          <input type="text" className={s.inputMess} />
          <span className={s.btnSend}>Send</span>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
