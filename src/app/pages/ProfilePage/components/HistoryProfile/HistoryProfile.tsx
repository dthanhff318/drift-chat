import React from 'react';
import { TUser } from 'types/common';
import s from '../../style.module.scss';
import { useServiceHistoryProfile } from './serviceHistoryProfile';
import Loading from 'app/components/Loading/Loading';
import Avatar from 'app/components/Avatar/Avatar';
import moment from 'moment';
import { DEFAULT_FORMAT_TIME_DATE_MONTH_YEAR } from 'app/helpers/common';
import { THistoryAction } from 'types/setting.type';

type Props = {
  user: TUser;
};

const getHistoryActionContent = (type: string, historyActions: THistoryAction) => {
  switch (type) {
    case historyActions.LIKE: {
      return 'expressed interest in your home';
    }
    case historyActions.UNLIKE: {
      return 'has unfavorited your home';
    }
    case historyActions.VISIT: {
      return 'visited your home';
    }
    default:
      return '';
  }
};

const HistoryProfile = ({ user }: Props) => {
  const { data, isLoading, settings, goToFriendProfile } = useServiceHistoryProfile();
  return (
    <>
      {!!data?.data.length && (
        <div className={s.historyWrap}>
          <Loading loading={isLoading} />
          {data?.data.reverse().map((e) => {
            const contentAction = getHistoryActionContent(
              e.actionHistoryType,
              settings.commonData?.historyActions ?? {},
            );
            return (
              <div className={s.item} key={e.id}>
                <Avatar size="s" src={e.userTarget.photoUrl} />
                <span
                  className={s.name}
                  onClick={() => {
                    e.userTarget.id && goToFriendProfile(e.userTarget.id);
                  }}
                >
                  {e.userTarget.displayName}
                </span>
                <span className={s.action}>{contentAction}</span>
                <span className={s.time}>
                  {moment(e.createdAt).format(DEFAULT_FORMAT_TIME_DATE_MONTH_YEAR)}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default HistoryProfile;
