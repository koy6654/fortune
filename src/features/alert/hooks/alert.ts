import { ReactNode } from 'react';
import { useAlertStore } from '../store';

export const useAlert = () => {
  const { openAlert, closeAlert } = useAlertStore();

  const showAlert = (message: ReactNode, type: 'earned' | 'oops') => {
    openAlert(message, type);
  };

  return { showAlert, closeAlert };
};
