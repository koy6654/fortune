import dayjs from 'dayjs';

export const checkDateStatus = (baseDate: string) => {
  const dayjsDate = dayjs(baseDate);

  if (dayjsDate.isBefore(dayjs(), 'day')) {
    return 'before';
  } else if (dayjsDate.isAfter(dayjs(), 'day')) {
    return 'after';
  } else {
    return 'same';
  }
};
