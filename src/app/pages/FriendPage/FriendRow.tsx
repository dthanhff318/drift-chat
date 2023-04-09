import friendsApi from "app/axios/api/friends";
import Avatar from "app/components/Avatar/Avatar";
import React from "react";
import { TUSer } from "types/common";
import s from "./style.module.scss";
type Props = {
  data: TUSer;
};

const FriendRow = ({ data }: Props) => {
  const handleAccept = async (uid: string) => {
    await friendsApi.acceptFrRequest({ acceptUid: uid });
  };
  return (
    <div className={s.frRow}>
      <div className={s.info}>
        <Avatar src={data.photoUrl} />
        <span className={s.name}>{data.displayName}</span>
      </div>
      <span className={s.timeActive}>14 years ago</span>
      <button
        className={s.actionBtn}
        onClick={() => handleAccept(data.uid ?? "")}
      >
        Ok
      </button>
    </div>
  );
};

export default FriendRow;
