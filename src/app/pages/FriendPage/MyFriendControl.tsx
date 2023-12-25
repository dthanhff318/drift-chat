import React, { useState } from "react";
import s from "./style.module.scss";
import FriendRow from "./FriendRow";
import { TUser } from "types/common";
import friendStore from "app/storeZustand/friendStore";
type Props = {};
type TControl = "friend" | "approve" | "blocked";
const MyFriendControl = (props: Props) => {
  const [control, setControl] = useState<TControl>("friend");
  const { dataCommunicate } = friendStore();
  return (
    <div className={s.friendControlWrap}>
      <div className={s.controlHeader}>
        <div
          className={(s.item, control === "friend" ? s.active : "")}
          onClick={() => setControl("friend")}
        >
          My Friend
        </div>
        <div
          className={(s.item, control === "approve" ? s.active : "")}
          onClick={() => setControl("approve")}
        >
          Approve
        </div>
        <div
          className={(s.item, control === "blocked" ? s.active : "")}
          onClick={() => setControl("blocked")}
        >
          Blocked
        </div>
      </div>
      <div className={s.controlContent}>
        {control === "friend" &&
          dataCommunicate.listFriend?.map((t: TUser) => <FriendRow data={t} />)}
        {control === "approve" &&
          dataCommunicate.listAccept?.map((t: TUser) => <FriendRow data={t} />)}
      </div>
    </div>
  );
};

export default MyFriendControl;
