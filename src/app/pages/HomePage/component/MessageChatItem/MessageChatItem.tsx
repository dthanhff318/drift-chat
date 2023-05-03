import React from "react";
import s from "../style.module.scss";
import Avatar from "app/components/Avatar/Avatar";
import { useSelector } from "react-redux";
import { RootState } from "store/configStore";
import { getUserFromLs } from "app/helpers/localStorage";

type Props = {
  group: any;
};

const MessageChatItem = ({ group }: Props) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const infoUser = user ?? getUserFromLs();
  let friend: any;
  console.log(infoUser);
  if (!group.name) {
    friend = group.members.find((u) => u.uid !== infoUser.uid);
  }
  return (
    <div className={s.msgItem}>
      <Avatar src={friend.photoUrl ?? ""} />
      <div className={s.msgInfo}>
        <div className={s.firstLine}>
          <p className={s.name}>{friend.displayName ?? "Dinh DUy Hnha"}</p>
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
