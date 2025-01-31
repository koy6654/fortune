import { htmlToImage } from 'common/libs';
import { useFortuneSync, useFortuneUserFortune } from 'features/services/queries';
import { useEffect, useRef, useState } from 'react';
import { ReactComponent as CloseIcon } from 'assets/images/home/home-modal-close-button.svg';
import { ReactComponent as DownloadIcon } from 'assets/images/home/home-modal-icon-download.svg';
import { ReactComponent as LinkIcon } from 'assets/images/home/home-modal-icon-link.svg';
import { ReactComponent as TwitterIcon } from 'assets/images/home/home-modal-icon-twitter.svg';
import { SyncResponse } from 'features/services/service.model';

interface HomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HomeModal(props: HomeModalProps) {
  // props
  const { isOpen, onClose } = props;
  const [fortuneMessage, setFortuneMessage] = useState<string>();
  // const [fortuneNumbers, setFortuneNumbers] = useState([12, 6]);

  const captureRef = useRef<HTMLDivElement>(null);

  // tanstack
  const {
    isLoading,
    data: loadedFortuneUserFortune,
    refetch: loadFortuneUserFortune,
  } = useFortuneUserFortune({}, false);
  const { refetch: loadFortuneSync } = useFortuneSync({}, false);

  useEffect(() => {
    async function fetch() {
      const data = (await loadFortuneUserFortune()).data;
      console.log(data);
      setFortuneMessage(data?.['fortune-message']);
    }
    if (isOpen) {
      fetch();
    }
  }, [isOpen, loadFortuneUserFortune]);

  const handleClose = async () => {
    if (onClose) {
      try {
        const loadedFortuenSync: SyncResponse | undefined = (await loadFortuneSync()).data;

        if (loadedFortuenSync) {
          onClose();
          console.log('[3] API Get => fortune sync', loadedFortuenSync);
        }
      } catch (error: unknown) {
        console.error(error);
      }
    }
  };

  const handleShare = (target: 'X' | 'clipboard' | 'download') => {
    if (target === 'X') {
      alert('X');
    }
    /** 이미지 핸들링 */
    if (target === 'clipboard' || target === 'download') {
      if (captureRef.current) {
        htmlToImage(captureRef.current, target);
      }
    }
  };

  return isOpen && loadedFortuneUserFortune ? (
    <div
      ref={captureRef}
      className="w-full h-full fixed inset-0 bg-home-modal-radial flex justify-center items-center z-50"
      onClick={handleClose}
    >
      <div className="w-full pt-[115px] px-[75px] pb-[80px] text-[#FFF]" onClick={(event) => event.stopPropagation()}>
        {isLoading ? (
          <div data-name="fortune-loading">is Loading...</div>
        ) : (
          <div data-name="fortune-result">
            <div data-name="fortune-message">
              <header className="flex items-center justify-between">
                <hr className="w-[50px] border-t border-[#BC9D66]" />
                <span className="text-[14px] text-[#F4DBBD] font-pridi leading-[27px] whitespace-nowrap">
                  <span className="font-light">Fortue</span> <span className="font-medium">Message</span>
                </span>
                <hr className="w-[50px] border-t border-[#BC9D66]" />
              </header>
              <section className="text-[18px] font-semibold font-pridi flex flex-col items-center mt-[15px]">
                <p className="text-[20px] leading-normal">“</p>
                <p className="leading-[24px] h-[72px] text-center">{fortuneMessage?.replaceAll('"', '')}</p>
                <p className="text-[20px] leading-normal">“</p>
              </section>
            </div>
            {/* <div data-name="fortune-number" className="mt-[36px]">
              <header className="flex items-center justify-between">
                <hr className="w-[50px] border-t border-[#BC9D66]" />
                <span className="text-[14px] text-[#F4DBBD] font-pridi leading-[27px] whitespace-nowrap">
                  <span className="font-light">Fortue</span> <span className="font-medium">Number</span>
                </span>
                <hr className="w-[50px] border-t border-[#BC9D66]" />
              </header>
              <section className="flex flex-row justify-center items-center gap-10 font-pridi text-[20px] text-[#231815] leading-[27px] font-medium mt-[18px]">
                {fortuneNumbers.map((number, index) => (
                  <span key={`fortune-number-${index}`}>
                    <i
                      data-name="circle"
                      className="flex justify-center items-center w-[55px] h-[55px] p-[10px] rounded-[50px] border border-[#E5AB38] bg-gradient-to-br from-[#FCF7EF] to-[#96938E] shadow-[0px_3px_4px_rgba(0,0,0,0.25)]"
                    >
                      {number}
                    </i>
                  </span>
                ))}
              </section>
            </div> */}
            <div data-name="fortune-share" className="mt-[80px] flex justify-around">
              <TwitterIcon onClick={() => handleShare('X')} />
              <LinkIcon onClick={() => handleShare('clipboard')} />
              <DownloadIcon onClick={() => handleShare('download')} />
            </div>
          </div>
        )}

        <div data-name="fortune-close" className="flex justify-center mt-[34px]">
          <CloseIcon onClick={handleClose} />
        </div>
      </div>
    </div>
  ) : null;
}
