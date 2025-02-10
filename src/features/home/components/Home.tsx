import React, { useEffect, useState } from 'react';
import { ReactComponent as HomeMainFortuneWait } from 'assets/images/home/MainFortuneWait.svg';
import { ReactComponent as HomeMainFortuneOpen } from 'assets/images/home/MainFortuneOpen.svg';
import { ReactComponent as HomeMainScrollOpen } from 'assets/images/home/MainScrollOpen.svg';
import { ReactComponent as HomeSmallClock } from 'assets/images/home/SmallClock.svg';
import { useFortuneSyncStore } from 'features/auth';
import { DEFAULT_SCROLL_LEFT_TODAY } from 'consts/fortune';
import { HomeModal } from './HomeModal';
import { useFortuneDailyChecks } from 'features/services/queries';
import { useFortuneDailyChecksStore } from '../store';
import { DEFAULT_NUM_ZERO } from 'consts';
import useUtcCounter from '../hooks/useUtcCounter';

export const Home = () => {
  // get store
  const { setFortuneDailyChecks } = useFortuneDailyChecksStore();
  const { fortuneIndex, isFortune, user } = useFortuneSyncStore();
  const fortune = user?.fortune ?? DEFAULT_NUM_ZERO;

  // util
  const { timeLeft, isResetTime } = useUtcCounter();

  // state
  const [isFortuneClicked, setIsFortuneClicked] = useState(false);
  const [isOpenScorllClicked, setIsOpenScrollClicked] = useState(false);

  // tanstack
  const { data, isLoading, isError, error, refetch: loadFortuneDailyChecks } = useFortuneDailyChecks({});

  useEffect(() => {
    if (data) {
      console.log(data);
      setFortuneDailyChecks(data);
    }
  }, [data, setFortuneDailyChecks]);

  // 타이머가 쿨타임 00:00:00 이 되면 useFortuneDailyChecks API를 다시 호출한다 (polling)
  useEffect(() => {
    if (isResetTime) {
      loadFortuneDailyChecks();
    }
  }, [isResetTime, loadFortuneDailyChecks]);

  const handleClose = () => {
    setIsOpenScrollClicked(false);
  };

  const handleScrollButtonClick = () => {
    if (!isFortune) return;

    // 포춘 아직 안눌렀을 때 => 포춘 open helper
    if (!isFortuneClicked) {
      setIsFortuneClicked(true);
    }

    // 포춘이 눌려졌을 때 => 스크롤 오픈 helper
    if (isFortuneClicked) {
      setIsOpenScrollClicked(true);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center relative h-[265px]">
      {/* 처음: 스크롤, 뒤: 포춘쿠키 - 두 SVG가 높이가 다 다르기 때문에 수동으로 조절하였음 */}
      <div className={`absolute  ${isFortuneClicked ? 'top-[-30px]' : 'top-[0px]'}`}>
        {Boolean(isFortune) ? (
          <>
            <div
              className={`animate-bounce ${isFortuneClicked ? 'hidden' : 'block'}`}
              onClick={() => setIsFortuneClicked(true)}
            >
              <HomeMainFortuneOpen />
            </div>
            <div
              className={`animate-bounce ${isFortuneClicked ? 'block' : 'hidden'}`}
              onClick={() => setIsOpenScrollClicked(true)}
            >
              <HomeMainScrollOpen />
            </div>
            <HomeModal isOpen={!!isOpenScorllClicked} onClose={handleClose} />
          </>
        ) : (
          <>
            <HomeMainFortuneWait />
          </>
        )}
      </div>
      <div className="absolute bottom-0">
        {Boolean(isFortune) ? (
          <div
            className="w-[270px] h-[56px] flex flex-row justify-between items-center px-6 py-6 bg-[#ffc34b] rounded-[22px] border-[#956134] border-2 border-b-4"
            onClick={handleScrollButtonClick}
          >
            <div className="text-black text-[22px] font-pridi font-semibold whitespace-nowrap">
              {isFortuneClicked ? 'Open the Scroll' : 'Open the Cookie'}
            </div>
            <div className="w-9 h-9 p-2.5 bg-[#956134] rounded-[100px] flex-col justify-center items-center gap-2.5 inline-flex">
              <div className="text-[#fff5e8] text-[22px] font-pridi font-semibold">{fortuneIndex}</div>
            </div>
          </div>
        ) : (
          <div className="w-[270px] h-[56px] flex flex-row justify-center items-center px-0 py-6 bg-[#E5D5BA] rounded-[22px] border-[#737373] border-2 border-b-4">
            <div className="text-[#737373] text-[22px] font-pridi font-semibold">Wait for your fortune</div>
          </div>
        )}
        <div className="flex flex-row justify-center items-top mt-2">
          <span className={`${isFortune ? 'text-[#413C38]' : 'text-[#a48b78]'} text-sm font-pretendard font-medium`}>
            Scroll left today&nbsp;
          </span>
          <span
            className={`${
              isFortune ? 'text-[#413C38] font-medium' : 'text-[#956134] font-semibold'
            } text-sm font-pretendard`}
          >
            {fortune}/{DEFAULT_SCROLL_LEFT_TODAY}
          </span>
          <div className="w-[20px]" />
          <HomeSmallClock />
          <div className="text-center text-[#a48b78] ml-1 text-sm font-pretendard font-semibold">{timeLeft}</div>
        </div>
      </div>
    </div>
  );
};
