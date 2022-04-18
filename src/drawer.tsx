import React, { useContext, useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Image, TouchableOpacity } from 'react-native';
import { Title } from 'react-native-paper';
import { DrawerContent } from './components/DrawerContent';
import { MaterialHeader } from './components/MaterialHeader';
import { MapScreen } from './screens/MapScreen';
import { ServerContext } from './contexts/ServerProvider';
import { AuthContext } from './contexts/AuthProvider';
import { auth, storage } from '../firebase';
import { BottomSheetContext } from './contexts/BottomSheetProvider';

export const DrawerNavigator = () => {
  const [url, setUrl] = useState<string>(
    'https://firebasestorage.googleapis.com/v0/b/firecommit-1e1d5.appspot.com/o/icons%2Fdefault_server.png?alt=media&token=e4606cfd-da50-4068-9f71-316e3d8846b8'
  );

  const { data } = useContext(ServerContext);
  const { currentUser } = useContext(AuthContext);
  const { closeModalHandler } = useContext(BottomSheetContext);

  const Drawer = createDrawerNavigator();

  useEffect(() => {
    if (data && currentUser.auth) {
      auth.onAuthStateChanged((user) => {
        if (user) {
          storage
            .ref()
            .child(`icons/${data.id}.png`)
            .getDownloadURL()
            .then((res) => {
              setUrl(res);
            });
        }
      });
    }
  }, [data, currentUser]);

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
                  closeModalHandler();
                }}
                style={{ marginLeft: 16, marginRight: 8 }}
              >
                <Image
                  style={{
                    borderWidth: 0.5,
                    borderColor: '#ccc',
                    borderRadius: 5,
                  }}
                  width={40}
                  height={40}
                  source={{
                    uri: url,
                  }}
                />
              </TouchableOpacity>
              <Title>{data?.name}</Title>
            </MaterialHeader>
          ),
        }}
      />
    </Drawer.Navigator>
  );
};
