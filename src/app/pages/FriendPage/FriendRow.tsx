import Avatar from "app/components/Avatar/Avatar";
import React from "react";
import s from "./style.module.scss";
type Props = {
    data : string
};

const FriendRow = (props: Props) => {
  return (
    <div className={s.frRow}>
      <div className={s.info}>
        <Avatar />
        <span className={s.name}>Duy Thanh zzz</span>
      </div>
      <span className={s.timeActive}>14 years ago</span>
      <button className={s.actionBtn}>Unblock</button>
    </div>
  );
};

export default FriendRow;
