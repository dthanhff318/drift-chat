import Button from 'app/components/Button/Button';
import React from 'react';
import { createPortal } from 'react-dom';
import s from './style.module.scss';

const FormCreatePost = () => {
  const rootElement = document.getElementById('root');
  if (!rootElement) return null;
  return (
    document.getElementById('root') &&
    createPortal(
      <div className={s.formCreatePost}>
        <div className={s.formOverlay}></div>
        <div className={s.main}>
          <div className={s.uploadWrap}>
            <img
              className={s.imagePost}
              src="https://d1hjkbq40fs2x4.cloudfront.net/2017-08-21/files/landscape-photography_1645.jpg"
              alt=""
            />
            <Button text="Upload" />
          </div>
          <div></div>
        </div>
      </div>,
      rootElement,
    )
  );
};

export default FormCreatePost;
