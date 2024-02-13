import { TUser } from 'types/common';
import { axiosClient } from '../axiosClient';

const historyApi = {
  getHistoryProfileByUserId: (id: string) => {
    return axiosClient.get(`/history-profile?userId=${id}`);
  },
};

export default historyApi;
