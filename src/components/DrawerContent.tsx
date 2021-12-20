import React, { useContext } from 'react';
import { View } from 'react-native';
import { Headline, Drawer, List } from 'react-native-paper';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from '../contexts/AuthProvider';
import { ServerContext } from '../contexts/ServerProvider';

export const DrawerContent = (props: DrawerContentComponentProps) => {
  const { currentUser, signout } = useContext(AuthContext);
  const { data, LoginServer, LogoutServer, getServerName } =
    useContext(ServerContext);

  return (
    <View style={{ flex: 1, paddingTop: 52 }}>
      <Headline style={{ fontWeight: 'bold', paddingHorizontal: 16 }}>
        マップサーバー
      </Headline>
      <DrawerContentScrollView {...props}>
        <List.Section>
          {Object.keys({ ...currentUser.data?.workspace }).map((key) => (
            <List.Item
              style={data?.id === key ? { backgroundColor: '#eee' } : {}}
              key={key}
              title={getServerName(key)}
              description={key}
              left={() => <List.Icon icon="folder" />}
              onPress={() => {
                LoginServer(key);
                props.navigation.navigate('Tab');
              }}
            />
          ))}
        </List.Section>
      </DrawerContentScrollView>
      <Drawer.Section
        style={{
          marginBottom: 15,
          borderTopColor: '#f4f4f4',
          borderTopWidth: 1,
        }}
      >
        <DrawerItem
          icon={({ color, size }) => {
            return (
              <Icon name="plus-circle-outline" color={color} size={size} />
            );
          }}
          label="マップサーバーを追加する"
          onPress={() => {
            props.navigation.navigate('Add');
          }}
        />
        <DrawerItem
          icon={({ color, size }) => {
            return <Icon name="cog-outline" color={color} size={size} />;
          }}
          label="環境設定"
          onPress={() => {}}
        />
        <DrawerItem
          icon={({ color, size }) => {
            return <Icon name="exit-to-app" color={color} size={size} />;
          }}
          label="サインアウト"
          onPress={() => {
            signout();
            LogoutServer();
          }}
        />
      </Drawer.Section>
    </View>
  );
};
