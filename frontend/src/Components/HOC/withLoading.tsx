import { ComponentType, useState } from 'react';
import Loader from '@/Components/Loader/Loader.style';

export interface IWithLoadingProps {
  loading: boolean;
  setLoading(loading: boolean): void;
}

function withLoading<P extends IWithLoadingProps>(Component: ComponentType<P>, initialLoading?: boolean) {
  return function WithLoading(props: Omit<P, keyof IWithLoadingProps>) {
    const [loading, setLoading] = useState(!!initialLoading);
    
    return (
      <>
        <Component
          {...(props as P)} 
          loading={loading}
          setLoading={setLoading} 
        />
        {loading && (
          <div className='absolute w-full h-full left-0 top-0'>
            <Loader />
          </div>
        )}
      </>
    );
  };
}

export default withLoading;
