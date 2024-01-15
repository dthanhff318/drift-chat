import { axiosClient } from '../axiosClient';

const friendsApi = {
  getInfoCommuication: () => {
    return axiosClient.get('/friends');
  },
  addFriend: (friendId: string) => {
    return axiosClient.post('/friends/add', { friendId });
  },
  acceptFrRequest: (friendId: string) => {
    return axiosClient.post('/friends/accept', { friendId });
  },
};

export default friendsApi;
