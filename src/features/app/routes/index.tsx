import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {useTheme} from 'react-native-paper';
import {MapNavigates} from '&/features/map';
import {UserNavigates} from '&/features/users';

export const AppContent = () => {
  const theme = useTheme();
  const Tab = createMaterialBottomTabNavigator();
  return (
    <Tab.Navigator
      shifting
      sceneAnimationEnabled
      activeColor={theme.colors.primary}
      barStyle={{backgroundColor: 'white', height: 82}}>
      <Tab.Screen
        name="map"
        component={MapNavigates}
        options={{tabBarIcon: 'google-maps'}}
      />
      <Tab.Screen
        name="profile"
        component={UserNavigates}
        options={{tabBarIcon: 'account'}}
      />
    </Tab.Navigator>
  );
};
