import { TUser } from 'types/common';
import { axiosClient } from '../axiosClient';

const userApi = {
  updateUser: (data: TUser) => {
    return axiosClient.patch('/user', data);
  },
  uploadAvatar: (data: FormData) => {
    return axiosClient.post('/user/avatar', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  uploadThumbProfile: (data: FormData) => {
    return axiosClient.post('/user/thumb', data, {
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
