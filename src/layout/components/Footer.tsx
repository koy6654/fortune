import React from 'react';
import './footer.style.scss';
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
  onClick: () => void;
  children: React.ReactNode;
}

const HomeFooterMenu: React.FC<HomeFooterMenuProps> = ({ selected, onClick, children }) => {
  return (
    <div className="flex flex-col justify-center items-center relative" onClick={onClick}>
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

  const selected = isPathAllowed({ pathname, lists: ['home', 'home/home'], method: 'includes' });
  console.log(selected);

  return (
    <div className="h=[113px] flex flex-col px-4 pb-4">
      <div className="w-full h-[3px] bg-[#e7c79a] rounded" />
      <div className="flex flex-row justify-between items-center">
        <HomeFooterMenu
          selected={Boolean(isPathAllowed({ pathname, lists: ['/home', 'home/home'], method: 'includes' }))}
          onClick={() => {
            handleMovePath('home');
          }}
        >
          <MenuHome />
          <span>Home</span>
        </HomeFooterMenu>
        <HomeFooterMenu
          selected={Boolean(isPathAllowed({ pathname, lists: ['/task'], method: 'includes' }))}
          onClick={() => {
            handleMovePath('task');
          }}
        >
          <MenuTask />
          <span>Task</span>
        </HomeFooterMenu>
        <HomeFooterMenu
          selected={false}
          onClick={() => {
            alert('get ready');
            // handleMovePath('stake');
          }}
        >
          <MenuStake />
          <span>Stake</span>
        </HomeFooterMenu>
        <HomeFooterMenu
          selected={false}
          onClick={() => {
            alert('get ready');
            // handleMovePath('check-in');
          }}
        >
          <MenuCheckIn />
          <span>Check-in</span>
        </HomeFooterMenu>
        <HomeFooterMenu
          selected={Boolean(isPathAllowed({ pathname, lists: ['/history', 'history/history'], method: 'includes' }))}
          onClick={() => {
            handleMovePath('history');
          }}
        >
          <MenuHistory />
          <span>History</span>
        </HomeFooterMenu>
      </div>
    </div>
  );
};
