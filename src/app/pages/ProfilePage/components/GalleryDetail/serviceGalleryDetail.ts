import postStore from 'app/storeZustand/postStore';
import { useState, useEffect } from 'react';
import postApi from 'app/axios/api/postApi';

type TGalleryLoading = '' | 'comment';

export const useServiceGalleryDetail = () => {
  const { comments, postDetail, getCommentByPost } = postStore();

  const [indexView, setIndexView] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [loading, setLoading] = useState<TGalleryLoading>('');

  const handleSendComment = async () => {
    if (!postDetail.id) return;
    try {
      const res = await postApi.commentPost({
        content: comment,
        post: postDetail.id,
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!postDetail.id) return;
    getCommentByPost(postDetail.id);
  }, [postDetail.id]);
  return {
    postDetail,
    indexView,
    comment,
    loading,
    comments,
    setComment,
    setIndexView,
    handleSendComment,
  };
};
