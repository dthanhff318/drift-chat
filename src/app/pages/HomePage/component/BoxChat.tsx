import Avatar from "app/components/Avatar/Avatar";
import React from "react";
import s from "./style.module.scss";
type Props = {};

const BoxChat = (props: Props) => {
  return (
    <div className={s.boxChatWrap}>
      <div className={s.headerBox}>
        <Avatar />
        <span className={s.title}>Nhom chat vip pro</span>
      </div>
      <div className={s.content}>
        {Array(20)
          .fill(1)
          .map((e, i) => (
            <div className={s.message}>heloo</div>
          ))}
      </div>
      <div className={s.chatting}>
        <input className={s.inputChat} type="text" />
        <button>Send</button>
      </div>
    </div>
  );
};

export default BoxChat;
