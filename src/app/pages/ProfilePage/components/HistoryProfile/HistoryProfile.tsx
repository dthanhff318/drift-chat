import React from 'react';
import { TUser } from 'types/common';
import s from '../../style.module.scss';
import { useServiceHistoryProfile } from './serviceHistoryProfile';

type Props = {
  user: TUser;
};

const HistoryProfile = ({ user }: Props) => {
  const { currenTUser } = useServiceHistoryProfile();

  return (
    <>
      <div className={s.historyWrap}></div>
    </>
  );
};

export default HistoryProfile;
