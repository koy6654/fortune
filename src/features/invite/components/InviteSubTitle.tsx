import React from 'react';

interface InviteSubTitleProps {
  subtitle: string;
  children?: React.ReactNode;
}

export const InviteSubTitle = ({ subtitle, children }: InviteSubTitleProps) => {
  return (
    <div className="w-[70%] flex flex-row justify-center items-center mb-4">
      <div className="w-[60px] h-[1.40px] bg-[#a48b78]" />
      <div className="flex-1 flex flex-row justify-center text-[#181818] text-base font-medium font-pridi">
        {subtitle}
        {children}
      </div>
      <div className="w-[60px] h-[1.40px] bg-[#a48b78]" />
    </div>
  );
};
