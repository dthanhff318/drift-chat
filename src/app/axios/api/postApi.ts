import { axiosClient } from '../axiosClient';

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

const postApi = {
  getPosts: (id?: string) => {
    return axiosClient.get(id ? `/post?userId=${id}` : '/post');
  },
  signedImagePost: (imageList: TSignedUrlPost[]) => {
    return axiosClient.post('/post/signed-image-post', {
      imageList,
    });
  },
  createPost: (data: TDataCreatePost) => {
    return axiosClient.post('/post', data);
  },
  commentPost: (data: TCommentPost) => {
    return axiosClient.post('/post/comment', data);
  },
  getCommentByPost: (postId: string) => {
    return axiosClient.get(`/post/comment/${postId}`);
  },
  likePost: (postId: string) => {
    return axiosClient.post('/post/like', { postId });
  },
};

export default postApi;
