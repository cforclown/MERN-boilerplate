import Swal from 'sweetalert2';

export interface ISwalArgs {
  title: string;
  showCancel?: boolean;
  cancelLabel?: string;
  confirmLabel?: string;
  onConfirmCallback: (...args: any) => any;
  onCancelCallback?(): void;
  successMsg?: string;
  failureMsg?: string;
}

export const swal = (args: ISwalArgs): Promise<void> => Swal.fire({
  title: args.title ?? 'Are you sure?',
  showCancelButton: true,
  cancelButtonText: args.cancelLabel ?? 'No',
  confirmButtonText: args.confirmLabel ?? 'Yes',
  preConfirm: () => args.onConfirmCallback?.(),
}).then((result) => {
  if (result.isConfirmed) {
    if (!result.value) {
      Swal.fire(args.failureMsg ?? 'Failed!', '', 'error');
    } else {
      Swal.fire(args.successMsg ?? 'Success!', undefined, 'success');
    }
  } else if (result.isDenied) {
    Swal.fire(args.failureMsg ?? 'Failed!', '', 'info');
  }
}).catch((err) => {
  if ((err instanceof Error) && err.message) {
    Swal.fire(`${args.failureMsg ?? 'Unexpected error occur'}: ${err.message}`, '', 'info');
  } else {
    Swal.fire(args.failureMsg ?? 'Failed!', '', 'info');
  }
});
