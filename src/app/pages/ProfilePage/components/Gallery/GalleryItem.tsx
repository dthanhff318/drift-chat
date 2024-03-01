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
      <div className={s.galleryItem}>
        <img className={s.galleryThumb} src={post.images && post.images[0]} alt="" />
        {post.images && post.images?.length > 1 && (
          <div className={s.iconMulti}>
            <Copy size={26} color="#ffffff" />
          </div>
        )}
      </div>
    </>
  );
};

export default GalleryItem;
