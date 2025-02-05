import Collapse from 'react-collapse';
import { ReactComponent as HistoryCollapseArrowRight } from 'assets/images/history/HistoryCollapseArrowRight.svg';
import { ReactComponent as HistoryCollapseArrowDown } from 'assets/images/history/HistoryCollapseArrowDown.svg';
import { ReactComponent as OpenTheScrollFortune } from 'assets/images/history/OpenTheScrollFortune.svg';
import { ReactComponent as NotOpenTheScrollFortune } from 'assets/images/history/NotOpenTheScrollFortune.svg';

interface HistoryCollapseBoxProps {
  index: number;
  data: {
    title: string;
    openedCount: number;
    contents: {
      opened: boolean;
      message: string;
    }[];
  };
  isOpen: boolean;
  onClick: (index: number) => void;
}

export const HistoryCollapseBox = ({ index, data, isOpen, onClick }: HistoryCollapseBoxProps) => {
  return (
    <div className="px-4">
      <div className="h-[42px] flex flex-row justify-between items-end">
        <div className="flex flex-row justify-center items-center">
          <span className="w-[105px] text-[#161515] text-[18px] font-semibold font-pretendard overflow-hidden whitespace-nowrap text-ellipsis">
            {data.title}
          </span>
          <div className="w-[34px] h-[16px] flex flex-row justify-center items-center bg-[#956134] text-[#f4dbbd] text-[10px] font-semibold font-pretendard rounded-lg pt-[1px] mb-[3px]">
            {data?.openedCount} / 3
          </div>
        </div>
        <button className="mb-[10px]" onClick={() => onClick(index)}>
          {isOpen ? <HistoryCollapseArrowDown /> : <HistoryCollapseArrowRight />}{' '}
        </button>
      </div>

      <div className="h-[1px] bg-[#c9a063]/50" />

      <Collapse isOpened={isOpen}>
        <div className="flex flex-col justify-center items-start">
          {data.contents.map((content, index) => (
            <div key={index} className="flex flex-row items-center">
              {content.opened === true ? (
                <>
                  <OpenTheScrollFortune className="flex-shrink-0" />
                  <span className="w-full text-black text-[12px] font-normal font-pretendard leading-[13px] tracking-tight">
                    {content.message}
                  </span>
                </>
              ) : (
                <>
                  <NotOpenTheScrollFortune className="flex-shrink-0" />
                  <span className="w-full text-[#a48b78] text-[10px] font-normal font-pretendard leading-[13px] tracking-tight">
                    {content.message}
                  </span>
                </>
              )}
            </div>
          ))}
        </div>
      </Collapse>
    </div>
  );
};
