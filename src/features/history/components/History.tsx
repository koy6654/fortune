import {
  TaskHistoryBackground,
  TaskHistoryBody,
  TaskHistoryHeader,
} from 'features/common/components/TaskHistoryCommon';
import { useFortuneUserHistory } from 'features/services/mutations';
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { HistoryCollapseBox } from './HistoryCollapseBox';

interface HistoryData {
  startDate: string;
  fortuneMessages: {
    id: number;
    default_message?: string;
    message?: string;
  }[];
}

export const History = () => {
  const { mutate, isError, error, data } = useFortuneUserHistory();

  const [historyData, setHistoryData] = useState<HistoryData>();
  const [collapseState, setCollapseState] = useState<Record<number, boolean>>({
    0: true,
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
  });

  const testData = [
    {
      title: 'Jan 10, 2025',
      contents: [
        { opened: false, message: `"Not Opened!  “No cookie, no fortune."` },
        { opened: true, message: `"Fortune text area"` },
        { opened: true, message: `"Fortune text area"` },
      ],
    },
    {
      title: 'Jan 11, 2025',
      contents: [
        { opened: false, message: `"Not Opened!  “No cookie, no fortune."` },
        { opened: true, message: `"Fortune text area"` },
        { opened: true, message: `"Fortune text area"` },
      ],
    },
    {
      title: 'Jan 12, 2025',
      contents: [
        { opened: false, message: `"Not Opened!  “No cookie, no fortune."` },
        { opened: true, message: `"Fortune text area"` },
        { opened: true, message: `"Fortune text area"` },
      ],
    },
    {
      title: 'Jan 13, 2025',
      contents: [
        { opened: false, message: `"Not Opened!  “No cookie, no fortune."` },
        { opened: true, message: `"Fortune text area"` },
        { opened: true, message: `"Fortune text area"` },
      ],
    },
    {
      title: 'Jan 14, 2025',
      contents: [
        { opened: false, message: `"Not Opened!  “No cookie, no fortune."` },
        { opened: true, message: `"Fortune text area"` },
        { opened: true, message: `"Fortune text area"` },
      ],
    },
    {
      title: 'Jan 15, 2025',
      contents: [
        { opened: false, message: `"Not Opened!  “No cookie, no fortune."` },
        { opened: true, message: `"Fortune text area"` },
        { opened: true, message: `"Fortune text area"` },
      ],
    },
    {
      title: 'Jan 16, 2025',
      contents: [
        { opened: false, message: `"Not Opened!  “No cookie, no fortune."` },
        { opened: true, message: `"Fortune text area"` },
        { opened: true, message: `"Fortune text area"` },
      ],
    },
  ];

  // const parseToCollapseData = (data: HistoryData) => {
  //   const result = {};

  //   let date = dayjs(data.startDate);

  //   for (const message of data.fortuneMessages) {
  //     const id = message.id;
  //     if (id % 3 === 1) {
  //       date.add(1, 'days').format('MMM D, YYYY');
  //     }
  //   }
  // };

  const toggleCollapse = (index: number) => {
    setCollapseState((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  useEffect(() => {
    mutate(
      {},
      {
        onSuccess: (data) => {
          console.log('Mutation successful', data);
        },
        onError: (error) => {
          console.log('Mutation failed', error);
        },
      }
    );
  }, [mutate]);

  return (
    <div className="flex-1 flex flex-col justify-center items-center relative">
      <TaskHistoryBackground>
        <TaskHistoryHeader className="justify-center">
          <div className="text-center text-[#1b1b1b] text-base font-pridi-semibold">Fortune Log</div>
        </TaskHistoryHeader>
        <TaskHistoryBody>
          <div className="w-[300px]">
            {testData.map((data, index) => {
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
