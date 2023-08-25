import { RestAPIException } from '@/Utils/call-api';
import { toast } from 'react-toastify';

function callApiWrapper<T>(
  callback: (...args: any) => Promise<T | void>,
  loadingSetter?: (isloading: boolean) => void,
  throwError?: boolean
): (...args: any) => Promise<T | void> {
  return async (...callbackArgs: any) => {
    try {
      loadingSetter?.(true);
      const result = await callback(...callbackArgs);
      return result;
    } catch (err) {
      if (err instanceof RestAPIException) {
        if (err.message) {
          toast.error(err.message);
        }
        if (throwError) {
          loadingSetter?.(false);
          throw err;
        }
      } else {
        // eslint-disable-next-line no-console
        console.error(err);
      }
    } finally {
      loadingSetter?.(false);
    }
  };
}

export default callApiWrapper;
