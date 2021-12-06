import React, { FC } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { DrawerContent } from './components/DrawerContent';
import { Header } from './components/Header';
import { BottomTabNavigator } from './tab';

export const DrawerNavigator: FC = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator drawerContent={() => <DrawerContent />}>
      <Drawer.Screen
        name="Tab"
        component={BottomTabNavigator}
        options={{
          header: ({ navigation }) => <Header navigation={navigation} />,
        }}
      />
    </Drawer.Navigator>
  );
};
