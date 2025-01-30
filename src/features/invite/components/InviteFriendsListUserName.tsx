interface InviteFriendsListUserNameProps {
  userNumber: number;
  userName: string;
}

export const InviteFriendsListUserName = ({ userNumber, userName }: InviteFriendsListUserNameProps) => {
  return (
    <div className="w-full h-[34px] flex flex-row justify-center items-center pl-3 pr-2.5 py-2.5 bg-[#fcf7ef] rounded-xl border border-[#a48b78]">
      <span className="text-[#956134] text-[16px] font-medium font-pretendard">
        {userNumber}&nbsp;&nbsp;{userName}
      </span>
    </div>
  );
};
