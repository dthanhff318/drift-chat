import Avatar from "app/components/Avatar/Avatar";
import React from "react";
import s from "./style.module.scss";
type Props = {};

const MessageChatList = (props: Props) => {
  const MessageChatItem = () => (
    <div className={s.msgItem}>
      <Avatar />
      <div className={s.msgInfo}>
        <div className={s.firstLine}>
          <p className={s.name}>Dinh DUy Hnha</p>
          <p className={s.time}>10:20</p>
        </div>
        <div className={s.secondLine}>
          <p className={s.lastMsg}>seconcondLicondLine</p>
          <span className={s.msgUnread}>5</span>
        </div>
      </div>
    </div>
  );
  return (
    <div className={s.msgList}>
      {Array(8)
        .fill(1)
        .map(() => (
          <MessageChatItem />
        ))}
    </div>
  );
};

export default MessageChatList;
