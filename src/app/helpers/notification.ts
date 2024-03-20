import { notification } from 'antd';

export const errorNoti = () =>
  notification.error({
    message: `Error`,
    description: 'Error occur, try again !',
    duration: 4,
  });
