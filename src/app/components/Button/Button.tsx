import { getPublicImageUrl } from "app/helpers/funcs";
import React from "react";
import s from "./style.module.scss";
type Props = {
  icon?: React.ReactNode;
  text: string;
  fill?: boolean;
  onClick?: () => void;
};

const Button = ({ text, icon, fill, onClick }: Props) => {
  return (
    <button
      className={`${s.buttonWrapper} ${fill ? s.fill : ""}`}
      onClick={onClick}
    >
      {icon && icon}
      <span className={`${s.buttonText} ${fill ? s.fill : ""}`}>{text}</span>
    </button>
  );
};

export default Button;
