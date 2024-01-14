import { UserOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps, Modal } from "antd";
import React, { ReactNode, useState } from "react";
import s from "./style.module.scss";
import Button from "../Button/Button";
type Props = {
  children: ReactNode;
  title: string;
  open: boolean;
  hideFooter?: boolean;
  onOk: () => void;
  onCancel: () => void;
};

const ModalCommon = ({
  children,
  title,
  hideFooter,
  onCancel,
  onOk,
  open,
}: Props) => {
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      onOk={onOk}
      footer={null}
      zIndex={10000}
    >
      <div className={s.wrapper}>
        <h3 className={s.title}>{title}</h3>
        <div className={s.content}>{children}</div>
        {!hideFooter && (
          <div className={s.footer}>
            <Button loading={false} text="Cancel" onClick={async () => {}} />
            <Button loading={false} text="OK" onClick={async () => {}} />
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ModalCommon;
