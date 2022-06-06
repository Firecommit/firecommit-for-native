import {DrawerContentScrollView} from '@react-navigation/drawer';
import React from 'react';
import {IconButton, List} from 'react-native-paper';
import {useVerify} from '&/lib/verify';
import {useAuth} from '&/lib/auth';
import {ListIcon} from './ListIcon';
import {ListItem} from './ListItem';

export const SidebarContent = () => {
  const {user} = useAuth();
  const {workspace, workspaces, login} = useVerify();
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
            onSetting={() => {}}
          />
        ))}
      </List.Section>
    </DrawerContentScrollView>
  );
};
