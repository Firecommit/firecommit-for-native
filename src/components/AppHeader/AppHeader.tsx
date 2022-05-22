import React from 'react';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {Image, TouchableOpacity, View} from 'react-native';
import {Appbar, Title, useTheme} from 'react-native-paper';

type AppHeaderProps = NativeStackHeaderProps;

export const AppHeader = (props: AppHeaderProps) => {
  const theme = useTheme();
  const {options} = props;
  return (
    <Appbar.Header
      style={{zIndex: 100, paddingHorizontal: 16}}
      theme={{colors: {primary: theme.colors.surface}}}>
      <>
        <View style={{marginRight: 8}}>
          <TouchableOpacity onPress={() => {}}>
            <Image
              style={{
                borderWidth: 0.5,
                borderColor: '#ccc',
                borderRadius: 5,
                width: 40,
                height: 40,
              }}
              source={{
                uri: 'https://firebasestorage.googleapis.com/v0/b/firecommit-1e1d5.appspot.com/o/users%2Ficon%2Fdefault_user.png?alt=media&token=8f30cf5a-db74-4a09-b4e6-ec26670ba538',
              }}
            />
          </TouchableOpacity>
        </View>
        <Title>{options.title}</Title>
      </>
    </Appbar.Header>
  );
};
