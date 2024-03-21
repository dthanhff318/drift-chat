import postApi, { TCommentPost, TUpdatePost } from 'app/axios/api/postApi';
import { errorNoti } from 'app/helpers/notification';
import authStore from 'app/storeZustand/authStore';
import postStore from 'app/storeZustand/postStore';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { TComment, TPost } from 'types/post.type';
import qs from 'query-string';
import { useHistory } from 'react-router-dom';

type Props = {
  handleCloseModal: () => void;
};
type TGalleryModal = '' | 'confirm-delete';

export const useServiceGalleryDetail = ({ handleCloseModal }: Props) => {
  const { currentUser } = authStore();
  const [indexView, setIndexView] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [modal, setModal] = useState<TGalleryModal>('');

  const history = useHistory();
  const queryUrlObj = qs.parse(history.location.search);
  const queryClient = useQueryClient();

  const { data: postDetailData, isLoading: loadingPostDetail } = useQuery<{ data: TPost }>({
    queryKey: ['getPostDetail', queryUrlObj.post],
    queryFn: () => postApi.getPostDetail(queryUrlObj.post as string),
    enabled: !!queryUrlObj.post,
  });

  const { data: comments, isLoading: loadingComment } = useQuery<{ data: TComment[] }>({
    queryKey: ['getPostComment', queryUrlObj.post],
    queryFn: () => postApi.getCommentByPost(queryUrlObj.post as string),
    enabled: !!queryUrlObj.post,
  });

  const arrPopover = [
    {
      text: postDetailData?.data.pin ? 'Unpin' : 'Pin',
      onClick: () => {
        handleUpdatePost({
          pin: !postDetailData?.data.pin,
        });
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
    if (!postDetailData?.data.id || !comment.trim()) return;
    commentPostMutation.mutate(
      {
        content: comment,
        post: postDetailData?.data.id,
      },
      {
        onSuccess: (res) => {
          const newCmt = res.data as TComment;
          queryClient.setQueryData<{ data: TComment[] }>(
            ['getPostComment', queryUrlObj.post],
            (queryData) => {
              const oldListCmt = queryData?.data ?? [];
              return { ...queryData, data: [...oldListCmt, newCmt] };
            },
          );
          setComment('');
        },
      },
    );
  };

  const handleLikedPost = async () => {
    if (!postDetailData?.data.id) return;
    likePostMutation.mutate(postDetailData?.data.id);
  };

  const handleUpdatePost = async (postData: TPost) => {
    if (!postDetailData?.data.id) return;
    updatePostMutation.mutate(
      { postId: postDetailData?.data.id, postData },
      {
        onSuccess: (res) => {
          const updatePost = res.data as TPost;
          queryClient.setQueryData<{ data: TPost[] }>('getPosts', (queryData) => {
            const oldListPosts = queryData?.data ?? [];
            const updateListPost = oldListPosts.map((post) =>
              post.id === postDetailData?.data.id ? updatePost : post,
            );
            return { ...queryData, data: updateListPost };
          });
        },
      },
    );
  };

  const handleDeletePost = async () => {
    if (!postDetailData?.data.id) return;
    delPostMutation.mutate(postDetailData?.data.id, {
      onSuccess: () => {
        handleCloseModal();
        queryClient.setQueryData<{ data: TPost[] }>('getPosts', (queryData) => {
          const oldDataPosts = queryData?.data ?? [];
          return {
            ...queryData,
            data: oldDataPosts.filter((e) => e.id !== postDetailData?.data.id),
          };
        });
      },
      onError: () => {
        setModal('');
        errorNoti();
      },
    });
  };

  const likePostMutation = useMutation({
    mutationFn: (postId: string) => postApi.likePost(postId),
    onSuccess: (res) => {
      const newDataPost = res.data as TPost;
      queryClient.setQueryData<{ data: TPost }>(
        ['getPostDetail', queryUrlObj.post],
        (queryData) => {
          const oldPost = queryData?.data;
          return {
            ...queryData,
            data: { ...oldPost, stars: newDataPost.stars },
          };
        },
      );
    },
  });

  const commentPostMutation = useMutation({
    mutationFn: (dataComment: TCommentPost) => postApi.commentPost(dataComment),
  });
  const updatePostMutation = useMutation({
    mutationFn: (dataUpdate: TUpdatePost) => postApi.updatePost(dataUpdate),
  });

  const delPostMutation = useMutation({
    mutationFn: (postId: string) => postApi.deletePost(postId),
  });

  return {
    postDetailData,
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
