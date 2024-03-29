import { notification } from 'antd';
import groupApi from 'app/axios/api/group';
import Button from 'app/components/Button/Button';
import authStore from 'app/storeZustand/authStore';
import friendStore from 'app/storeZustand/friendStore';
import settingStore from 'app/storeZustand/settingStore';
import React, { useState } from 'react';
import { TGroup, TGroupDetail, TTheme } from 'types/common';
import s from './style.module.scss';
import groupStore from 'app/storeZustand/groupStore';
type Props = {
  detailGroup: TGroupDetail;
};

const ChangeTheme = ({ detailGroup }: Props) => {
  const { id } = detailGroup;
  const [loading, setLoading] = useState<boolean>(false);
  const [theme, setTheme] = useState<TTheme>(detailGroup.theme ? detailGroup.theme : {});

  const {
    settings: { themes },
  } = settingStore();

  const { getDetailGroup } = groupStore();

  const handleChangeTheme = async (theme: TTheme) => {
    try {
      if (!id) return;
      setLoading(true);
      await groupApi.updateGroup(id, { theme: theme.name });
      getDetailGroup(id);
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
