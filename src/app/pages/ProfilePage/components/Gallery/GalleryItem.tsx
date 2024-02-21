import { Copy } from 'lucide-react';
import React from 'react';
import s from './style.module.scss';

const GalleryItem = () => {
  return (
    <>
      <div
        className={s.galleryItem}
        style={{
          backgroundImage: `url("https://thanh-linh.s3.ap-southeast-1.amazonaws.com/siuu.jpg")`,
        }}
      >
        <div className={s.iconMulti}>
          <Copy size={26} color="#ffffff" />
        </div>
      </div>
    </>
  );
};

export default GalleryItem;
