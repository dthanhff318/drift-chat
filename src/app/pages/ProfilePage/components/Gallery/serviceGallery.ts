import postApi from 'app/axios/api/postApi';
import postStore from 'app/storeZustand/postStore';
import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { TPost } from 'types/post.type';

type TModalGallery = '' | 'create' | 'detail';

export const useServiceGallery = () => {
  const [modal, setModal] = useState<TModalGallery>('');
  const { userId } = useParams<{ userId: string }>();
  const { getPosts, savePostDetail, loadingPost, posts } = postStore();

  const { data, isLoading } = useQuery<{ data: TPost[] }>({
    queryKey: ['get', 'post'],
    queryFn: () => postApi.getPosts(),
  });

  useEffect(() => {
    getPosts(userId);
  }, [userId]);
  return { data, isLoading, modal, loadingPost, posts, userId, setModal, savePostDetail };
};
