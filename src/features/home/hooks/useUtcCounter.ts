import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { SetInterval } from 'types/type';

const calculateRemainingTime = (targetTime: dayjs.Dayjs, now: dayjs.Dayjs) => {
  const totalSeconds = targetTime.diff(now, 'second');
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    hours,
    minutes,
    seconds,
    formatted: `${String(hours).padStart(2, '0')} : ${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(
      2,
      '0'
    )}`,
  };
};

const useUtcCounter = () => {
  const [timeLeft, setTimeLeft] = useState<string>('08 : 00 : 00');

  useEffect(() => {
    let intervalId: SetInterval;

    const startCountdown = () => {
      const now = dayjs.utc();
      const nowZeroBase = now.startOf('day');
      const nowFloorHour = Math.floor(nowZeroBase.hour() / 8);
      const nowHourDuration = nowFloorHour * 8;
      const nextTargetTime = nowZeroBase.add(nowHourDuration + 8, 'hour');

      let remainingTimeInSeconds = nextTargetTime.diff(now, 'second');

      setTimeLeft(calculateRemainingTime(nextTargetTime, now).formatted);

      intervalId = setInterval(() => {
        if (remainingTimeInSeconds <= 0) {
          remainingTimeInSeconds = 8 * 3600; // 8시간 * 3600초(1시간 초) = 28800초
        }

        const now = dayjs.utc();
        const remaining = calculateRemainingTime(nextTargetTime, now);

        setTimeLeft(remaining.formatted);

        remainingTimeInSeconds -= 1;
      }, 1000);
    };

    startCountdown();

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return timeLeft;
};

export default useUtcCounter;
