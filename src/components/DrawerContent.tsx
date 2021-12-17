import React, { useContext } from 'react';
import { View } from 'react-native';
import { Headline, Drawer, Text } from 'react-native-paper';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from '../contexts/AuthProvider';
import { ServerContext } from '../contexts/ServerProvider';

export const DrawerContent = (props: DrawerContentComponentProps) => {
  const { signout } = useContext(AuthContext);
  const { data, LogoutServer } = useContext(ServerContext);

  return (
    <View style={{ flex: 1, padding: 16, paddingTop: 52 }}>
      <Headline style={{ fontWeight: 'bold', marginBottom: 16 }}>
        マップサーバー
      </Headline>
      <DrawerContentScrollView {...props}>
        <View>
          <Text>{data?.name}</Text>
        </View>
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
