import { getPublicImageUrl } from "app/helpers/funcs";
import React from "react";
import s from "./style.module.scss";
import { LoadingOutlined } from "@ant-design/icons";
type Props = {
  icon?: React.ReactNode;
  text: string;
  fill?: boolean;
  loading?: boolean;
  onClick?: () => void;
  disabled?: boolean;
};

const Button = ({ text, icon, fill, disabled, loading, onClick }: Props) => {
  return (
    <button
      className={`${s.buttonWrapper} ${fill ? s.fill : ""} ${
        disabled && s.disabled
      }`}
      onClick={() => {
        if (disabled || !onClick || loading) return;
        onClick();
      }}
    >
      {loading ? (
        <LoadingOutlined />
      ) : (
        <>
          {icon && icon}
          <span className={`${s.buttonText} ${fill ? s.fill : ""}`}>
            {text}
          </span>
        </>
      )}
    </button>
  );
};

export default Button;
