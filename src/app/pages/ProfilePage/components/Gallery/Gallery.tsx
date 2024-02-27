import React from 'react';
import GalleryItem from './GalleryItem';
import s from './style.module.scss';
import { BadgePlus, PlusSquare } from 'lucide-react';
import GalleryDetail from '../GalleryDetail/GalleryDetail';
import FormCreatePost from './FormCreatePost';

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
        <div className={s.postControl}>
          <PlusSquare size={34} />
        </div>
      </div>
      <FormCreatePost />
      {/* <GalleryDetail /> */}
    </>
  );
};

export default Gallery;
