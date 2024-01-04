import { Modal } from "antd";
import React, { ReactNode, useState } from "react";
import s from "./style.module.scss";
type Props = {
  title: string;
  open: boolean;
  desc: string;
  initValue: string;
  onOk: () => void;
  onCancel: () => void;
};

const ModalInput = ({
  title,
  desc,
  initValue,
  onCancel,
  onOk,
  open,
}: Props) => {
  const [text, setText] = useState<string>(initValue);
  return (
    <Modal centered open={open} onCancel={onCancel} onOk={onOk} footer={null}>
      <div className={s.wrapper}>
        <h3 className={s.title}>{title}</h3>
        <span className={s.desc}>{desc}</span>
        <input
          className={s.inputChange}
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
    </Modal>
  );
};

export default ModalInput;
