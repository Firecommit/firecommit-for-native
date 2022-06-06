import React from 'react';
import {View} from 'react-native';
import {Headline} from 'react-native-paper';
import {SidebarContent} from './SidebarContent';
import {SidebarFooter} from './SidebarFooter';

export const Sidebar = () => {
  return (
    <View style={{flex: 1, paddingTop: 52}}>
      <Headline style={{fontWeight: 'bold', paddingHorizontal: 16}}>
        マップサーバー
      </Headline>
      <SidebarContent />
      <SidebarFooter />
    </View>
  );
};
