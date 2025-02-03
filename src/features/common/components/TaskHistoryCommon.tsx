import React from 'react';

interface TaskHistoryProps {
  children: React.ReactNode;
}

export const TaskHistoryBackground = ({ children }: TaskHistoryProps) => {
  return <div className="w-[90%] h-full bg-[#fcf7ef]/80 rounded-tl-[14px] rounded-tr-[14px] px-3">{children}</div>;
};

export const TaskHistoryHeader = ({ className, children }: TaskHistoryProps & { className: string }) => {
  return <div className={`w-full min-h-[57px] flex-1 flex flex-row ${className} items-center`}>{children}</div>;
};

export const TaskHistoryBody = ({ children }: TaskHistoryProps) => {
  return (
    <div className="overflow-y-scroll overflow-x-hidden custom-scrollbar pr-3 flex flex-col justify-start items-center">
      <div className="w-full h-[388px]">{children}</div>
    </div>
  );
};
