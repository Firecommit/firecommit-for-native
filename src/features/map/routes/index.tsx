import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import {AppHeader} from '&/components/AppHeader';
import {Floor} from './Floor';
import {useVerify} from '&/lib/verify';
import {Sidebar} from '../components/Sidebar';

export const MapNavigates = () => {
  const {workspace} = useVerify();
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      drawerContent={Sidebar}
      screenOptions={{
        drawerType: 'slide',
        drawerStyle: {width: '85%'},
        // eslint-disable-next-line react/no-unstable-nested-components
        header: props => <AppHeader type="drawer" {...props} />,
      }}>
      <Drawer.Screen
        name="floor"
        component={Floor}
        options={{title: workspace?.name}}
      />
    </Drawer.Navigator>
  );
};
