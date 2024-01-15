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
};

export default userApi;
