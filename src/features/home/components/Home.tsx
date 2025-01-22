import React, { useEffect, useState } from 'react';
import { ReactComponent as HomeMainFortuneWait } from 'assets/images/home/MainFortuneWait.svg';
import { ReactComponent as HomeMainFortuneOpen } from 'assets/images/home/MainFortuneOpen.svg';
import { ReactComponent as HomeMainScrollOpen } from 'assets/images/home/MainScrollOpen.svg';
import { ReactComponent as HomeSmallClock } from 'assets/images/home/SmallClock.svg';
import { useFortuneSyncStore } from 'features/auth';
import { DEFAULT_FORTUNESYNC_FORTUNEINDEX } from 'consts/fortune';
import { HomeModal } from './HomeModal';
import { useFortuneDailyChecks } from 'features/services/queries';
import { useFortuneDailyChecksStore } from '../store';

export const Home = () => {
  // get store
  const { setFortuneDailyChecks } = useFortuneDailyChecksStore();
  const fortuneSyncS = useFortuneSyncStore();

  // values
  const { fortuneIndex, isFortune } = fortuneSyncS;
  const openTheScrollRestCount = DEFAULT_FORTUNESYNC_FORTUNEINDEX - fortuneIndex;
  const [isFortuneClicked, setIsFortuneClicked] = useState(false);
  const [isOpenScorllClicked, setIsOpenScrollClicked] = useState(false);

  // tanstack
  const { data, isLoading, isError, error } = useFortuneDailyChecks({});

  useEffect(() => {
    if (data) {
      console.log(data);
      setFortuneDailyChecks(data);
    }
  }, [data, setFortuneDailyChecks]);

  const handleClose = () => {
    setIsOpenScrollClicked(false);
  };

  return (
    <div className="flex-1 flex flex-col justify-center items-center relative">
      {/* 처음: 스크롤, 뒤: 포춘쿠키 - 두 SVG가 높이가 다 다르기 때문에 수동으로 조절하였음 */}
      <div className={`absolute  ${isFortuneClicked ? 'top-[43px]' : 'top-[70px]'}`}>
        {Boolean(isFortune) ? (
          <>
            <div
              className={`transition-all duration-300 ${isFortuneClicked ? 'hidden' : 'block'}`}
              onClick={() => setIsFortuneClicked(true)}
              style={{ cursor: 'pointer' }}
            >
              <HomeMainFortuneOpen />
            </div>
            <div
              className={`transition-all duration-300 ${isFortuneClicked ? 'block' : 'hidden'}`}
              onClick={() => setIsOpenScrollClicked(true)}
              style={{ cursor: 'pointer' }}
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
      <div className="absolute bottom-[60px]">
        {Boolean(isFortune) ? (
          <div className=" w-[270px] h-[56px] flex flex-row justify-between items-center px-6 py-6 bg-[#ffc34b] rounded-[22px] border-[#956134] border-2 border-b-4">
            <div className="text-black text-[22px] font-pridi font-semibold">Open the Scroll</div>
            <div className="w-9 h-9 p-2.5 bg-[#956134] rounded-[100px] flex-col justify-center items-center gap-2.5 inline-flex">
              <div className="text-[#fff5e8] text-[22px] font-pridi font-semibold">{openTheScrollRestCount}</div>
            </div>
          </div>
        ) : (
          <div className=" w-[270px] h-[56px] flex flex-row justify-center items-center px-6 py-6 bg-[#E5D5BA] rounded-[22px] border-[#737373] border-2 border-b-4">
            <div className="text-[#737373] text-[22px] font-pridi font-semibold">Wait for your fortune</div>
          </div>
        )}
        <div className="flex flex-row justify-center mt-2">
          <span className="text-[#a48b78] text-sm font-pretendard font-medium">Scroll left today&nbsp;</span>
          <span className="text-[#956134] text-sm font-pretendard font-semibold">
            {fortuneIndex}/{DEFAULT_FORTUNESYNC_FORTUNEINDEX}
          </span>
          <div className="w-[20px]" />
          <HomeSmallClock />
          <div className="text-center text-[#a48b78] text-sm font-pretendard font-semibold">00 : 00 : 00</div>
        </div>
      </div>
    </div>
  );
};
