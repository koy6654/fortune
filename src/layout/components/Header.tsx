import React from 'react';
import './header.style.scss';

import { ReactComponent as HomeHeaderFortuneScroll } from 'assets/images/home/HeaderFortuneScroll.svg';
import HomeHeaderBeforeConnect from 'assets/images/home/HeaderBeforeConnect.png';
import { ReactComponent as HomeHeaderInviteFriend } from 'assets/images/home/HeaderInviteFriend.svg';
import { ReactComponent as HomeHeaderFortunePoint } from 'assets/images/home/HeaderFortunePoint.svg';
import { ReactComponent as HomeHeaderDailyCheck } from 'assets/images/home/HeaderDailyCheck.svg';

type HeaderProps = {
  title: string;
  content: string;
};

export const Header = ({ title, content }: HeaderProps) => {
  return (
    <div className="h-[70px] w-full px-4 py-4">
      <div className="text-center text-black text-xl font-pridi-medium">{title}</div>
      <div
        className="text-center text-[#2b2b2b] text-xs font-normal font-pridi"
        style={{ whiteSpace: 'pre-line' }}
        dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br />') }}
      />
    </div>
  );
};

export const HomeHeader = () => {
  return (
    <div className="h-[147px] flex flex-col justify-between px-4 pt-4">
      <div className="flex flex-row justify-between items-center">
        <HomeHeaderFortuneScroll />
        <img src={HomeHeaderBeforeConnect} alt="" className="w-[54px] h-[54px]" />
      </div>
      <div className="flex flex-row justify-between items-end mt-4">
        <div className="flex flex-col justify-center items-center">
          <HomeHeaderInviteFriend />
          <span>Invite</span>
        </div>
        <div className="flex flex-col justify-center items-center">
          <HomeHeaderFortunePoint />
          <span>200,000</span>
        </div>
        <div className="flex flex-col justify-center items-center">
          <HomeHeaderDailyCheck />
          <span>3/7</span>
        </div>
      </div>
    </div>
  );
};
