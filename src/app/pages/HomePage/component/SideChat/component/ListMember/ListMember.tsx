import React, { useRef, useState } from 'react';
import s from './style.module.scss';
import { TGroup, TGroupDetail } from 'types/common';
import {
  CheckCircleOutlined,
  DeleteOutlined,
  TagOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import groupApi from 'app/axios/api/group';
import authStore from 'app/storeZustand/authStore';
import { getNameUser } from 'app/helpers/funcs';
import groupStore from 'app/storeZustand/groupStore';
import { notification } from 'antd';
import { KeyRound, Pencil, Save } from 'lucide-react';
type Props = {
  detailGroup: TGroupDetail;
};

const ListMember = ({ detailGroup }: Props) => {
  const { members, id, setting, admins } = detailGroup;
  const [edit, setEdit] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const { getDetailGroup } = groupStore();
  const { currentUser } = authStore();

  const handleEditNickname = async (idUser: string) => {
    try {
      const newNickname = inputRef.current?.value ?? '';
      await groupApi.updateSettingGroup({
        id: id ?? '',
        nickname: newNickname,
        userId: idUser,
      });
      getDetailGroup(id ?? '');
    } catch (err) {
      notification.error({
        message: `Error`,
        description: 'Try again',
        duration: 4,
      });
    }
  };

  const handleRemoveMemberGroup = async (member: string) => {
    try {
      const res = await groupApi.removeMember({
        idGroup: id ?? '',
        member,
      });
      getDetailGroup(id ?? '');
    } catch (err) {
      notification.error({
        message: `Error`,
        description: 'Try again',
        duration: 4,
      });
    }
  };

  return (
    <div className={s.wrapper}>
      {members?.map((e) => {
        const isAdminGroup = admins?.map((e) => e.id).includes(e.id ?? '');
        const isCurrentUserIsAdmin = admins?.map((e) => e.id).includes(currentUser.id);
        return (
          <div className={s.member} key={e.id}>
            <div className={s.nameWrap}>
              <div className={s.nicknameWrap}>
                {edit === e.id ? (
                  <input
                    type="text"
                    ref={inputRef}
                    className={s.inputEditNickname}
                    maxLength={20}
                  />
                ) : (
                  <span className={s.nickname}>{getNameUser(e, setting ?? [])}</span>
                )}
                {edit === e.id ? (
                  <div
                    className={s.icChangeNickname}
                    onClick={() => {
                      handleEditNickname(e.id ?? '');
                      setEdit('');
                    }}
                  >
                    <Save size={18} />
                  </div>
                ) : (
                  <div
                    className={s.icChangeNickname}
                    onClick={() => {
                      setEdit(e.id ?? '');
                    }}
                  >
                    <Pencil size={18} />
                  </div>
                )}
                {isAdminGroup && (
                  <span>
                    <KeyRound size={18} color="#504e0c" />
                  </span>
                )}
              </div>
              <span className={s.name}>{e.displayName}</span>
            </div>
            {isCurrentUserIsAdmin && e.id !== currentUser.id && (
              <div className={s.icDelMember} onClick={() => handleRemoveMemberGroup(e.id ?? '')}>
                <DeleteOutlined rev={undefined} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ListMember;
