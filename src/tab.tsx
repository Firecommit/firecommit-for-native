import React, { FC } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useTheme } from 'react-native-paper';

import { MapScreen } from './screens/MapScreen';
import { UserScreen } from './screens/UserScreen';

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
        component={MapScreen}
        options={{ tabBarIcon: 'google-maps' }}
      />
      <Tab.Screen
        name="User"
        component={UserScreen}
        options={{ tabBarIcon: 'shield-account-outline' }}
      />
    </Tab.Navigator>
  );
};
