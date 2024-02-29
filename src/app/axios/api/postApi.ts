import { axiosClient } from '../axiosClient';

export type TDataCreatePost = {
  caption: string;
  fileNameList: string[];
};

export type TSignedUrlPost = {
  fileName: string;
  fileType: string;
};

const postApi = {
  getPosts: () => {
    return axiosClient.get('/post');
  },
  signedImagePost: (imageList: TSignedUrlPost[]) => {
    return axiosClient.post('/post/signed-image-post', {
      imageList,
    });
  },
  createPost: (data: TDataCreatePost) => {
    return axiosClient.post('/post', data);
  },
};

export default postApi;
