import { htmlToImage } from 'common/libs';
import { useFortuneUserFortune } from 'features/services/queries';
import { useEffect, useRef, useState } from 'react';

interface HomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HomeModal(props: HomeModalProps) {
  // props
  const { isOpen, onClose } = props;
  const [fortuneMessage, setFortuneMessage] = useState<any>();
  const [fortuneNumbers, setFortuneNumbers] = useState([12, 6]);

  const captureRef = useRef<HTMLDivElement>(null);

  // tanstack
  const {
    isLoading,
    data: loadedFortuneUserFortune,
    refetch: loadFortuneUserFortune,
  } = useFortuneUserFortune({}, false);

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

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleShare = (target: 'X' | 'link' | 'download') => {
    if (target === 'X') {
      alert('X');
    }
    if (target === 'link') {
      alert('link');
    }
    if (target === 'download') {
      if (captureRef.current) {
        htmlToImage(captureRef.current);
      }
    }
  };

  return isOpen && loadedFortuneUserFortune ? (
    <div className="fixed inset-0 bg-[rgba(139,69,19,0.7)] flex justify-center items-center z-50" onClick={handleClose}>
      <div className="bg-white rounded-lg p-6 shadow-lg w-[90%] max-w-md" onClick={(event) => event.stopPropagation()}>
        {isLoading ? (
          <div data-name="fortune-loading">is Loading...</div>
        ) : (
          <div data-name="fortune-result" ref={captureRef}>
            <div data-name="fortune-message">
              <header>Fortue Message</header>
              <section>
                <p>"</p>
                <p>{fortuneMessage}</p>
                <p>"</p>
              </section>
            </div>
            <div data-name="fortune-number">
              <header>Fortue Number</header>
              <section className="flex justify-center gap-4 text-xl text-gray-700">
                {fortuneNumbers.map((number, index) => (
                  <span key={`fortune-number-${index}`}>
                    <i>{number}</i>
                  </span>
                ))}
              </section>
            </div>
            <div data-name="fortune-share">
              <span onClick={() => handleShare('X')}>icon1 X</span>
              <span onClick={() => handleShare('link')}>icon2 클립보드</span>
              <span onClick={() => handleShare('download')}>icon3 다운로드</span>
            </div>
          </div>
        )}

        <div data-name="fortune-close">
          <button type="button" onClick={handleClose}>
            Close button
          </button>
        </div>
      </div>
    </div>
  ) : null;
}
