import { ReactComponent as HomeHeaderFortuneScroll } from 'assets/images/home/HeaderFortuneScroll.svg';
import HomeHeaderBeforeConnect from 'assets/images/home/HeaderBeforeConnect.png';
import { ReactComponent as HomeHeaderInviteFriend } from 'assets/images/home/HeaderInviteFriend.svg';
import { ReactComponent as HomeHeaderFortunePoint } from 'assets/images/home/HeaderFortunePoint.svg';
import { ReactComponent as HomeHeaderDailyCheck } from 'assets/images/home/HeaderDailyCheck.svg';
import { useFortuneSyncStore } from 'features/auth';
import { DEFAULT_EMPTY, DEFAULT_NUM_ZERO, DEFAULT_SERVICE_PATH } from 'consts';
import { useFortuneDailyChecksStore } from '../store';
import { DEFAULT_FORTUNE_DAILYCHECK_MAX } from 'consts/fortune';
import { getDailyCheckRestCount } from '../libs/home.libs';
import { useNavigate } from 'react-router-dom';
import useClaim from 'common/hooks/useClaim';

export const HomeHeader = () => {
  // get store
  const { user } = useFortuneSyncStore();
  const { fortuneDailyChecks } = useFortuneDailyChecksStore();

  // values
  /** username은 firstname, lastname으로 표시 */
  const firstNameAndLastName = user ? user.first_name + user.last_name : DEFAULT_EMPTY;
  /** user가 가지고 있는 point(FRTN) */
  const pointFRTN = user?.balance.toLocaleString() ?? DEFAULT_NUM_ZERO;
  const dailyCheckRestCount = getDailyCheckRestCount(fortuneDailyChecks);

  const navigate = useNavigate();

  // util
  const { walletAddress, connectWallet, sendTransaction } = useClaim();

  const handleMovePath = (path: string) => {
    navigate(`${DEFAULT_SERVICE_PATH}/${path}`);
  };

  const handleConnect = async () => {
    try {
      /** 지갑연결 */
      const walletData = await connectWallet();
      if (!walletData) {
        console.log('Failed to connect wallet');
        return;
      }
    } catch (error: unknown) {
      console.error(error);
    }
  };

  return (
    <div className="h-[147px] flex flex-col justify-between px-4 pt-4">
      <div className="flex flex-row justify-between items-center">
        {/* username */}
        <div className="flex flex-row justify-center items-center">
          <HomeHeaderFortuneScroll />
          <span data-name="user first_name + user last_name">{firstNameAndLastName}</span>
        </div>

        {/* wallet */}
        <div onClick={handleConnect}>
          <img src={HomeHeaderBeforeConnect} alt="" className="w-[54px] h-[54px]" />
        </div>
      </div>
      <div className="flex flex-row justify-between items-end mt-4">
        {/* Invite */}
        <div
          className="flex flex-col justify-center items-center"
          onClick={() => {
            handleMovePath('home/invite');
          }}
        >
          <HomeHeaderInviteFriend />
          <span>Invite</span>
        </div>

        {/* Balance */}
        <div className="flex flex-col justify-center items-center">
          <HomeHeaderFortunePoint />
          <span>{pointFRTN}</span>
        </div>

        {/* Daily Check */}
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
