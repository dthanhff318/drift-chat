import { getPublicImageUrl } from "app/helpers/funcs";
import React from "react";
import s from "./style.module.scss";
type Props = {
  src?: string;
};

const Avatar = ({ src }: Props) => {
  return (
    <div className={s.avatarWrapper}>
      <img src={src ? src : getPublicImageUrl("avt.png")} alt="" />
      <div className={s.tag}>
        <span className={s.online}></span>
      </div>
    </div>
  );
};

export default Avatar;
