import React, { useState } from "react";
import s from "./style.module.scss";
import { TGroup } from "types/common";
import {
  CheckCircleOutlined,
  DeleteOutlined,
  TagOutlined,
} from "@ant-design/icons";
type Props = {
  detailGroup: TGroup;
};

const ListMember = ({ detailGroup }: Props) => {
  const { members } = detailGroup;
  const [edit, setEdit] = useState<string>("");
  return (
    <div className={s.wrapper}>
      {members?.map((e) => (
        <div className={s.member}>
          <div className={s.nameWrap}>
            <div className={s.nicknameWrap}>
              {edit === e.id ? (
                <input type="text" className={s.inputEditNickname} />
              ) : (
                <span className={s.nickname}>tiz dep try</span>
              )}
              {edit === e.id ? (
                <div className={s.icChangeNickname} onClick={() => setEdit("")}>
                  <CheckCircleOutlined />
                </div>
              ) : (
                <div
                  className={s.icChangeNickname}
                  onClick={() => setEdit(e.id ?? "")}
                >
                  <TagOutlined />
                </div>
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
