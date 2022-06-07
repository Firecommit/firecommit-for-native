/* eslint-disable react/no-unstable-nested-components */
import {useActionSheet} from '@expo/react-native-action-sheet';
import {DrawerItem} from '@react-navigation/drawer';
import React, {useEffect} from 'react';
import {Drawer} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useAuth} from '&/lib/auth';
import {useBottomSheet} from '&/lib/bottom-sheet';
import {Login} from '&/features/ver/routes/Login';

export const SidebarFooter = () => {
  const {signout} = useAuth();
  const {showActionSheetWithOptions} = useActionSheet();
  const {handlePresentModal} = useBottomSheet();

  const data = [
    {
      icon: 'plus-circle-outline',
      title: 'マップサーバーを追加する',
      onPress: () =>
        handlePresentModal({snapPoints: ['100%'], component: Login}),
    },
    {
      icon: 'cog-outline',
      title: '環境設定',
      onPress: () =>
        handlePresentModal({snapPoints: ['100%'], component: () => <></>}),
    },
    {
      icon: 'exit-to-app',
      title: 'サインアウト',
      onPress: () => {
        const option = {
          options: ['サインアウト', 'キャンセル'],
          destructiveButtonIndex: 0,
          cancelButtonIndex: 1,
        };
        const indexFn = (i?: number) => {
          if (i === 0) signout();
        };
        showActionSheetWithOptions(option, indexFn);
      },
    },
  ];
  return (
    <Drawer.Section
      style={{marginBottom: 15, borderTopColor: '#ccc', borderTopWidth: 1}}>
      {data.map(d => (
        <DrawerItem
          key={d.title}
          icon={({color, size}) => (
            <Icon name={d.icon} color={color} size={size} />
          )}
          label={d.title}
          onPress={d.onPress}
        />
      ))}
    </Drawer.Section>
  );
};
