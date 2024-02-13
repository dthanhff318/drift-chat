import React from 'react';
import { TUser } from 'types/common';
import s from '../../style.module.scss';
import { useServiceHistoryProfile } from './serviceHistoryProfile';
import Loading from 'app/components/Loading/Loading';
import Avatar from 'app/components/Avatar/Avatar';

type Props = {
  user: TUser;
};

const HistoryProfile = ({ user }: Props) => {
  const { data, isLoading } = useServiceHistoryProfile();

  return (
    <>
      <div className={s.historyWrap}>
        <Loading loading={isLoading} />
        <div className={s.item}>
          <Avatar size="s" />
          <span className={s.name}>Duy Thanh</span>
          <span className={s.action}> liked your profile</span>
          <span className={s.time}>14-23-2023</span>
        </div>
      </div>
    </>
  );
};

export default HistoryProfile;
