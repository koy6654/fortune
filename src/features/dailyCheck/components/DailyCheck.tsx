import { useFortuneDailyChecksStore } from 'features/home';
import { DailyCheckInBox, DailyCheckInBoxProps, DailyCheckInStatusTypes } from './DailyCheckInBox';
import { useFortuneDailyChecks, useFortuneSync } from 'features/services/queries';
import { useEffect } from 'react';
import { DEFAULT_FORTUNE_DAILYCHECK_MAX, DEFAULT_FORTUNE_SPECIAL_REWARD } from 'consts/fortune';
import useDailyClaim from 'common/hooks/useDailyClaim';
import { useFortuneDailyClaim } from 'features/services/mutations';
import { DailyCheckData, SyncResponse } from 'features/services/service.model';
import { checkDateStatus } from '../libs/checkDateStatus';
import { useAlert } from 'features/alert';
import { useFortuneSyncStore } from 'features/auth';

export const DailyCheck = () => {
  // get store
  const { fortuneDailyChecks, setFortuneDailyChecks } = useFortuneDailyChecksStore();
  const { setFortuneSync } = useFortuneSyncStore();

  // common
  const { showAlert } = useAlert();

  // tanstack
  const { data, isLoading, isError, error, refetch: loadFortuneDailyChecks } = useFortuneDailyChecks({});
  const { mutateAsync: mutateFortuneDailyClaim } = useFortuneDailyClaim();
  const { refetch: loadFortuneSync } = useFortuneSync({}, false);

  // util
  const { walletAddress, connectWallet, sendTransaction } = useDailyClaim();

  // TODO: src/features/home/components/Home.tsx 와 로직이 겹치긴 함
  useEffect(() => {
    if (data) {
      console.log('DailyCheck => receive [/api/fortune/daily-checks] data again', data);
      setFortuneDailyChecks(data);
    }
  }, [data, setFortuneDailyChecks]);

  const generateRewardText = (reward_coins: number) => {
    return reward_coins >= DEFAULT_FORTUNE_SPECIAL_REWARD ? 'Special Reward!' : 'Check-In :)';
  };

  const computeDailyStatus = (check: DailyCheckData) => {
    let status: DailyCheckInBoxProps['status'] = 'disabled';

    /** 지난 날짜 */
    if (checkDateStatus(check.created_at) === 'before') {
      // 놓침
      if (check.completed === null) {
        status = 'missed';
        // 완료
      } else if (check.completed === 'done') {
        status = 'claimed';
      }
      /** 미래 날짜 */
    } else if (checkDateStatus(check.created_at) === 'after') {
      // 불가
      status = 'disabled';
    }

    /** 날짜와 관계 없이 available이 true 이면 무조건 claim이 가능 */
    if (check.available === true) {
      // 가능
      status = 'claim';
    }

    return status;
  };

  const handleClaim = async (status: DailyCheckInStatusTypes) => {
    if (status === 'claim') {
      try {
        /** [1] 지갑연결 */
        // const walletData = await connectWallet();
        // if (!walletData) {
        //   console.log('Failed to connect wallet');
        //   return;
        // }

        /** [2] daily-claim API */
        const { success, message, balance } = await mutateFortuneDailyClaim({});
        console.log(data);

        // 성공
        if (success) {
          /** [3] transaction  */
          // const { Ui, address } = walletData;
          // const result = await sendTransaction(Ui, address, balance);

          /** [4] 데이터 API 갱신 */
          // daily-checks API 갱신
          const loadedFortuneDailyChecks = (await loadFortuneDailyChecks()).data;
          // 아래 로직으로 스토어 dispatch 해도 되지만, 현재 tanstack에서 data를 구독중이므로, useEffect에서 알아서 처리됨
          // if(loadedFortuneDailyChecks){
          //   setFortuneDailyChecks(loadedFortuneDailyChecks);
          // }

          // sync API 갱신
          const loadedFortuenSync: SyncResponse | undefined = (await loadFortuneSync()).data;
          if (loadedFortuenSync) {
            setFortuneSync(loadedFortuenSync);
            console.log('DailyCheck claim end => receive [/api/fortune/sync] data again', loadedFortuenSync);
          }

          /** [5] 알럿 표시 */
          showAlert(balance.toLocaleString(), 'earned');
        }
      } catch (error: unknown) {
        console.error(error);
      }
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-center items-center relative">
      <div className="flex flex-row justify-center items-center mb-2">
        <span className="text-lg font-medium font-pridi leading-[21px]">Progress Tracker </span>
        <span className="text-sm font-normal font-pridi leading-[21px]">(Days 1-{DEFAULT_FORTUNE_DAILYCHECK_MAX})</span>
      </div>
      {fortuneDailyChecks &&
        fortuneDailyChecks.map((check) => (
          <DailyCheckInBox
            key={`daily-check-in-${check.id}`}
            status={computeDailyStatus(check)}
            dayCount={check.name}
            content={generateRewardText(check.reward_coins)}
            onClick={handleClaim}
          />
        ))}

      <div className="w-full h-7 text-center text-[#956134] text-xs font-normal font-pretendard mt-2 mb-4">
        The Daily Check-In resets every {DEFAULT_FORTUNE_DAILYCHECK_MAX} days.
        <br />
        Daily Check in Resets at 00:00 UTC
      </div>
    </div>
  );
};
