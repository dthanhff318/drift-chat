import moment from "moment";

export const convertTimeFromNow = (lastTime: string) => {
  const timeAgo = moment(lastTime).fromNow();
  const formatTimeAgo = timeAgo.replace("ago", "").replace("days", "d");
  return formatTimeAgo;
};
