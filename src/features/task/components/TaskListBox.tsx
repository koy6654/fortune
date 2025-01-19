import React from 'react';
import { ReactComponent as TaskListBoxStatus } from 'assets/images/task/TaskListBoxStatus.svg';
import { ReactComponent as TaskListBoxDivider } from 'assets/images/task/TaskListBoxDivider.svg';
import TaskListBoxFortunePoint from 'assets/images/FortunePoint.png';
import { ReactComponent as TaskListBoxChecked } from 'assets/images/task/TaskListBoxChecked.svg';

interface TaskListBoxProps {
  title: string;
  description: string;
  point: number;
  status: 'todo' | 'claim' | 'disabled';
}

export const TaskListBox = ({ title, description, point, status }: TaskListBoxProps) => {
  let bgClassName = 'bg-white';
  let taskStatus: any = 'N';

  switch (status) {
    case 'claim':
      bgClassName = 'bg-[#c9a063]/80';
      taskStatus = <TaskListBoxChecked />;
      break;
    case 'disabled':
      bgClassName = 'bg-[#573518]/50';
      taskStatus = '';
  }

  return (
    <div className={`w-full h-[70px] ${bgClassName} rounded-lg border-2 border-[#956134] pl-2 py-2 mb-2`}>
      <div className="flex flex-row">
        <div className="w-[30px] flex flex-col items-center pt-[2px] relative">
          <TaskListBoxStatus />
          <div className="absolute top-[11.5px] left-[14.5px] transform -translate-x-1/2 -translate-y-1/2 text-[#fcf7ef] text-[10px] font-bold font-pretendard">
            {taskStatus}
          </div>
        </div>
        <div className="flex-1 flex flex-col pr-8">
          <div className="text-black text-base font-semibold font-pretendard">{title}</div>
          <div className="text-black text-[11px] font-normal font-pretendard leading-[13px] tracking-tight">
            {description}
          </div>
        </div>
        <TaskListBoxDivider />
        <div className="w-[50px] flex flex-col justify-center items-center">
          <img src={TaskListBoxFortunePoint} alt="" className="w-5 h-5" />
          <span className="text-black text-sm font-bold font-pretendard">{point}</span>
        </div>
      </div>
    </div>
  );
};
