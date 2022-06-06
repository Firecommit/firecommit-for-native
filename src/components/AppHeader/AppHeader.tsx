import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {Appbar, useTheme} from 'react-native-paper';
import {DrawerHeaderProps} from '@react-navigation/drawer';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {useVerify} from '&/lib/verify';

type AppHeaderProps = (NativeStackHeaderProps | DrawerHeaderProps) & {
  type: 'stack' | 'drawer' | 'tab';
};

export const AppHeader = ({type, ...props}: AppHeaderProps) => {
  const {workspace} = useVerify();
  const theme = useTheme();
  if (type === 'stack') {
    const {options, route, navigation} = props as NativeStackHeaderProps;
    return (
      <Appbar.Header
        style={{zIndex: 100, paddingHorizontal: 16}}
        theme={{colors: {primary: theme.colors.surface}}}>
        {route.name !== 'account' && navigation.canGoBack() && (
          <Appbar.BackAction onPress={navigation.goBack} />
        )}
        <Appbar.Content
          style={{alignItems: 'center'}}
          titleStyle={{fontWeight: 'bold'}}
          title={options.title}
        />
      </Appbar.Header>
    );
  }
  if (type === 'drawer') {
    const {options, navigation} = props as DrawerHeaderProps;
    return (
      <Appbar.Header
        style={{zIndex: 100, paddingHorizontal: 16}}
        theme={{colors: {primary: theme.colors.surface}}}>
        <View>
          <TouchableOpacity onPress={navigation.openDrawer}>
            <Image
              style={{
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 5,
                width: 40,
                height: 40,
              }}
              source={{
                uri:
                  workspace?.iconURL ||
                  'https://firebasestorage.googleapis.com/v0/b/firecommit-1e1d5.appspot.com/o/users%2Ficon%2Fdefault_user.png?alt=media&token=8f30cf5a-db74-4a09-b4e6-ec26670ba538',
              }}
            />
          </TouchableOpacity>
        </View>
        <Appbar.Content
          style={{alignItems: 'flex-start'}}
          titleStyle={{fontWeight: 'bold'}}
          title={options.title}
        />
      </Appbar.Header>
    );
  }
  return null;
};
