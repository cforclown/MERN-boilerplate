import { TFunction } from 'i18next';
import { ComponentType } from 'react';
import { useTranslation } from 'react-i18next';

export interface IWithLocaleProps {
  t: TFunction<'translation', undefined>;
}

function withLocale<P extends IWithLocaleProps>(Component: ComponentType<P>) {
  return function WithLocale(props: Omit<P, keyof IWithLocaleProps>) {
    const { t } = useTranslation();

    return (
      <Component 
        {...(props as P)} 
        t={t} 
      />
    );
  };
}

export default withLocale;
