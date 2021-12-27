import { ParamListBase } from '@react-navigation/core';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Appbar, Avatar, Title, useTheme } from 'react-native-paper';

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
        style={{ marginLeft: 16, marginRight: 8 }}
      >
        <Avatar.Image
          size={40}
          source={{
            uri: 'https://pbs.twimg.com/profile_images/952545910990495744/b59hSXUd_400x400.jpg',
          }}
        />
      </TouchableOpacity>
      <Title>山羽歯科医院</Title>
      {/*       <Appbar.Content
        title={
          <MaterialCommunityIcons
            name="twitter"
            size={40}
            color={theme.colors.primary}
          />
        }
      /> */}
    </Appbar.Header>
  );
};
