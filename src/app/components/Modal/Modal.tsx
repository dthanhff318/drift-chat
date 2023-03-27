import { UserOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps, Modal } from "antd";
import React, { ReactNode, useState } from "react";
import s from "./style.module.scss";
type Props = {
  children: ReactNode;
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
};

const ModalCommon = ({ children, onCancel, onOk, open }: Props) => {
  return (
    <Modal open={open} onCancel={onCancel} onOk={onOk}>
      {children}
    </Modal>
  );
};

export default ModalCommon;
