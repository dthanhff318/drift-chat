import React from "react";
import s from "../style.module.scss";
import { useService } from "./service";
import MessageChatItem from "../MessageChatItem/MessageChatItem";
type Props = {};

const MessageChatList = (props: Props) => {
  const { groups, saveCurrentGroup } = useService();
  console.log(groups);

  return (
    <div className={s.msgList}>
      {groups.map((group) => (
        <div key={group.id}>
          <MessageChatItem group={group} />
        </div>
      ))}
    </div>
  );
};

export default MessageChatList;
