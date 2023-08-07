import React from "react";
import s from "../style.module.scss";
import { useService } from "./service";
import MessageChatItem from "../MessageChatItem/MessageChatItem";
type Props = {};

const MessageChatList = (props: Props) => {
  const { groups } = useService();
  return (
    <div className={s.msgList}>
      {groups.map((gr) => (
        <MessageChatItem group={gr} />
      ))}
    </div>
  );
};

export default MessageChatList;
