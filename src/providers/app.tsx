import React, {ReactNode, Suspense} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {ActionSheetProvider} from '@expo/react-native-action-sheet';
import {Spinner} from '&/components/Spinner';
import {AuthProvider} from '&/lib/auth';
import {VerifyProvider} from '&/lib/verify';

type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider = ({children}: AppProviderProps) => {
  const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: '#FC8132',
      accent: '#329CFC',
    },
  };
  return (
    <Suspense fallback={<Spinner size="lg" />}>
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <ActionSheetProvider>
            <AuthProvider>
              <VerifyProvider>
                <NavigationContainer>{children}</NavigationContainer>
              </VerifyProvider>
            </AuthProvider>
          </ActionSheetProvider>
        </PaperProvider>
      </SafeAreaProvider>
    </Suspense>
  );
};
