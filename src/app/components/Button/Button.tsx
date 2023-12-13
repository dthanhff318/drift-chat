import { getPublicImageUrl } from "app/helpers/funcs";
import React from "react";
import s from "./style.module.scss";
type Props = {
  icon?: React.ReactNode;
  text: string;
  fill?: boolean;
};

const Button = ({ text, icon, fill }: Props) => {
  return (
    <button className={`${s.buttonWrapper} ${fill ? s.fill : ""}`}>
      {icon && icon}
      <span className={`${s.buttonText} ${fill ? s.fill : ""}`}>{text}</span>
    </button>
  );
};

export default Button;
