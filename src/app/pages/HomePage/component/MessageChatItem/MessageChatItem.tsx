import React, { useEffect, useState } from "react";
import c from "clsx";
import s from "../style.module.scss";
import Avatar from "app/components/Avatar/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/configStore";
import { TGroup } from "types/common";
import { setGroup } from "store/groupSlice";
import authStore from "app/storeZustand/authStore";
import { saveGroupToLs } from "app/helpers/localStorage";
import groupStore from "app/storeZustand/groupStore";

type Props = {
  group: TGroup;
};

const MessageChatItem = ({ group }: Props) => {
  const { currentUser } = authStore();
  const { currentGroup, saveCurrentGroup } = groupStore();

  let friendData: any;

  if (!group.isGroup) {
    friendData = group.members?.find((u) => u.uid !== currentUser.uid);
  }

  const handleSaveCurrentGroup = () => {
    saveCurrentGroup(group.id ?? "");
  };

  return (
    <div
      className={c(s.msgItem, group.id === currentGroup ? s.grActive : null)}
      onClick={handleSaveCurrentGroup}
    >
      <Avatar src={friendData.photoUrl ?? ""} />
      <div className={s.msgInfo}>
        <div className={s.firstLine}>
          <p className={s.name}>{friendData.displayName ?? group.name}</p>
          <p className={s.time}>10:20</p>
        </div>
        <div className={s.secondLine}>
          <p className={s.lastMsg}>seconcondLicondLine</p>
          <span className={s.msgUnread}>5</span>
        </div>
      </div>
    </div>
  );
};

export default MessageChatItem;
