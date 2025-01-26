import React, { useEffect, useState } from 'react';
import { TaskCategory, TaskCategoryDivider } from './TaskCategory';
import { TaskListBox, TaskStatus } from './TaskListBox';
import { ReactComponent as TaskListBoxArrow } from 'assets/images/task/TaskListBoxArrow.svg';
import {
  TaskHistoryBackground,
  TaskHistoryBody,
  TaskHistoryHeader,
} from 'features/common/components/TaskHistoryCommon';
import { useFortuneTasks } from 'features/services/queries';
import { useFortuneTasksClaim, useFortuneTasksStore } from 'features/services/mutations';
import { FortuneTasksResponse } from 'features/services/service.model';
import { DEFAULT_MOCK_TASKS } from 'consts/mock';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export type FortuneTasksType = 'social' | 'basic' | 'onchain';

export const Task = () => {
  const [taskType, setTaskType] = useState<FortuneTasksType>('social');
  const [tasks, setTasks] = useState<FortuneTasksResponse[]>([]);
  const [clickedTask, setClickedTask] = useState<number>();

  const { data, isLoading, isError, error, refetch } = useFortuneTasks({ type: taskType });

  const { mutateAsync: mutateFortuneTasksStore } = useFortuneTasksStore();
  const { mutateAsync: mutateFortuneTasksClaim } = useFortuneTasksClaim();

  const getTaskStatus = (task: FortuneTasksResponse): TaskStatus => {
    if (task.is_rewarded === true) {
      return 'done';
    } else if (task.is_submitted === true) {
      return 'claim';
    } else if (task.is_submitted === false) {
      return 'todo';
    } else {
      return 'todo';
    }
  };

  const onClickTaskType = (type: FortuneTasksType) => {
    setTaskType(type);
  };

  const onClickTaskBox = async (task: FortuneTasksResponse) => {
    const status = getTaskStatus(task);

    if (status === 'todo') {
      onClickTasksStore(task.id, task.link);
    } else if (status === 'claim') {
      onClickTasksClaim(task.id, task.submitted_at);
    }
  };

  const onClickTasksStore = async (taskId: number, taskLink: string) => {
    const result = await mutateFortuneTasksStore({ taskid: taskId });

    if (result.success === true) {
      window.open(taskLink, '_blank');
    }
  };

  const onClickTasksClaim = (taskid: number, taskSubmittedAt: string | null) => {
    const now = dayjs();

    // 차후 수정될 수 있음
    const allowTime = dayjs(taskSubmittedAt).add(1, 'hours');
    const allowClaim = now.isAfter(allowTime);

    if (allowClaim === true) {
      mutateFortuneTasksClaim({ taskid }).then(() => refetch());
    } else {
      alert(`You can claim after ${allowTime.utc().format('YYYY-MM-DD HH:mm:ss (UTC)')}`);
    }
  };

  useEffect(() => {
    if (data) {
      setTasks(data);
    }
  }, [data, setTaskType]);

  return (
    <div className="flex-1 flex flex-col justify-center items-center relative">
      <TaskHistoryBackground>
        <TaskHistoryHeader className="justify-between">
          <TaskCategory listName="Social" selected={taskType === 'social'} onClick={() => onClickTaskType('social')} />
          <TaskCategoryDivider />
          <TaskCategory listName="Basic" selected={taskType === 'basic'} onClick={() => onClickTaskType('basic')} />
          <TaskCategoryDivider />
          <TaskCategory
            listName="On Chain"
            selected={taskType === 'onchain'}
            onClick={() => onClickTaskType('onchain')}
          />
        </TaskHistoryHeader>
        <TaskHistoryBody>
          {tasks.map((task) => (
            <TaskListBox task={task} getTaskStatus={getTaskStatus} onClickTaskBox={onClickTaskBox} />
          ))}
        </TaskHistoryBody>
        <div className="w-full flex flex-row justify-center items-center mt-[-2px]">
          {tasks.length >= 6 ? <TaskListBoxArrow /> : <></>}
        </div>
      </TaskHistoryBackground>
    </div>
  );
};
