import { getPublicImageUrl } from "app/helpers/funcs";
import React from "react";
import s from "./style.module.scss";
type Props = {
  icon?: React.ReactNode;
  text: string;
  fill?: boolean;
  onClick?: () => void;
  disabled?: boolean;
};

const Button = ({ text, icon, fill, disabled, onClick }: Props) => {
  return (
    <button
      className={`${s.buttonWrapper} ${fill ? s.fill : ""} ${
        disabled && s.disabled
      }`}
      onClick={() => {
        if (disabled || !onClick) return;
        onClick();
      }}
    >
      {icon && icon}
      <span className={`${s.buttonText} ${fill ? s.fill : ""}`}>{text}</span>
    </button>
  );
};

export default Button;
