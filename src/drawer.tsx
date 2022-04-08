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
import { DialogContext } from './contexts/DialogProvider';

export const DrawerNavigator = () => {
  const Drawer = createDrawerNavigator();
  const { data } = useContext(ServerContext);
  const { currentUser } = useContext(AuthContext);
  const { displayError } = useContext(DialogContext);
  const [url, setUrl] = useState<string>('');

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
            })
            .catch((res) => displayError({ msg: res.message }));
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
                }}
                style={{ marginLeft: 16, marginRight: 8 }}
              >
                {url !== '' ? (
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
                ) : null}
              </TouchableOpacity>
              <Title>{data?.name}</Title>
            </MaterialHeader>
          ),
        }}
      />
    </Drawer.Navigator>
  );
};
