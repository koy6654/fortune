import React from 'react';
import { ReactComponent as TaskListBoxStatus } from 'assets/images/task/TaskListBoxStatus.svg';
import { ReactComponent as TaskListBoxDivider } from 'assets/images/task/TaskListBoxDivider.svg';
import { ReactComponent as TaskListBoxFortunePoint } from 'assets/images/FortunePoint.svg';
import { ReactComponent as TaskListBoxChecked } from 'assets/images/task/TaskListBoxChecked.svg';
import { FortuneTasksResponse } from 'features/services/service.model';

export type TaskStatus = 'todo' | 'claim' | 'done';

interface TaskListBoxProps {
  task: FortuneTasksResponse;
  getTaskStatus: (task: FortuneTasksResponse) => TaskStatus;
  onClickTaskBox: (task: FortuneTasksResponse) => void;
}

export const TaskListBox = ({ task, getTaskStatus, onClickTaskBox }: TaskListBoxProps) => {
  let taskStatus: any = 'N';
  let boxClassName = 'bg-white';
  let titleTextClassName = 'text-black';
  let pointTextClassName = 'text-black';
  let taskListBoxFortunePointOpacity = 'opacity-100';

  const status = getTaskStatus(task);

  switch (status) {
    case 'claim':
      boxClassName = 'bg-[#c9a063]/80';
      taskStatus = <TaskListBoxChecked />;
      titleTextClassName = 'text-[#956134]/50';
      pointTextClassName = 'text-[#956134]/50';
      taskListBoxFortunePointOpacity = 'opacity-20';
      break;
    case 'done':
      boxClassName = 'bg-[#573518]/50';
      taskStatus = '';
      titleTextClassName = 'text-[#956134]';
      pointTextClassName = 'text-[#956134]/50';
      taskListBoxFortunePointOpacity = 'opacity-40';
  }

  return (
    <button
      className={`w-full h-[70px] ${boxClassName} relative rounded-lg border-2 border-[#956134] pl-2 py-2 mb-2`}
      onClick={() => onClickTaskBox(task)}
    >
      {status === 'claim' && (
        <div className="w-[100px] h-[32px] absolute top-1/2 left-1/2 p-2.5 bg-[#573518] rounded-xl flex justify-center items-center gap-2.5 cursor-pointer transform -translate-x-1/2 -translate-y-1/2">
          <div className="text-[#fcf7ef] text-base font-normal font-pridi">Claim</div>
        </div>
      )}

      <div className="flex flex-row">
        <div className="w-[30px] flex flex-col items-center pt-[2px] relative">
          <TaskListBoxStatus />
          <div className="absolute top-[11.5px] left-[14.5px] transform -translate-x-1/2 -translate-y-1/2 text-[#fcf7ef] text-[10px] font-bold font-pretendard">
            {taskStatus}
          </div>
        </div>
        <div className="flex-1 flex flex-col items-start pr-8">
          <div className={`${titleTextClassName} text-base font-semibold font-pretendard`}>{task.name}</div>
          <div
            className={`${titleTextClassName} text-[11px] font-normal font-pretendard leading-[13px] tracking-tight text-left`}
          >
            {task.description}
          </div>
        </div>
        <TaskListBoxDivider />
        <div className="w-[50px] flex flex-col justify-center items-center">
          <TaskListBoxFortunePoint className={`${taskListBoxFortunePointOpacity} mix-blend-multiply`} />
          <span className={`${pointTextClassName} text-sm font-bold font-pretendard`}>{task.reward_coins}</span>
        </div>
      </div>
    </button>
  );
};
