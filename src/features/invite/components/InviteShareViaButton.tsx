import React from 'react';

interface InviteSubTitleProps {
  children: React.ReactElement<SVGElement>;
  onClick: () => void;
}

export const InviteShareViaButton = ({ children, onClick }: InviteSubTitleProps) => {
  return (
    <button
      className="flex items-center justify-center w-20 h-20 bg-white rounded-full border-2 border-b-[5px] border-[#c9a063]"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
