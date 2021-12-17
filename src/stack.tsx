import React, { useContext, FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from './contexts/AuthProvider';
import { DrawerNavigator } from './drawer';

import { LoginServerScreen } from './screens/LoginServerScreen';
import { SignInScreen } from './screens/SignInScreen';
import { SignUpScreen } from './screens/SignUpScreen';
import { ServerContext } from './contexts/ServerProvider';

export const StackNavigator: FC = () => {
  const { isSignedIn } = useContext(AuthContext);
  const { isLogin } = useContext(ServerContext);
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="Drawer"
      screenOptions={{ headerShown: false }}
    >
      {isSignedIn ? (
        isLogin ? (
          <Stack.Screen name="Drawer" component={DrawerNavigator} />
        ) : (
          <Stack.Screen name="Join" component={LoginServerScreen} />
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
