import React from 'react';

interface InviteFriendsListUserNameProps {
  userName: string;
}

export const InviteFriendsListUserName = ({ userName }: InviteFriendsListUserNameProps) => {
  return (
    <div className="w-full h-[30px] flex flex-row justify-center items-center pl-3 pr-2.5 py-2.5 bg-[#fcf7ef] rounded-xl border border-[#a48b78] gap-2.5">
      <span className="text-[#956134] text-sm font-medium font-pretendard"> {userName}</span>
    </div>
  );
};
