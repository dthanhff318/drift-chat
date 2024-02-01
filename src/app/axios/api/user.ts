import { TUser } from 'types/common';
import { axiosClient } from '../axiosClient';

const userApi = {
  updateUser: (data: TUser) => {
    return axiosClient.patch('/user', data);
  },
  uploadUser: (data: FormData) => {
    return axiosClient.post('/user/upload', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  likeProfile: (user: string) => {
    return axiosClient.post(`/user/likeProfile`, { user });
  },
  getUserById: (id: string) => {
    return axiosClient.get(`user/${id}`);
  },
};

export default userApi;
