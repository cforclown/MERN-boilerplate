import Loader from '@/Components/Loader/Loader.style';
import { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

export interface IContentWrapper {
  loading?: boolean;
  className?: string;
}

function ContentWrapper({ loading, className, children }: PropsWithChildren<IContentWrapper>) {
  return (
    <>
      <div className={twMerge('relative w-full p-4', className)}>
        {children}
      </div>
      {loading && (
        <div className='absolute w-full h-full left-0 top-0'>
          <Loader />
        </div>
      )}
    </>
  );
}

export default ContentWrapper;
