import { twMerge } from 'tailwind-merge';

export interface ITypographyH1Props {
  text: string;
  className?: string;
}

function TypographyH1({ text, className } : ITypographyH1Props): JSX.Element {
  return (
    <h1 
      className={twMerge('scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl', className)}
    >
      {text}
    </h1>
  );
}

export default TypographyH1;
