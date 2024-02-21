import React from 'react';
import { TUser } from 'types/common';
import s from './style.module.scss';
import GalleryItem from './GalleryItem';
import GalleryDetail from '../GalleryDetail/GalleryDetail';

const Gallery = () => {
  // const {} = useServiceGallery();

  return (
    <>
      <div className={s.galleryWrap}>
        {Array(20)
          .fill(null)
          .map((e, i) => (
            <div key={i} className={s.galleryItemWrap}>
              <GalleryItem />
            </div>
          ))}
      </div>
      <GalleryDetail />
    </>
  );
};

export default Gallery;
