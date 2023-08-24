import { HttpStatusCode } from 'axios';
import { NavigateFunction } from 'react-router-dom';
import { toast } from 'react-toastify';
import { RestAPIException } from './call-api';

/**
 * only use this function to call main api or protected main api (not included auth api)
 */
function callApiWrapper<T>(
  callback: (...args: any) => Promise<T | void>,
  loadingSetter?: (isloading: boolean) => void,
  navigate?: NavigateFunction,
  throwError?: boolean
): (...args: any) => Promise<T | void> {
  return async (...callbackArgs: any) => {
    try {
      loadingSetter?.(true);
      const result = await callback(...callbackArgs);
      return result;
    } catch (err) {
      if (err instanceof RestAPIException) {
        if (err.status === HttpStatusCode.Unauthorized) {
          navigate?.('/auth/singin');
          return;
        }
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
