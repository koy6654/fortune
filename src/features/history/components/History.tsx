import {
  TaskHistoryBackground,
  TaskHistoryBody,
  TaskHistoryHeader,
} from 'features/common/components/TaskHistoryCommon';
import { useFortuneUserHistory } from 'features/services/queries';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { HistoryCollapseBox } from './HistoryCollapseBox';
import { FortuneUserHistoryResponse } from 'features/services/service.model';

type HistoryCollapseContent = {
  opened: boolean;
  message: string;
};
interface HistoryCollapseData {
  title: string;
  openedCount: number;
  contents: HistoryCollapseContent[];
}

export const History = () => {
  const { data, isLoading, isError, error } = useFortuneUserHistory({});

  const [historyData, setHistoryData] = useState<HistoryCollapseData[]>([]);
  const [collapseState, setCollapseState] = useState<Record<number, boolean>>({
    0: true,
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
  });

  const parseToCollapseData = (data: FortuneUserHistoryResponse) => {
    const result: HistoryCollapseData[] = [];

    let historyCollapseDataTitle = dayjs(data.startDate);
    let historyCollapseDataOpenedCount = 0;
    let historyCollapseDataContents: HistoryCollapseContent[] = [];

    for (const message of data.scrollMessages) {
      let historyCollapseData: HistoryCollapseData = {
        title: historyCollapseDataTitle.format('MMM D, YYYY'),
        openedCount: historyCollapseDataOpenedCount,
        contents: historyCollapseDataContents,
      };

      if (message.message != null) {
        historyCollapseDataOpenedCount += 1;
        historyCollapseData.openedCount = historyCollapseDataOpenedCount;
        historyCollapseDataContents.push({ opened: true, message: message.message });
      } else if (message.default_message != null) {
        historyCollapseDataContents.push({ opened: false, message: message.default_message });
      } else {
        historyCollapseDataContents.push({ opened: false, message: 'Something wrong...' });
      }

      const id = message.id;
      if (id % 3 === 0) {
        historyCollapseDataTitle = historyCollapseDataTitle.add(1, 'days');

        result.push(historyCollapseData);

        historyCollapseDataOpenedCount = 0;
        historyCollapseDataContents = [];
      }
    }

    return result;
  };

  const toggleCollapse = (index: number) => {
    setCollapseState((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  useEffect(() => {
    if (data) {
      const result = parseToCollapseData(data);
      setHistoryData(result);
    }
  }, [data, setHistoryData]);

  return (
    <div className="flex-1 flex flex-col justify-center items-center relative">
      <TaskHistoryBackground>
        <TaskHistoryHeader className="justify-center">
          <div className="text-center text-[#1b1b1b] text-base font-pridi-semibold">Fortune Log</div>
        </TaskHistoryHeader>
        <TaskHistoryBody>
          <div className="w-[300px]">
            {historyData.map((data, index) => {
              return (
                <HistoryCollapseBox
                  key={index}
                  index={index}
                  data={data}
                  onClick={toggleCollapse}
                  isOpen={collapseState[index]}
                />
              );
            })}
          </div>
        </TaskHistoryBody>
      </TaskHistoryBackground>
    </div>
  );
};
