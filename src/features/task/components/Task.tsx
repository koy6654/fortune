import { useEffect, useState } from 'react';
import { TaskCategory, TaskCategoryDivider } from './TaskCategory';
import { TaskListBox, TaskStatus } from './TaskListBox';
import { ReactComponent as TaskListBoxArrow } from 'assets/images/task/TaskListBoxArrow.svg';
import {
  TaskHistoryBackground,
  TaskHistoryBody,
  TaskHistoryHeader,
} from 'features/common/components/TaskHistoryCommon';
import { useFortuneSync, useFortuneTasks } from 'features/services/queries';
import { useFortuneTasksClaim, useFortuneTasksStore } from 'features/services/mutations';
import { FortuneTasksResponse, SyncResponse } from 'features/services/service.model';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { useAlert } from 'features/alert';
import Spinner from 'features/spinner';
import useClaim from 'common/hooks/useClaim';
import { useFortuneSyncStore } from 'features/auth';

dayjs.extend(utc);

export type FortuneTasksType = 'social' | 'basic' | 'onchain';

export const Task = () => {
  const { setFortuneSync } = useFortuneSyncStore();

  const [taskType, setTaskType] = useState<FortuneTasksType>('social');
  const [tasks, setTasks] = useState<FortuneTasksResponse[]>([]);

  // util
  const { walletAddress, connectWallet, sendTransaction } = useClaim();

  const { showAlert } = useAlert();

  const { data, isLoading, isError, error, refetch } = useFortuneTasks({ type: taskType });

  const { refetch: loadFortuneSync } = useFortuneSync({}, false);
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

    console.log(status);
    if (status === 'todo') {
      onClickTasksStore(task.id, task.link);
    } else if (status === 'claim') {
      onClickTasksClaim(task.id, task.submitted_at, task.reward_coins);
    }
  };

  const onClickTasksStore = async (taskId: number, taskLink: string) => {
    const result = await mutateFortuneTasksStore({ taskid: taskId });

    if (result.success === true) {
      refetch(); // is_submitted, submitted_at refetch 를 갱신하기 위해, refetch
      window.open(taskLink, '_blank');
    }
  };

  const onClickTasksClaim = async (taskid: number, taskSubmittedAt: string | null, taskRewardCoins: number) => {
    const now = dayjs();

    // 차후 수정될 수 있음
    const allowTime = dayjs(taskSubmittedAt).add(1, 'hours');
    const allowClaim = now.isAfter(allowTime);

    if (allowClaim === true) {
      try {
        // FIXME: mock 모드로 진행할 수 있도록 주석처리 함

        /** [1] 지갑연결 */
        // const walletData = await connectWallet();
        // if (!walletData) {
        //   console.log('Failed to connect wallet');
        //   return;
        // }

        /** [2] transaction  */
        // const { Ui, address } = walletData;
        // const result = await sendTransaction(Ui, address, taskRewardCoins);

        /** [3] task/claim(post) */
        const { success, message } = await mutateFortuneTasksClaim({ taskid });

        // 성공
        if (success) {
          // [4] task 리스트의 is_rewarded 를 갱신하기 위해, refetch
          refetch();

          // [5] sync API 갱신 (잔고 갱신)
          const loadedFortuenSync: SyncResponse | undefined = (await loadFortuneSync()).data;
          if (loadedFortuenSync) {
            setFortuneSync(loadedFortuenSync);
            console.log('DailyCheck claim end => receive [/api/fortune/sync] data again', loadedFortuenSync);
          }

          /** [6] 알럿 표시 */
          showAlert(taskRewardCoins.toString(), 'earned');
        }
      } catch (error: unknown) {
        console.error(error);
      }
    } else {
      // alert(`You can claim after ${allowTime.utc().format('YYYY-MM-DD HH:mm:ss (UTC)')}`);
      showAlert(
        <>
          <div>You can claim after</div>
          <div>{allowTime.utc().format('YYYY-MM-DD HH:mm:ss')} (UTC)</div>
        </>,
        'oops'
      );
    }
  };

  useEffect(() => {
    if (data) {
      setTasks(data);
    } else if (isError || error) {
      showAlert('Something went wrong!', 'oops');
    }
  }, [data, isError, error, showAlert]);

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
          {isLoading ? (
            <Spinner width="50px" height="50px" thick={2} />
          ) : (
            <>
              {tasks.map((task) => (
                <TaskListBox
                  key={`task-list-box-${task.id}`}
                  task={task}
                  getTaskStatus={getTaskStatus}
                  onClickTaskBox={onClickTaskBox}
                />
              ))}
            </>
          )}
        </TaskHistoryBody>
        <div className="w-full flex flex-row justify-center items-center mt-[-2px]">
          {tasks.length >= 6 ? <TaskListBoxArrow /> : <></>}
        </div>
      </TaskHistoryBackground>
    </div>
  );
};
