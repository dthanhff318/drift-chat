import { Modal } from 'antd';
import React, { ReactNode, useState } from 'react';
import s from './style.module.scss';
import { IndexedObject } from 'types/common';
import Button from '../Button/Button';
type Props = {
  title: string;
  open: boolean;
  desc: string;
  loading: boolean;
  initValue: string;
  onOk: (data: IndexedObject) => void;
  onCancel: () => void;
};

const ModalInput = ({ title, desc, initValue, loading, onOk, onCancel, open }: Props) => {
  const [text, setText] = useState<string>(initValue);

  return (
    <Modal centered open={open} onCancel={onCancel} footer={null}>
      <div className={s.wrapper}>
        <h3 className={s.title}>{title}</h3>
        <span className={s.desc}>{desc}</span>
        <input
          className={s.inputChange}
          type="text"
          value={text ? text : initValue}
          onChange={(e) => setText(e.target.value)}
        />
        <div className={s.btnFooter}>
          <Button
            loading={loading}
            text="OK"
            onClick={async () => {
              await onOk({ name: text });
              onCancel();
            }}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ModalInput;
