import React, { useRef, useState } from "react";
import s from "./style.module.scss";
import { TGroup } from "types/common";
import {
  CheckCircleOutlined,
  DeleteOutlined,
  TagOutlined,
} from "@ant-design/icons";
import groupApi from "app/axios/api/group";
import authStore from "app/storeZustand/authStore";
import { getNameUser } from "app/helpers/funcs";
import groupStore from "app/storeZustand/groupStore";
type Props = {
  detailGroup: TGroup;
};

const ListMember = ({ detailGroup }: Props) => {
  const { members, id, setting, admins } = detailGroup;
  const [edit, setEdit] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const { getDetailGroup } = groupStore();
  const handleEditNickname = async (idUser: string) => {
    try {
      const newNickname = inputRef.current?.value ?? "";
      await groupApi.updateSettingGroup({
        id: id ?? "",
        nickname: newNickname,
        userId: idUser,
      });
      getDetailGroup(id ?? "");
    } catch (err) {}
  };

  return (
    <div className={s.wrapper}>
      {members?.map((e) => (
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
                <span className={s.nickname}>
                  {getNameUser(e, setting ?? [])}
                </span>
              )}
              {edit === e.id ? (
                <div
                  className={s.icChangeNickname}
                  onClick={() => {
                    handleEditNickname(e.id ?? "");
                    setEdit("");
                  }}
                >
                  <CheckCircleOutlined />
                </div>
              ) : (
                <div
                  className={s.icChangeNickname}
                  onClick={() => {
                    setEdit(e.id ?? "");
                  }}
                >
                  <TagOutlined />
                </div>
              )}
              {admins?.map((e) => e.id).includes(e.id ?? "") && (
                <span>( Admin )</span>
              )}
            </div>
            <span className={s.name}>{e.displayName}</span>
          </div>
          <div className={s.icDelMember}>
            <DeleteOutlined />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListMember;
