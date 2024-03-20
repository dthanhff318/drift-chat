import { Copy, Pin } from 'lucide-react';
import React from 'react';
import { TPost } from 'types/post.type';
import s from './style.module.scss';

type Props = {
  post: TPost;
};
const GalleryItem = ({ post }: Props) => {
  return (
    <>
      <div className={s.galleryItem}>
        <img className={s.galleryThumb} src={post.images && post.images[0]} alt="" />
        {post.images && post.images?.length > 1 && (
          <div className={s.iconMulti}>
            <Copy size={26} color="#ffffff" />
          </div>
        )}
        {post.pin && (
          <div className={s.iconPin}>
            <Pin size={26} color="#f5e400" fill="#f5e400" />
          </div>
        )}
      </div>
    </>
  );
};

export default GalleryItem;
