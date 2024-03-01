import postStore from 'app/storeZustand/postStore';
import { useState, useEffect } from 'react';

type TModalGallery = '' | 'create' | 'detail';

export const useServiceGallery = () => {
  const [modal, setModal] = useState<TModalGallery>('');
  const { getPosts, savePostDetail, loadingPost, posts } = postStore();
  useEffect(() => {
    getPosts();
  }, []);
  return { modal, loadingPost, posts, setModal, savePostDetail };
};
