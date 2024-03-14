import { Modal } from 'antd';
import React, { ReactNode } from 'react';
import Button from '../Button/Button';
import s from './style.module.scss';
type Props = {
  children?: ReactNode;
  title: string;
  open: boolean;
  hideFooter?: boolean;
  desc?: string;
  loading?: boolean;
  onConfirm?: () => void;
  onOk?: () => void;
  onCancel: () => void;
};

const ModalCommon = (data: Props) => {
  const { children, title, hideFooter, loading, onConfirm, onCancel, onOk, open } = data;
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      centered={true}
      onOk={onOk}
      modalRender={() => renderModal(data)}
    ></Modal>
  );
};

const renderModal = ({
  children,
  title,
  hideFooter,
  desc,
  loading,
  onConfirm,
  onCancel,
}: Props) => (
  <div className={s.wrapper}>
    <div className={s.header}>
      <h3 className={s.title}>{title}</h3>
    </div>
    <div className={s.body}>
      <div className={s.desc}>{desc}</div>
      {children}
    </div>
    <div className={s.footer}>
      <Button loading={false} text="Cancel" onClick={onCancel} />
      <Button fill={true} loading={loading} text="OK" onClick={onConfirm} />
    </div>
  </div>
);
export default ModalCommon;
