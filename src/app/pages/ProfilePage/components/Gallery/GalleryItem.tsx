import { Copy } from 'lucide-react';
import React from 'react';
import s from './style.module.scss';

const GalleryItem = () => {
  return (
    <>
      <div
        className={s.galleryItem}
        style={{
          backgroundImage: `url("https://i.ytimg.com/vi/13In9JpvJi8/sddefault.jpg")`,
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
