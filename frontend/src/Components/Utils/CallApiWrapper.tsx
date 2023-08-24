import { toast } from 'react-toastify';
import { RestAPIException } from '../../Utils/call-api';

function CallApiWrapper<T>(handler: (...args: any) => Promise<T>, loadingSetter?: (isloading: boolean) => void): () => Promise<T | undefined> {
  return async (...args: any) => {
    try {
      if (loadingSetter) {
        loadingSetter(true);
      }
      const data = await handler(...args);
      return data;
    } catch (err) {
      if (err instanceof RestAPIException || err instanceof Error) {
        toast.error(err.message);
      }
    } finally {
      if (loadingSetter) {
        loadingSetter(false);
      }
    }
    return undefined;
  };
}

export default CallApiWrapper;
