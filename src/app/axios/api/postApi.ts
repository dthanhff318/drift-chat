import { axiosClient } from '../axiosClient';
import { TPost } from 'types/post.type';

export type TDataCreatePost = {
  caption: string;
  fileNameList: string[];
};

export type TSignedUrlPost = {
  fileName: string;
  fileType: string;
};
export type TCommentPost = {
  post: string;
  content: string;
};

export type TUpdatePost = { postData: TPost; postId: string };

const postApi = {
  getPosts: (id?: string) => {
    return axiosClient.get<undefined, { data: TPost[] }>(id ? `/post?userId=${id}` : '/post');
  },
  signedImagePost: (imageList: TSignedUrlPost[]) => {
    return axiosClient.post('/post/signed-image-post', {
      imageList,
    });
  },
  createPost: (data: TDataCreatePost) => {
    return axiosClient.post('/post', data);
  },
  getPostDetail: (postId: string) => axiosClient.get(`/post/${postId}`),
  commentPost: (data: TCommentPost) => {
    return axiosClient.post('/post/comment', data);
  },
  getCommentByPost: (postId: string) => {
    return axiosClient.get(`/post/comment/${postId}`);
  },
  likePost: (postId: string) => {
    return axiosClient.post('/post/like', { postId });
  },
  updatePost: (data: TUpdatePost) => {
    const { postId, postData } = data;
    return axiosClient.patch(`/post/${postId}`, postData);
  },
  deletePost: (postId: string) => axiosClient.delete(`/post/${postId}`),
};

export default postApi;
