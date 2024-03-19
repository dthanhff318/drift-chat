import postStore from 'app/storeZustand/postStore';
import { useState, useEffect } from 'react';
import postApi from 'app/axios/api/postApi';
import authStore from 'app/storeZustand/authStore';
import { TPost, TComment } from 'types/post.type';
import { useQuery } from 'react-query';

type TGalleryLoading = '' | 'comment';

export const useServiceGalleryDetail = () => {
  const { postDetail, getCommentByPost, savePostDetail } = postStore();
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

  // useEffect(() => {
  //   if (!postDetail.id) return;
  //   getCommentByPost(postDetail.id);
  // }, [postDetail.id]);

  const { data: comments, isLoading: loadingComment } = useQuery<{ data: TComment[] }>({
    queryKey: ['getPostComment', postDetail.id],
    queryFn: () => postApi.getCommentByPost(postDetail.id ?? ''),
  });

  return {
    postDetail,
    indexView,
    comment,
    loadingComment,
    comments,
    currentUser,
    setComment,
    setIndexView,
    handleSendComment,
    handleLikedPost,
  };
};
