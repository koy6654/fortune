interface InviteFriendsListUserNameProps {
  userNumber: string;
  userName: string;
}

export const InviteFriendsListUserName = ({ userNumber, userName }: InviteFriendsListUserNameProps) => {
  return (
    <div className="w-full h-[30px] flex flex-row justify-left items-center pl-[12px] pr-[10px] py-[10px] bg-[#fcf7ef] rounded-xl border border-[#a48b78]">
      <span className="text-[#956134] text-[14px] font-medium font-pretendard">
        {userNumber}&nbsp;&nbsp;{userName}
      </span>
    </div>
  );
};
