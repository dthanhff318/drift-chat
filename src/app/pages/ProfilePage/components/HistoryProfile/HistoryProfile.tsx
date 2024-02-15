import React from 'react';
import { TUser } from 'types/common';
import s from '../../style.module.scss';
import { useServiceHistoryProfile } from './serviceHistoryProfile';
import Loading from 'app/components/Loading/Loading';
import Avatar from 'app/components/Avatar/Avatar';
import moment from 'moment';
import { DEFAULT_FORMAT_TIME_DATE_MONTH_YEAR } from 'app/helpers/common';

type Props = {
  user: TUser;
};

const HistoryProfile = ({ user }: Props) => {
  const { data, isLoading } = useServiceHistoryProfile();

  
  return (
    <>
      <div className={s.historyWrap}>
        <Loading loading={isLoading} />
        {data?.data.map((e) => (
          <div className={s.item} key={e.id}>
            <Avatar size="s" />
            <span className={s.name}>{e.userTarget.displayName}</span>
            <span className={s.action}> liked your profile</span>
            <span className={s.time}>
              {moment(e.createdAt).format(DEFAULT_FORMAT_TIME_DATE_MONTH_YEAR)}
            </span>
          </div>
        ))}
      </div>
    </>
  );
};

export default HistoryProfile;
