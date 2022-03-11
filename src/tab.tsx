import React, { FC } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useTheme } from 'react-native-paper';

import { UserStackNavigator } from './userstack';
import { DrawerNavigator } from './drawer';

export const BottomTabNavigator: FC = () => {
  const Tab = createMaterialBottomTabNavigator();
  const theme = useTheme();
  return (
    <Tab.Navigator
      shifting
      sceneAnimationEnabled={false}
      activeColor={theme.colors.primary}
      barStyle={{ backgroundColor: '#fff' }}
    >
      <Tab.Screen
        name="Map"
        component={DrawerNavigator}
        options={{ tabBarIcon: 'google-maps' }}
      />
      <Tab.Screen
        name="User"
        component={UserStackNavigator}
        options={{ tabBarIcon: 'account' }}
      />
    </Tab.Navigator>
  );
};
