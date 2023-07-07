import React from "react";
import s from "../style.module.scss";
import Avatar from "app/components/Avatar/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/configStore";
import { getUserFromLs, saveGrToLs } from "app/helpers/localStorage";
import { TGroup } from "types/common";
import { setGroup } from "store/groupSlice";

type Props = {
  group: TGroup;
};

const MessageChatItem = ({ group }: Props) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const infoUser = user ?? getUserFromLs();
  const dispatch = useDispatch();
  let friend: any;
  console.log(infoUser);
  if (!group.typeGroup) {
    friend = group.members.find((u) => u.uid !== infoUser.uid);
  }

  const handleSetGroup = () => {
    saveGrToLs(group._id);
    dispatch(setGroup(group));
  };

  return (
    <div className={s.msgItem} onClick={handleSetGroup}>
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
