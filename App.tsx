/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import { AuthProvider } from './src/contexts/AuthProvider';
import { JoinedProvider } from './src/contexts/JoinedProvider';

import { StackNavigator } from './src/stack';
import { AsyncStorageProvider } from './src/contexts/AsyncStorageProvider';

export const App = () => {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <AsyncStorageProvider>
          <AuthProvider>
            <JoinedProvider>
              <NavigationContainer>
                <StackNavigator />
              </NavigationContainer>
            </JoinedProvider>
          </AuthProvider>
        </AsyncStorageProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
};
