import moment from "moment";

export const getPublicImageUrl = (name: string) =>
  `${process.env.PUBLIC_URL}/images/${name}`;

export const convertDiffTime = (time: string) => {
  // Lấy thời gian hiện tại của máy tính
  let now = moment();
  var lastActive = moment(time);
  // Giả sử lastActive là một số Unix timestamp (thời gian tính từ ngày 1/1/1970)

  var diffMinutes = now.diff(lastActive, "minutes");
  var diffHours = now.diff(lastActive, "hours");

  // Áp dụng quy tắc hiển thị tương ứng
  if (diffMinutes <= 1) {
    return "1 phút trước";
  } else if (diffMinutes < 60) {
    return diffMinutes + " phút trước";
  } else if (diffHours < 24) {
    return diffHours + " giờ trước";
  } else {
    return lastActive.format("D/M/YYYY HH:mm:ss");
  }
};
