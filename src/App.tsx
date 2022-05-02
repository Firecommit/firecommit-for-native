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
import {AppNavigates} from './navigates';
import {AppProvider} from './providers/app';

export const App = () => {
  return (
    <AppProvider>
      <AppNavigates />
    </AppProvider>
  );
};
