import React from "react";
import s from "../style.module.scss";
import Avatar from "app/components/Avatar/Avatar";
import { TGroup, TUser } from "types/common";
import authStore from "app/storeZustand/authStore";
import groupStore from "app/storeZustand/groupStore";
import messageStore from "app/storeZustand/messageStore";
import socketStore from "app/storeZustand/socketStore";
import { convertTimeFromNow } from "app/helpers/time";
import groupApi from "app/axios/api/group";
import { useHistory } from "react-router-dom";
import { pathHomePage, pathHomePageChat } from "app/routes/routesConfig";
import { replacePathParams } from "app/helpers/funcs";

type Props = {
  group: TGroup;
};

const MessageChatItem = ({ group }: Props) => {
  const history = useHistory();
  const { currenTUser } = authStore();
  const { clearStateMessages } = messageStore();
  const { socket } = socketStore();
  const { currentGroup, groups, getDetailGroup, saveCurrentGroup, saveGroups } =
    groupStore();

  let friendData: TUser = {};

  if (!group.isGroup) {
    friendData = group.members?.find((u) => u.uid !== currenTUser.uid) ?? {};
  }

  const handleSaveCurrentGroup = async () => {
    try {
      saveCurrentGroup(group.id ?? "");
      const res = await groupApi.updateUnReadMess(group.id ?? "", 0);
      const updateListGroup = groups.map((e) =>
        e.id === (res.data as TGroup).id ? { ...e, unread: 0 } : e
      );
      saveGroups(updateListGroup);
      socket?.emit("joinRoom", currentGroup);
    } catch (err) {}
  };

  const newestMessNotMine = group.newestMess?.senderId !== currenTUser.id;

  const isUnread = group.unread !== 0 && newestMessNotMine;

  return (
    <div
      className={`${s.msgItem} ${
        group.id === currentGroup ? s.grActive : null
      }`}
      onClick={async () => {
        if (!group.id || group.id === currentGroup) return;
        history.push(
          replacePathParams(pathHomePageChat, { id: group.id ?? "" })
        );
        clearStateMessages();
        await handleSaveCurrentGroup();
      }}
    >
      <Avatar online={friendData.isOnline} src={friendData.photoUrl ?? ""} />
      <div className={s.msgInfo}>
        <div className={s.firstLine}>
          <p className={s.name}>{friendData.displayName ?? group.name}</p>
          <p className={s.time}>
            {convertTimeFromNow(group.newestMess?.createdAt ?? "")}
          </p>
        </div>
        <div className={s.secondLine}>
          <span className={`${s.lastMsg} ${isUnread ? s.unread : ""}`}>
            {!!group.newestMess?.id
              ? `${newestMessNotMine ? "" : "You: "} ${
                  !!group.newestMess?.content
                    ? group.newestMess?.content
                    : "Send an image"
                }`
              : group.isGroup
              ? "Let say hi with everyone"
              : `Let say hi with ${friendData.displayName}`}
          </span>
          {isUnread && <span className={s.msgUnread}>{group.unread}</span>}
        </div>
      </div>
    </div>
  );
};

export default MessageChatItem;
