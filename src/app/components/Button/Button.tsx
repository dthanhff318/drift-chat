import { LoadingOutlined } from '@ant-design/icons';
import React from 'react';
import s from './style.module.scss';
type Props = {
  icon?: React.ReactNode;
  text: string;
  fill?: boolean;
  loading?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit';
};

const Button = ({ text, icon, fill, disabled, loading, type, onClick }: Props) => {
  return (
    <button
      className={`${s.buttonWrapper} ${fill ? s.fill : ''} ${disabled && s.disabled}`}
      onClick={() => {
        if (disabled || !onClick || loading) return;
        onClick();
      }}
      type={type}
    >
      {loading ? (
        <LoadingOutlined />
      ) : (
        <>
          {icon && icon}
          <span className={`${s.buttonText} ${fill ? s.fill : ''}`}>{text}</span>
        </>
      )}
    </button>
  );
};

export default Button;
