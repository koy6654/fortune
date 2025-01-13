import React from 'react';
import { ReactComponent as HomeMainFortuneWait } from 'assets/images/home/MainFortuneWait.svg';
import { ReactComponent as HomeMainFortuneOpen } from 'assets/images/home/MainFortuneOpen.svg';
import { ReactComponent as HomeMainScrollOpen } from 'assets/images/home/MainScrollOpen.svg';
import { ReactComponent as HomeSmallClock } from 'assets/images/home/SmallClock.svg';

export const Home = () => {
  return (
    <div className="flex-1 flex flex-col justify-center items-center relative">
      <div className="absolute top-[-55px]">
        <HomeMainFortuneWait />
        {/* <HomeMainFortuneOpen /> */}
        {/* <HomeMainScrollOpen /> */}
      </div>
      <div className="absolute bottom-[60px]">
        <div className=" w-[270px] h-[56px] flex flex-row justify-center items-center px-6 py-6 bg-[#E5D5BA] rounded-[22px] border-[#737373] border-2 border-b-4">
          <div className="text-[#737373] text-[22px] font-pridi font-semibold">Wait for your fortune</div>
        </div>
        {/* <div className=" w-[270px] h-[56px] flex flex-row justify-between items-center px-6 py-6 bg-[#ffc34b] rounded-[22px] border-[#956134] border-2 border-b-4">
              <div className="text-black text-[22px] font-pridi font-semibold">Open the Scroll</div>
              <div className="w-9 h-9 p-2.5 bg-[#956134] rounded-[100px] flex-col justify-center items-center gap-2.5 inline-flex">
                <div className="text-[#fff5e8] text-[22px] font-pridi font-semibold">2</div>
              </div>
            </div> */}

        <div className="flex flex-row justify-center mt-2">
          <span className="text-[#a48b78] text-sm font-pretendard font-medium">Scroll left today&nbsp;</span>
          <span className="text-[#956134] text-sm font-pretendard font-semibold">3/3</span>
          <div className="w-[20px]" />
          <HomeSmallClock />
          <div className="text-center text-[#a48b78] text-sm font-pretendard font-semibold">00 : 00 : 00</div>
        </div>
      </div>
    </div>
  );
};
