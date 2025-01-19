import React from 'react';
import './footer.style.scss';
import { useParams, useNavigate } from 'react-router-dom';
import { DEFAULT_SERVICE_PATH, DEFAULT_ROUTES_PATH, DEFAULT_FALLBACK_URL } from 'consts';
import { ReactComponent as MenuNavigation } from 'assets/images/menu/Navigation.svg';
import { ReactComponent as MenuHome } from 'assets/images/menu/Home.svg';
import { ReactComponent as MenuTask } from 'assets/images/menu/Task.svg';
import { ReactComponent as MenuStake } from 'assets/images/menu/Stake.svg';
import { ReactComponent as MenuCheckIn } from 'assets/images/menu/CheckIn.svg';
import { ReactComponent as MenuHistory } from 'assets/images/menu/History.svg';

interface HomeFooterProps {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const HomeFooterMenu: React.FC<HomeFooterProps> = ({ selected, onClick, children }) => {
  return (
    <div className="flex flex-col justify-center items-center relative" onClick={onClick}>
      {selected && (
        <div className="absolute top-[-14px] left-1/2 transform -translate-x-1/2">
          <MenuNavigation />
        </div>
      )}
      {children}
    </div>
  );
};

export const Footer = () => {
  const navigate = useNavigate();

  const handleMovePath = (path: string) => {
    navigate(`${DEFAULT_ROUTES_PATH}/${path}`);
  };

  return (
    <div className="h=[113px] flex flex-col px-4 pb-4">
      <div className="w-full h-[3px] bg-[#e7c79a] rounded" />
      <div className="flex flex-row justify-between items-center">
        <HomeFooterMenu
          selected={true}
          onClick={() => {
            handleMovePath('home');
          }}
        >
          <MenuHome />
          <span>Home</span>
        </HomeFooterMenu>
        <HomeFooterMenu
          selected={false}
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
          selected={false}
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
