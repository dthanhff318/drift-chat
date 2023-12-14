import React, { ReactNode } from "react";
import s from "./style.module.scss";

type TDataPopover = {
  icon: ReactNode;
  text: string;
  onClick: () => void;
};

type Props = {
  data: TDataPopover[];
};

const PopoverCustom = ({ data }: Props) => {
  return (
    <div className={s.popoverWrapper}>
      {data.map((e) => (
        <div key={e.text} className={s.item} onClick={e.onClick}>
          {e.icon && e.icon}
          <p>{e.text}</p>
        </div>
      ))}
    </div>
  );
};

export default PopoverCustom;
