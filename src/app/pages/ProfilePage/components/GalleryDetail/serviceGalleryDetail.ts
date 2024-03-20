import postApi from 'app/axios/api/postApi';
import { errorNoti } from 'app/helpers/notification';
import authStore from 'app/storeZustand/authStore';
import postStore from 'app/storeZustand/postStore';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { TComment, TPost } from 'types/post.type';

type Props = {
  handleCloseModal: () => void;
};
type TGalleryModal = '' | 'confirm-delete';

export const useServiceGalleryDetail = ({ handleCloseModal }: Props) => {
  const { postDetail, getCommentByPost, savePostDetail } = postStore();
  const { currentUser } = authStore();
  const [indexView, setIndexView] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [modal, setModal] = useState<TGalleryModal>('');

  const queryClient = useQueryClient();

  const arrPopover = [
    {
      text: 'Pin',
      onClick: () => {
        console.log(1);
      },
    },
    {
      text: 'Delete post',
      onClick: () => {
        setModal('confirm-delete');
      },
    },
  ];

  const handleSendComment = async () => {
    if (!postDetail.id || !comment.trim()) return;
    try {
      const res = await postApi.commentPost({
        content: comment,
        post: postDetail.id,
      });
      getCommentByPost(postDetail.id);
      setComment('');
    } catch (e) {
      errorNoti();
    }
  };

  const handleLikedPost = async () => {
    if (!postDetail.id) return;
    const res = await postApi.likePost(postDetail.id);
    const updatePost = res.data as TPost;
    savePostDetail({ ...postDetail, stars: updatePost.stars });
  };

  const handleDeletePost = async () => {
    if (!postDetail.id) return;
    delPostMutation.mutate(postDetail.id, {
      onSuccess: () => {
        handleCloseModal();
        queryClient.setQueryData<{ data: TPost[] }>('getPosts', (queryData) => {
          const oldDataPosts = queryData?.data ?? [];
          return { ...queryData, data: oldDataPosts.filter((e) => e.id !== postDetail.id) };
        });
      },
      onError: () => {
        setModal('');
        errorNoti();
      },
    });
  };

  const delPostMutation = useMutation({
    mutationFn: (postId: string) => postApi.deletePost(postId),
  });

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
    arrPopover,
    modal,
    delPostMutation,
    setModal,
    setComment,
    setIndexView,
    handleSendComment,
    handleLikedPost,
    handleDeletePost,
  };
};
