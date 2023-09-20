import { IAppState } from '@/Store';
import { IAlertDialogState } from './AlertDialog';

export const selectAlertDialogState = (state: IAppState): IAlertDialogState => state.alertDialog;
