import { TUser } from 'types/common';
import { axiosClient } from '../axiosClient';
import qs from 'query-string';

const userApi = {
  updateUser: (data: TUser) => {
    return axiosClient.patch('/user', data);
  },
  uploadUser: (type: keyof Pick<TUser, 'photoUrl' | 'thumbProfile'>, fileName: string) => {
    return axiosClient.post('/user/upload', { type, fileName });
  },
  likeProfile: (user: string) => {
    return axiosClient.post(`/user/likeProfile`, { user });
  },
  getUserById: (id: string) => {
    return axiosClient.get(`user/${id}`);
  },
  getSignedUrl: (data: { fileName: string; fileType: string }) => {
    const query = qs.stringify(data);
    return axiosClient.get(`user/signed-url?${query}`);
  },
};

export default userApi;
