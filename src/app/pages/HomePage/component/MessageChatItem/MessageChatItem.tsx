import React from "react";
import c from "clsx";
import s from "../style.module.scss";
import Avatar from "app/components/Avatar/Avatar";
import { TGroup } from "types/common";
import authStore from "app/storeZustand/authStore";
import groupStore from "app/storeZustand/groupStore";
import messageStore from "app/storeZustand/messageStore";
import socketStore from "app/storeZustand/socketStore";
import { convertTimeFromNow } from "app/helpers/time";

type Props = {
  group: TGroup;
};

const MessageChatItem = ({ group }: Props) => {
  const { currentUser } = authStore();
  const { clearStateMessages } = messageStore();
  const { socket } = socketStore();
  const { currentGroup, saveCurrentGroup } = groupStore();

  let friendData: any;

  if (!group.isGroup) {
    friendData = group.members?.find((u) => u.uid !== currentUser.uid);
  }

  const handleSaveCurrentGroup = () => {
    saveCurrentGroup(group.id ?? "");
    socket?.emit("joinRoom", currentGroup);
  };

  return (
    <div
      className={c(s.msgItem, group.id === currentGroup ? s.grActive : null)}
      onClick={() => {
        handleSaveCurrentGroup();
        clearStateMessages();
      }}
    >
      <Avatar src={friendData.photoUrl ?? ""} />
      <div className={s.msgInfo}>
        <div className={s.firstLine}>
          <p className={s.name}>{friendData.displayName ?? group.name}</p>
          <p className={s.time}>
            {convertTimeFromNow(group.newestMess?.createdAt ?? "")}
          </p>
        </div>
        <div className={s.secondLine}>
          <span className={s.lastMsg}>{group.newestMess?.content}</span>
          <span className={s.msgUnread}>0</span>
        </div>
      </div>
    </div>
  );
};

export default MessageChatItem;
