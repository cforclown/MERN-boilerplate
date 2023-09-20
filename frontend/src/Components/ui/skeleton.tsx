import { cn } from '@/Utils/utils';

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-[#0000002f]', className)}
      {...props}
    />
  );
}

export { Skeleton };
