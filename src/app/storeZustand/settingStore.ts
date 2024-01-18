import { notification } from 'antd';
import { TSettings } from 'types/common';
import { create } from 'zustand';
import settingApi from './../axios/api/settingApi';

type TSettingStore = {
  settings: TSettings;
  getSettings: () => void;
};

const settingLocalStorage = JSON.parse(localStorage.getItem('settings') ?? '{}');

const settingStore = create<TSettingStore>((set) => ({
  settings: settingLocalStorage || {},
  getSettings: async () => {
    try {
      const res = await settingApi.getSettings();
      localStorage.setItem('settings', JSON.stringify(res.data));
      set({
        settings: res.data,
      });
    } catch (err) {
      notification.error({
        message: `Error`,
        description: 'Try again',
        duration: 3,
      });
    }
  },
}));

export default settingStore;
