import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Signup} from './Signup';
import {Signin} from './Signin';

export const AuthNavigates = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="signin" component={Signin} />
      <Stack.Screen name="signup" component={Signup} />
    </Stack.Navigator>
  );
};
