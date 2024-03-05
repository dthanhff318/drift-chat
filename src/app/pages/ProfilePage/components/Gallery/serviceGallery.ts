import postStore from 'app/storeZustand/postStore';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

type TModalGallery = '' | 'create' | 'detail';

export const useServiceGallery = () => {
  const [modal, setModal] = useState<TModalGallery>('');
  const { userId } = useParams<{ userId: string }>();
  const { getPosts, savePostDetail, loadingPost, posts } = postStore();
  useEffect(() => {
    getPosts(userId);
  }, [userId]);
  return { modal, loadingPost, posts, userId, setModal, savePostDetail };
};
