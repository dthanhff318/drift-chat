import { DeleteOutlined } from '@ant-design/icons';
import { notification } from 'antd';
import groupApi from 'app/axios/api/group';
import { getNameUser } from 'app/helpers/funcs';
import authStore from 'app/storeZustand/authStore';
import { queryKey } from 'const/reactQueryKey';
import { KeyRound, Pencil, Save } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { useQueryClient } from 'react-query';
import { TGroupDetail } from 'types/common';
import s from './style.module.scss';
type Props = {
  detailGroup: TGroupDetail;
};

const ListMember = ({ detailGroup }: Props) => {
  const { members, id, setting, admins } = detailGroup;
  const queryClient = useQueryClient();
  const [edit, setEdit] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const { currentUser } = authStore();

  const handleEditNickname = async (idUser: string) => {
    try {
      const newNickname = inputRef.current?.value ?? '';
      await groupApi.updateSettingGroup({
        id: id ?? '',
        nickname: newNickname,
        userId: idUser,
      });
      queryClient.refetchQueries(`${queryKey.GET_DETAIL_GROUP}_${id}`);
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
      queryClient.refetchQueries(`${queryKey.GET_DETAIL_GROUP}_${id}`);
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
