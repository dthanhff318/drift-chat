import { PlusCircleFilled } from '@ant-design/icons';
import Avatar from 'app/components/Avatar/Avatar';
import authStore from 'app/storeZustand/authStore';
import friendStore from 'app/storeZustand/friendStore';
import React, { useRef, useState } from 'react';
import { ColorPicker } from 'antd';
import { TGroup, TUser } from 'types/common';
import s from './style.module.scss';
type Props = {
  detailGroup: TGroup;
};

const ChangeTheme = ({ detailGroup }: Props) => {
  const { members, id, setting, admins } = detailGroup;
  const [users, setUsers] = useState<TUser[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const {
    dataCommunicate: { listFriend },
  } = friendStore();

  const { currenTUser } = authStore();

  const listMemberId = members?.map((e) => e.id);
  const listUserToAdd = listFriend?.filter((e) => !listMemberId?.includes(e.id));

  return (
    <div className={s.wrapper}>
      <ColorPicker defaultValue="#1677ff" />;<div className={s.btnBottom}></div>
    </div>
  );
};

export default ChangeTheme;
