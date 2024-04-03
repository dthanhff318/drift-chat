import { notification } from 'antd';
import groupApi from 'app/axios/api/group';
import Button from 'app/components/Button/Button';
import settingStore from 'app/storeZustand/settingStore';
import { queryKey } from 'const/reactQueryKey';
import React, { useState } from 'react';
import { useQueryClient } from 'react-query';
import { TGroupDetail, TTheme } from 'types/common';
import s from './style.module.scss';
type Props = {
  detailGroup: TGroupDetail;
};

const ChangeTheme = ({ detailGroup }: Props) => {
  const { id } = detailGroup;
  const queryClient = useQueryClient();

  const [loading, setLoading] = useState<boolean>(false);
  const [theme, setTheme] = useState<TTheme>(detailGroup.theme ? detailGroup.theme : {});

  const {
    settings: { themes },
  } = settingStore();

  const handleChangeTheme = async (theme: TTheme) => {
    try {
      if (!id) return;
      setLoading(true);
      await groupApi.updateGroup(id, { theme: theme.name });
      queryClient.refetchQueries(`${queryKey.GET_DETAIL_GROUP}_${id}`);
      setLoading(false);
    } catch (err) {
      notification.error({
        message: `Error`,
        description: 'Try again',
        duration: 2,
      });
      setLoading(false);
    }
  };

  return (
    <div className={s.wrapper}>
      <div className={s.themeList}>
        {themes?.map((e) => (
          <div
            className={`${s.themeItem} ${theme.name === e.name ? s.themeSelected : ''}`}
            key={e.name}
            style={{ background: e.value }}
            onClick={() => setTheme(e)}
          />
        ))}
      </div>
      <div className={s.btnBottom}>
        <Button text="Change" onClick={() => handleChangeTheme(theme)} loading={loading} />
      </div>
    </div>
  );
};

export default ChangeTheme;
