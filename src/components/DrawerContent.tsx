import React, { useContext } from 'react';
import { View, Text, Image } from 'react-native';
import {
  Headline,
  Drawer,
  List,
  IconButton,
  useTheme,
} from 'react-native-paper';
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
import { AddServerScreen } from '../screens/AddServerScreen';

export const DrawerContent = (props: DrawerContentComponentProps) => {
  const { currentUser, signout } = useContext(AuthContext);
  const { presentModalHandler } = useContext(BottomSheetContext);
  const { data, LoginServer, LogoutServer, getServerName, getServerIcon } =
    useContext(ServerContext);

  const { showActionSheetWithOptions } = useActionSheet();
  const theme = useTheme();

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
              title={getServerName(key)}
              description={key}
              left={() => (
                <View
                  style={[
                    {
                      width: 64,
                      height: 64,
                      padding: 3,
                      justifyContent: 'center',
                      alignItems: 'center',
                    },
                    data?.id === key
                      ? {
                          borderWidth: 3,
                          borderColor: theme.colors.primary,
                          borderRadius: 5,
                        }
                      : null,
                  ]}
                >
                  <Image
                    style={{
                      width: 50,
                      height: 50,
                      borderWidth: 0.5,
                      borderColor: '#ccc',
                      borderRadius: 5,
                    }}
                    source={{
                      uri: getServerIcon(key),
                    }}
                  />
                </View>
              )}
              right={() => (
                <IconButton
                  icon="dots-vertical"
                  size={20}
                  style={{ marginTop: 12 }}
                  onPress={() =>
                    showActionSheetWithOptions(
                      {
                        options: [
                          '招待コードのコピー',
                          'サーバーからログアウト',
                          'キャンセル',
                        ],
                        destructiveButtonIndex: 1,
                        cancelButtonIndex: 2,
                      },
                      (index) => {
                        switch (index) {
                          case 0: {
                            Clipboard.setString(key);
                            break;
                          }
                          case 1: {
                            LogoutServer(key);
                            break;
                          }
                          default: {
                            break;
                          }
                        }
                      }
                    )
                  }
                />
              )}
              onPress={() => {
                LoginServer(key);
                props.navigation.navigate('Home');
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
            presentModalHandler({
              snapPoints: ['94%'],
              component: () => <AddServerScreen />,
              backdrop: true,
            });
          }}
        />
        <DrawerItem
          icon={({ color, size }) => {
            return <Icon name="cog-outline" color={color} size={size} />;
          }}
          label="環境設定"
          onPress={() => {
            presentModalHandler({
              snapPoints: ['94%'],
              component: () => (
                <View style={{ flex: 1, alignItems: 'center' }}>
                  <Text>Hello world</Text>
                </View>
              ),
              backdrop: true,
            });
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
