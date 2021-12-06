import { ParamListBase } from '@react-navigation/core';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Appbar, Avatar, useTheme } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const Header = ({
  navigation,
}: {
  navigation: DrawerNavigationProp<ParamListBase, string>;
}) => {
  const theme = useTheme();

  return (
    <Appbar.Header
      style={{
        zIndex: 100,
      }}
      theme={{
        colors: {
          primary: theme.colors.surface,
        },
      }}
    >
      <TouchableOpacity
        onPress={() => {
          navigation.openDrawer();
        }}
      >
        <Avatar.Image
          size={40}
          source={{
            uri: 'https://pbs.twimg.com/profile_images/952545910990495744/b59hSXUd_400x400.jpg',
          }}
        />
      </TouchableOpacity>
      <Appbar.Content
        title={
          <MaterialCommunityIcons
            name="twitter"
            size={40}
            color={theme.colors.primary}
          />
        }
      />
    </Appbar.Header>
  );
};
