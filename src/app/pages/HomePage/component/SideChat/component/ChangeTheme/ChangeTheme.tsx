import { notification } from 'antd';
import groupApi from 'app/axios/api/group';
import Button from 'app/components/Button/Button';
import authStore from 'app/storeZustand/authStore';
import friendStore from 'app/storeZustand/friendStore';
import settingStore from 'app/storeZustand/settingStore';
import React, { useState } from 'react';
import { TGroup, TTheme } from 'types/common';
import s from './style.module.scss';
type Props = {
  detailGroup: TGroup;
};

const ChangeTheme = ({ detailGroup }: Props) => {
  const { id } = detailGroup;
  const [theme, setTheme] = useState<TTheme>(
    detailGroup.theme ? { value: detailGroup.theme } : { value: '#000000' },
  );

  const {
    settings: { themes },
  } = settingStore();
  console.log(themes);

  const handleChangeTheme = async (theme: TTheme) => {
    try {
      if (!id) return;
      const res = await groupApi.updateGroup(id, { theme: theme.name });
    } catch (err) {
      notification.error({
        message: `Error`,
        description: 'Try again',
        duration: 4,
      });
    }
  };

  console.log(themes);

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
        <Button text="Change" onClick={() => handleChangeTheme(theme)} />
      </div>
    </div>
  );
};

export default ChangeTheme;
