import React, { ReactNode } from 'react';
import s from './style.module.scss';

type TDataPopover = {
  icon?: ReactNode;
  text: string;
  hidden?: boolean;
  onClick?: () => void;
};

type Props = {
  data: TDataPopover[];
  width?: string;
};

const PopoverCustom = ({ data, width }: Props) => {
  return (
    <div
      className={s.popoverWrapper}
      style={
        width
          ? {
              width,
            }
          : {}
      }
    >
      {data.map(
        (e) =>
          !e.hidden && (
            <div key={e.text} className={s.item} onClick={e.onClick}>
              {e.icon && e.icon}
              <p className={s.text}>{e.text}</p>
            </div>
          ),
      )}
    </div>
  );
};

export default PopoverCustom;
