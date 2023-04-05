import Icon, { SendOutlined } from "@ant-design/icons";
import Avatar from "app/components/Avatar/Avatar";
import React from "react";
import s from "./style.module.scss";
import c from "clsx";
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
            <div className={c(s.message, i % 2 === 0 ? s.left : s.right)}>
              <div className={s.contentWrap}>
                <span className={c(s.contentMsg)}>
                  helooel ooelooel ooeloo ooeloo elooeloo oelooelooelo
                  oelooelooeloo looelo oelooelooe looelooeloo elooelo looe
                  looelolooelolooelolooelolooelolooelolooelolooelo
                </span>
                <div className={s.options}></div>
              </div>
              <p className={s.timeSend}>12:10 PM</p>
            </div>
          ))}
      </div>
      <div className={s.chatting}>
        <textarea className={s.inputChat} />
        <button className={s.sendMsg}>
          <SendOutlined className={s.iconSend} />
        </button>
      </div>
    </div>
  );
};

export default BoxChat;
