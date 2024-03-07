import React from 'react';
import s from './style.module.scss';

const ExtendPage = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.content}></div>
      <div className={s.bottom}></div>
    </div>
  );
};

export default ExtendPage;
