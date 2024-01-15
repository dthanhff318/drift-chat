import moment from 'moment';
import { IndexedObject, TGroup, TSettingUserGroup, TUser } from 'types/common';
import { geTUserFromLs } from './localStorage';

export const getPublicImageUrl = (name: string) => `${process.env.PUBLIC_URL}/images/${name}`;

export const convertDiffTime = (time: string) => {
  // Lấy thời gian hiện tại của máy tính
  let now = moment();
  let lastActive = moment(time);
  // Giả sử lastActive là một số Unix timestamp (thời gian tính từ ngày 1/1/1970)

  let diffMinutes = now.diff(lastActive, 'minutes');
  let diffHours = now.diff(lastActive, 'hours');
  // console.log(diffHours, diffMinutes);
  // console.log(moment(time).startOf("hour").fromNow());

  // Áp dụng quy tắc hiển thị tương ứng
  if (diffMinutes <= 1) {
    return 'few minutes ago';
  } else if (diffMinutes < 60) {
    return diffMinutes + ' minutes ago';
  } else {
    return diffHours + ' hour ago';
  }
};

export const getInfoDirectmess = (group: TGroup) => {
  const user = geTUserFromLs();
  if (group.isGroup === false) {
    return group.members?.find((m) => m.uid !== user.uid);
  }
  return;
};

export const getUserById = (id: string, listUser: TUser[]) => {
  return listUser.find((e) => e.id === id) ?? {};
};

export const replacePathParams = (path: string, params: IndexedObject<string>): string =>
  path.replace(/:([^/]+)/g, (_, p1) => encodeURIComponent(params[p1] ? params[p1] : ''));

export const getNameUser = (user: TUser, setting: TSettingUserGroup[]) => {
  const userSetting = setting.find((e) => e.user === user.id);
  return userSetting?.nickname ? userSetting?.nickname : user.displayName;
};
