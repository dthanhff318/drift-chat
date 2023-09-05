import moment from "moment";
import { TGroup } from "types/common";
import { getUserFromLs } from "./localStorage";

export const getPublicImageUrl = (name: string) =>
  `${process.env.PUBLIC_URL}/images/${name}`;

export const convertDiffTime = (time: string) => {
  // Lấy thời gian hiện tại của máy tính
  let now = moment();
  let lastActive = moment(time);
  // Giả sử lastActive là một số Unix timestamp (thời gian tính từ ngày 1/1/1970)

  let diffMinutes = now.diff(lastActive, "minutes");
  let diffHours = now.diff(lastActive, "hours");
  // console.log(diffHours, diffMinutes);
  // console.log(moment(time).startOf("hour").fromNow());

  // Áp dụng quy tắc hiển thị tương ứng
  if (diffMinutes <= 1) {
    return "few minutes ago";
  } else if (diffMinutes < 60) {
    return diffMinutes + " minutes ago";
  } else {
    return diffHours + " hour ago";
  }
};

export const getInfoDirectmess = (group: TGroup) => {
  const user = getUserFromLs();
  if (group.typeGroup === false) {
    return group.members.find((m) => m.uid !== user.uid);
  }
  return;
};
