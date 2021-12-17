import React, { FC } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContent } from './components/DrawerContent';
import { Header } from './components/Header';
import { BottomTabNavigator } from './tab';
import { AddServerScreen } from './screens/AddServerScreen';

export const DrawerNavigator = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen
        name="Tab"
        component={BottomTabNavigator}
        options={{
          drawerStyle: { width: '80%' },
          header: ({ navigation }) => <Header navigation={navigation} />,
        }}
      />
      <Drawer.Screen
        name="Add"
        component={AddServerScreen}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
};
