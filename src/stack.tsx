import React, { useContext, FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from './contexts/AuthProvider';
import { JoinedContext } from './contexts/JoinedProvider';
import { DrawerNavigator } from './drawer';

import { JoinScreen } from './screens/JoinScreen';
import { SignInScreen } from './screens/SignInScreen';
import { SignUpScreen } from './screens/SignUpScreen';

export const StackNavigator: FC = () => {
  const { isSignedIn } = useContext(AuthContext);
  const { isJoined } = useContext(JoinedContext);
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isSignedIn ? (
        isJoined ? (
          <Stack.Screen name="Drawer" component={DrawerNavigator} />
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
  );
};
