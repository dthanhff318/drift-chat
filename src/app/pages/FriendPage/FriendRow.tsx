import Avatar from 'app/components/Avatar/Avatar';
import React from 'react';
import { TUser } from 'types/common';
import s from './style.module.scss';
type Props = {
  data: TUser;
  textButton: string;
  onClick: () => void;
};

const FriendRow = ({ data, textButton, onClick }: Props) => {
  return (
    <div className={s.frRow}>
      <div className={s.info}>
        <Avatar src={data.photoUrl} />
        <span className={s.name}>{data.displayName}</span>
      </div>
      <span className={s.timeActive}>14 years ago</span>
      <button className={s.actionBtn} onClick={onClick}>
        {textButton}
      </button>
    </div>
  );
};

export default FriendRow;
