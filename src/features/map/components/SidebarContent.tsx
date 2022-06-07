import {DrawerContentScrollView} from '@react-navigation/drawer';
import React from 'react';
import {List} from 'react-native-paper';
import {
  ActionSheetOptions,
  useActionSheet,
} from '@expo/react-native-action-sheet';
import Clipboard from '@react-native-clipboard/clipboard';
import {useVerify} from '&/lib/verify';
import {useAuth} from '&/lib/auth';
import {ListItem} from '&/components/List';

export const SidebarContent = () => {
  const {user} = useAuth();
  const {workspace, workspaces, login, logout} = useVerify();
  const {showActionSheetWithOptions} = useActionSheet();
  return (
    <DrawerContentScrollView>
      <List.Section>
        {workspaces?.map(item => (
          <ListItem
            key={item.id}
            active={workspace?.id === item.id}
            title={item.name}
            subTitle={item.id}
            iconURL={item.iconURL}
            onPress={() => {
              if (user) login({uid: user.uid, code: item.id});
            }}
            onSetting={() => {
              const option: ActionSheetOptions = {
                options: [
                  '招待コードのコピー',
                  'サーバーからログアウト',
                  'キャンセル',
                ],
                destructiveButtonIndex: 1,
                cancelButtonIndex: 2,
              };
              const indexFn = (i?: number) => {
                if (i === 0) Clipboard.setString(item.id);
                if (i === 1) if (user) logout({uid: user.uid, code: item.id});
              };
              showActionSheetWithOptions(option, indexFn);
            }}
          />
        ))}
      </List.Section>
    </DrawerContentScrollView>
  );
};
