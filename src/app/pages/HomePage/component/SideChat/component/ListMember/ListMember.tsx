import React, { useRef, useState } from "react";
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
  const inputRef = useRef<HTMLInputElement>(null);

  const handleEditNickname = async () => {
    const newNickname = inputRef.current?.value;
    console.log(newNickname);
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
                />
              ) : (
                <span className={s.nickname}>tiz dep try</span>
              )}
              {edit === e.id ? (
                <div
                  className={s.icChangeNickname}
                  onClick={() => {
                    handleEditNickname();
                    setEdit("");
                  }}
                >
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
