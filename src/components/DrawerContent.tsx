import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { Headline, Drawer, List, IconButton } from 'react-native-paper';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useActionSheet } from '@expo/react-native-action-sheet';
import Clipboard from '@react-native-clipboard/clipboard';
import { AuthContext } from '../contexts/AuthProvider';
import { ServerContext } from '../contexts/ServerProvider';
import { BottomSheetContext } from '../contexts/BottomSheetProvider';

export const DrawerContent = (props: DrawerContentComponentProps) => {
  const { currentUser, signout } = useContext(AuthContext);
  const { presentModalHandler, showBottomSheet } =
    useContext(BottomSheetContext);
  const { data, LoginServer, LogoutServer, getServerName } =
    useContext(ServerContext);
  const { showActionSheetWithOptions } = useActionSheet();

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
              right={() => (
                <IconButton
                  icon="dots-horizontal"
                  size={18}
                  onPress={() =>
                    showActionSheetWithOptions(
                      {
                        options: ['コピー', '削除', 'キャンセル'],
                        destructiveButtonIndex: 1,
                        cancelButtonIndex: 2,
                      },
                      (index) => {
                        switch (index) {
                          case 0:
                            Clipboard.setString(key);
                            break;
                          case 1:
                            break;
                          default:
                            break;
                        }
                      }
                    )
                  }
                />
              )}
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
            showBottomSheet(
              <View style={{ flex: 1, alignItems: 'center' }}>
                <Text>Foo bar</Text>
              </View>
            );
            presentModalHandler();
          }}
        />
        <DrawerItem
          icon={({ color, size }) => {
            return <Icon name="cog-outline" color={color} size={size} />;
          }}
          label="環境設定"
          onPress={() => {
            showBottomSheet(
              <View style={{ flex: 1, alignItems: 'center' }}>
                <Text>Hello world</Text>
              </View>
            );
            presentModalHandler();
          }}
        />
        <DrawerItem
          icon={({ color, size }) => {
            return <Icon name="exit-to-app" color={color} size={size} />;
          }}
          label="サインアウト"
          onPress={() =>
            showActionSheetWithOptions(
              {
                options: ['サインアウト', 'キャンセル'],
                destructiveButtonIndex: 0,
                cancelButtonIndex: 1,
              },
              (index) => {
                switch (index) {
                  case 0:
                    signout();
                    LogoutServer();
                    break;
                  default:
                    break;
                }
              }
            )
          }
        />
      </Drawer.Section>
    </View>
  );
};
