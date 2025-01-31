import DailyCheckFortunePoint from 'assets/images/FortunePoint.png';
import DailyCheckFortunePointMissed from 'assets/images/home/DailyCheckFortunePointMissed.png';
import DailyCheckFortunePointClaimedDisabled from 'assets/images/home/DailyCheckFortunePointClaimedDisabled.png';

export type DailyCheckInStatusTypes = 'missed' | 'claim' | 'claimed' | 'disabled';
export interface DailyCheckInBoxProps {
  status: DailyCheckInStatusTypes;
  dayCount: string;
  content: string;
  onClick: (status: DailyCheckInStatusTypes) => void;
}

export const DailyCheckInBox = ({ status, dayCount, content, onClick }: DailyCheckInBoxProps) => {
  let bgClassName = 'bg-[#fcf7ef]';
  let borderClassName = 'border-2 border-[#956134]';
  let textClassName = 'text-[#181818]';
  let buttonBgClassName = 'bg-[#ffc34b]';
  let buttonText = 'Claim';
  let fortunePointImage = DailyCheckFortunePoint;

  switch (status) {
    /** 데일리 체크인을 못함 */
    case 'missed':
      bgClassName = 'bg-[#bcbcbc]';
      borderClassName = 'border-2 border-[#737373]';
      buttonBgClassName = 'bg-[#9b9797]';
      textClassName = 'text-[#737373]';
      buttonText = 'Missed';
      fortunePointImage = DailyCheckFortunePointMissed;
      break;
    /** 출석한 당일 데일리 체크인 클레임이 가능한 상태 */
    case 'claim':
      break;
    /** 데일리 체크인 클레임이 완료된 후 표기 */
    case 'claimed':
      bgClassName = 'bg-[#c9a063]';
      buttonBgClassName = 'bg-[#c09049]';
      textClassName = 'text-[#956134]';
      buttonText = 'Claimed';
      fortunePointImage = DailyCheckFortunePointClaimedDisabled;
      break;
    /** 미래의 날짜 */
    case 'disabled':
      bgClassName = 'bg-neutral-500/20';
      borderClassName = '';
      buttonBgClassName = 'bg-neutral-500/20';
      textClassName = 'text-[#a48b78]';

      fortunePointImage = DailyCheckFortunePointClaimedDisabled;
      break;
  }

  const handleClick = (status: DailyCheckInStatusTypes) => {
    onClick(status);
  };

  return (
    <div
      className={`w-[85%] h-[50px] flex flex-row justify-between items-center rounded-xl mx-10 mt-1 ${bgClassName} ${borderClassName} `}
      onClick={() => handleClick(status)}
    >
      <div className={`min-w-[75px] flex justify-center ${textClassName} text-sm font-semibold font-pretendard pt-1`}>
        {dayCount}
      </div>
      <div className="w-0.5 h-7 bg-[#956134]"></div>

      <div className={`flex-1 flex justify-center ${textClassName} text-base font-semibold font-pretendard pt-1`}>
        {content}
      </div>
      <div
        className={`min-w-[100px] h-[46px] p-2.5 ${buttonBgClassName} rounded-xl border-2 border-[#a48b78] flex flex-row justify-center items-center gap-[3px]`}
      >
        <img src={fortunePointImage} alt="" className="w-5 h-5" />
        <div className={`flex justify-center ${textClassName} text-base font-semibold font-pretendard pt-1`}>
          {buttonText}
        </div>
      </div>
    </div>
  );
};
