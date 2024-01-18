import { axiosClient } from '../axiosClient';

const settingApi = {
  getSettings: () => {
    return axiosClient.get(`/setting`);
  },
};

export default settingApi;
