import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Login} from './Login';
import {useAuth} from '&/lib/auth';
import {StackNavigationProp} from '&/types';

export const VerNavigates = ({navigation}: StackNavigationProp) => {
  const {user} = useAuth();
  const Stack = createNativeStackNavigator();
  useEffect(() => {
    if (!user) navigation.navigate('auth');
  }, []);

  return (
    user && (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="login" component={Login} />
      </Stack.Navigator>
    )
  );
};
