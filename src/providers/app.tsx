import React, {ReactNode, Suspense} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Spinner} from '&/components/Spinner';
import {AuthProvider} from '&/lib/auth';

type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider = ({children}: AppProviderProps) => {
  return (
    <Suspense fallback={<Spinner size="lg" />}>
      <AuthProvider>
        <NavigationContainer>{children}</NavigationContainer>
      </AuthProvider>
    </Suspense>
  );
};
