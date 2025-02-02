import { ReactNode } from 'react';

export interface AlertState {
  showAlert: boolean;
  alertMessage: ReactNode;
  alertType: 'earned' | 'oops' | null;
  openAlert: (message: ReactNode, type: 'earned' | 'oops') => void;
  closeAlert: () => void;
}
