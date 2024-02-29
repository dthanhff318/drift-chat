import { Copy } from 'lucide-react';
import React from 'react';
import s from './style.module.scss';
import { TPost } from 'types/post.type';

type Props = {
  post: TPost;
};
const GalleryItem = ({ post }: Props) => {
  return (
    <>
      <div
        className={s.galleryItem}
        style={{
          backgroundImage: `url(${post.images && post.images[0]})`,
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
