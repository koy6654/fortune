import React from 'react';

interface InviteSubTitleProps {
  children: React.ReactElement<SVGElement>;
}

export const InviteShareViaButton = ({ children }: InviteSubTitleProps) => {
  return (
    <div className="flex items-center justify-center w-20 h-20 bg-white rounded-full border-2 border-b-[5px] border-[#c9a063]">
      {children}
    </div>
  );
};
