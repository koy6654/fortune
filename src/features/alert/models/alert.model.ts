export interface AlertState {
  showAlert: boolean;
  alertMessage: string;
  alertType: 'earned' | 'oops' | null;
  openAlert: (message: string, type: 'earned' | 'oops') => void;
  closeAlert: () => void;
}
