import { create } from 'zustand';
import { AlertState } from '../models/alert.model';

export const useAlertStore = create<AlertState>((set) => ({
  showAlert: false,
  alertMessage: '',
  alertType: null,
  openAlert: (message, type) =>
    set({
      showAlert: true,
      alertMessage: message,
      alertType: type,
    }),
  closeAlert: () =>
    set({
      showAlert: false,
      alertMessage: '',
      alertType: null,
    }),
}));
