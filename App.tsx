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
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { JoinScreen } from './src/components/JoinScreen';
import { MapScreen } from './src/components/MapScreen';
import { UserScreen } from './src/components/UserScreen';
import { SignInScreen } from './src/components/SignInScreen';
import { SignUpScreen } from './src/components/SignUpScreen';

export const App = () => {
  const isSignedIn = true;
  const Stack = createNativeStackNavigator();
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {isSignedIn ? (
            <>
              <Stack.Screen name="Map" component={MapScreen} />
              <Stack.Screen name="Join" component={JoinScreen} />
              <Stack.Screen name="User" component={UserScreen} />
            </>
          ) : (
            <>
              <Stack.Screen name="SignIn" component={SignInScreen} />
              <Stack.Screen name="SignUp" component={SignUpScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
