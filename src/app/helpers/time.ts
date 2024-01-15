import moment from 'moment';

export const convertTimeFromNow = (lastTime: string) => {
  if (!lastTime) {
    return '';
  }
  const currentTime = moment();
  const targetTime = moment(lastTime);
  const duration = moment.duration(currentTime.diff(targetTime));
  const minutes = duration.asMinutes();

  if (minutes < 1) {
    return 'just now';
  } else if (minutes < 60) {
    return `${Math.floor(minutes)}m`;
  } else {
    const hours = duration.asHours();
    return `${Math.floor(hours)}h`;
  }
};
