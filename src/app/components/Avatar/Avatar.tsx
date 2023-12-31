import { getPublicImageUrl } from "app/helpers/funcs";
import React from "react";
import s from "./style.module.scss";
type Props = {
  src?: string;
  online?: boolean;
  text?: string;
};

const Avatar = ({ text, src, online }: Props) => {
  return (
    <div className={s.avatarWrapper}>
      {text ? (
        <span className={s.text}>{text}</span>
      ) : (
        <img src={src ? src : getPublicImageUrl("avt.png")} alt="" />
      )}
      {online && (
        <div className={s.tag}>
          <span className={s.online}></span>
        </div>
      )}
    </div>
  );
};

export default Avatar;
