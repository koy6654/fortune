import React from 'react';
import { ReactComponent as EarnedAlertSvg } from 'assets/images/alert/Earned.svg';
import { ReactComponent as OopsAlertSvg } from 'assets/images/alert/Oops.svg';
import { ReactComponent as CloseButtonSvg } from 'assets/images/alert/CloseButton.svg';
import { useAlertStore } from '../store';

const EarnedAlert = ({ message }: { message: string }) => {
  return (
    <>
      <EarnedAlertSvg />
      <div className="flex flex-row justify-between items-baseline gap-2 mt-3">
        <span className="text-[#231815] text-[22px] font-pridi-semibold">Earned</span>
        <span className="text-[#956134] text-[32px] font-pridi-semibold">{message}</span>
        <span className="text-[#231815] text-[22px] font-pridi-semibold">FRTN!</span>
      </div>
    </>
  );
};

const OopsAlert = ({ message }: { message?: string }) => {
  return (
    <>
      <OopsAlertSvg />
      <div className="flex flex-col justify-center items-center">
        <span className="text-[#956134] text-[34px] font-pridi-semibold">Oops!</span>
        <span className="text-[#231815] text-[22px] font-pridi-semibold">{message || 'Not quite there yet!'}</span>
      </div>
    </>
  );
};

export const Alert = () => {
  const { showAlert, alertMessage, alertType, closeAlert } = useAlertStore();

  if (!showAlert) return null;

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="flex flex-col justify-center items-center transform translate-y-[-5%]">
        <div className="w-[330px] h-[340px] flex flex-col justify-center items-center bg-[#fcf7ef] rounded-[22px] border-[#956134] border-2 border-b-4">
          {alertType === 'earned' ? <EarnedAlert message={alertMessage} /> : <OopsAlert message={alertMessage} />}
        </div>
        <CloseButtonSvg className="mt-[15px]" onClick={closeAlert} />
      </div>
    </div>
  );
};
