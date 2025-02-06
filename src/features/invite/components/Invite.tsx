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
import { SetTimeout } from 'types/type';

export const Invite = () => {
  // store
  const { user } = useFortuneSyncStore();

  // values
  const [copyAlert, setCopyAlert] = useState<boolean>(false);
  const [referredUsers, setReferredUsers] = useState<UserType[]>([]);
  const [page, setPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [scrollable, setScrollable] = useState(false);
  const timeoutIdRef = useRef<SetTimeout | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // tanstack
  const { data, isLoading, isError, error, refetch } = useRefferredUsers({ page }, hasMoreData);

  /**
   * #### handleSwipe
   * @description 스와이프
   * - 최초 스크롤이 없을 때에만 작동할 함수
   * - scrollable 이 false 일 때만 이 함수를 동작
   */
  const handleSwipe = useCallback(
    (e: TouchEvent) => {
      if (!hasMoreData || isLoading) return;

      // 터치 시작 Y 좌표
      const touchStartY = e.touches[0].clientY;

      const onTouchEnd = (endEvent: TouchEvent) => {
        // 터치가 끝난 지점의 Y 좌표
        const touchEndY = endEvent.changedTouches[0].clientY;

        // 위로 스와이프했을 때를 구현, 50px 이상 위로 스와이프 시, 페이지 변경
        if (touchStartY - touchEndY > 50) {
          setPage((prev) => prev + 1);
        }

        document.removeEventListener('touchend', onTouchEnd);
      };

      // handleSwipe 함수를 호출 할때 리스너 등록 > 삭제를 반복
      document.addEventListener('touchend', onTouchEnd);
    },
    [hasMoreData, isLoading]
  );

  /**
   * #### handleScroll
   * @description 스크롤
   */
  const handleScroll = useCallback(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer || isLoading || !hasMoreData) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollContainer;

    // scrollHeight: 전체 콘텐츠 높이
    // scrollTop: 현재 스크롤 위치
    // clientHeight: 화면에 보이는 영역의 높이
    // 5px 여유 추가

    if (scrollHeight - scrollTop <= clientHeight + 5) {
      setPage((prev) => prev + 1);
    }
  }, [isLoading, hasMoreData]);

  /**
   * 스크롤 가능 여부 감지 (스크롤이 생기면 `scrollable = true`)
   */
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    // scrollContainer.scrollHeight: 전체 콘텐츠(보이지 않는 부분을 포함)
    // scrollContainer.clientHeight: 화면에 보이는 영역
    const checkScrollable = () => {
      setScrollable(scrollContainer.scrollHeight > scrollContainer.clientHeight);
    };

    checkScrollable(); // 초기 체크

    /**
     * DOM 변경 감지
     * - 자식 요소 혹은 하위요소가 변경될 때 실시간으로 체크
     * - checkScrollable 함수 (스크롤이 필요한지 여부) > setScrollable(true) 로 setting
     */
    const observer = new MutationObserver(checkScrollable);
    // childList: 자식요소의 추가 및 제거 감지
    // subtree: 모든 하위요소 변화도 감지
    observer.observe(scrollContainer, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [referredUsers]);

  /**
   * scrollable 이 가능하지 않을 때는 최초 스와이프로 API 를 동작시킨다
   * scrollable 이 가능하면 스크롤을 감지하여 API 를 동작시킨다
   */
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    if (!scrollable) {
      scrollContainer.addEventListener('touchstart', handleSwipe);
    } else {
      scrollContainer.addEventListener('scroll', handleScroll);
    }

    return () => {
      scrollContainer.removeEventListener('touchstart', handleSwipe);
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, [scrollable, handleSwipe, handleScroll]);

  /**
   * 데이터 업데이트 감지 (subscribe tanstack's [data])
   * - 데이터를 누적시키며,
   * - last === current 이면 hasMoreData 불리언을 값 이용하여 handleScroll 함수에서 얼리 리턴으로 무한스크롤을 중단한다
   */
  useEffect(() => {
    if (data) {
      console.log(data);
      setReferredUsers((prev) => [...data.data, ...prev]); // 🛠 기존 리스트의 앞에 추가
      if (data.meta.last_page === data.meta.current_page) {
        setHasMoreData(false);
      }
    }
  }, [data]);

  /**
   * #### 공유 핸들러
   * @param {'telegram' | 'X' | 'clipboard'} - target
   */
  const handleShare = async (target: 'telegram' | 'X' | 'clipboard') => {
    if (target === 'telegram') {
      ShareOnTelegram(user);
    } else if (target === 'X') {
      ShareOnX();
    } else if (target === 'clipboard') {
      const isCopied = await ShareOnClipboard('this-is-the-text-copied-to-the-clipboard');
      if (isCopied) {
        setCopyAlert(true);
        if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);

        timeoutIdRef.current = setTimeout(() => {
          setCopyAlert(false);
          timeoutIdRef.current = null;
        }, 1500);
      }
    }
  };

  /** clipboard timeout 동작시키고 컴포넌트 언마운트 되었을 때를 대비한 클린업 */
  useEffect(() => {
    return () => {
      if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
    };
  }, []);

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

      {/* username 표시 영역(스크롤) */}
      <div className="w-[80%] h-[230px] bg-[#f4dbbd] rounded-xl border-2 border-[#a48b78]">
        <div
          ref={scrollContainerRef}
          data-name="infinity-scroll"
          className="overflow-y-auto w-full h-[204px] px-4 pt-4"
        >
          <div className="grid grid-cols-2 gap-2">
            {referredUsers.map((user, index) => (
              <InviteFriendsListUserName
                key={`invite-friend-key:${user.id}`}
                userNumber={String(index + 1).padStart(2, '0')}
                userName={user.username}
              />
            ))}
          </div>
        </div>

        {/* more(arrow) 및 로딩바 영역 */}
        <div className="w-full flex flex-row justify-center items-center py-[1px]">
          {isLoading && <Spinner width="8px" height="8px" />}
          {!isLoading && hasMoreData && <FriendsListArrow />}
        </div>
      </div>
    </div>
  );
};
