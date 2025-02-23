import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { DEFAULT_SERVICE_PATH } from 'consts';
import { ReactComponent as MenuNavigation } from 'assets/images/menu/Navigation.svg';
import { ReactComponent as MenuHome } from 'assets/images/menu/Home.svg';
import { ReactComponent as MenuTask } from 'assets/images/menu/Task.svg';
import { ReactComponent as MenuStake } from 'assets/images/menu/Stake.svg';
import { ReactComponent as MenuCheckIn } from 'assets/images/menu/CheckIn.svg';
import { ReactComponent as MenuHistory } from 'assets/images/menu/History.svg';
import { isPathAllowed } from 'common/libs';

interface HomeFooterMenuProps {
  selected: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

const HomeFooterMenu: React.FC<HomeFooterMenuProps> = ({ selected, onClick, children }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div className="flex flex-col justify-center items-center relative" onClick={handleClick}>
      {selected && (
        <div data-name="menu-active-tick" className="absolute top-[-14px] left-1/2 transform -translate-x-1/2">
          <MenuNavigation />
        </div>
      )}
      {children}
    </div>
  );
};

export const Footer = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleMovePath = (path: string) => {
    navigate(`${DEFAULT_SERVICE_PATH}/${path}`);
  };

  return (
    <div className="h=[113px] flex flex-col px-4 pb-4">
      <div className="w-full h-[3px] bg-[#e7c79a] rounded" />
      <div className="flex flex-row justify-between items-center">
        <HomeFooterMenu
          data-name="home"
          selected={Boolean(isPathAllowed({ pathname, lists: ['/home', 'home/home'], method: 'includes' }))}
          onClick={() => {
            handleMovePath('home');
          }}
        >
          <MenuHome />
          <span className="font-pridi">Home</span>
        </HomeFooterMenu>

        <HomeFooterMenu
          data-name="task"
          selected={Boolean(isPathAllowed({ pathname, lists: ['/task'], method: 'includes' }))}
          onClick={() => {
            handleMovePath('task');
          }}
        >
          <MenuTask />
          <span className="font-pridi">Task</span>
        </HomeFooterMenu>

        <HomeFooterMenu
          data-name="stake"
          selected={false}
          // onClick={() => {
          //   handleMovePath('stake');
          // }}
        >
          <MenuStake className="brightness-70 grayscale-[1]" />
          <span className="font-pridi">Stake</span>
        </HomeFooterMenu>

        <HomeFooterMenu
          data-name="check-in"
          selected={false}
          // onClick={() => {
          //   handleMovePath('check-in');
          // }}
        >
          <MenuCheckIn className="brightness-70 grayscale-[1]" />
          <span className="font-pridi">Check-in</span>
        </HomeFooterMenu>

        <HomeFooterMenu
          data-name="history"
          selected={Boolean(isPathAllowed({ pathname, lists: ['/history', 'history/history'], method: 'includes' }))}
          onClick={() => {
            handleMovePath('history');
          }}
        >
          <MenuHistory />
          <span className="font-pridi">History</span>
        </HomeFooterMenu>
      </div>
    </div>
  );
};
