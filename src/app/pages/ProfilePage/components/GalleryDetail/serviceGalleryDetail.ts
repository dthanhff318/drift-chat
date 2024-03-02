import postStore from 'app/storeZustand/postStore';
import { useState, useEffect } from 'react';
import postApi from 'app/axios/api/postApi';
import authStore from 'app/storeZustand/authStore';
import { TPost } from 'types/post.type';

type TGalleryLoading = '' | 'comment';

export const useServiceGalleryDetail = () => {
  const { comments, postDetail, getCommentByPost, savePostDetail } = postStore();
  const { currentUser } = authStore();
  const [indexView, setIndexView] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [loading, setLoading] = useState<TGalleryLoading>('');

  const handleSendComment = async () => {
    if (!postDetail.id || !comment.trim()) return;
    try {
      setLoading('comment');
      const res = await postApi.commentPost({
        content: comment,
        post: postDetail.id,
      });
      getCommentByPost(postDetail.id);
      setComment('');
      setLoading('');
    } catch (e) {
      setLoading('');
    }
  };

  const handleLikedPost = async () => {
    if (!postDetail.id) return;
    const res = await postApi.likePost(postDetail.id);
    const updatePost = res.data as TPost;
    savePostDetail({ ...postDetail, stars: updatePost.stars });
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
    currentUser,
    setComment,
    setIndexView,
    handleSendComment,
    handleLikedPost,
  };
};
