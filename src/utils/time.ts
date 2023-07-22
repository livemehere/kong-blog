import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export function dateFormat(date: string, format = 'YYYY-MM-DD HH:mm') {
  return dayjs(date).tz('Asia/Seoul').format(format);
}
