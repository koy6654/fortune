import React from 'react';
import { InviteSubTitle } from './InviteSubTitle';
import { InviteShareViaButton } from './InviteShareViaButton';
import { ReactComponent as Telegram } from 'assets/images/invite/Telegram.svg';
import { ReactComponent as Twitter } from 'assets/images/invite/Twitter.svg';
import { ReactComponent as LinkLine } from 'assets/images/invite/LinkLine.svg';
import { ReactComponent as FriendsListArrow } from 'assets/images/invite/FriendsListArrow.svg';
import { InviteFriendsListUserName } from './InviteFriendsListUserName';
import { DEFAULT_SHARE_MESSAGE } from 'consts/fortune';
import { botDomain } from 'consts';
import { useFortuneSyncStore } from 'features/auth';

export const Invite = () => {
  // get auth store
  const { user } = useFortuneSyncStore();

  const userNames: string[] = [
    '00 User name1',
    '00 User name1',
    '00 User name1',
    '00 User name1',
    '00 User name1',
    '00 User name1',
    '00 User name1',
    '00 User name1',
    '00 User name1',
    '00 User name1',
  ];

  const handleShare = (target: 'telegram' | 'X' | 'clipboard') => {
    if (target === 'telegram') {
      if (user && window.Telegram) {
        const shareMessage = encodeURI(DEFAULT_SHARE_MESSAGE);
        const telegram_id = user.telegram_id;

        const referralLink = `${botDomain}/?start_param=ref${telegram_id}`;

        Telegram.WebApp.openTelegramLink(`https://t.me/share/url?text=${shareMessage}&url=${referralLink}`);
      }
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-center items-center relative">
      <InviteSubTitle subtitle="Share via" />
      <div className="flex flex-row justify-between items-center gap-5 mb-8">
        <InviteShareViaButton onClick={() => handleShare('telegram')} children={<Telegram />} />
        <InviteShareViaButton onClick={() => handleShare('X')} children={<Twitter />} />
        <InviteShareViaButton onClick={() => handleShare('clipboard')} children={<LinkLine />} />
      </div>

      <InviteSubTitle subtitle="Friends List">
        <span className="text-[#754a25] text-base font-pridi-semibold ml-1 tracking-[0.02em]">00</span>
      </InviteSubTitle>
      <div className="w-[80%] h-[230px] bg-[#f4dbbd] rounded-xl border-2 border-[#a48b78] px-4 pt-4 mb-auto">
        <div className="grid grid-cols-2 gap-2">
          {userNames.map((userName, index) => (
            <InviteFriendsListUserName key={index} userName={userName} />
          ))}
        </div>
        <div className="w-full flex flex-row justify-center items-center pt-2">
          <FriendsListArrow />
        </div>
      </div>
    </div>
  );
};
