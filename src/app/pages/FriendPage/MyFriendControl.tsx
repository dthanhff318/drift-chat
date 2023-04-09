import React, { useState } from "react";
import s from "./style.module.scss";
import c from "clsx";
import FriendRow from "./FriendRow";
import { useSelector } from "react-redux";
import { RootState } from "store/configStore";
import { TUSer } from "types/common";
type Props = {};
type TControl = "friend" | "approve" | "blocked";
const MyFriendControl = (props: Props) => {
  const [control, setControl] = useState<TControl>("friend");
  const { listAccept, listFriend } = useSelector(
    (state: RootState) => state.services
  );
  return (
    <div className={s.friendControlWrap}>
      <div className={s.controlHeader}>
        <div
          className={c(s.item, control === "friend" ? s.active : "")}
          onClick={() => setControl("friend")}
        >
          My Friend
        </div>
        <div
          className={c(s.item, control === "approve" ? s.active : "")}
          onClick={() => setControl("approve")}
        >
          Approve
        </div>
        <div
          className={c(s.item, control === "blocked" ? s.active : "")}
          onClick={() => setControl("blocked")}
        >
          Blocked
        </div>
      </div>
      <div className={s.controlContent}>
        {control === "friend" &&
          listFriend.map((t: TUSer) => <FriendRow data={t} />)}
        {control === "approve" &&
          listAccept.map((t: TUSer) => <FriendRow data={t} />)}
      </div>
    </div>
  );
};

export default MyFriendControl;
