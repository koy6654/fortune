import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { SetInterval } from 'types/type';

dayjs.extend(utc);

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

/**
 * #### useUtcCounter
 * @description
 * - UTC 시간으로 절사 한 뒤, 8시간 주기의 카운트를 세는 함수
 * @returns {string} - HH : mm : ss 로 이루어진 남은시간 타이머
 */
const useUtcCounter = () => {
  const [timeLeft, setTimeLeft] = useState<string>('08 : 00 : 00');
  const [isResetTime, setIsResetTime] = useState<boolean>(false);

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
          setIsResetTime(true); // 00:00:00 감지
          nextTargetTime = nextTargetTime.add(8, 'hour');
        } else {
          setIsResetTime(false);
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

  return { timeLeft, isResetTime };
};

export default useUtcCounter;
