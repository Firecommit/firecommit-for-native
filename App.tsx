/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import React, { useContext, FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { JoinScreen } from './src/screens/JoinScreen';
import { MapScreen } from './src/screens/MapScreen';
import { UserScreen } from './src/screens/UserScreen';
import { SignInScreen } from './src/screens/SignInScreen';
import { SignUpScreen } from './src/screens/SignUpScreen';

import { AuthProvider, AuthContext } from './src/contexts/AuthProvider';
import { JoinedProvider, JoinedContext } from './src/contexts/JoinedProvider';

const InnerApp: FC = () => {
  const { isSignedIn } = useContext(AuthContext);
  const { isJoined } = useContext(JoinedContext);
  const Stack = createNativeStackNavigator();

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {isSignedIn ? (
            isJoined ? (
              <>
                <Stack.Screen
                  name="Map"
                  component={MapScreen}
                  options={{ headerShown: true }}
                />
                <Stack.Screen
                  name="User"
                  component={UserScreen}
                  options={{ headerShown: true }}
                />
              </>
            ) : (
              <Stack.Screen name="Join" component={JoinScreen} />
            )
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

export const App = () => {
  return (
    <AuthProvider>
      <JoinedProvider>
        <InnerApp />
      </JoinedProvider>
    </AuthProvider>
  );
};
