import React from 'react';
import { TaskCategory, TaskCategoryDivider } from './TaskCategory';
import { TaskListBox } from './TaskListBox';
import { ReactComponent as TaskListBoxArrow } from 'assets/images/task/TaskListBoxArrow.svg';
import {
  TaskHistoryBackground,
  TaskHistoryBody,
  TaskHistoryHeader,
} from 'features/common/components/TaskHistoryCommon';

export const Task = () => {
  return (
    <div className="flex-1 flex flex-col justify-center items-center relative">
      <TaskHistoryBackground>
        <TaskHistoryHeader>
          <TaskCategory listName="Social" selected={true} />
          <TaskCategoryDivider />
          <TaskCategory listName="Basic" selected={false} />
          <TaskCategoryDivider />
          <TaskCategory listName="On Chain" selected={false} />
        </TaskHistoryHeader>
        <TaskHistoryBody>
          <div className="max-h-[388px]">
            <TaskListBox
              title="Share Fortune on Social"
              description="Connect your Web3 wallet to the Scroll Fortune platform."
              point={200}
              status="todo"
            />
            <TaskListBox
              title="Share Fortune on Social"
              description="Connect your Web3 wallet to the Scroll Fortune platform."
              point={200}
              status="todo"
            />
            <TaskListBox
              title="Share Fortune on Social"
              description="Connect your Web3 wallet to the Scroll Fortune platform."
              point={200}
              status="claim"
            />
            <TaskListBox
              title="Share Fortune on Social"
              description="Connect your Web3 wallet to the Scroll Fortune platform."
              point={200}
              status="claim"
            />
            <TaskListBox
              title="Share Fortune on Social"
              description="Connect your Web3 wallet to the Scroll Fortune platform."
              point={200}
              status="disabled"
            />
            <TaskListBox
              title="Share Fortune on Social"
              description="Connect your Web3 wallet to the Scroll Fortune platform."
              point={200}
              status="disabled"
            />
            <TaskListBox
              title="Share Fortune on Social"
              description="Connect your Web3 wallet to the Scroll Fortune platform."
              point={200}
              status="disabled"
            />
            <TaskListBox
              title="Share Fortune on Social"
              description="Connect your Web3 wallet to the Scroll Fortune platform."
              point={200}
              status="disabled"
            />
            <TaskListBox
              title="Share Fortune on Social"
              description="Connect your Web3 wallet to the Scroll Fortune platform."
              point={200}
              status="disabled"
            />
            <TaskListBox
              title="Share Fortune on Social"
              description="Connect your Web3 wallet to the Scroll Fortune platform."
              point={200}
              status="disabled"
            />
            <TaskListBox
              title="Share Fortune on Social"
              description="Connect your Web3 wallet to the Scroll Fortune platform."
              point={200}
              status="disabled"
            />
          </div>
        </TaskHistoryBody>
        <div className="w-full flex flex-row justify-center items-center mt-[-5px]">
          <TaskListBoxArrow />
        </div>
      </TaskHistoryBackground>
    </div>
  );
};
