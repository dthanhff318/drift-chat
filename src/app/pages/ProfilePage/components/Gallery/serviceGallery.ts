import postApi from 'app/axios/api/postApi';
import postStore from 'app/storeZustand/postStore';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useHistory, useParams } from 'react-router-dom';
import { TPost } from 'types/post.type';
import qs from 'query-string';

type TModalGallery = '' | 'create' | 'detail';

export const useServiceGallery = () => {
  const [modal, setModal] = useState<TModalGallery>('');
  const { userId } = useParams<{ userId: string }>();
  const history = useHistory();
  const queryUrlObj = qs.parse(history.location.search);

  const handleClickGallery = (postId: string) => {
    setModal('detail');
    const url = qs.stringifyUrl(
      {
        url: history.location.pathname,
        query: {
          post: postId,
        },
      },
      {
        skipNull: true,
      },
    );
    history.push(url);
  };

  const handleClosePostDetail = () => {
    const path = history.location.pathname;
    history.push(path);
  };

  const { data, isLoading } = useQuery<{ data: TPost[] }>({
    queryKey: ['getPosts'],
    queryFn: () => postApi.getPosts(),
    select: (dataRes: { data: TPost[] }) => {
      const sortPostPined = dataRes.data.sort((a, b) => {
        if (a.pin === b.pin) {
          return 0;
        }
        if (a.pin) {
          return -1;
        }
        return 1;
      });
      return { ...dataRes, data: sortPostPined };
    },
  });

  return {
    data,
    isLoading,
    modal,
    userId,
    queryUrlObj,
    setModal,
    handleClickGallery,
    handleClosePostDetail,
  };
};
