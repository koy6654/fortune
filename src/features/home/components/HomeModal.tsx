import { useFortuneUserFortune } from 'features/services/queries';
import { useEffect } from 'react';

interface HomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HomeModal(props: HomeModalProps) {
  // props
  const { isOpen, onClose } = props;

  // tanstack
  const { data, isLoading, isError, error } = useFortuneUserFortune();
  const fortuneMessage = data?.['fortune-message'];
  const fortuneNumber = [12, 6];

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return isOpen ? (
    <div className="fixed inset-0 bg-[rgba(139,69,19,0.7)] flex justify-center items-center z-50" onClick={handleClose}>
      <div className="bg-white rounded-lg p-6 shadow-lg w-[90%] max-w-md" onClick={(event) => event.stopPropagation()}>
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
            {fortuneNumber.map((number, index) => (
              <span key={`fortune-number-${index}`}>
                <i>{number}</i>
              </span>
            ))}
          </section>
        </div>
        <div data-name="">
          <span>icon1</span>
          <span>icon2</span>
          <span>icon3</span>
        </div>
        <div data-name="fortune-close">
          <button type="button" onClick={handleClose}>
            Close button
          </button>
        </div>
      </div>
    </div>
  ) : null;
}
