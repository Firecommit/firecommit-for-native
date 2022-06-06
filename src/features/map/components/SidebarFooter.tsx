/* eslint-disable react/no-unstable-nested-components */
import {DrawerItem} from '@react-navigation/drawer';
import React from 'react';
import {Drawer} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const SidebarFooter = () => {
  const data = [
    {icon: 'plus-circle-outline', title: 'マップサーバーを追加する'},
    {icon: 'cog-outline', title: '環境設定'},
    {icon: 'exit-to-app', title: 'サインアウト'},
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
          onPress={() => {}}
        />
      ))}
    </Drawer.Section>
  );
};
