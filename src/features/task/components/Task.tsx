import React from 'react';
import { TaskCategory, TaskCategoryDivider } from './TaskCategory';
import { TaskListBox } from './TaskListBox';
import { ReactComponent as TaskListBoxArrow } from 'assets/images/task/TaskListBoxArrow.svg';

export const Task = () => {
  return (
    <div className="flex-1 flex flex-col justify-center items-center relative">
      <div className="w-[90%] h-[462px] bg-[#fcf7ef]/80 rounded-tl-[14px] rounded-tr-[14px] px-2 flex flex-row">
        <div className="flex-1 h-full overflow-y-scroll scrollbar-hide relative pl-2 pr-4">
          <div className="h-[57px] flex flex-row justify-between items-center">
            <TaskCategory listName="Social" seleted={true} />
            <TaskCategoryDivider />
            <TaskCategory listName="Basic" seleted={false} />
            <TaskCategoryDivider />
            <TaskCategory listName="On Chain" seleted={false} />
          </div>
          <div className="flex flex-col justify-center items-center">
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
          </div>
          <div className="w-full flex flex-row justify-center items-center mt-[-10px]">
            <TaskListBoxArrow />
          </div>
        </div>
        <div className="w-[5px] h-full bg-[#bc9d66]/20 rounded relative">
          <div
            className="w-[5px] h-[66px] bg-[#bc9d66] rounded border border-black absolute"
            style={{ top: '0' }}
          ></div>
        </div>
      </div>
    </div>
  );
};
