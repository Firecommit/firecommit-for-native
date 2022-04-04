import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TouchableOpacity } from 'react-native';
import { Avatar, Title } from 'react-native-paper';
import { DrawerContent } from './components/DrawerContent';
import { MaterialHeader } from './components/MaterialHeader';
import { MapScreen } from './screens/MapScreen';

export const DrawerNavigator = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen
        name="Home"
        component={MapScreen}
        options={{
          drawerType: 'slide',
          drawerStyle: { width: '85%' },
          header: ({ navigation }) => (
            <MaterialHeader>
              <TouchableOpacity
                onPress={() => {
                  navigation.openDrawer();
                }}
                style={{ marginLeft: 16, marginRight: 8 }}
              >
                <Avatar.Image
                  size={40}
                  source={{
                    uri: 'https://pbs.twimg.com/profile_images/952545910990495744/b59hSXUd_400x400.jpg',
                  }}
                />
              </TouchableOpacity>
              <Title>山羽歯科医院</Title>
            </MaterialHeader>
          ),
        }}
      />
    </Drawer.Navigator>
  );
};
