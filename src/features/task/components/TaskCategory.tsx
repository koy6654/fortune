import React from 'react';

interface TaskCategoryProps {
  listName: string;
  seleted: boolean;
}

export const TaskCategory = ({ listName, seleted }: TaskCategoryProps) => {
  let textColorClassName = 'text-[#a48b78]';

  if (seleted === true) {
    textColorClassName = 'text-[#1b1b1b]';
  }

  return (
    <div className={`grow shrink basis-0 text-center ${textColorClassName} text-base font-semibold font-pridi`}>
      {listName}
    </div>
  );
};

export const TaskCategoryDivider = () => {
  return <div className="w-[3px] h-[17px] bg-[#c9a063] rounded-sm" />;
};
