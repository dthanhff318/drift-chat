import React from 'react';
import { createPortal } from 'react-dom';
import s from './style.module.scss';

const GalleryDetail = () => {
  const rootElement = document.getElementById('root');
  console.log(rootElement);

  if (!rootElement) return null;
  return (
    document.getElementById('root') &&
    createPortal(
      <>
        <div className={s.galleryDetail}>
          <div className={s.galleryOverlay}></div>
          <div className={s.galleryContent}>
            <div className={s.galleryImage}></div>
          </div>
        </div>
      </>,
      rootElement,
    )
  );
};

export default GalleryDetail;
