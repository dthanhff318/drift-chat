import Avatar from 'app/components/Avatar/Avatar';
import React from 'react';
import { TUser } from 'types/common';
import s from './style.module.scss';
import { convertDiffTime } from 'app/helpers/funcs';
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
      <span className={s.timeActive}>
        {data.isOnline ? 'Online' : convertDiffTime((data.lastActive ?? '').toString())}
      </span>
      <button className={s.actionBtn} onClick={onClick}>
        {textButton}
      </button>
    </div>
  );
};

export default FriendRow;
