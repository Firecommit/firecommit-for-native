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

// Custom Provider
import { DialogProvider } from './src/contexts/DialogProvider';
import { AsyncStorageProvider } from './src/contexts/AsyncStorageProvider';
import { AuthProvider } from './src/contexts/AuthProvider';
import { ServerProvider } from './src/contexts/ServerProvider';

// Main
import { StackNavigator } from './src/stack';

export const App = () => {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <DialogProvider>
          <AsyncStorageProvider>
            <AuthProvider>
              <ServerProvider>
                <NavigationContainer>
                  <StackNavigator />
                </NavigationContainer>
              </ServerProvider>
            </AuthProvider>
          </AsyncStorageProvider>
        </DialogProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
};
