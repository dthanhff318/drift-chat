import { Modal } from 'antd';
import React, { ReactNode } from 'react';
import Button from '../Button/Button';
import s from './style.module.scss';
type Props = {
  children: ReactNode;
  title: string;
  open: boolean;
  hideFooter?: boolean;
  onOk?: () => void;
  onCancel: () => void;
};

const ModalCommon = ({ children, title, hideFooter, onCancel, onOk, open }: Props) => {
  return (
    <Modal open={open} onCancel={onCancel} onOk={onOk} footer={null} zIndex={10000}>
      <div className={s.wrapper}>
        <h3 className={s.title}>{title}</h3>
        <div className={s.content}>{children}</div>
        {!hideFooter && (
          <div className={s.footer}>
            <Button loading={false} text="Cancel" />
            <Button loading={false} text="OK" />
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ModalCommon;
