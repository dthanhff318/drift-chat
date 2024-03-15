import postApi from 'app/axios/api/postApi';
import postStore from 'app/storeZustand/postStore';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { TPost } from 'types/post.type';

type TModalGallery = '' | 'create' | 'detail';

export const useServiceGallery = () => {
  const [modal, setModal] = useState<TModalGallery>('');
  const { userId } = useParams<{ userId: string }>();
  const { savePostDetail, loadingPost } = postStore();

  const { data, isLoading } = useQuery<{ data: TPost[] }>({
    queryKey: ['getPosts'],
    queryFn: () => postApi.getPosts(),
  });

  return { data, isLoading, modal, loadingPost, userId, setModal, savePostDetail };
};
