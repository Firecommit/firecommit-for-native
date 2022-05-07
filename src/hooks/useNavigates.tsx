import React from 'react';
import {ParamListBase} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigatesType} from '&/types';

export const useNavigates = <T extends ParamListBase>(
  navigates: NavigatesType<T>,
  init?: Extract<keyof T, string>,
) => {
  const Stack = createNativeStackNavigator<T>();
  return (
    <Stack.Navigator initialRouteName={init}>
      {navigates.map(nav => (
        <Stack.Screen
          key={nav.name}
          name={nav.name}
          component={nav.component}
          options={nav.options}
        />
      ))}
    </Stack.Navigator>
  );
};
