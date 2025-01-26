interface TaskCategoryProps {
  listName: string;
  selected: boolean;
  onClick: () => void;
}

export const TaskCategory = ({ listName, selected, onClick }: TaskCategoryProps) => {
  let textColorClassName = 'text-[#a48b78]';

  if (selected === true) {
    textColorClassName = 'text-[#1b1b1b]';
  }

  return (
    <button
      className={`grow shrink basis-0 text-center ${textColorClassName} text-base font-semibold font-pridi`}
      onClick={onClick}
    >
      {listName}
    </button>
  );
};

export const TaskCategoryDivider = () => {
  return <div className="w-[3px] h-[17px] bg-[#c9a063] rounded-sm" />;
};
