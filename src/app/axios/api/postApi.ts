import { axiosClient } from '../axiosClient';

export type TDataCreatePost = {
  caption: string;
  fileNameList: string[];
};

const postApi = {
  getPosts: () => {
    return axiosClient.get('/post');
  },
  signedImagePost: (imageList: { fileName: string; fileType: string }[]) => {
    return axiosClient.post('/post/signed-image-post', {
      imageList,
    });
  },
  createPost: (data: TDataCreatePost) => {
    return axiosClient.post('/post', data);
  },
};

export default postApi;
