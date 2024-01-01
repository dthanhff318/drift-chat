import { UserOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps, Modal } from "antd";
import React, { ReactNode, useState } from "react";
import s from "./style.module.scss";
type Props = {
  children: ReactNode;
  title: string;
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
  footer?: ReactNode;
};

const ModalCommon = ({
  footer,
  children,
  title,
  onCancel,
  onOk,
  open,
}: Props) => {
  return (
    <Modal open={open} onCancel={onCancel} onOk={onOk} footer={footer}>
      <div className={s.wrapper}>
        <h3 className={s.title}>{title}</h3>
        {children}
      </div>
    </Modal>
  );
};

export default ModalCommon;
