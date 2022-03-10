import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContent } from './components/DrawerContent';
import { Header } from './components/Header';
import { BottomTabNavigator } from './tab';

export const DrawerNavigator = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen
        name="Map"
        component={BottomTabNavigator}
        options={{
          drawerType: 'slide',
          drawerStyle: { width: '85%' },
          header: ({ navigation }) => <Header navigation={navigation} />,
        }}
      />
    </Drawer.Navigator>
  );
};
