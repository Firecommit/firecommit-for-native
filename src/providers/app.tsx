import React, {ReactNode, Suspense} from 'react';
import {Spinner} from '&/components/Spinner';

type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider = ({children}: AppProviderProps) => {
  return <Suspense fallback={<Spinner size="lg" />}>{children}</Suspense>;
};
