import { ReactComponent as HomeHeaderFortuneScroll } from 'assets/images/home/HeaderFortuneScroll.svg';
import HomeHeaderBeforeConnect from 'assets/images/home/HeaderBeforeConnect.png';
import { ReactComponent as HomeHeaderInviteFriend } from 'assets/images/home/HeaderInviteFriend.svg';
import { ReactComponent as HomeHeaderFortunePoint } from 'assets/images/home/HeaderFortunePoint.svg';
import { ReactComponent as HomeHeaderDailyCheck } from 'assets/images/home/HeaderDailyCheck.svg';
import { useFortuneSyncStore } from 'features/auth';
import { DEFAULT_NUM_ZERO, DEFAULT_ROUTES_PATH } from 'consts';
import { useFortuneDailyChecksStore } from '../store';
import { DEFAULT_FORTUNE_DAILYCHECK_MAX } from 'consts/fortune';
import { getDailyCheckRestCount } from '../libs/home.libs';
import { useNavigate } from 'react-router-dom';

export const HomeHeader = () => {
  // get store
  const { user } = useFortuneSyncStore();
  const { fortuneDailyChecks } = useFortuneDailyChecksStore();

  // values
  const balance = user?.balance.toLocaleString() ?? DEFAULT_NUM_ZERO;
  const dailyCheckRestCount = getDailyCheckRestCount(fortuneDailyChecks);

  const navigate = useNavigate();
  const handleMovePath = (path: string) => {
    navigate(`${DEFAULT_ROUTES_PATH}/${path}`);
  };

  return (
    <div className="h-[147px] flex flex-col justify-between px-4 pt-4">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row justify-center items-center">
          <HomeHeaderFortuneScroll />
          <span data-name="user first_name + user last_name">{user ? user.first_name + user.last_name : ''}</span>
        </div>
        <div>
          <img src={HomeHeaderBeforeConnect} alt="" className="w-[54px] h-[54px]" />
        </div>
      </div>
      <div className="flex flex-row justify-between items-end mt-4">
        <div
          className="flex flex-col justify-center items-center"
          onClick={() => {
            handleMovePath('home/invite');
          }}
        >
          <HomeHeaderInviteFriend />
          <span>Invite</span>
        </div>
        <div className="flex flex-col justify-center items-center">
          <HomeHeaderFortunePoint />
          <span>{balance}</span>
        </div>
        <div
          className="flex flex-col justify-center items-center"
          onClick={() => {
            handleMovePath('home/daily-check');
          }}
        >
          <HomeHeaderDailyCheck />
          <span>
            {dailyCheckRestCount}/{DEFAULT_FORTUNE_DAILYCHECK_MAX}
          </span>
        </div>
      </div>
    </div>
  );
};
