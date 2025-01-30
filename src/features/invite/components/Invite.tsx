import { useEffect, useState, useCallback, useRef } from 'react';
import { InviteSubTitle } from './InviteSubTitle';
import { InviteShareViaButton } from './InviteShareViaButton';
import { ReactComponent as Telegram } from 'assets/images/invite/Telegram.svg';
import { ReactComponent as Twitter } from 'assets/images/invite/Twitter.svg';
import { ReactComponent as LinkLine } from 'assets/images/invite/LinkLine.svg';
import { ReactComponent as FriendsListArrow } from 'assets/images/invite/FriendsListArrow.svg';
import { ReactComponent as ShareViaCopyArrow } from 'assets/images/invite/ShareViaCopyArrow.svg';
import { InviteFriendsListUserName } from './InviteFriendsListUserName';
import { useRefferredUsers } from 'features/services/queries';
import { UserType } from 'features/services/service.model';
import { useFortuneSyncStore } from 'features/auth';
import { ShareOnClipboard, ShareOnTelegram, ShareOnX } from '../libs/shareFunctions';
import Spinner from 'features/spinner';

export const Invite = () => {
  const { user } = useFortuneSyncStore();

  const [copyAlert, setCopyAlert] = useState<boolean>(false);

  const [page, setPage] = useState(1);
  const [scrollable, setScrollable] = useState(true);

  const [referredUsers, setReferredUsers] = useState<UserType[]>([]);
  const { data, isLoading, isError, error, refetch } = useRefferredUsers({ page }, scrollable);

  const handleShare = async (target: 'telegram' | 'X' | 'clipboard') => {
    if (target === 'telegram') {
      ShareOnTelegram(user);
    } else if (target === 'X') {
      ShareOnX();
    } else if (target === 'clipboard') {
      const isCopied = await ShareOnClipboard('this-is-the-text-copied-to-the-clipboard');
      if (isCopied) {
        setCopyAlert(true);
      }
    }
  };

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer || !isLoading || !scrollable) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollContainer;

    if (scrollTop + clientHeight >= scrollHeight - 10) {
      setPage((prev) => prev + 1);
    }
  }, [isLoading, scrollable]);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    scrollContainer.addEventListener('scroll', handleScroll);
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (data) {
      setReferredUsers((prev) => [...prev, ...data.data]);

      if (data.meta.last_page === data.meta.current_page) {
        setScrollable(false);
      }
    }
  }, [data]);

  useEffect(() => {
    if (copyAlert) {
      setTimeout(() => {
        setCopyAlert(false);
      }, 1500);
    }
  }, [copyAlert]);

  return (
    <div className="flex-1 flex flex-col justify-center items-center relative">
      <InviteSubTitle subtitle="Share via" />
      <div className="flex flex-row justify-between items-center gap-5 mb-8">
        <InviteShareViaButton onClick={() => handleShare('telegram')} children={<Telegram />} />
        <InviteShareViaButton onClick={() => handleShare('X')} children={<Twitter />} />
        <div className="flex flex-col relative">
          {copyAlert && (
            <>
              <div className="absolute top-[-45px] left-1/2 transform -translate-x-1/2 w-[90px] h-[38px] p-2.5 bg-[#956134] rounded-[14px] flex justify-center items-center gap-2.5 animate-popup">
                <div className="text-white text-base font-semibold font-pretendard">Copied!</div>
              </div>
              <ShareViaCopyArrow className="absolute top-[-15px] left-1/2 transform -translate-x-1/2" />
            </>
          )}
          <InviteShareViaButton onClick={() => handleShare('clipboard')} children={<LinkLine />} />
        </div>
      </div>

      <InviteSubTitle subtitle="Friends List">
        <span className="text-[#754a25] text-base font-pridi-semibold ml-1 tracking-[0.02em]">
          {data?.meta.total || '00'}
        </span>
      </InviteSubTitle>
      <div
        ref={scrollContainerRef}
        className="w-[80%] h-[230px] bg-[#f4dbbd] rounded-xl border-2 border-[#a48b78] px-4 pt-4 mb-auto overflow-y-auto"
      >
        <div className="grid grid-cols-2 gap-2">
          {referredUsers.map((user, index) => (
            <InviteFriendsListUserName key={index} userNumber={index} userName={user.usernames} />
          ))}
        </div>

        <div className="w-full flex flex-row justify-center items-center pt-2">
          {isLoading === true ? (
            <Spinner width="8px" height="8px" />
          ) : scrollable ? (
            <FriendsListArrow />
          ) : (
            <div className="h-2" />
          )}
        </div>
      </div>
    </div>
  );
};
