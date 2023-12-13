import { getPublicImageUrl } from "app/helpers/funcs";
import React from "react";
import s from "./style.module.scss";
type Props = {
  icon?: React.ReactNode;
  text: string;
};

const Button = ({ text, icon }: Props) => {
  return <div className={s.buttonWrapper}></div>;
};

export default Button;
