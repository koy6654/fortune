import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export const checkDateStatus = (baseDate: string) => {
  const dayjsDate = dayjs.utc(baseDate);
  const now = dayjs.utc();

  if (dayjsDate.isBefore(now, 'day')) {
    return 'before';
  } else if (dayjsDate.isAfter(now, 'day')) {
    return 'after';
  } else {
    return 'same';
  }
};
