import { axiosClient } from '../axiosClient';

const settingApi = {
  getSettings: () => {
    return axiosClient.get(`/settings`);
  },
};

export default settingApi;
