import { useFortuneDailyChecksStore } from 'features/home';
import { DailyCheckInBox, DailyCheckInBoxProps } from './DailyCheckInBox';
import { useFortuneDailyChecks } from 'features/services/queries';
import { useEffect } from 'react';
import { DEFAULT_FORTUNE_DAILYCHECK_MAX } from 'consts/fortune';
import { checkDateStatus } from 'common/libs';

export const DailyCheck = () => {
  // get store
  const { fortuneDailyChecks, setFortuneDailyChecks } = useFortuneDailyChecksStore();

  // tanstack
  const { data, isLoading, isError, error } = useFortuneDailyChecks();

  // TODO: src/features/home/components/Home.tsx 와 로직이 겹치긴 함
  useEffect(() => {
    if (data) {
      console.log(data);
      setFortuneDailyChecks(data);
    }
  }, [data, setFortuneDailyChecks]);

  return (
    <div className="flex-1 flex flex-col justify-center items-center relative">
      <div className="flex flex-row justify-center items-center mb-2">
        <span className="text-lg font-medium font-pridi leading-[21px]">Progress Tracker </span>
        <span className="text-sm font-normal font-pridi leading-[21px]">(Days 1-{DEFAULT_FORTUNE_DAILYCHECK_MAX})</span>
      </div>
      {fortuneDailyChecks &&
        fortuneDailyChecks.map((check) => {
          let status: DailyCheckInBoxProps['status'] = 'disabled';

          // [1] available false
          if (check.available === false) {
            // [1-1] claim 받지 않음
            if (check.completed === null) {
              // [2-1] 지나간 날짜 => 놓침
              if (checkDateStatus(check.created_at) === 'before') {
                status = 'missed';
                // [2-2] 미래 날짜 => 선택 불가능
              } else if (checkDateStatus(check.created_at) === 'after') {
                status = 'disabled';
              }
              // [1-2] claim 받음
            } else if (check.completed === 'done') {
              status = 'claimed';
            }
          }

          // [2] available true
          if (check.available === true) {
            status = 'claim';
          }

          const content = check.reward_coins < 35 ? 'Check-In :)' : 'Special Reward!';

          return <DailyCheckInBox status={status} dayCount={check.name} content={content} />;
        })}

      <div className="w-full h-7 text-center text-[#956134] text-xs font-normal font-pretendard mt-2 mb-4">
        The Daily Check-In resets every {DEFAULT_FORTUNE_DAILYCHECK_MAX} days.
        <br />
        Daily Check in Resets at 00:00 UTC
      </div>
    </div>
  );
};
