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
      const nowFloorHour = Math.floor(now.hour() / 8);
      const nowHourDuration = nowFloorHour * 8;
      let nextTargetTime = nowZeroBase.add(nowHourDuration + 8, 'hour');

      // 초기값 설정
      const updateRemainingTime = () => {
        const now = dayjs.utc();
        const remaining = calculateRemainingTime(nextTargetTime, now);

        // 타이머가 0이 되면 다음 주기로 갱신
        if (remaining.hours <= 0 && remaining.minutes <= 0 && remaining.seconds <= 0) {
          nextTargetTime = nextTargetTime.add(8, 'hour');
        }

        setTimeLeft(remaining.formatted);
      };

      updateRemainingTime(); // 첫 번째 실행

      intervalId = setInterval(updateRemainingTime, 1000);
    };

    startCountdown();

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return timeLeft;
};

export default useUtcCounter;
