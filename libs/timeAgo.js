import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);


const timeAgo = (date) => {
  if (!date) return '';
  return dayjs(date).fromNow();
};

export default timeAgo;
