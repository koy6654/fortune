import React from 'react';
import './header.style.scss';

import { ReactComponent as HomeHeaderFortuneScroll } from 'assets/images/home/HeaderFortuneScroll.svg';
import HomeHeaderBeforeConnect from 'assets/images/home/HeaderBeforeConnect.png';
import { ReactComponent as HomeHeaderInviteFriend } from 'assets/images/home/HeaderInviteFriend.svg';
import { ReactComponent as HomeHeaderFortunePoint } from 'assets/images/home/HeaderFortunePoint.svg';
import { ReactComponent as HomeHeaderDailyCheck } from 'assets/images/home/HeaderDailyCheck.svg';

export const Header = () => {
  return <div className="header">Header</div>;
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
